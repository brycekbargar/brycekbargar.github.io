---
layout: post
title: Long Live .NET
date: 2015-08-13 05:09:58.000000000 -05:00
---

This story starts in college.  
I was writing c++ using Notepad++,  
saving to a mapped network drive   
and then compiling/executing/debugging via Putty/gcc/gdb.  
It sort of worked,  
it sort of met my (then still gestating) minimalist ideals,  
but really I just didn't know any better.  
"I am a circuits person" I thought, "why waste time learning to use linux or IDEs when this works so simply?"  

Yuck. Current me dislikes that version of me as well.

It did work though, or at least until one project when my teammates flaked and I had 2 days to write the Interpretation and Storage components of a basic DBMS that integrated with the parser I had been writing. Managing and syncing files over a network, long feedback cycles from write to test, obtuse error messages and zero actual knowledge of using gdb. I was visibly distraught and almost to the point of a panic attack when my roommate walked into my room, placed the VS2012 Ultimate disk in my drive and physically forced me from my seat so he could run the installer. He said after it was installed, "Just use Visual Studio, I promise it will be faster even with the learning curve."

So I did.

F5 became compile + execute + debug. Intellisense helped catch all my silly typos before wasting compilation cycles. The default fonts and text settings were much nicer than Notepad++.

Shit got done. My DBMS was "awesome". Thanks Visual Studio!

At this point you're probably like, "Of course you were having a hard time developing before Visual Studio. No make file, a terrible text editor, not knowing how do actual work with gdb. I'm sure your code was awful too." [I don't think my code was that awful for a college student.][0] Also, how much did you learn about development environments, coding standards and build tools in College? (though I may have just been clueless...)

Using Visual Studio 2012 was the first time I had the realization, "Programming doesn't have to suck, it can be fun! You just need the right tools."

I still had to suffer through 2 more years of writing linux device drivers in c using gedit to graduate, the whole time thinking "This should be easier". When I implemented my Senior Design project using the Kinect in C\# i fell in love and taught myself everything I could. If only I could do it all over again with a fresh arsenal of git, atom, bash, linters, TDD etc... If only...

This story has a point.

Around March of this year I was growing disenchanted with .NET and Visual Studio. I had just taken a Senior Backend Engineer role at a .NET startup thinking, "Surely using .NET in a startup environment will rekindle my love that consulting had so thoroughly squashed!" But it didn't matter. Monolithic, incomprehensible build and deployment processes. Looooooong compile times for Medium Sized solutions. An over-reliance on R\# and Intellisense. Being just productive enough with VS to not need to learn efficient text editing and touch typing. Insanely convoluted "enterprise" code that was not tested, very surprising, and incredibly inflexible. Not knowing anything about "actual" git past SourceTree or anything about Bash past "cd ls mkdir".

Then I found NodeJs. I had always known about it, but it seemed like some sort of toy framework used by hipsters for really pretty Hello World web apps; surely it couldn't handle a real workload. But I was wrong. NodeJs is real shit.

Learning NodeJS + npm + bash + command line git + TDD were all linked in my mind. It was the second time I had the realization, "Programming doesn't have to suck, it can be fun! You just need the right tools."

I mean seriously!   
`brew cask install node   
git init   
npm init   
npm install --save-dev istanbul mocha chai`

Not even mentioning!   
`npm install   
npm test   
npm start   
npm publish   
`

At the time, to me this was revolutionary. [I was used to "starting an 'Empty MVC 4 Web Application' from template in Visual Studio only to have it install about 15 Nuget packages, one of which is Entity Framework."][1] And that's forgetting the long VS startup times, insane battery drain from Parallels, obtuse .csproj and .sln formats, and doing everything through a clunky gui designed for the type of people that only know Java.

And so I slaved away on node projects. I was using Typescript for some, because generics and actual OOP. I was using ES6 for some because lambdas and better array operations and generators. I was using ES5 for some of them because preprocessors take effort to hookup. I was using JSX for some of them because that is supposed to be the cool new thing. 

Then the cracks began to show.

Javascript is kind of a shitty language... I would have a lot of fun building up test suites and incrementally passing them with the minimum required effort. The "type" system and general looseness of the language make this easy in Javascript. I loved playing around with Gulp and TravisCI and github badges. I loved designing solutions and implementation in my head. But when it came time to actually, you know, code. I hated it.

C\# is a really fucking great language. I love generics, I love reflection, I love LINQ, I love Structuremap, I love the implementation of inheritance, I even love the kinda-sorta-bloated .NET library, I love the StackOverflow support.

I'm sure that Javascript has elegant ways to do these things. And I'm sure that Javascript has plenty of things C\# doesn't have. But the question for me is, why learn another "General Purpose Programming Language"? I've invested a lot of time in .NET and C\#. Maybe if I was a Java, or COBOL, or VB6, or PHP programmer who is retraining on a modern stack. But .NET and C\# are only getting better with .NET Core and OmniSharp its just getting better.

I was an [Advanced Beginner][2] and NodeJS really helped me get over some of more obvious stumbling blocks. And that is great! I love NodeJs for that will probably continue to use it for my daily practice because really I'm just a hipster doing pretty Hello Worlds repeatedly... But I think I'm done trying to go any farther with it. Really for one reason.

I was afraid of interacting with the community. Not just the NodeJS community, but the .NET community, the General Techie community, the queer community. All for various reasons, but mostly relating back to "I'm just a beginner NodeJS dev and really understand nothing about HTML and CSS and UX. I feel like an imposter because I don't have 8 hours a day outside my normal job to commit to more programming... But I'm totally too cool for that .NET garbage!" Which just led to social media and blog inactivity, a lot of Crunchyroll binges and feel bads.

How about no longer? 

I love .NET. I love C\#. Now with a renewed passion. Rather than jumping to a prettier ship that is slightly easier to use, why not work on my own ship? The source is there. Many of the tools are there. Now I know how to use them, how powerful they are and what is missing.

Oh, and to the guy who said, "Why would anyone make a nuget package or contribute to the .NET Core? You're just making M$ money!" Fuck. You. (though maybe I should work on my critical thinking skills and not reject an entire stack as uncool because of the opinion of someone I respected....)

Addendum. I still think learning new languages it important. But from now on they'll only be in a different paradigm. Functional, DSLs, Resource Constrained, etc...

"[A language that doesn't affect the way you think about programming, is not worth knowing.][3]"

NodeJs and Javascript don't really change the way I think compared to C\#. At least not in the way something like Haskell or ChucK or VimScript would.


[0]: https://gist.github.com/brycekbargar/feceec658501187c80b2
[1]: http://www.haneycodes.net/to-node-js-or-not-to-node-js/
[2]: http://www.daedtech.com/how-developers-stop-learning-rise-of-the-expert-beginner
[3]: http://www.cs.yale.edu/homes/perlis-alan/quotes.html
