---
title: "The Reality of Interviewing"
date: 2018-12-28
layout: "draft"
activeNavItem: "notes"
---
In October 2018 I quit my engineering job at Yelp. The 6.5 years I spent
working there were amazing in many ways. I might go into this in a future
Glassdoor review if I have time. The purpose of this post is to do a bit of
retrospective on my interviewing experience (all of it: preparation phase,
interviews, post-interview communication) and write down as many details/tips
as I can while it's still fresh in my mind.

Beware I'm not planning to half-ass this, so get cozy: this is a long read.

# Resume

* Do not attempt to list every single thing
* Your resume is going to be less important than you think, depending on how you're going about generating leads (more on that later)
* Make sure LinkedIn is up-to-date
* Check your online presence. Time to freshen up your personal site if you have one, make sure to dust off old-looking things in your public Twitter, cleanup your Github, etc.

# Lead Generation

* TripleByte
* Underdog.io
* Hired
* Passive recruiter outreach
* Referrals

# CS fundamentals

I've written about this [previously](/notes/tech-interviews.html): I really
don't know why CS fundamentals are such a big focus in the industry. The
reality of interviewing is that they are the most common denominator across
companies, roles and level of experience. Love it or hate it, studying CS
fundamentals is probably the most efficient thing you can do if you are
prepping for technical interviews because a) it's probably been a while since
you've done anything with binary trees or linked lists and b) these questions
come up all the time.

So what exactly is considered "CS fundamentals"? Here's my take on it:

* Big-O analysis
* Hashmaps: implementation, runtime
* Dynamic Arrays: implementation, runtime
* Linked List: implementation, runtime
* Binary Search Trees
* Search Algorithms: quicksort, bubble sort, insertion sort, heapsort.
  Implementation, runtime, worst case, best case, and type of inputs which fits
  them.
* Graphs: representations in memory and basic algorithms for traversal (BFS,
  DFS should be a no-brainer to code!)
* (Bonus) Tries, Bloom Filters: no need to know the implementation. Look into
  their runtime and main advantage
* (Bonus) Dijkstra and/or A\* since it tends to underpin a lot of coding
  questions about graphs.

The other

# Pick a Language and Stick with it

Coding interviews are basically glorified IQ tests. The good news is that no IQ
test is perfect and you can "game" the system provided that you know what's
expected of you. What it comes down to is: save brain computing power. Picking
a language that you're familiar with and fluent in will save you a lot of
computing power. Instead of thinking about the best way (or how) to write a class, practice ahead of time. Here's a list of things to practice, applicable to Python (if you pick Java or C++ the specifics will change but the concepts remain the same):

* Write a new class (class declaration, `__init__`, magic methods, inheritance)
* Instantiate a class, run code (memorize `if __name__ == "__main__"` for instance)
* Write assertions (use `assert` and use assertion messages!)
* Write basic "closed" loops (`for i in range(begin, end)`). Make sure you won't get surprised by `range`'s behavior. `begin` is **inclusive**, `end` is **exclusive** so to loop through with i taking values 1, 2, and 3: `for i in range(1, 4)`
* Write backward loops (`for i in range(end-1, begin-1, -1)`)
* Write "open" loops (`while some_condition`). Make sure you know how to terminate loops with `break`. Make sure you're familiar with `continue` and its behavior
* List comprehensions: don't **over**use them, but definitely know how they work and where to use them (typically when you want to do complex destructuring or filtering
* Pro-tip: building dicts programatically!
* Pro-tip: use `defaultdict`! This will avoid one if statement.

* My personal favorite: Python
* Practice writing loops both open and closed, forward and backwards

# Practicing programming


# Soft skills

This was prompted by my preparation for Amazon's interview process:
*   Prepare answers to the following:
    *   Tell me about a time when you were faced with a problem that had a number of possible solutions. What was the problem and how did you determine the course of action? What was the outcome of that choice?
    *   When did you take a risk, make a mistake, or fail? How did you respond, and how did you grow from that experience?
    *   Describe a time you took the lead on a project.
    *   What did you do when you needed to motivate a group of individuals or promote collaboration on a particular project?
    *   How have you leveraged data to develop a strategy?
