---
layout: post
title: A day in the life
category: blog
---

Most people have no idea what I do all day.

I'm not exactly a big help either.

Them. "What do you do?"  
Me in a poor attempt at humor. "Oh. Um. I yell at computers all day."  
Them in a now slightly uneasy tone. "Well... that's cool."

Them. "How's work?"  
Me changing the subject. "Workish. Workesque even. How about that other unrelated topic?"  
So here is an example of what I go through at work  
and why you really don't want me to actually start talking about it.

Maps are hard. Locations and places are harder.  
Locations and places and languages and cultures and history is harder.  
Explaining this to a computer is impossible to get 100% right.  
Seriously.

You're designing an application. In part of the application you need the user to enter a location.  
Pretty standard stuff.

You can't just ask the user for a latitude and longitude.   
Even if the user actually knew what lat & long were.  
Even if the user actually knew the lat & long of the location they wanted.  
Even if the user cared enough to type out 16 random numbers on an iPhone from 2008\.

They would still probably enter them backwards.  
Yeah. Fuck users.  

Why not ask for their address? That's a pretty universal concept, right?

Cool.  
Except it's 2015.  
Seriously.  
Who has time to fill out 3 fields?

User slightly intrigued by your app.  
User Downloads app.  
User slightly impressed by the short but witty app introduction and slick onboarding experience.  
User gets to screen with location entry.  
User becomes irate at the 3 fields shown.

User uninstalls app. 1 star review. Curtains.  
Yeah, users? Fuck users.  

So Here's what we will do.  
Use [Google Places Autocomplete][0].  
Simple, clean, modern.

^ That part up there? Not my job.  
(sorry)

That is the job of the product owner, (hi drew!).  
I may have some input. Like being asked,  

> "Bryce, how hard would it be for us to have a swarm of drones where the user can identify the location via spy camera?"  

But mostly it comes to me as a  

> "Here is what we are going to do, company XYZ does it and the young people these days love XYZ. How long will it take?."

^Actually I lied again. That part up there isn't really my job either.  
It's for the suckers in the frontend that have to deal with Users.  
I'm a backend developer. Basically a little kid with a gluestick and some legos.

At some point it was decreed, 

> "When you send an address to the backend send the City, the ISO code of the State, and the ISO code of the Country."  
Someone before me thought storing ISO codes were awesome.  
Simple, clean, modern.

So one of our frontend developers [Slack][1]s me.  
Joe: "Bryce, Google Places doesn't return ISO codes."

I do some thinking.  
Turns out we really need ISO codes because we don't want to tie ourselves to Googles mapping data.  
(really I just don't want to try to change all the places that rely on ISO codes in the backend)

Bryce: "Joe, that's a problem. How are you doing it now?"  

Joe: "We call the backend Autocomplete service that returns ISO codes."  

Bryce: 
"Well, right now we only support one country. 
I don't think that we can maintain that data for the 196 we'll be supporting soon.
Let me figure something out."

Then I get to work. Before this I was probably looking at cat gifs or something.  
JK. I work at a startup.  
I was doing some other feature that was "mission critical",  
but not as "mission critical" as a simple location input.  
But don't worry. I still have to complete the original task on time...  
This next part is going to get pretty silly. Or technical. Or both depending.  

First I need to find a good source of ISO codes.  
For only $300 you can get it [straight from the source.][2]

lol

Who pays for things, much less free things?  
(Nevermind that we have $5M in venture capital...)  
It is the *principle*.

So I keep digging.  
Turns out Debian uses the ISO data in their distribution and has people that maintain a scrape from the ISO code site.  
How do I know this? By reading some random [process.php][3] on github.  
So now I've got some pretty spiffy XML.

I need to somehow map between this XML and a PlaceId from Google.  
And it needs to be fast and exposed for the frontend to use.  
And it has to be mostly bulletproof.  
And it needs to be written yesterday.

So a Node.js application with a single GET that takes a PlaceId and returns a State ISO Code.  
Host it on AWS Elastic Beanstalk.  
Simple, clean, modern.  

Step one is to read the XML and generate a JavaScript file that contains a massive associative array.  
I chose to do it in LinqPad because sometimes I like parsing XML without Intellisense or R#.

Step two is to write the service.  
I used the standard npm HTTPS module to make a call to Google Places Details in order to get the State name and Country.  
Then it's a quick lookup in the previously generated array.

Done. Ship It. Curtains. `#ImTheBestAtMyJobAccordingToEveryone`.  
In order to get this done I have used 

- Git
- AWS Elastic Beanstalk
- Node.js
- express
- npm
- gulp.js
- Mac Homebrew
- LinqPad
- Sublime Text
- C#
- Typescript

That's enough word soup to feed a whole village of mute African Children.  
All this so users don't have to fill out fields.

I even omitted the part where  
Google doesn't return State information for cities that have the same name as the containing state.  
Or where Google Places returns English names while the ISO standards have the native name.  
Or where Békéscsaba is a "City with county rights" but has an ISO code so we have to support it.  

Next time you ask me what I do, or how my day has been know that it was probably full of things like this.  
So Yeah. I yell at computers and do workesque things all day.


[0]: https://developers.google.com/places/webservice/autocomplete
[1]: https://dribbble.com/shots/1724648-Slack-is-Awesome
[2]: https://www.iso.org/obp/ui/#iso:pub:PUB500001:en
[3]: https://github.com/briancline/iso3166
