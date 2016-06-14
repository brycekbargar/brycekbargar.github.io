---
layout: post
title: Adventures in Coach House Living
category: blog
---

[Coach Houses][0]  
I currently live one.   
I can't really share walls/floors when I'm prone to blasting death metal at 11pm...  
My lease is up in a month and so I started looking for a cheaper place.

I found another Coach House! (there'll be more on it in a future post).   

Trying to setup utilities is always an adventure when you're living in quasi-legal relic.  
For my current place, it took 4(?) looooong phone calls with Comcast for them to even understand what I was saying.  
Comed isn't much better.

<!--more-->

This is their address lookup form.

![No Unit Alert][1]

Who the fuck asks for Unit before asking for Address?    
(yes. I know half of it is in spanish.)   
I typed in "COACH" hoping to get lucky.   

![No Address Selected Alert][2]

Nope. Just an unhelpful message about selecting something that doesn't exist.  
The account being under my legal name makes calling Comed something I'd like to avoid at all costs.  
So I popped open Chrome's dev tools.  

![Web Request Params][3]

![Empty Results Array][4]

There was one request made, it looks like it happened after 4 characters were typed.  
They're soooo close to having a reasonable UX, yes still so far...

![Copy as cURL][5]

I grabbed the request from Chrome and: 

1. Removed the Unit parameter completely
1. Entered the full Address parameter
1. Tacked on a `| pbcopy` to the end (i'm not cool enough for `awk` yet...)
1. Made the request in iTerm

Here is the (formatted) result

```
[
    "2326 W 24TH ST *UNIT 1F CHICAGO IL 60608||2326|W 24TH ST|CHICAGO|UNIT 1F",
    "2326 W 24TH ST *UNIT 1F,01 CHICAGO IL 60608||2326|W 24TH ST|CHICAGO|UNIT 1F",
    "2326 W 24TH ST *UNIT 1R CHICAGO IL 60608||2326|W 24TH ST|CHICAGO|UNIT 1R",
    "2326 W 24TH ST *UNIT 2F CHICAGO IL 60608||2326|W 24TH ST|CHICAGO|UNIT 2F",
    "2326 W 24TH ST *UNIT 2R CHICAGO IL 60608||2326|W 24TH ST|CHICAGO|UNIT 2R",
    "2326 W 24TH ST *UNIT 2R,01 CHICAGO IL 60608||2326|W 24TH ST|CHICAGO|UNIT 2R",
    "2326 W 24TH ST *UNIT BF CHICAGO IL 60608||2326|W 24TH ST|CHICAGO|UNIT BF",
    "2326 W 24TH ST *UNIT BF,01 CHICAGO IL 60608||2326|W 24TH ST|CHICAGO|UNIT BF",
    "2326 W 24TH ST *UNIT BR CHICAGO IL 60608||2326|W 24TH ST|CHICAGO|UNIT BR",
    "2326 W 24TH ST *UNIT H CHICAGO IL 60608||2326|W 24TH ST|CHICAGO|UNIT H"
]
```

It looks like the main building has 3 floors `[B-2]` of Front(`F`) and Rear(`R`) units,  
plus a mysterious `H`.

I assume `H` is the Coach House?   
My current Unit is `RBD`.  
This all makes perfect sense.

Either I guessed right and saved myself a long phone call full of misgendering!  
or I guessed woefully wrong and am now going to pay for everyone's electricity...

[0]: http://strawstickstone.com/landlords/field-guide-to-chicago-apartments-the-coach-house/
[1]: {{ '/assets/2016-06-13-basically-the-greatest-hacker-ever/no-unit.png' | prepend: site.baseurl }} 
[2]: {{ '/assets/2016-06-13-basically-the-greatest-hacker-ever/no-address.png' | prepend: site.baseurl }} 
[3]: {{ '/assets/2016-06-13-basically-the-greatest-hacker-ever/dev-tools.png' | prepend: site.baseurl }} 
[4]: {{ '/assets/2016-06-13-basically-the-greatest-hacker-ever/empty-response.png' | prepend: site.baseurl }} 
[5]: {{ '/assets/2016-06-13-basically-the-greatest-hacker-ever/curl.png' | prepend: site.baseurl }} 
