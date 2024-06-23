---
title: "Mythical Man-Month Nuggets"
date: 2024-06-23T08:17:55-05:00
---

I recently read through [The Mythical Man-Month](https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959), a book I've heard about a lot over the years. It's a classic. Many blog posts reference it. It's as ingrained in Silicon Valley culture as the Great Gatsby is in New York's.

I went to the source out of curiosity: is this book still relevant, ~50 years later?

Going in I thought I'd read about the process of software estimation, the fallacy of adding people to a project late, and the fact that engineers are not fungible. These are the contexts in which "the mythical man-month" has been referenced for me.

What I found instead was a series of essays on a pretty wide variety of topics related to software engineering, most of them still relevant, and some of them illuminating.

Parts of this book resonated so much that I think they deserve their own space here. What follows are noteworthy quotes which triggered mini "aha!" moments, because of their pithiness or prescience (this book was published in 1975!).

## Tar pits

> No scene from prehistory is quite so vivid as that of the mortal struggles of great beasts in the tar pits [...]. The fiercer the struggle, the more entangling the tar [...]. Large system programming has over the past decade been such a tar pit.

The tar pit image is vivid and is a perfect metaphor for that feeling when working in a giant organization, operating in a legacy codebase, or both. IYKYK.

## Programming is thought-stuff

> The programmer, like the poet, works only slightly removed from pure thought-stuff. He builds his castle in the air, from air, creating by exertion of the imagination

I've always thought that programming and writing are [much closer than people think](https://twitter.com/arnaudbrousseau/status/1784303394024304743). Thinking of software as "thought-stuff" is a nice epiphany: it's indeed like poetry, like authoring an essay, like drawing plans. All "thought"-stuff.

## Parallelism

> The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging

Powerful analogy to convey the heresy of trying to parallelize a process that's inherently single-threaded. Some programming tasks are, but let's be honest: most aren't and have some degree of parallelism. You just have to look for these tracks and get creative.

## Readiness

> An omelet, promised in 2 minutes, may appear to be progressing nicely. But when it has not set in two minutes, the customer has 2 choices--wait or eat it raw.

This is a powerful analogy to say: once a project is late it's extremely hard to get it back on its original timeline. Better take a delay than ship a buggy product. I've found that defining what "ready" looks like is crucial at the start of a project; it helps to have that as a reference later on if delays happen.

## Brook's law

> Brook's law: adding manpower to a late software project makes it later

That's the most cited sentence in the book. There's a lot more nuance to it, the author actually goes into details on why things slow down as well as some remedies for late software projects. But it's a good "0th degree approximation". A good rule of thumb. As a manager: resist the temptation, don't add people to a late project.

## 10x engineers

> Programming managers have long recognized wide productivity variations between good programmers and poor ones. But the actual measured magnitudes have astounded all of us. In one of their studies, Sackman, Erikson, and Grant were measuring performances of a group of experienced programmers. Within just this group the ratios between best and worst performances averaged about 10:1 on productivity measurements.

Aha! So _that_ is where the mythical "10x engineer" comes from!

## On mighty small teams

> The problem with the small, sharp team concept: it is too slow for really big systems

If you've bought into the idea that startups are always better because things move faster, this may be an awakening. Silicon Valley culture glorifies efforts by a couple of engineers building a prototype in a weekend, or progress made by small teams over a few weeks, as if bigger teams were always the wrong choice because they're less efficient.

It's a breath of fresh air to have the other side stated clearly: yes, smaller teams move faster, but small teams are **overall too slow** for "big systems". No amount of productivity gains will get you there: you need a bigger team for a bigger system. This was true 50 years ago, but is it still as true today?

## Surgical teams

> Mills proposes that each segment of a large job be tackled by a team, but that the team be organized like a surgical team rather than a hog-butchering team

What Brooks means by a "surgical" team is a team organized around one person who makes decisions and holds the high-level task in their head. The rest of the team plays "support".

