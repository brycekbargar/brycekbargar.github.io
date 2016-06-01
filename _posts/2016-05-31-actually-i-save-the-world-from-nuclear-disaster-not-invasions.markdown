---
layout: post
title: StructureMap and Deep Inheritance at Runtime
date: 2016-05-31 16:21:44.000000000 -05:00
type: post
published: true
status: publish
categories: \[\]
tags: \[\]
meta: {}
author:
login: brycekbargar@gmail.com
email: brycekbargar@gmail.com
display\_name: Bryce Bargar
first\_name: Bryce
last\_name: Bargar
---

(I realized this post is hard to read after posting, but I'm in the middle of migrating to Jekyll from Squarespace and it will be readable there in a few short days...)

Two posts in one day?! It's amazing what you can do accomplish you've disabled your twitter...

I had an issue at work today with StructureMap that I wanted to write up in case it helps someone.  
I love StructureMap and have been using it for 4 years now, at 3 different companies.  
Unfortunately right now I'm on V2.3.1, so the solution may be different on newer versions.

TLDR; I had multiple levels of Inheritance and StructureMap couldn't resolve them dynamically at runtime using Default Conventions.

## The setup

    public interface IView { }
    
    public interface IPresenter { }
    public interface IPresenter<TView> where TView : IView { }
    
    public abstract class PresenterBase<TView> 
      : IPresenter<TView> 
      where TView : IView
    {
      protected PresenterBase(TView view) { }
    }

Here is the basic plumbing of an [MVP][0] application.  
The same sort of problem could appear in any sufficiently large c\# app,  
but MVP (yes winforms...) is what I use at work and where this problem came up.

So my boss slacks me this morning.

> "We've seen an uptick in Alien Invasions and need a way to track them, think you could whip something up?"
> 

Easy! Let's just set up our form and make sure StructureMap can wire everything up!

    public interface IAlienInvasionView : IView { }
    
    public interface IAlienInvasionPresenter : IPresenter<IAlienInvasionView> { }
    public class AlienInvasionPresenter
      : PresenterBase<IAlienInvasionView>, IAlienInvasionPresenter
    {
      public AlienInvasionPresenter(AlienInvasionView view) : base(view) { }
    }

Now let's setup StructureMap like a good girl who can read docs

    public class UserInterfaceRegistry : Registry
    {
      public UserInterfaceRegistry()
      {
        Scan(scan => 
        {
          scan.TheCallingAssembly();
          scan.WithDefaultConventions();
    
          /* 
           * + 15 lines of legacy StructureMap hacks :(
          */
        });
      }
    }

And grab a presenter to start recording all the important invasion details!

    var presenter = ObjectFactory.TryGetInstance(typeof(IAlienInvasionPresenter));

I `git commit; git push` and go to lunch confident invasion details can now be tracked.  
Upon returning to my desk, I see a slack from my boss.

> "There's been a bird Invasion! Quick! We need to make a new form for capturing the details!"
> 

Hmmm...  
Well, we already have an Alien Invasion form and Bird Invasion are surprisingly similar.  
This seems like a great case for (the probably overused) inheritance!

So let's set it up.

    public interface IInvader { }
    public class Alien : IInvader { }
    public class Bird : IInvader { }
    
    public interface IGenericInvasionPresenter : IPresenter { }
    public interface IGenericInvasionPresenter<TInvader> 
      : IGenericInvasionPresenter 
      where TInvader : IInvader
    {
    }
    
    public abstract class GenericInvasionPresenterBase<TInvader, TView> 
      : GenericPresenter<TView>, IGenericInvasionPresenter<TInvader>
      where TInvader : IInvader 
      where TView : IView
    {
      protected GenericInvasionPresenterBase(TView view) : base(view) { }
    }

Nothing too scary.  
We're making a common interface for interacting with the presenter  
and a base implementation to hold the 90% of shared behavior.

Let's put the Alien Invasion specific code into its own presenter.

    public class AlienInvasionPresenter
      : GenericInvasionPresenterBase<Alien, AlienInvasionView>
    {
      public AlienInvasionPresenter(IAlienInvasionView view) : base(view) { }
    }

Notice here that the AlienInvasionPresenter is implementing/inheriting

* `IPresenter`
* `IPresenter<AlienInvasionView>`
* `IGenericInvasionPresenter`
* `IGenericInvasionPresenter<Alien>`
* `PresenterBase<AlienInvasionView>` // kind of a lie since c\# has single inheritance, but it's in the tree somewhere
* `GenericInvasionPresenterBase<Alien, AlienInvasionView>`

_this next part is a little contrived, but bear with me..._  
Since we won't know until Invasion time weather we're dealing with Aliens or Birds  
we have to dynamically create a presenter at runtime.

Like any good .NET Witch I'll use a factory method.

    public static IGenericInvasionPresenter GetInvasionPresenterFor(Type invaderType)
    {
      var presenterType = typeof (IGenericInvasionPresenter<>).MakeGenericType(invaderType);
      var presenter = ObjectFactory.TryGetInstance(presenterType);
      return presenter as IGenericInvasionPresenter;
    }

Yay! `git commit; git push` Who needs to test their code?  
Well actually...

## The Problem

`AlienInvasionPresenter` now longer follows the default `IFoo` -\> `Foo` naming conventions.  
`ObjectFactory.TryGetInstance()` now returns `null` for the presenter and `NullReferenceException`s make me very sad...

I'm usually pretty good at following conventions so it's rare that I have to drop into the more esoteric container options.  
First I unsuccessfully tried my usual fix of `scan.ConnectImplementationsToTypesClosing(typeof(IGenericInvasionPresenter<>));`  
The most promising StackOverflow fix of `scan.AddAllTypesOf(typeOf(GenericInvasionPresenterBase<,>));` didn't seem to work either.  
After many more hacks and an hour of doc reading StructureMap still seemed incapable of resolving the presenter...

This is the point where I usually give up and change my code so it's slightly less elegant but doesn't require black magic configuration.  
But not this time! My code was so elegant I couldn't give it up!  
(plus who actually likes writing code like `For<IGenericInvasionPresenter<Alien>().Use<AlienInvasionPresenter>()`?)  
(plus I anticipated many more invasion types and wanted new ones to _just work_)

## The Solution

So I did the rookie dev thing and wrote a custom IRegistrationConvention.  
(apologies to future devs who get ambushed by the non-standard behavior...)

Here's the custom convention in all it's v2.3.1 glory.

    public class InvasionPresenterRegistrationConvention : IRegistrationConvention
    {
      private static readonly Type InvasionPresenter = typeof(IGenericInvasionPresenter);
      private static readonly Type InvasionPresenterOpen = typeof(IGenericInvasionPresenter<>);
      private static readonly Type Invader = typeof(IInvader);
    
      // I think this signature has been changed in newer versions
      public void Process(Type type, Registry registry)
      {
        // We only want to inspect our Once and Future InvasionPresenters
        if (type.IsClass 
          && type.IsAbstract == false 
          && InvasionPresenter.IsAssignableFrom(type))
        {
          Type baseType;
          if ((baseType = type.BaseType) == null
            || baseType != typeof(object))
          {
            // Exceptions during initialization?! 
            // I want to make sure any future devs follow the pattern for the AutoMagic
            // Either that or they explicitly make informed changes to this code
            throw new InvalidOperationException($"If {type} is an InvasionPresenter it must inherit from GenericInvasionPresenterBase!");
          }
    
          var invaderType =
            baseType
              .GetInterfaces() // IGenericInvasionPresenter<>, IGenericInvasionPresenter, IPresenter<>, IPresenter
              .Where(t => t.IsConstructedGenericType) // IGenericInvasionPresenter<>, IPresenter<>
              .Where(t => t.GenericTypeArguments.Length == 1) // Let's just be safe?
              .Select(t => t.GenericTypeArguments[0])
              .SingleOrDefault(t => Invader.IsAssignableFrom(t)); // This should give us the IInvader we care about
    
          if (invaderType == null)
          {
            throw new InvalidOperationException($"{type} has no IInvader type parameter!");
          }
    
          // Looks like our factory!
          var presenterType = InvasionPresenterOpen.MakeGenericType(invaderType);
          // Looks like StructureMap!
          registry.For(presenterType).Use(type);
        }
      }
    }



[0]: http://codebetter.com/jeremymiller/2007/07/26/the-build-your-own-cab-series-table-of-contents/