*   [DONE] Tips for good answers:
    *   Practice using the STAR method to answer the behavioral-based interview questions listed above, incorporating examples from the Amazon Leadership Principles.
    *   Ensure each answer has a beginning, middle, and end. Describe the situation or problem, the actions you took, and the outcome.
    *   Prepare short descriptions of a handful of different situations and be ready to answer follow-up questions with greater detail. Select examples that highlight your unique skills.
    *   Have specific examples that showcase your experience, and demonstrate that you've taken risks, succeeded, failed and grown in the process.
    *   Specifics are key; avoid generalizations. Give a detailed account of one situation for each question you answer, and use data or metrics to support your example.
    *   Be forthcoming and straightforward. Don't embellish or omit parts of the story.

*   Prepare answers to
    *   What were some of the best things you've built?
    *   What are you proud of?
    *   What could you have done better?
    *   What were some excellent collaborations you've had?
    *   Tell me about a time when you advocated for and pushed your own ideas forward despite opposition?
    *   How do you deal with conflict?
    *   How do you like to give and receive feedback?
    *   What kinds of technologies are you most excited about?
    *   Why Facebook?

*   Prepare:
    *   Why COMPANY
    *   Tell me about a time when you had to complete something in a limited amount of time of with a limited amount of resources
    *   Fat list of questions for non-technical folks and technical folks

# The tech of tech interviews

* Get familiar with Coderpad, play with the interface. 
* Pro-tip: you can drop a debugging statement, it'll work just fine (`import pdb; pdb.set_trace();`)
* Get a headset! If you have one already great. Otherwise, pick a cheap one from Amazon
* I'm old school: Get some paper and a pen near you

# Planning

Planning is one of the most crucial aspects of a job hunt.

* Put everything on one calendar (I used Google Calendar)

# Communication with recruiters

## Emails

* State timezones. Always.
* Be as concise as possible.
* Be aware that the sourcer or recruiter is juggling between multiple candidates. Keep your emails short and precise. Instead of saying "when are you free?", say when you're free in the next 3 days (with timezones!)

## Keeping a log

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
> **$date**: $firstname said that she’d be in touch with next steps for an onsite! Yay
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
> **$date**: Had my onsite interview with $company!
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
  companies have different processes ("pre-onsite", "contacted", "scheduled
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


## Saying NO

* Practice rejecting, be comfortable saying no

## You have more power than you think

You have a lot of power as a engineer looking for a new job. The market right
now is as good as it gets. Don't be a jerk about it (obviously!) but be aware
that you can ask for a lot. Asking nicely will get you most of what you want.
Insisting can be necessary sometimes.


# Making a decision

Criterias:

* Teamates, manager should come first
* Compensation last, especially if you're early in your career

# My Complete TODO-list

Below is the precise list of things I did to prepare myself. Beware this is
*my* list. Yours will probably vary widely, especially if you're interviewing
for a different role or for a different set of companies. FYI: I was
interviewing for mostly senior engineering positions, for
infrastructure backend or full-stack roles, with Python as my language of choice.

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
*   Implement a trie-tree
*   Implement a red/black tree in Python
*   Implement A\* algorithm in Python
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
    *   [InterviewCake's "Making change" question](https://www.interviewcake.com/question/python/coin?section=dynamic-programming-recursion&course=fc1) question
    *   [InterviewCake's "URL Shortener" design question](https://www.interviewcake.com/question/python/url-shortener)
*   (4) Read through Google's interviewing guide
*   (5) For Amazon application, review [https://www.amazon.jobs/en/landing_pages/in-person-interview](https://www.amazon.jobs/en/landing_pages/in-person-interview) 
*   (8) Oldie but goodie: read [Get That Job At Google](https://steve-yegge.blogspot.com/2008/03/get-that-job-at-google.html)
*   (10) Prepare answers to behavioral questions (see "Softskills" above)
*   (4) Watch [How to Crush Your Coding Interview](https://www.facebook.com/Engineering/videos/10152735777427200/) -- Facebook specific, but generally applicable

Systems-y knowledge:
*   (8) Reader/writer locks
*   (8) Files in linux, file descriptors
*   (8) What's a socket?
*   (1) What's anycast DNS?
*   (8) Normalization in dbs: [https://dba.stackexchange.com/questions/4622/when-should-you-denormalize/15798#15798](https://dba.stackexchange.com/questions/4622/when-should-you-denormalize/15798#15798) 
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

Items aimed at design questions:
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

What I did not do (the items left on my giant TODO list basically). I will
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


Questions that would be good to answer:

* What made some processes good? Bad?
* What are some outdated interviewing tips?
* What's worked well for me? What would I do better next time?
* What are common themes across all interview processes?

* have a story as to why you're quitting