Intuitively this makes a lot of sense: this structure minimizes the time it takes to make decisions. I've often seen issues when there are "too many cooks in the kitchen", so the surgical team model makes sense. It loosely maps to the modern day concept of "tech lead" on any given project, or the concept of "architect" in large organizations. The failure mode is obvious: if the surgeon is bad, there's no saving the project or team organized around them.

## Conceptual integrity

> Conceptual integrity is _the_ most important consideration in system design. It is better to have a system omit certain anomalous features and improvements, but to reflect one set of design ideas, than to have one that contains many good but independent and uncoordinated ideas

Amen. The fact that this was written in 1975 blows my mind. "Conceptual integrity" is definitely a term I'll reference in future discussions. Another related quote from the same essay:

> Conceptual integrity in turn dictates that the design must proceed from one mind, or from a very small number of agreeing resonant minds

This explains why design by committee is often a tragic mistake, and also why "team alignment" is so amorphous yet weirdly valuable to shoot for. Aligned teams or "resonant minds" build tighter systems, with better conceptual integrity.

## Second systems

> The general tendency is to over-design the second system, using all the ideas and frills that were cautiously sidetracked on the first one.

Known as the "Second-System Effect". This is surprisingly still relevant today: when a first system is replaced by a second, it ends up being late, clunky, and expensive. A "big pile" with no conceptual integrity.

## Tower of Babel projects

> Schedule disaster, functional misfits, and system bugs all arise because the left hand doesn't know what the right hand is doing. As work proceeds, the several teams slowly change the functions, sizes, and speeds of their own programs and they explicitly or implicitly change their assumptions about the inputs available and the uses to be made of the outputs.

I haven't seen a large organization where this doesn't happen in some flavor. Communication breakdown is by far, still today, the biggest cause of project failures or delays. I'm not sure if the communication problems of today are better or worse than in the 70s. Back then they had excuses because communication was costly. Paper documents were hard to produce and distribute. Today none of this is true anymore. There are no excuses.

## The essence of programming

> Beyond craftsmanship lies invention, and it is here that lean, spare, fast programs are born. Almost always these are the result of strategic breakthrough rather than tactical cleverness [...] strategic breakthrough will come from redoing the representation of the data or tables. This is where the heart of a program lies. [...] Representation _is_ the essence of programming.

No commentary needed here, this insight is as fresh as they come, decades later.

## Throw one away

> The management question, therefore, is not whether to build a pilot system and throw it away. You _will_ do that. The only question is whether to plan in advance to build a throwaway, or to promise to deliver the throwaway to customers. [...] Hence plan to throw one away; you will, anyhow.

This has now been completely integrated into everyday software development. The notion of prototyping is widely accepted. We don't throw a single one away typically, we throw away many! Finally something we've become better at over the last five decades.

## Design docs

> The reluctance to document designs is not due merely to laziness or time pressure. Instead it comes from the designer's reluctance to commit himself to the defense of decisions which he knows to be tentative

The cliché of lazy programmers who do not want to write documentation has some amount of truth to it, but it fails to account for the social aspect of documentation: once it's written down, it's official. When no documentation is produced, ask yourself why: are programmers lazy? Do they disagree? Or do they not know?

## Programming and Entropy

> Program building is an entropy-decreasing process, hence inherently metastable. Program maintenance is an entropy-increasing process, and even its most skillful execution only delays the subsidence of the system into unfixable obsolescence.

What a great way to frame the concept of tech debt!

## How are projects delayed by months? One day at a time!

This quote is long but I couldn't really shorten it by much. It's perfect as-is and shows how little has changed when it comes to software project management:

