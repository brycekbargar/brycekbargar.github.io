---
layout: post
title: How to make an Enterprisey API sexy
date: 2015-05-12 03:25:24.000000000 -05:00
---

I'm all about writing sexy code. Unfortunately not everyone is.  
A large part of the my last three jobs has been interfacing with "legacy" or "enterprisey" code.  
Hhere is some of what I've figured out for taking old things and making them maintainable, safe and easy to work with.

In this example I'll be paraphrasing a [SOAP web service][0] I was asked to integrate with.

[I have done a "back of the envelope" approximation of the service here.][1]  
It has one service method that takes in a variety of requests.  
It's actually kind of cool   
because you can version and update individual requests without modifying the wrapping service.  
The rest of this post is going to have snippets referencing this repo.  

### Reduce your exposure to the service as much as possible. ###

Most of the time you just want to cherry pick an API's functionality.  
In our case we just want to buy the cheapest bike.  
We don't really care that you can buy tricycles.   
We certainly don't care that you can buy clown shoes.  
Listing prices is really secondary.  
We know we just want the cheapest.   

This is easy to do explicitly

```csharp
public interface IBobsCrazyCyclesService
{
  PurchaseBicycleResponse BuyACheapBike();    
}
```

It really is just that easy.   
Describe exactly what you want to use the service for,  
write unit tests around a mocked version,  
and then build out the implementation/integration tests to match.

There is one thing about this method that should stand out.  
Yes, we are returning a wsdl generated class.

### Congratuations! The response objects are now part of your domain. ###

I waffled with this for years. Ok, maybe like 1...    
But seriously, stop mapping POCO service response object to difference POCO domain objects.  
By returning the whole thing you let the user of the service determine what to do with the response.  
(BobsCrazyCycles is in the friggin name,  
it's not like you're hiding information by returning different domain models...)

I probably take this farther than most.

```csharp
public partial class ErrorResponse : Exception
{
  public ErrorResponse() : base(Message) { }
}
```

Yeah. I went there.  
Most Code Gen tools create partial classes for this exact reason.  
So that you can extend them safely.   
 
Throwing service responses helps you retain all the information in case of error.  
Every logging framework does a great job at logging exceptions.  
Not many do well at logging arbitrary objects,  especially if have your logging 3-4 layer above your request layer.  
I've taken this (probably) insanely far.   
In the application I'm working on right now,  
I am literally pushing third party notifications into our Message Bus like they belong in our domain and handling them when we feel like it.  
It works.

### Use Factories and Client Wrappers ###
How injectable/testable is our ServiceReference? Not at all.   
I don't even know what its base class is.    
Does it manage it's resources? Probably?   
Yes. let's deploy some probablies to production...    
This can all be solved by a ClientFactory and a Client Wrapper.  

```csharp
public interface IBobsCrazyCyclesClientFactory
{
  IBobsCrazyCyclesClient Create();
}
    
public interface IBobsCrazyCyclesClient : IDisposable
{
  IBobsCrazyCyclesClientWithRequest Make<TRequest>(TRequest request);
}
        
public interface IBobsCrazyCyclesClientWithRequest
{
  TResponse AndGet<TResponse>();
}
```

And

```csharp
public class BobsCrazyCyclesClientFactory : IBobsCrazyCyclesClientFactory
{
  private readonly BobsCrazyCyclesSettings _settings;
    
  public BobsCrazyCyclesClientFactory(BobsCrazyCyclesSettings settings)
  {
    _settings = settings;
  }

  public IBobsCrazyCyclesClient Create()
  {
    var credentials = new Credentials(_settings.Username, _settings.Password);
    var serviceReference = new ServiceReference(credentials, _settings.Endpoint);
              
    return new BobsCrazyCyclesClient(serviceReference);
  }
}
```

Notice how we only specify the service settings in one place? (also injectable)  
Notice how the ClientWrapper is IDisposable allowing us to clean up after our Service Reference?  
Simple. Clean. Maintainable.

Maybe you noticed something else. `IBobsCrazyCyclesClientWithRequest`.  
Yes, we're getting really sexy now.  

### Use Fluent Interfaces to Stitch Together Workflows ###
One of the bigger headaches with legacy code 
is how many hoops you have to jump through to get anything done.
Here you have to   

- Build the request object
- Create the client
- Make the request
- Handle the response in the good and error case

Plus these really aren't related and should be handled by different pieces of code.

"But Bryce!", you say, "[Fluent Interfaces are Evil][2]".  
And sometimes I agree. [NEST is one of the most god awful things I've worked with][3].  
But we are really just building up a workflow here.  
First take my request, then give me a response.  
(ok, so part of the original reason I chose fluent interfaces is because I was bored.  
Another reason is that `public TResponse Get<TRequest, TResponse>(TRequest request)` is decidedly unsexy since [C# doesn't have partial generic type inference...][4])   

So here's the implementation.

```csharp
public class BobsCrazyCyclesClient : IBobsCrazyCyclesClient, IBobsCrazyCyclesClientWithRequest, IDisposable
{
  private object Request { get; set; }
  private readonly ServiceReference _serviceReference;
            
  public BobsCrazyCyclesClient(ServiceReference serviceReference)
  {
    _serviceReference = serviceReference;
  }
            
  IBobsCrazyCyclesClientWithRequest Make<TRequest>(TRequest request)
  {
    Request = request;
    return this;
  }
            
  public TResponse AndGet<TResponse>()
  {
    // I would refactor something here but I don't have ctrl +R +R...
    var request = new Request
    {
      Request = Request
    };
            
    var response = _serviceReference.Send(request);
    if(response.Ack != "OK")
    {
      throw (ErrorResponse)response.Response;
    }
                
    return (TResponse)response.Response;
  }
            
  #region IDisposable
  #endregion
}
```

Notice how all this does is make requests to the `ServiceReference` and handle the response? 
Single Responsibility.

Putting this all together you end up with some decidedly sexy, testable and maintainable.

```csharp
public class BobsCrazyCyclesService : IBobsCrazyCyclesService
{
  private readonly IBobsCrazyCyclesCLientFactory _clientFactory;
          
  public BobsCrazyCyclesService(IBobsCrazyCyclesCLientFactory clientFactory)
  {
    _clientFactory = clientFactory;
  }
            
  PurchaseBicycleResponse BuyACheapBike()
  {
    try
    {
      using(var client = _clientFactory.Create())
      {
        var bicyclesForSale = 
          client
            .Make(new ListBicyclePriceRequest
             {
               Version = 3.14M
             })
             .AndGet<ListBicyclePriceResponse>();
                            
        var cheapestId = 
          bicyclesForSale
            .IdsAndPrices
              .OrderBy(x => x.Value)
              .Select(x => x.Key)
              .FirstOrDefault();
                            
        return
          client
            .Make(new PurchaseBicycleRequest
            {
              Version = 777M,
              Id = cheapestId
            })
            .AndGet<PurchaseBicycleResponse>(); 
      }
    }
    catch(ErrorResponse)
    {
      // Do something because this response object is in our domain
      // Also it's pretty easy to the entire response because we have the whole thing!
    }
  }
}
```



[0]: http://harmful.cat-v.org/software/xml/soap/simple
[1]: https://github.com/brycekbargar/WorkingWithLegacyCode/tree/master/Integrations/BobsCrazyCycles/Client/Reference
[2]: http://ocramius.github.io/blog/fluent-interfaces-are-evil/
[3]: http://nest.azurewebsites.net/nest/writing-queries.html
[4]: http://programmers.stackexchange.com/questions/159754/why-the-question-give-five-things-you-hate-about-c-is-so-difficult-to-answer
