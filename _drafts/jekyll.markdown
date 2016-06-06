---
layout: post
title: Simplest Thing That Could Possibly Work
category: blog
---

My site was originally hosted and built with SquareSpace.  
Mostly because Roman Mars told me to.  
But I guess, also a little because I just wanted **[The Simplest Thing That Could Possibly Work][0]**.

Obviously it wasn't working.  
Slightly less obvious is that it wasn't simple.


### The Impedence Mismatch ###
Editing text in a web browser is a nightmare.  
Even using [wasavi][1] it feels woefully insufficient, like trying to cook soup with a cigarette lighter.  
So I'd try opening up vim or atom and hacking on a post locally.  
This posed two problems  

##### Local File Management #####
I realllly hate saving files locally.  
There are basically three places on my computer that have data:  

1. `~/Downloads/` holds things from Chrome 
1. `~/Desktop/` holds screenshots to be immediately shared
1. `~/_src` holds git repos

Any of these directories can be blown away without a care in the world.  
It's great for doing a clean install of the next OSX, but
terrible for holding onto drafts of posts.

Sure, I could just copy and paste between SquareSpace and atom until I'm ready to publish.  
And mostly I did, that's not a happy or sustainable workflow, especially given that


##### SquareSpace previewing is awful #####

I never felt comfortable that the post would be published as I saw it in the preview.  
I never felt like it was a true WYSIWYG experience, especially with markdown.  

Even if it was a 1-1 representation, there would always be a painfully slow feedback loop.  
Writing locally, copy/pasting to SS, saving draft, refreshing the page.  
And like, maybe that's fine for some people?  Maybe I'm some sort of special snowflake?  

I think it has more to do with my exposure to programming with cli tools.  
Once you `npm run watch` anything less than instant feedback feels like it's 2003 all over again.  
(a side note, being a .NET Witch feels more like a "sit around and wait for the build/tests" Witch now)

### Other Considerations ###

Maybe I could get over the above issues if SquareSpace was free.  
But it's actually like $10 a month (with domain registration).  
$10 a month isn't really anything alone, but it's easily the highest monthly cost that I have.  
Do I enjoy or need SquareSpace more than Crunchyroll, Prime or Streaming Music? Definitely not. 

I don't think I'd have an issue paying for it if it just worked.  
One of the things I struggled with most is the content width.  

As you can tell, I guess from years of programming, I really hate line wrap...  
With the SquareSpace template I was previously using, the line length was a very real constraint.  
:wa





[0]: http://c2.com/cgi/wiki?DoTheSimplestThingThatCouldPossiblyWork
[1]: https://github.com/akahuku/wasavi

Jekyll

1. Get the content in
1. Actually design the layout
1. Strip out everything and only write what is needed
1. Over time add more and more
 
Dotfiles are an area where I've actually seen this in action

- Start out with nothing
- Just implement the bare mininum
- Be happy with it (Important step!)
- Go back (after a year!) and laugh at how bad some of it was
- Clean up and then add on top and be proud again
