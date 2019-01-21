---
title: "The Reality of Interviewing"
date: 2018-12-28
layout: "draft"
activeNavItem: "notes"
---
In October 2018 I quit my engineering job at Yelp. The 6.5 years I spent
working there were amazing in many ways. The purpose of this post is to reflect
on my interviewing experience (all of it: preparation phase, interviews,
post-interview communication) and write down as many details/tips as I can
while it's still fresh in my mind. Hopefully it's useful to somebody out there
(you?) but if nothing else it'll surely be useful for me next time, when I'm on
the job market again.

Get cozy: this is a long read.

# Resume
There are a lot of strong opinions out there about what should and shouldn't go
into your resume. My experience, both as someone who screened hundreds of
resumes and as someone who applied to tens of job postings, is that **resumes
are at best neutral**. If you have an awful resume you probably won't get
responses when applying. If you fix your resume you'll probably get responses
and that's the sweet spot. If you build an amazing resume you'll also get
responses, but it won't help you in any other way.

If you want to be effective with your time do not spend too much time on your
resume. Give it the attention it deserves and move on quickly. It's much better
to spend your time on generating leads, finding referrals or brushing up on your
CS fundamentals (more on that later).

That being said I'm not going to avoid answering. Here are the cardinal sins of
resumes in my book:

* Proprietary formats. Not everyone has Microsoft Word installed! Stick to PDF.
* Grammar or spelling mistakes. Given the small number of words on a resume,
  seeing a grammar or spelling mistake is a huge red flag.
* Labels such as "ninja", "hardcore", "guru" are an immediate turn-off
* Dead links. If it's on your resume, it should work!

Some other tips:

* Keep it short! People reading your resumes have a limited amount of time
  (typically 30 seconds to 1 minute per resume)
* Check your online presence (Google yourself!). Time to freshen up your
  personal site if you have one, make sure to dust off old-looking things in
  your public Twitter, cleanup your Github, etc.

For reference and transparency, here's [my resume](/labs/resume). Feel free to
open a pull request [on
Github](https://github.com/ArnaudBrousseau/arnaudbrousseau.com/blob/master/src/files/labs/resume/index.html)
if you spot something off ;)


# Job Application (aka "Lead Generation")

Once you have a resume and a web presence it's time to actually apply for jobs!
As a software engineer you have a ton of options:

* Passive recruiter outreach: we all have these annoying emails from technical
  "sourcers" (recruiters). It feels like spam. Most of the time it is. I save
  the interesting ones into a folder. When my job search started I reached back
  out and I got interesting leads/contacts from this.
* Referrals: by far the best, most effective lead-generation tool if you're
  already working as an engineer. Hit up your friend list on Facebook or lookup
  people on social media (Twitter, LinkedIn).  Most of the time companies have
  referral programs in place: if you get the job, the person referring you gets
  a fixed amount of money. By reaching out they're doing you a favor, and you're
  potentially doing them a favor!
