---
title: "onChange"
date: 2018-02-12
layout: "note"
activeNavItem: "notes"
---

I recently read ["On
Change"](https://www.amazon.com/Change-Management-including-featured-Leading/dp/1422158004),
a compilation of Harvard Business Review articles about change. I picked up
this book on a whim but ended up reading it with software engineering and
engineers in mind. What follows are some notes that could be useful if you want
to initiate or lead change in engineering organizations.

## "Leading Change: why transformation efforts fail"

There are 8 stages that an organization needs to go through in order for a
change to become truly durable. Since most projects in engineering are
fundamentally about change, this is a perfect set of guideline for good
technical leadership.

### 1. Establish a sense of urgency
Change has to be rooted somewhere. In the software world it can be a
deprecation deadline, some new vulnerability, a shift in the partnership
landscape, a new feature released by a third-party, or some internal data about
developer velocity. Whatever it is, change starts by identifying and discussing
these facts/numbers and shaping them into potential threats or opportunities
that the business needs to react to.
A common pitfall at this stage is risk paralysis and underestimation of risk
associated with a change. Have you ever been involved in an "easy" migration
effort which lasts forever and never seems to finish?

### 2. Forming a powerful guiding coalition
That's the idea of consensus building that's often preached by technical
leadership books and materials, so nothing new under the sun. I find the notion
of "coalition" a bit more helpful to think about than "consensus" because
"coalition" implies active help as opposed to passive "yeah sure this is fine"
agreement.

It's really important to get higher-ups aware of the initiative/project. If
possible, try getting their active support.

### 3. Creating a vision
This is typically done with an enhancement proposal, RFC (request for comment),
a wiki page, slides, etc. Whatever format is used doesn't matter as long as
there is a way to communicate what needs to change and how.
The simpler the better. If the vision is too complicated people will often
phase out, won't be on board, or will tend to actively fight the change.
Technically this means aiming for simplicity (KISS).

### 4. Communicating the vision
That's the part that most engineers or technical leads who want to drive a
change most often overlook. If a large change is required, communication around
it should be loud, clear and consistent. The status should be available for
everyone to check on, higher ups should be presenting it at engineering
all-hands, etc.
Another key aspect of this phase is "dogfooding". Have the coalition (from step
2) support the change by going through it themselves (if applicable). A major
hurdle to change arise when the people driving a change do not implement it
themselves. They then risk being considered disingenuous or hypocrite.

### 5. Empowering others to act on the vision
Make sure that there is an "easy upgrade path" (whether or not the change in
question is an upgrade), and change or fix systems/processes which make it
hard for the change to happen. This sometimes involves a bit of brainstorming.
What can you do to get out of the way and empower other developers to "work for
you"? The ideal is to get to a situation where going through change is
easier than not.

### 6. Planning for and creating short-term wins
Strategically reach out to potential early adopters. Plan
short-term wins to demonstrate the value of the change, and actively break down
blockers to let others go through the change more easily.
If you don't plan for these small wins ahead of time you may never find them,
and building momentum will become more difficult.

### 7. Consolidating improvements and producing still more change
This is the refinement step of the previous one. The process to go from nothing
to alpha, from alpha to beta, from beta to limited availability, from limited
availability to general availability is the same: reach out, listen, break down
blockers, modify other systems, fix yours. Rince and repeat.

It's very important that you don't declare victory too soon, otherwise you lose
momentum and support from your coalition.

### 8. Institutionalizing new approaches
That's when the change is truly over. When the new, proposed way becomes the
One Way ®, and technical/process consistency is achieved. Yes! Celebration
time.

## "Leading change when Business is good"

Changing is easy when things are going badly. How do you change a system when
it's running well? ["If it ain't broke, don't fix
it!"](https://en.wiktionary.org/wiki/if_it_ain%27t_broke,_don%27t_fix_it)-- in
this case, try to focus on the larger picture and see how systems fit together.
What do we want systems/processes to look like in 2/3/5/10 years? Can we align
them better?  Focus on tests, release agility, code quality, and architecture
or infrastructure simplicity.

## "Radical Change, the quiet way"
This focuses on the concept of "tempered radicals". These are individual "deep"
(not in high management, essentially) inside companies who take it upon
themselves to change an aspect of their job. In engineering this happens _all
the time_. I found that laying out how this can be done on a spectrum is
useful. At the edge of this "quiet" radical change begins true public
leadership. Below are the business-y terms from the article along with concrete
engineering examples that I've seen:

* "Disruptive self-expression": introduce a new code/test
  pattern/library/component to see how others react, start a communication
  trend (sending RFCs internally, regular private email statuses, some new way
  of organizing your backlog, or even how you communicate testing strategies to
  your peers). This should be common!
* "Verbal jujitsu": translated to the technical world this refers to soft
  rebellion against the status quo. People who are advocate for clean testing,
  good naming, some particular technology or patter, are examples of this.
* "Variable-term opportunism": instead of just complaining, these developers
  look for opportunities for change to happen. Example: "oh you're touching
  this file, how about refactoring this system which sucks right now?". The
  "scout" rule ("leave a source file always cleaner than you found it") is
  somewhat related to this as well.
* Alliance building. In the technical community these developers are often
  referred to as "champions". They want an aspect of their job to change and
  they're ready to lead the change. There begins technical leadership.

You'll note that these methods vary in effectiveness. Small organizations
benefit a lot from more private change initiators while bigger organizations
benefit from champions the most. Startups are more likely to say "just do it",
whereas bigger structures can be hurt from excessive "disruptive
self-expression", which harms effectiveness as a whole because of the lack of
consistency and predictability that it brings.


## "The real reason people won't change"
This is a way to analyze why people (or you!) are resistant to a change. In
short, ask these questions, the article says:

* What would you like to see changed at work, so you could be more effective,
  or so work would be more satisfying?
* What commitment does your complaint imply?
* What are you doing, or not doing, to keep your commitment from being more
  fully realized?
* Imagine doing the opposite of the undermining behavior. Do you feel any
  discomfort, worry or vague fear?
* By engaging in this undermining behavior, what worrisome outcome are you
  committed to preventing?
* Identify the Big Assumption: create a sentence stem that inverts the
  competing commitment then fill in the blanks.

Lots of business-bullshit-type fluff huh? This idea of a "Big Assumption" is
what we sometimes call "hidden motives". Hence the importance of identifying
people that are NOT on board with a proposed change, to address their
concerns and understand the reason they're opposing the change. Nothing really
revelatory here.

## "Cracking the code of change"
This talks about "theory E" changes (Economic capability) vs "theory O" changes
(Organizational capability). It states that you need both to be successful. The
direct application of this is [OKRs](https://en.wikipedia.org/wiki/OKR).
Top-level objectives metrics are the "E", top-down driven component. Then key
results and planning are the "O" component, letting engineers be free to
accomplish what's set for them however they want.

## "The Hard side of change management"
This is a process to identify which change initiatives are "at risk" of
failure. Critical components of a change initiatives are:

* Duration (time between meeting/reviews). The shorter the better (the article
  says ideally < 2mo, but in software it should be much more frequent!)
* Integrity: how skilled are people driving the change? Assessment can be by
  looking at how well-established/respected the leader is, and how much time is
  allocated to the change (ideally > 50%, which gives him/her focus and ability
  to drive that change to completion)
* Commitment: buy-in from upper management. Does it appear in quarterly report?
  Does upper management mention this change in email/updates? Do they get why
  this change is important? Do developers? Ideally, all of the answers should
  be yes.
* Effort: how much effort is this change piling on top of other people's
  workload? Ideally less than 10%. In engineering it's often a fixed or
  negative cost. Migration are typically done once, and process changes are
  usually there to make things faster and more efficient. Not slower!

## You made it!
Thanks for reading all the way until the end. I found the experiment of reading
a business-y book quite entertaining. Half of this book was, let's be real,
completely useless and felt over-the-top, vague, full of jargon and
non-applicable to engineering. However, the articles I highlighted resonated
somewhat and gave me some confirmation that what I perceived to be true
intuitively in engineering is true in business and everywhere else. The first
article is probably the most useful because it lays a framework to think about
change initiatives that is relevant to engineers.
