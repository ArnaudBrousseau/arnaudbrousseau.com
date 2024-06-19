---
title: "The Mythical Man-Month: nuggets"
date: 2024-06-15T22:01:33-05:00
---

I recently acquired a copy of [The Mythical Man-Month](https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959), a book I've heard about a lot over the years. It's a classic. Many blog posts reference it. It's as ingrained in Silicon Valley culture as the Great Gatsby is in New York's.

I went to the source out of curiosity: is this book still relevant, ~50 years later?

Going in I thought I'd read about the process of software estimation, the fallacy of adding people to a project late, and the fact that engineers are not fungible. These are the contexts in which "the mythical man-month" has been referenced for me.

What I found instead was a series of essays on a pretty wide variety of topics related to software engineering, most of them still relevant, and some of them illuminating.

Some of the metaphors and quotes from this book resonated so much that I think they deserve their own space here. What follows are noteworthy quotes which triggered mini "aha!" moments.

## Large system programming: welcome to the Tar Pits

> No scene from prehistory is quite so vivid as that of the mortal struggles of great beasts in the tar pits [...]. The fiercer the struggle, the more entangling the tar [...]. Large system programming has over the past decade been such a tar pit.

## Programming is thought-stuff

> The programmer, like the poet, works only slightly removed from pure thought-stuff. He builds his castle in the air, from air, creating by exertion of the imagination

I've always thought that programming and writing are [much closer than people think](https://twitter.com/arnaudbrousseau/status/1784303394024304743) (hence why I'm always trying to [improve at it](notes/improving-as-a-technical-writer.html)). This sentence is a nice pithy way to summarize this. Software is "thought-stuff".

## Parallelism

> The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging

This nicely illustrates the heresy of trying to add people to a project with a single track. Sometimes is just does not make sense.

> An omelette, promised in 2 minutes, may appear to be progressing nicely. But when it has not set in two minutes, the customer has 2 choices--wait or eat it raw.

## Brook's law

> Brook's law: adding manpower to a late software project makes it later

That's the most cited sentence in the book. There's a lot more nuance to it, the author actually goes into details on why things slow down as well as some remedies for late software projects. But it's a good "0th degree approximation". A good rule of thumb. As a manager: resist the temptation.

## 10x engineers: the origins

> Programming managers have long recognized wide productivity variations between good programmers and poor ones. But the actual measured magnitudes have astounded all of us. In one of their studies, Sackman, Erikson, and Grant were measuring performances of a group of experienced programmers. Within just this group the ratios between best and worst performances averaged about 10:1 on productivity measurements.

Aha! So _that_ is where the mythical "10x engineer" comes from!

## On mighty small teams

> The problem with the small, sharp team concept: it is too slow for really big systems

If you've bought into the idea that startups are always better because things move faster, this may be an awakening. Silicon Valley culture glorifies efforts by a couple of engineers building a prototype in a weekend, or progress made by small teams over a few weeks, as if bigger teams were always the wrong choice because they're less efficient.

It's a breath of fresh air to have the other side stated clearly: yes, smaller teams move faster, but small teams are **overall too slow** for "big systems". No amount of productivity gain will get you there: you need a bigger team for a really big system.

## Surgical teams

> Mills proposes that each segment of a large job be tackled by a team, but that the team be organized like a surgical team rather than a hog-butchering team

What Brooks means by "surgical" team is a team organized around one person who makes decisions and holds the high-level task in their head. The rest of the team plays "support".

Intuitively this makes a lot of sense: this structure minimizes the time it takes to make decisions. I've often seen issues when there are "too many cooks in the kitchen", so the surgical team model makes sense. It loosely maps to the modern day concept of "Tech Lead".

## Conceptual integrity

> Conceptual integrity is _the_ most important consideration in system design. It is better to have a system omit certain anomalous features and improvements, but to reflect one set of design ideas, than to have one that contains many good but independent and uncoordinated ideas

Amen. The fact that this was written in 1975 blows my mind. "Conceptual integrity" is definitely a term I'll reference in future discussions. Another related quote from the same essay:

> Conceptual integrity in turn dictates that the design must proceed from one mind, or from a very small number of agreeing resonant minds

This explains why design by committee is often a tragic mistake, and also why "team alignment" is so amorphous yet weirdly valuable to shoot for. Aligned teams or "resonant minds" build tighter systems, with better conceptual integrity.

## Second systems

> The general tendency is to over-design the second system, using all the ideas and frills that were cautiously sidetracked on the first one.

Known as the "Second-System Effect". This is surprisingly still relevant today: when a first system is replaced by a second, it ends up being late, clunky, expensive. A "big pile". For example:
* first bug tracker: maybe a spreadsheet? Second bug tracker: Jira 💀
* first CRM system: quick service thrown together just to do the job. Second system: Salesforce integration 💀
* first deployment tooling: a collection of simple bash scripts. Second deployment tooling: Kubernetes 💀
* first biz ops system: a SQL shell. Second bizops system: a data pipeline and data lake architecture 💀

## Tower of Babel projects

> Schedule disaster, functional misfits, and system bugs all arise because the left hand doesn't know what the right hand is doing. As work proceeds, the several teams slowly change the functions, sizes, and speeds of their own programs and they explicitly or implicitly change their assumptions about the inputs available and the uses to be made of the outputs.

I haven't seen a large organization where this doesn't happen in some flavor. Communication breakdown is by far, still today, the biggest cause of project failures or delays. I'm not sure if the communication problems of today are better or worse than in the 70s. Back then they had excuses because communication was costly. Paper documents were hard to produce and distribute. Today none of this is true anymore. There are no excuses.

## Representation is the essence of programming

> Beyond craftsmanship lies invention, and it is here that lean, spare, fast programs are born. Almost always these are the result of strategic breakthrough rather than tactical cleverness [...] strategic breakthrough will come from redoing the representation of the data or tables. This is where the heart of a program lies. [...] Representation _is_ the essence of programming.

No commentary needed here, this insight is as fresh as they come, even 50 years later.

## Prototyping: throw one away

> The management question, therefore, is not whether to build a pilot system and throw it away. You _will_ do that. The only question is whether to plan in advance to build a throwaway, or to promise to deliver the throwaway to customers. [...] Hence plan to throw one away; you will, anyhow.

This has now been completely integrated into everyday software development. The notion of prototyping is widely accepted. We don't throw one away typically, we throw many away! Finally, something we've become better at over the last five decades.

## On writing documentation

> The reluctance to document designs is not due merely to laziness or time pressure. Instead it comes from the designer's reluctance to commit himself to the defense of decisions which he knows to be tentative

That's also my experience. The cliche of lazy programmers who do not want to write documentation has some amount of truth to it, but it fails to account for the social aspect of documentation: once it's written down, you commit to it.

This cuts both ways: the commitment that comes with documentation helps in the case of design docs.

# Central thesis: software is about complexity management