* [TripleByte](https://triplebyte.com/): I've used their service successfully
  and can't recommend it enough. If you're accepted in their program you'll get
  to go directly to the on-site interview stage with companies that are
  interested in your profile. That's a huge potential time saving! If you don't
  get in it's still good practice, and it's free.
* [Underdog.io](https://underdog.io/): geared towards finding startups. I
  personally haven't had much success with this but the service seems high
  quality with quite a lot of startups to choose from.
* [Hired](https://hired.com/): surprisingly effective for me. Maybe that was
  luck? I got a lot of companies interested in my profile and high-quality
  interviews from this platform.

# Have a story

You should have an answer to the dreaded, classic question: "So why don't you
tell me about yourself?".  
This is worth investing some time in. Look at yourself in the mirror,
ask a friend to tell you what they think, and perfect this until you feel
confident.

If you're transitioning from one role to another (say backend to iOS
development, or from marketing analytics to engineering), it's worth crafting a
compelling story and be ready to answer "so why did you choose to switch from X
to Y?"

Important note: crafting a story is different from lying. Don't say things that
aren't true. Don't try to embellish what happened. Do think about where you're
going to start, what you want to convey, and how: what do you want the listener
to take away from your answer to their question?

# Computer Science Fundamentals

I've written about this [previously](/notes/tech-interviews.html): I really
don't know why Computer Science Fundamentals are such a big focus in our
industry. The reality of interviewing is that they are the most common
denominator across companies, roles and level of experience. Love it or hate it,
studying CS fundamentals is the most efficient thing you can do if you
are prepping for technical interviews because a) it's probably been a while
since you've done anything with binary trees or linked lists and b) these
questions come up *all the time*.

So what exactly is considered "CS fundamentals"? Here's my take on it:

* Big-O analysis
* Hashmaps: implementation, runtime
* Dynamic Arrays: implementation, runtime
* Linked List: implementation, runtime
* (Binary Search) Trees: implementation, runtime, algorithms to traverse them
  (BFS, DFS)
* Search Algorithms: quicksort, bubble sort, insertion sort, heapsort.  What to
  study: implementation, runtime, worst case, best case, and type of inputs
  which fits them.
* Graphs: representations in memory and basic algorithms for traversal (BFS,
  DFS should be a no-brainer to code!)
* (Bonus) Tries, Bloom Filters: no need to know the implementation. Look into
  their runtime and main advantages/trade-offs.
* (Bonus) Dijkstra and/or A\* since it tends to underpin a lot of coding
  questions about graphs.

# Pick a Language and Stick with it

"Coding interviews are basically glorified IQ tests". That's something I've
heard directly from an interviewer. I think it's an accurate statement.

The good news is that no IQ test is perfect and you can "game" the system
provided that you know what's expected of you. What it comes down to is: **save
as many "CPU cycles" as possible** and use those wisely.

Picking a language that you're fluent in saves you a lot of cycles. Instead of
thinking about the best way (or how) to write a class, or trying to avoid
off-by-one errors, practice ahead of time so that a high percentage of cycles is
allocated to thinking about the problem during an actual interview.

Here is a non-exhaustive list of things to practice applicable to Python (if you
pick Java or C++ the specifics between parenthesis vary but the base concepts
remain the same):

* **Write assertions** (use `assert` and use assertion messages!)
* **Write basic "closed" loops** (`for i in range(begin, end)`). Make sure you won't get surprised by `range`'s behavior. `begin` is **inclusive**, `end` is **exclusive** so to loop through with i taking values 1, 2, and 3: `for i in range(1, 4)`
* **Write backward loops** (`for i in range(end-1, begin-1, -1)`)
* **Write "open" loops** (`while some_condition`). Make sure you know how to terminate loops with `break`. Make sure you're familiar with `continue` and its behavior
* **Write a new class** (class declaration, `__init__`, magic methods, inheritance)
* **Instantiate a class, run code** (memorize `if __name__ == "__main__"` for instance)
* (Python specific) List comprehensions: don't *over*use them, but definitely
  know how they work and where to use them (typically when you want to do
  complex destructuring or filtering). They can save a ton of time
* (Python specific) Pro-tip: building dicts programatically! This can be done
  with list comprehension: `d = dict([(k, v) for k, v in ... if ...]`
* (Python specific) Pro-tip: use `defaultdict`! This will avoid if statements to
  handle cases where keys aren't initialized (useful in the case when you want
  to count things or compute averages, frequencies per key, etc)

# Programming Practice

You'll be judged on more than just "coding" during a coding interview. Whether
they're aware of it or not, interviewers will grade you based on:

* How quickly you spot mistakes on your own
* How quickly/accurately you can react to a hint when given one
* How well-spoken you are and how well you understand what they're
  saying (yup, native English speakers have a huge advantage here!)
* How neat your handwriting is, and how well you manage the space on the
  whiteboard. Or if the interviewer is okay with a laptop: how fast you type,
  how familiar you are with the editor you use
* How positive you are (are you smiling? Friendly?)

## Coding Kata
Because there are so many things you'll be judged on aside from coding, don't
fall into the trap of practicing on too many different problems. What I suggest
instead: pick a problem and try to solve it in *different settings*, ideally a
few days apart.

First practice it in the most comfortable setting: with your favorite
IDE/editor. This forces you to focus on the problem itself. Then practice
solving the same problem on a Google doc (or somewhere with no syntax
highlighting). This forces you to focus on language constructs and syntax that
you might be unfamiliar with. Copy/paste the code you wrote into your editor/IDE
only once you're damn sure it compiles/run. It probably won't and that's fine!
Make a note of the mistakes (more on this in the following section)
and come back to your Google doc to re-examine your code. Do this until your
code runs! Finally, practice on paper or a whiteboard, to
practice handwriting and speaking out loud while you're coding.

If you're interviewing with a company which does whiteboard coding only (Google,
Facebook, Amazon, others) try solving a few problems on the whiteboard
first while talking out loud as if a person was listening and judging. And time
yourself. Afterwards, take what you wrote on paper or whiteboard and type it in
mindlessly in an editor/IDE. Does it compile/run? Does it do what you want? Make
note of the mistakes, and repeat.