> When one hears of disastrous schedule slippage in a project, he imagines that a series of major calamities must have befallen it. Usually, however, the disaster is due to termites, not tornadoes; and the schedule has slipped imperceptibly but inexorably. Indeed, major calamities are easier to handle; one responds with major force, radical reorganization, the invention of new approaches. The whole team rises to the occasion.
> But the day-by-day slippage is harder to recognize, harder to prevent, harder to make up. Yesterday a key man was sick, and a meeting couldn't be held. Today the machines are all down, because lightning struck the building's power transformer. Tomorrow the disk routines won't start testing, because the first disk is a week late from the factory. Snow, jury duty, family problems, emergency meetings with customers, executive audits--the list goes on and on. Each one only postpones some activity by a half-day or a day. And the schedule slips, one day at a time.

It's indeed much harder to empathize with day-by-day slippage than a "tornado" type delay. The day-by-day slippage is a morale killer and a slog, whereas a good "tornado" can inject energy and create a productive wake-up call.

A great manager can turn the latter into the former, when necessary.

## Essential vs accidental complexity

> All software construction involves essential tasks, the fashioning of the complex conceptual structures that compose the abstract software entity, and accidental tasks, the representation of these abstract entities in programming languages and the mapping of these onto machine languages within space and speed constraints.

This rings true and reminds me of ["Simple made Easy"](https://www.youtube.com/watch?v=SxdOUGdseq4), a talk by Rich Hickey (creator of [Clojure](https://clojure.org/), and one of my favorite tech speakers). The main point of this talk is that "simple" is different from "easy". And it relates to the notion of essential vs accidental complexity quoted above: "simple" can be defined as "low essential complexity", and "easy" as "low accidental complexity". These two sets of concepts clicked satisfyingly in place together in my brain.

## Hammock programming

> The essence of a software entity is a construct of interlocking concepts: data sets, relationships among data items, algorithms, and invocation of functions. This essence is abstract, in that the conceptual construct is the same under many different representations. It is nonetheless highly precise and richly detailed. I believe the hard part of building software to be the specification, design, and testing of this conceptual construct, not the labor of representing and testing the fidelity of the representation. We still make syntax errors, to be sure; but they are fuzz compared to the conceptual errors in most systems.

Have you ever experienced solving a programming problem while in the shower? I bet. The quote above explains this neatly: the main difficulty in software, the "essence" of it, is the initial construction of the ideas and relationships. Not the actual implementation.

Rich Hickey (him again!) gave an excellent talk on the subject of working with abstract ideas: [Hammock Driven Development](https://www.youtube.com/watch?v=f84n5oFoZBc&t=1s).

## Complexity: the root of all evil

> Many of the classical problems of developing software products derive from this essential complexity and its nonlinear increase with size. From the complexity comes the difficulty of communication among team members, which leads to product flaws, cost overruns, schedule delays. From the complexity comes the difficulty of enumerating, much less understanding, all the possible states of the program, and from that comes the unreliability. From the complexity of the functions comes the difficulty of invoking those functions, which makes programs hard to use. From complexity of structure comes the difficulty of extending programs to new functions without creating side effects. From complexity of structure comes the unvisualized states that constitute security trapdoors.

Excellent explanation of why simplicity (talking about "essential" simplicity here, although accidental complexity is also bad) is the number one security feature. Do one thing, do it well. That's the root of the Unix philosophy.

This quote continues and concludes:

> Not only technical problems but management problems as well come from the complexity. This complexity makes overview hard, thus impeding conceptual integrity. It makes it hard to find and control all the loose ends. It creates the tremendous learning and understanding burden that makes personnel turnover a disaster.

A team working on a complex codebase or product is harder to motivate than a team working on a greenfield or mostly-greenfield one. Complexity kills morale.

## Prospects of AI

> Many people expect advances in artificial intelligence to provide the revolutionary breakthrough that will give order-of-magnitude gains in software productivity and quality. I do not. [...] The hard thing about building software is deciding what to say, not saying it. No facilitation of expression can give more than marginal gains.

Bold claim to make in 1975! And interesting to read that AI was already hyped up to be a "revolutionary breakthrough" back then. We're about to find out if this holds in the face of ChatGPT and friends.