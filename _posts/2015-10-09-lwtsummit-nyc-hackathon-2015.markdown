---
layout: post
title: "#LWTSummit NYC Hackathon 2015"
date: 2015-10-09 16:55:52.000000000 -05:00
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

My first Hackathon, brought to you by "getting over my shit and no longer having crippling social anxiety".

Anyways.

In the few weeks leading up to it I was like, "I should probably learn how to do a full stack .NET app without Visual Studio or Sql Server". That didn't happen... The day before, during the actual summit was the first time I took a look at Nancy/Kestrel (protip: Awesome shit!) and really got nowhere. So I was just like, "I'll show up with two computers and if I really need to build some hard shit I can pull out my work MBP and use Windows/VS."

Well. There was hard shit to be built. The projects were for UNICEF doing some analysis on large datasets they had. Basically all the projects were super cool and kind of technical and would be a lot of fun. Good job UNICEF!

All the issues I had with the Hackathon came on the LWT side. (also I did a lot of fucking up...). When I arrived at 9:30 it was clear I was the first participant... But it was ok. I had my first interaction with a human being at this point. Some guy (kind of cute...) that worked at Bloomberg (where it was hosted). So I traveled 700 miles to attend a conference full of lesbians and my first/best interaction was with a pretty cool guy.

Yup.

Anyways. People sloooooowly trickled in and the Hackathon didn't "kick off" until like 10:30/45 when it was supposed to start at 10\. Seriously LWT, get your shit together and start on time. To start they actually had everyone stand up and introduce themselves one at a time. Like, fucking really? neitsnoaitensyuarthnafwoduneosiranteisrantisr (mashing the keyboard looks strange with colemak...). After that was over UNICEF introduced the project and there was a lot of confusion about where groups were and where the data was and it just felt super amateurish.

I mean, if I could describe the hackathon in one word it would be "Amateurish".

So after I found my group we talked about our strategy. Our project was to create an application that could take arbitrary chunks of text, like Facebook posts or press releases or government studies, and turn them into pins on a map using a "not-google" geolocation API. In our group there was a frontend dev, a scientific/statistical dev, a super backend c++ dev and me.

The plan was for the frontend person to build a rough gui that talked to a REST api I would write. The actual work would be offloaded into a processing queue to be handled by the smarter-than-I-could-ever-hope-to-be devs in c++ or python or whatever they thought could do textual analysis. It made sense in my head. And I think on paper it still makes sense?

At some point when every group project I'm in and accidentally architect/lead fails I have to think I'm doing something wrong. It's been this way since college. Maybe I'm too ambitious and should focus on getting done? Maybe I should just not do anything and let someone else "take charge"? Underlying all of this was the fucked up idea in my head that, "Here comes a trans-woman to mansplain and architect and pig-headedly take charge of 3 cis-women who are super smart". It didn't feel good...

At first I thought about just a simple Nancy/Kestrel/Mysql app and I would host it locally and figure shit out as I went along. About 3 minutes of fucking with Kestrel/nginx I was like, maybe I should try something less "beyond the absolute bleeding edge in areas where I have minimal knowledge" and switched to NodeJS. Yeah... The NodeJS I railed against... It's pretty sexy and easy and appealing all things considered........ But I was still running into hosting issues so the frontend dev and I decided, "Into the cloud!". Much furious googling later and I was deploying to Heroku with a git push. Which is fucking awesome!

We still needed a DB and so I threw up a ClearDB instance in Heroku not knowing anything about Heroku add-ins or ClearDB or really anything at all...... I helped the backend devs get connected to it and they started running some cool python code against it.

Then CORS happened.

Seriously. Fuck CORS.

Jesus I hate it..............

Should have been simple

`npm install cors`   
`var cors - require(cors);`   
`app.use(cors());` 

But nothing quite works that way. We ran out of time trying to make PUT requests to a server. Like fucking webapp 101\. I am the worst.

But seriously. Time. We didn't start "hacking" until 11? and the presentation was at 3:45\. I don't know...... I really just don't know.

So I guess in summary. I learned a lot about Heroku hosting. I learned a lot about what I still need to work on for future Hackathons. I had fun and met smart people. It was a reasonable introduction to Hackathons...