## Your mistakes are your best assets
Something worth buying: a nice notebook and a pen that you like. It's not that
expensive and it should help you a ton. This notebook should be your "mistake"
log. Every time you screw up (you expected your recursion to finish but it
doesn't, you made a silly syntax error, maybe your loop is off by one) log that
into the notebook, and move on.

Over time more mistakes will pile on. Regularly review the contents of your
notebook to spot trends: are you making a lot of syntax errors? Do you always
forget to declare variables when they're in a `for` loop? What sort of problems
are causing you the most grief?

I reviewed my notebook once a week and before each interview. This helped me
tremendously. Why? Awareness is more than half the battle. There are hundreds of
potential mistakes people make when coding but you have your own special
weaknesses.

Being aware and actively on the lookout for **specific** types of mistakes
drastically reduces the chance of making them. With a bit of training you'll
spot them as soon as they're on your computer screen or whiteboard. Eventually
you'll probably eliminate them *in your mind*, which means entire classes of
mistakes/bugs are gone!

# Don't forget about "soft" skills

This was prompted by my preparation for Amazon's and Facebook's interview
processes. Soft skills are really important. Most engineers underestimate the
importance of soft skills in coding interviews and do not prepare effectively as
a result. Preparing just a little bit puts you ahead of the pack.  It's
definitely worth investing an afternoon don't you think? Here's a list of
questions/prompts to prepare:

*   Tell me about a time when you were faced with a problem that had a number of possible solutions. What was the problem and how did you determine the course of action? What was the outcome of that choice?
*   When did you take a risk, make a mistake, or fail? How did you respond, and how did you grow from that experience?
*   Describe a time you took the lead on a project.
*   What did you do when you needed to motivate a group of individuals or promote collaboration on a particular project?
*   How have you leveraged data to develop a strategy?
*   What were some of the best things you've built?
*   What are you proud of?
*   What could you have done better?
*   What were some excellent collaborations you've had?
*   Tell me about a time when you advocated for and pushed your own ideas forward despite opposition?
*   How do you deal with conflict?
*   How do you like to give and receive feedback?
*   Tell me about a time when you had to complete something in a limited amount of time of with a limited amount of resources

And two final obvious ones:
*   Why COMPANY?
*   Prepare a big list of questions for non-technical folks and technical folks.
    You should have enough questions to last a whole lunch break with either
    type of people (I've found that 10 questions is generally more than enough)

Tips for good long-form answers:

*   Ensure each answer has a beginning, middle, and end. Describe the situation
    or problem, the actions you took, and the outcome.
*   Prepare short descriptions of a handful of different situations and be ready
    to answer follow-up questions with greater detail. Select examples that
    highlight your unique skills.
*   Have specific examples that showcase your experience, and demonstrate that
    you've taken risks, succeeded, failed and grown in the process.
*   Specifics are key; avoid generalizations. Give a detailed account of one
    situation for each question you answer, and use data or metrics to support
    your example.
*   Be forthcoming and straightforward. Don't embellish or omit parts of the story.

# The tech of tech interviews

* Get familiar with [Coderpad](https://coderpad.io/), play with the interface.
* Python pro-tip: you can drop a debugging statement, it'll work just fine
  (`import pdb; pdb.set_trace();`)
* Get a headset! If you have one already great. Otherwise, pick a cheap one from
  Amazon. This helps your interviewer hear you better, and this helps you hear
  your interview better. Win-win.
* Get a blank paper sheet and a pen near you to write things down. If the
  interviewer hears you typing they'll think you're cheating.

# Planning

Planning is one of the most crucial aspects of a job hunt. Put everything in one
calendar (I used Google Calendar) and be very diligent about keeping track of
who is supposed to call you when. Set reminders to prepare for the call, and take
notes!

Another tip that I can give here: try your best to line up interviews that you
care about least first, and the ones that you care about most last.

# Communication with recruiters

## Email tips

* Be as concise as possible.
* Be aware that your recruiter is juggling between multiple
  candidates. Keep your emails short and precise. Instead of saying "when are
  you free?", say when you're free in the next 3 days
* State time zones. Always.

## Expectations management

Be as transparent as you can about your timeline from the beginning. In my
experience there isn't much benefit to information asymmetry. Recruiters are
your best allies: the more they know about your particular set of needs, the
better off you'll be. Why are they allies? They usually have financial incentive
to meet hiring targets. You get in the door, they get paid, both of you are
happy!

Along the same lines: be very diligent about informing your recruiter(s) about
changes along the way.
I found that having a list of names/emails for each company helped immensely
(you don't have to think hard about who to email when something changes if you
have one place where everything is). See below, I kept track of this as part of
my big "interaction log" document

## Interaction log

I kept a log of all the communications I had with every company, regardless of
the stage. Here's a sample set of entries for a given company:

> [$INTERVIEWSTAGE] $COMPANY - <$priority>
> 
> **$date**: Talked to a lot of people: REDACTED@company.com -- firstname, REDACTED@company.com -- firstname, REDACTED@company.com -- firstname
> 
> Next step: phone call with a performance engineering manager at $company
> 
> Other system-level optimizations: webserver (uwsgi)
> 
> 1-2 other team managers will give calls. Tooling, profiling, monitoring: 6 eng,
> strong tech lead.
> 
> **$date**: Applied through $firstname, let’s see how this goes.
> 
> **$date**: $firstname said that she’d be in touch with next steps for
> on-site interviews! Yay
> 
> **$date**: prep call for my interview loop
> * Coding interviews - 45mins -- 2 each
>    Either 2 medium problems or 1 hard
> * Algorithms and data structure
>    Speed, accuracy and problem solving
>    Make sure you try test cases and big-o analysis
> * Don’t ignore hints
> * Design interviews - 45mins - 1 to 2 of these
>    Very open-ended, more of a discussion
>    Eek out the requirements, drive the discussion
> * Breadth and depth, be ready to talk about trade-offs (duh)
> * Breadth > depth
> * Performance aspect of systems is crucial
> * Key aspects: Problem exploration, Components Responsability, Data handling, Tradeoff analysis
> *  Career and coding interviews (45mins) -- 1 to 2 of these
> * Career - 20mins career, resume, growth path, stories, dealing with feedback. Example of failures and what I learned. Should answer with precise examples
> * Coding - standard coding section
> * Lunch break
> 
> **$date**: Had my on-site interview with $company!
> 
> Interviewer 1: $firsname was some guy who’s been with $company for X
> years. Really nice, but a bit overly nerdy, hard to connect with. That was
> the design interview round. His interview question: REDACTED
> 
> Interviewer 2: ....
> etc

I had to redact a lot of it, but the general structure holds. Some things worth
pointing out:

* "$INTERVIEWSTAGE" indicates the stage but is pretty loose -- different
  companies have different processes ("pre-on-site", "contacted", "scheduled
  for video call", "offer!", etc)
* "$PRIORITY" maps to how badly I wanted that job:
  * P0: I’d take a pay cut to work there
  * P1: Given a good offer and a decent team I’d work there
  * P2: Given an excellent offer and the right team, I’d work there
  * P3: Good for training/exploration only, would never accept an offer unless it’s truly exceptional
* I had these in a Google Doc to be able to access it from anywhere (esp.  from
  my phone -- this came in handy more than once!), and color-coded by priority.
* Putting random TODOs in there is also useful
* I initially started with a spreadsheet but I found that freeform text worked
  best to jot down quick thoughts during a call (that document was my main
  medium to take notes during recruiter calls)
* It's important to log the date 
* Write down as much as you can write after the call, interview or interaction happens.
* Treat this as an append-only log. Don't erase anything! This will come in
  handy later on when you're trying to make a decision, and will keep you
  honest

## You have more power than you think
You have a lot of power as an engineer looking for a new job. The market right
now (2018-2019) is as good as it gets. Don't be a jerk about it (obviously!) but
be aware that you can ask for a lot. Asking nicely will get you most of what you
want, so remember to ask!

## Offer, compensation and negotiation

A couple of links on the subject of negotiation:

* [Salary Negotiation](https://www.kalzumeus.com/2012/01/23/salary-negotiation/)
* [Fearless salary negotiations](https://www.amazon.com/Fearless-Salary-Negotiation-step-step/dp/0692568689/)

From personal experience I wouldn't follow the advice "never be the first to
give a number". I found that asking for an aggressive target works better. The
best thing you can do is ask a few people who work at the company for
compensation ranges and shoot slightly above.

And on the subject of competing offers: it really depends on companies. Some
will budge quite a bit if you tell them you have competing offers. Some only
budge if the offer is from a big name such as Facebook or Google. And some don't
respond at all. So I wouldn't attach too much importance to competing offers.
It's way more important to crush your interviews and ask for the right
compensation target. And remember: your recruiter is your ally there as well!
(true they have an incentive to make you sign with the minimum salary possible,
but at the end of the day what matters to them is that you sign at all!)

# Making a decision
I've used [this
spreadsheet](https://docs.google.com/spreadsheets/d/1C8T8lO-OBhN9jMHz8q_2XNYIAyJkVteJghIdJXZajag/edit?usp=sharing)
to be as rational about my choice as possible. The weights are obviously
adjustable so feel free to tweak them to your linking. My personal opinion: a
job is mostly made of **people**. Your manager, your teammates are crucial.
You're going to spend 40hrs per week interacting with them. Make sure you
consider this *very* carefully. A great compensation and a kick-ass brand
won't save you from a lousy manager.

Another piece of advice that I've heard from mentors and colleagues: try to
focus on learning and growth early in your career and disregard compensation if
that's possible for you to do.

That being said: how do you actually go about evaluating your future company,
manager or teammates during your interviews? Obviously it depends. Teammates,
managers and engineering cultures are all made of people. A manager who feel
awful to me might be a great fit for you. Below are **my personal** criteria to
gauge these things. I encourage you to develop your own and write them down.

## Evaluating your future manager
I hate micromanagers. The absolute worst manager would be one who's constantly
looking over my shoulder and my teammates'. In a manager I'm also looking for
somebody who's cool-headed and who can provide a good "shield". Concretely this
means somebody who'll fight to keep the team focused on a minimum number of
projects, and who will switch things up only when absolutely necessary. The
third thing I'm looking for: someone who can coach, be understanding and listen.

It's hard to probe for these things directly but I'll tell you my personal
opinion on what you can look for *in an interview setting*.

The person you are talking to is more likely to be a **bad manager** if they...:

* have a tendency to talk a lot
* get animated easily, are overly enthusiastic
* interrupt you at any point
* have a tendency to focus the discussion instead of opening it up
* did a lot of impressive technical work in the recent past
* are first-time managers (sorry, I have to put this in here!)

And here are some positive attributes. The person you are talking to is more
likely to be a **good manager** if they...:

* ask good questions
* look interested in the answers. Bonus points for taking notes during interviews
* tend to stay high-level
* are terse/concise when they speak
* feel underwhelming, not that impressive
* smile, are positive
* get personal and tend to ask questions "out of the blue" to open up
  discussion. For example, during your interview: "so who got you interested in
  computers in the first place?" "have you thought about technical leadership?
  Is that something you'd like to do down the road?", etc.
* have a long history of being managers. Bonus points if they've done it at
  multiple companies. Extra bonus points if they have a non-CS background.

## Interviewing teammates
Teammates are a bit easier to judge provided that you interview them. What makes
an ideal teammate to me? Somebody who's willing to spend time to show me the
ropes and obscure tips to boost my productivity. Somebody who's willing to say
"I don't know" and learn from me when I can teach them something they don't
know. Somebody who'll happily take ownership of an idea that isn't their own.
Somebody who says "hi" when you cross paths in the office or outside (a nod of
acknowledgment and a smile goes a long way). Somebody who admits to making
mistakes. No trying to cover them up.

How to evaluate this when you're talking 1-1 to someone? The person you are
talking to is likely to be a **bad teammate** if they...:

* interrupt you at any point
* are easily distracted and don't pay attention to what you're saying/writing
* take the interview process or themselves too seriously

Conversely the person you are talking to is likely to be a **good teammate** if
they...:

* smile; are enthusiastic when they talk about their job and the team
* are more interested in hearing about your technical expertise than explaining
  theirs or the team's
* are able to give you useful hints (use the power of hindsight here. Sometimes
  the hint won't feel helpful on the spot, but you'll see its value later on.
  That's fine and correlates with good teammates in my experience)
* tend to explain the context of the problem or answers they're giving

## Gauging work culture
Work culture constantly shifts within a company. Very often it's not consistent
across teams. Heck, *you* may change and consider a culture "cool" now and
"awful" in a few years. That's certainly happened to me.

At the time of writing my ideal work culture offers a good work-life balance. I
want to be able to sleep and spend weekends in the woods when I feel like it. I
value work cultures with an emphasis on social good will (help each other, be
positive, teach/learn from your neighbors, etc), (self)-education and
transparency. See [this post](/notes/values.html) for my values overall.

Now onto how to evaluate this in an interview setting. Some of these criteria
are self-explanatory; others require that you ask specific questions to your
interviewers. Most interviewers reserve some time at the end of their interviews
specifically for this, and an immense majority of recruiters will be happy to
set up additional calls if you didn't have time to ask all your questions.
Without further ado, the company you're interviewing for is likely to have a
**bad culture** if:

* there's only White/Asian males in their 20s/30s on your interview panel
* a large part of the team-building happens outside of work hours ("the team
  generally hangs out on Friday nights" -- Ugh. Does this mean if I don't come
  Friday night I'll miss out?)
* your interviewers are intimidating (putting pressure on instead of trying to
  take it off you)
* there are very few senior engineers and a lot of first-time managers
* the leadership team has seen a lot of departures in the recent past
* people pride themselves on working long hours or not taking vacation, even
  humorously (quick example: me: "when was the last time you took a long
  holiday? Where did you go?", them: "oh man I haven't taken a long vacation in
  years!...*chuckles*...yeah the work here is really intense you
  see, so I tend to take one or two days here and there around long weekends)

Conversely what I'm looking for; the company you're interviewing for is likely
to have a **good culture** if:

* Teams are fluid -- this means knowledge gets around the company and fewer
  silos exist
* There's a default flexible work arrangement (everyone can choose to work
  from home on given days)
* There's an established on-call rotation -- if there's a rotation, there's
  usually runbooks, calendars, and incident response procedures!
* No code goes to production unless reviewed (cowboy shipping is usually
  indicative of a brash engineering culture)
* The company has a good number of non-engineers employees. In my experience
  this helps balance egos and somewhat limit the nonsense sometimes generated by
  engineering-first cultures. That's only valid if non-engineers employees
  interact meaningfully with the rest of the company!  Say if there's a large
  number of sales people in a different building, or a large number of warehouse
  workers in a different city, the impact on the work culture you'll experience
  as an engineer is zero...

# Reflection on interviewing pipelines and processes

When talking about interviewing processes the terms of "false positives" and
"false negatives" are often used. What are they referring to?

* a "*false positive*" is a person who is hired and isn't a good fit
* a "*false negative*" is a person who is rejected but would've been a good fit

Most interview processes are heavily skewed towards avoiding false positives at
all cost. Why? A bad newhire on a software team is usually very costly. But
rejecting somebody who might have been a good fit isn't. The assumption is that
more capable candidates will flow through later. That's definitely true for
Google, Facebook, Amazon, etc. That's why you should not feel bad if you're
rejected. I've heard that Google employees going through the Google interview
process have a success rate of 50%. Yup. Half of Google's employee didn't make
it. Pat yourself in the back if you're rejected and move on to the next one.

What's also crucial in the design of interview processes is the cost associated
with each stage. Typically cost is multiplied by 10 for each step in the
pipeline. Phone screen is cheap (tens of dollars, it's just 30mins of a
recruiter's time). A 1hr Skype call with an engineer + debrief is more costly,
because of the coordination (hundreds of dollars). A full round of on-site
interviews, with all of the coordination and travel cost associated with it is
in the thousands of dollars. Something to keep in mind when you're going through
interviews and you're rejected: the company may not want to take the financial
risk associated with on-site interviews, but you may still be a good engineer
(this is also the result of "optimize for zero false positives")

Having been through a few interviewing pipelines recently, below are some really
good ideas I've seen.

## Automatically graded coding test
This saves a ton of time, and can often replace an expensive and biased (because
it involves the judgment of a single person) "phone screen" or "video call" with
an engineer.

On that note, try to keep this under 1hr. The "take home assignments" that
require more than 1.5hrs to complete will cause a lot of good candidates to lose
interest.

## On-site interviews
During on-site interviews, focus on what's difficult to assess! In my opinion,
on-site interviewers should steer clear of coding questions as much as possible.
The best way to know whether a candidate would be good to work with is to
simulate working with them! Try pair programming. Try whiteboarding systems. Try
simulating the experience of finding/fixing a bug together! How about reviewing
and discussing a piece of real code?

Quite frankly I don't understand why this isn't more common. The fact that
Google, a company I deeply admire for their ethos and ability to innovate,
sticks to whiteboarded algorithm questions (for the most part...they do have
design questions for senior engineers though) is baffling.

## No-surprises interviews
Interviews do not have to feel like taking an exam. Why not communicate the
names of the interviewers, their teams, and rough subjects of the interviews
ahead of time? When I'm working on something new at work or when I'm called to
go to a meeting with a new group, I'm given notice on the agenda and topic. I
see no reason why interviews should be different.

A bad schedule example:

> * 9am: meet and greet  
> * 9:15am-10am: coding interview  
> * 10am-10:45am: coding interview  
> * 10:45am-11:30am: design interview  
> * 11:30am-12:30pm: lunch break  
> * 12:30pm-1:15pm: coding interview  
> * 1:15pm-2pm: coding interview  
> * 2pm-2:15pm: wrap up  

A better example:

> * 9am: recruiter will meet you in the lobby and walk you to your room for the
> day  
> * 9:15am-10am: coding interview with Sarah, engineer on the Payments team.
> This will focus on tree-like structures and performance  
> * 10am-10:45am: coding interview with John, senior engineer on our
> Infrastructure team. Focus will be on caches in the context of web
> applications as well as code quality  
> * 10:45am-11:30am: design interview with Jane from our data science team.
> You'll get to talk about data pipelines and associated technical trade-offs  
> * 11:30am-12:30pm: lunch break  
> * 12:30pm-1:15pm: coding interview with Noah, engineer on the Platform team.
> This interview will focus on finding a bug in one of our internal web
> frameworks used in our microservices fleet  
> * 1:15pm-1:30pm: wrap up with your recruiter, to shield questions and escort
> you out of our HQ  

Sure candidates will study ahead of time. But that's good! I'm betting that this
should lead to higher-quality interviews overall, and better experience for
candidates.

# A final offering: my personal interviewing TODO list

To conclude this blog post (yup that's the last section! Good job making it this
far!), here is the precise list of things I did to prepare myself for interviews
last year. Beware this is *my* list. Yours may vary widely, especially
if you're interviewing for a different role or for a different set of companies.
FYI: I was interviewing for performance/infrastructure/backend/full-stack
software engineering positions, with Python as my language of choice whenever
coding was needed.

Below I graded each item with the power of hindsight. All things considered, was it useful? (1 to 10).

Let's start with items related to CS fundamentals:
*   (4) [https://mrpandey.github.io/d3graphTheory](https://mrpandey.github.io/d3graphTheory) 
*   (10) How are hashmaps implemented?
    *   Array of linked lists. Each list maps to a "bucket"
    *   To store a key/val pair, hash the key, then store it in a linked list starting at "key mod num(buckets)"
*   (1) ETAGS ([https://en.wikipedia.org/wiki/HTTP_ETag](https://en.wikipedia.org/wiki/HTTP_ETag)) 
*   (10) Binary search trees, how to implement/use them?
*   (8) What are balanced trees?
*   (10) Hash table implementation. Big-O to insert/update/retrieve values?
*   (10) Binary Search trees
    *   implementation in Python
    *   Big-o for insertion, deletion, and searching
*   (6) Implement BST's delete() method
*   (10) Linked List
    *   Implementation in Python
    *   Singly vs doubly
    *   Big-o for insertion, deletion and retrieval by index
*   (8) Review how Dijkstra's algorithm work
*   (8) Implement Dijkstra's algorithm in Python
*   (8) Review A\* algorithm (path finding)
*   (8) Read chapter 3 of skiena's algorithm book
*   (4) Read [http://web.stanford.edu/class/cs166/lectures/05/Small05.pdf](http://web.stanford.edu/class/cs166/lectures/05/Small05.pdf)
*   (10) Breath-first search and depth first search algorithms in graphs/trees
*   (10) Graph questions to master:
    *   Is there a path between two nodes in this undirected graph? (-> run BFS or DFS)
    *   What's the shortest path between two nodes in this undirected, unweighted graph? (-> run BFS!)
    *   Can this undirected graph be colored with two colors? (-> run BST!)
    *   Does this undirected graph have a cycle? (-> run DFS!)
*   (10) Sorting algorithms. How efficient is each of them? What are some kinds of inputs that work best on each of them?
*   (10) ways to represent a graph in memory (objects and pointers, matrix, and adjacency list) — familiarize yourself with each representation and its pros and cons.
*   (2) Bloom filters: [https://llimllib.github.io/bloomfilter-tutorial/](https://llimllib.github.io/bloomfilter-tutorial/)
*   (4) Implement a trie-tree
*   (2) Implement a red/black tree in Python
*   (4) Implement A\* algorithm in Python
*   (6) Binary Heaps
    *   Implementation in Python
    *   Big-o for insert, popMin, getMin
    *   Know that binary heaps aren't usually faster than BSTs, but are faster in practice and consume less memory (why?)
*   (10) Dynamic Array (ArrayList). Implement, and know how resizing works
*   (8) Implement quick sort ([reference](http://interactivepython.org/runestone/static/pythonds/SortSearch/TheQuickSort.html))
*   (6) What are some techniques to balance BSTs?
*   (6) What are B-trees?
*   (2) Read about treaps: https://en.wikipedia.org/wiki/Treap
*   (4) LeetCode (931 Todo, 12 Solved, 2 Attempted)

General items:
*   (4) Watch [What to Expect During the Recruiting Process](https://www.facebook.com/Engineering/videos/10152735806862200/) -- Facebook specific, but generally applicable
*   (10) Go through [InterviewCake](https://www.interviewcake.com/). Yes it's paid content but it's worth your money. Especially:
    *   [InterviewCake's "Cake Thief" question](https://www.interviewcake.com/question/python/cake-thief?section=dynamic-programming-recursion&course=fc1)
    *   [InterviewCake's "Binary Tree balancing" question](https://www.interviewcake.com/question/python/balanced-binary-tree?section=dynamic-programming-recursion&course=fc1)
    *   [InterviewCake's "Making change" question](https://www.interviewcake.com/question/python/coin?section=dynamic-programming-recursion&course=fc1)
    *   [InterviewCake's "URL Shortener" design question](https://www.interviewcake.com/question/python/url-shortener)
*   (4) Read through Google's interviewing guide
*   (5) For Amazon application, review [https://www.amazon.jobs/en/landing_pages/in-person-interview](https://www.amazon.jobs/en/landing_pages/in-person-interview) 
*   (8) Oldie but goodie: read [Get That Job At Google](https://steve-yegge.blogspot.com/2008/03/get-that-job-at-google.html) by Steve Yegge
*   (10) Prepare answers to behavioral questions (see "Softskills" above)
*   (4) Watch [How to Crush Your Coding Interview](https://www.facebook.com/Engineering/videos/10152735777427200/) -- Facebook specific, but generally applicable

Systems-y knowledge:
*   (8) Reader/writer locks
*   (8) Files in linux, file descriptors
*   (8) What's a socket?
*   (1) What's anycast DNS?
*   (8) Normalization in dbs: [StackOverflow answer](https://dba.stackexchange.com/questions/4622/when-should-you-denormalize/15798#15798) 
*   (10) DB indices: know that they speed up reads but slow down writes. They also take space and are implemented with B-trees
*   (6) Mutexes/semaphores
    *   [Part 1](https://blog.feabhas.com/2009/09/mutex-vs-semaphores-%e2%80%93-part-1-semaphores/)
    *   [Part 2](https://blog.feabhas.com/2009/09/mutex-vs-semaphores-%e2%80%93-part-2-the-mutex/) 
    *   [Part 3](https://blog.feabhas.com/2009/10/mutex-vs-semaphores-%e2%80%93-part-3-final-part-mutual-exclusion-problems/) 
*   (4) Monitors: [wikipedia:Monitors](https://en.wikipedia.org/wiki/Monitor_%28synchronization%29) 
*   (6) Deadlocks and other concurrency problems: [Quora answer](https://www.quora.com/How-should-I-prepare-for-concurrency-questions-that-are-asked-at-Dropbox-interviews/answer/Eric-Worrall-1) 
*   (10) What's the heap of a program? The stack? [SO answer](https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap)
*   (4) Malloc: how does it work? [SO answer](https://stackoverflow.com/questions/1119134/how-do-malloc-and-free-work)
*   (4) How do system calls work in general? [SO answer](https://stackoverflow.com/questions/499188/how-is-the-system-call-in-linux-implemented)
*   (10) Threads vs processes: [SO answer](https://stackoverflow.com/questions/200469/what-is-the-difference-between-a-process-and-a-thread/200473#200473)
*   (6) Database indices: how are they implemented?
*   (8) Understand deadlock, livelock and how to avoid them.
*   (6) how context switching works, how it's initiated by the operating system and underlying hardware
*   (2) How does process scheduling work
*   (4) Green threads: what are they? See [Green vs Native threads](http://wiki.c2.com/?GreenVsNativeThreads) and [gthreads/intro.html](https://c9x.me/articles/gthreads/intro.html) 
*   (8) Use each one of the APIs described in https://docs.python.org/2/library/threading.html in a toy program to understand them better
*   (8) Write a C program using epoll or kqueue
*   (4) Know about nginx's main blocks/configuration

To prepare for design interviews:
*   (10) Have an answer for NoSQL vs SQL
*   (8) Design question primer: [donnemartin/system-design-primer#system-design-interview-questions-with-solutions](https://github.com/donnemartin/system-design-primer#system-design-interview-questions-with-solutions) 
*   (10) distributed hash table system -- how to design one
*   (10) How does consistent hashing work?
*   (6) Read [this Quora answer about design interviews](https://www.quora.com/How-do-I-prepare-to-answer-design-questions-in-a-technical-interview?redirected_qid=1500023) 
*   (8) Watch [How We've Scaled Dropbox](https://www.youtube.com/watch?v=PE4gwstWhmc) 
*   (2) Read [How To Ace A Systems Design Interview](https://www.palantir.com/2011/10/how-to-ace-a-systems-design-interview/)
*   (2) Read [Preparing for Your Software Engineering Interview at Facebook](https://www.facebook.com/careers/life/preparing-for-your-software-engineering-interview-at-facebook)
*   (2) Read [Composing and Scaling Data Platform](http://www.benstopford.com/2015/04/28/elements-of-scale-composing-and-scaling-data-platforms/)
*   (5) Read [The Log: What every software engineer should know about real-time data's unifying abstraction](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying) 
*   (10) Read a bit about Nginx's architecture ([link](https://www.aosabook.org/en/nginx.html))

Here are some TODO items that do not fit in the above categories:
*   (10) Go through the [TripleByte](https://triplebyte.com/) interviewing process
*   (10) SQL review (JOINs especially)
*   (7) Fearless salary negotiations ([Amazon link](https://www.amazon.com/Fearless-Salary-Negotiation-step-step/dp/0692568689/))
    *   Read fearless salary negotiation free sample
    *   Read fearless salary negotiation book

Finally, what I **did not do** (the items left on my giant TODO list basically). I will
never know if these would have been useful to do or not...but here's the list
anyway:

*   Complete [this sysadmin focused quizz](https://github.com/trimstray/test-your-sysadmin-skills#simple-questions)
*   How to deal with nested state problems with Redux?
*   Topological Sort: Arranges the nodes in a directed, acyclic graph in a special order based on incoming edges.
*   Minimum Spanning Tree: Finds the cheapest set of edges needed to reach all nodes in a weighted graph. (greedy works! Pick edges based on their weight)
*   Tail Call Optimization: how does it work in Scheme or JS? Why don't languages like Python or Java allow it?
*   Read [the system design questions portion of InterviewBit](https://www.interviewbit.com/courses/system-design/topics/interview-questions/)
*   Review what Paxos is and how it works ([Paxos Made Simple](https://www.microsoft.com/en-us/research/uploads/prod/2016/12/paxos-simple-Copy.pdf))
*   Read [this](https://orrsella.gitbooks.io/soft-eng-interview-prep/content/topics/system-architecture-examples.html) (about system design interviews)
*   Read [Please Stop Calling Databases CP or AP](http://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html)
*   Read [Learning About Distributed Systems](http://alvaro-videla.com/2015/12/learning-about-distributed-systems.html)
*   Read [Building a Scalable Webapp on AWS](https://www.airpair.com/aws/posts/building-a-scalable-web-app-on-amazon-web-services-p1)
*   Given an N by N grid of positive integers which represent terrain heights, determine how many grid locations will have water flow over the continental divide (NxN diagonal, 1-1, 2-2, etc) when it rains, not including the divide itself.
*   Know how red/black tree ([wiki page](https://en.wikipedia.org/wiki/Red_black_tree)) , splay trees or AVL trees  are implemented
*   Read [https://akkadia.org/drepper/newni.pdf](https://akkadia.org/drepper/newni.pdf)
*   Read [this paper about events](https://www.usenix.org/legacy/events/hotos03/tech/full_papers/vonbehren/vonbehren_html/index.html) 
*   Go through InterviewBit
*   Review [trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms/) 
*   Do skiena's book's exercises
*   [http://web.stanford.edu/class/cs166/](http://web.stanford.edu/class/cs166/)
*   Go through a few exercises in [http://greenteapress.com/wp/semaphores/](http://greenteapress.com/wp/semaphores/) 
*   Review concepts listed at [leonardomso/33-js-concepts](https://github.com/leonardomso/33-js-concepts)
*   Read [this paper about memcache scaling](https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf)
*   Read [Why Events Are A Bad Idea (for high-concurrency servers)](https://web.stanford.edu/~ouster/cgi-bin/papers/lfs.pdf) 
*   Read [Paxos Made Live - An Engineering Perspective](http://www.cs.utexas.edu/users/lorenzo/corsi/cs380d/papers/paper2-1.pdf) 

You made it. You're a hero. This is the end.
