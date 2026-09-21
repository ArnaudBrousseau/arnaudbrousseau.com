---
title: "I Am a Strange Loop"
date: 2026-09-20T22:43:35-05:00
draft: false
---

"I Am a Strange Loop" (book by Douglas Hofstadter, [Amazon link](https://www.amazon.com/dp/0465030793/)) changed how I view consciousness. It's not a topic I often think about, but it's always been puzzling to me. There's this aura of "magic" around it. It's supposed to be sacred. It's supposed to be what makes us human. And it's supposedly beyond scientific comprehension, which has always frustrated me as a firm atheist and scientist.

I originally picked up "I Am a Strange Loop" because I loved reading "Gödel, Escher, Bach" ([Amazon link](https://www.amazon.com/G%C3%B6del-Escher-Bach-Eternal-Golden/dp/0465026567)), another book by Douglas Hofstadter, considered a "must-read" in the computer science field. There's a clear thread between the two books: you'll find some Escher, some Bach, and a **whole lot** of Gödel in "I Am a Strange Loop".

There was a before and after reading "I Am a Strange Loop" for me. It's the first explanation of consciousness that feels satisfying. Below I'm trying to organize my own thinking about it, and pinpoint what it clarified.

## Consciousness as a spectrum

**My thinking before**: consciousness is an attribute. Animals have consciousness, so do humans. Bacteria or viruses do not. I never stopped to analyze the full spectrum.

**After "I Am a Strange Loop"**: consciousness is a spectrum. It feels uncomfortable to "rank" living beings in this way but looking back it seems obvious that a mosquito's consciousness should be considered "less than" the consciousness of a rabbit or a mouse. Here's the hierarchy introduced by Hofstadter in the first chapter:

<center><img src="/img/cone-of-consciousness.png" alt="Cone of consciousness (I Am a Strange Loop, chapter 1)" style="max-width: 560px" /></center>

## Causality of patterns

**My thinking before**: I subscribed to "true" cause and effect at the microscopic level. Physics rules the world. If given the choice between an explanation at the macro level or the micro level, I would pick the micro level every single time because it seemed like a "deeper", more general explanation.

**After "I Am a Strange Loop"**: lower levels can sometimes be worse at explaining "what is going on", or can even be irrelevant! Hofstadter gives the example of a complex layout of dominoes, arranged in such a way that you can "input" an integer by triggering some dominoes, and where the "output" is read by looking at which chain of dominoes fell. The two possible chains indicate whether the input number is prime or not. Explaining that the "prime" dominoes fall because 641 is prime is _certainly_ better than the microscopic explanation which consists of saying that this domino fell because that domino fell because...and so on. It's better because it explains why this output ("true") occurred given a certain input (641). The micro-level answer cannot. This is an important idea: the pattern can be more interesting and illuminating than the individual parts that compose it.

The second important idea is one of causation: once we agree that the layout of dominoes is testing numbers for primality, is it accurate to say that the primeness of 641 _caused_ the "prime" dominoes to fall? Hofstadter says yes, and he thinks that's how consciousness works too. This idea is actually from Roger W. Sperry: in ["Mind, Brain, and Humanist Values"](https://www.informationphilosopher.com/solutions/scientists/sperry/Mind_Brain_and_Humanist_Values.html) he says "Who pushes whom around in the population of causal forces that occupy the cranium?". This second idea, that patterns have causal potency, is how we make sense of the world at a macro level: "I" made my fingers type these words.

## The rise of strange loops

**My thinking before**: to be honest I had never given much thought to loops or "strange" loops. I'm a programmer who likes to untangle loops and avoid recursion whenever I can, for clarity's sake. The idea of self-referential statements like quines seemed cute but not profound enough to be exciting to me.

**After "I Am a Strange Loop"**: Hofstadter makes a compelling case for strange loops being at the core of consciousness. The first distinction he makes is the difference between reception-based loops and perception-based loops. Reception-based loops are, for example, audio-feedback loops: the microphone picks up the loudspeaker's output, and this loops and loops and loops. Perception-based loops are where things get interesting because the receiver _categorizes_ and acts based on categories. Perception sorts, augments, and discards.

Strange loops, he claims, arise when perception loops start to perceive themselves. This is the birth of the "I" loop. When a baby starts moving their hands and body around they learn by perceiving what happens as a consequence. Gradually they recognize the hand as their own. And they begin to represent themselves as the one moving the hand. This perception loop keeps spinning and categorizing forever. The baby's "I" loop is constantly reinforced by experiences over years and years and gradually becomes the most unshakable illusion there is: the impression of a separate "I" that stands outside the process and controls it. There is no "out-of-loop" controller: the controller is the loop. "I" is the strange loop.

Hofstadter draws a beautiful parallel between "I"-style strange loops and Gödel's Incompleteness theorem. ["Principia Mathematica"](https://en.wikipedia.org/wiki/Principia_Mathematica) ("PM") is a carefully constructed set of axioms and rules. The monumental achievement of PM is the derivation, under this very strict set of rules, of a large portion of mathematics. Gödel's Incompleteness theorem proved that there are infinitely many true statements which cannot be proved within PM. And the way he did that is via a strange loop, using the power of encoding. He encoded statements of PM in natural numbers such that arithmetic statements could be read on two levels. He constructed a self-referential "true" statement, in PM notation, which says "I am not provable within PM". If the statement were false, it would be provable, which means PM proves something false. Assuming PM only proves true things, the statement must be true, and therefore unprovable within PM. Checkmate!

The relationship between Gödel's formula and consciousness is the "loop back": the formula is able to talk "about" PM and its own provability. Highly recommend reading through chapters 9 and 10 for more. And if you have the stomach for it, here's Gödel's original paper: [On Formally Undecidable Propositions of Principia Mathematica And Related Systems](https://homepages.uc.edu/%7Emartinj/History_of_Logic/Godel/Godel%20%E2%80%93%20On%20Formally%20Undecidable%20Propositions%20of%20Principia%20Mathematica%201931.pdf).

## On Free Will

**My thinking before**: I had always been a free will skeptic. I'm a firm believer in physics, and so the concepts of consciousness and free will seem to escape that. John Conway's lecture series on free will (the "Free will lectures", see [this YouTube playlist](https://www.youtube.com/playlist?list=PLy6vjBBz_zHSq7btLIDoPDQjfoq4kKT2e)) had put a bit of doubt in my mind. The [Free Will Theorem](https://en.wikipedia.org/wiki/Free_will_theorem) states that "if we have free will, then so do the particles". So I thought: maybe have free will after all, given quantum mechanics seems to indicate it?

**After "I Am a Strange Loop"**: I'm leaning back toward in the idea that there is no free will. Douglas Hofstadter makes a really strong case against it. And, mind you, the Free Will Theorem doesn't say that we have free will! It's perfectly compatible with a world where we do not have free will. Quoting from chapter 23, from a section called "No such thing as free will":

> What, then, is all the fuss about “free will” about? Why do so many people insist on the grandiose adjective, often even finding in it humanity’s crowning glory? What does it gain us, or rather, what would it gain us, if the word “free” were accurate? I honestly do not know. I don’t see any room in this complex world for my will to be “free”.

He goes on to conclude:

> our decisions are made by an analogue to a voting process in a democracy. Our various desires chime in, taking into account the many external factors that act as constraints, or more metaphorically, that play the role of hedges in the vast maze of life in which we are trapped. Much of life is incredibly random, and we have no control over it. We can will away all we want, but much of the time our will is frustrated.  
> [...]   
> Our will, quite the opposite of being free, is steady and stable, like an inner gyroscope, and it is the stability and constancy of our non-free will that makes me me and you you, and that also keeps me me and you you.

My view on free will is now similar: yes there are inner conflicts, yes we sometimes make hard decisions, but none of them are a result of "free" will. It's our inner "I" loop at work. "I" have no ability to choose independently of the processes, desires, and accumulated experience of "my" own strange loop.

## Love, death, and mirroring

**My thinking before**: death and (un)consciousness seemed related, but I never really thought about love as related to consciousness, let alone strange loops! The book fed these ideas to me.

**After "I Am a Strange Loop"**: In chapters 16 and 17 Douglas Hofstadter talks about how the loss of his wife affected him. He shares private emails and introduces the idea of mirrored loops: when you get to know another human you can sometimes reason as if you were them. Express their point of view when they're not there. We're internalizing how others react to the outside world in our own brains. The concept of empathy is closely related.

The idea of loop mirroring is a beautiful one when applied to friendship and loved ones. We've all experienced the classic "wow, if X were here they'd go crazy" (as their favorite song starts). Hofstadter also applies this to death and disappearance. He explains that in his view a funeral's main purpose is to celebrate the deceased by "rekindling" the mirrored loops. What a nice way to see the world! Funerals as a celebration and hopeful event. Quoting directly from the book because I can't do it justice otherwise:

> \[The\] purpose of holding a funeral or memorial service is to reunite the people most intimate with the deceased, and to collectively rekindle in them all, for one last time, the special living flame that represents the essence of that beloved person, profiting directly or indirectly from the presence of one another, feeling the shared presence of that person in the brains that remain  
> [...]  
> Though the primary brain has been eclipsed, there is, in those who remain and who are gathered to remember and reactivate the spirit of the departed, a collective corona that still glows. This is what human love means. The word “love” cannot, thus, be separated from the word “I”; the more deeply rooted the symbol for someone inside you, the greater the love, the brighter the light that remains behind

Reading this brought me close to tears.

## Conclusion

Oh my, do I recommend "I Am a Strange Loop"! It's a few hundred pages and it starts sort of slow, but it's a journey worth embarking on. Here's an excerpt from the end of the book to round it all up:

> You and I are mirages who perceive themselves, and the sole magical machinery behind the scenes is perception — the triggering, by huge flows of raw data, of a tiny set of symbols that stand for abstract regularities in the world. When perception at arbitrarily high levels of abstraction enters the world of physics and when feedback loops galore come into play, then "which" eventually turns into "who".  
> [...]   
> We human beings are macroscopic structures in a universe whose laws reside at a microscopic level. As survival-seeking beings, we are driven to seek efficient explanations that make reference only to entities at our own level. We therefore draw conceptual boundaries around entities that we easily perceive, and in so doing we carve out what seems to us to be reality. 

## What's next

A few interesting ideas or leads worth pursuing, after reading "I Am a Strange Loop":
* Read ["Gödel without (too many) tears"](https://logicmatters.net/igt/) to dive deeper into Gödel's famous theorem. "I Am a Strange Loop" introduces the high-level ideas but I'd like to understand them at a deeper level.
* Watch [Analogy as the core of cognition](https://www.youtube.com/watch?v=n8m7lFQ3njk), a lecture by Douglas Hofstadter from 2005. There is also ["Surfaces and Essences"](https://www.amazon.com/dp/0465018475), which seems to be a book about the same set of concepts (the book's subtitle is "Analogy as the fuel and fire of thinking").
* Dive deeper into Derek Parfit's ["Reasons and Persons"](https://en.wikipedia.org/wiki/Reasons_and_Persons) which has some original thinking about identities and influenced Douglas Hofstadter in his own thought experiments.
* Read more about ["philosophical zombie worlds"](https://en.wikipedia.org/wiki/Philosophical_zombie), popularized by David Chalmers ("machines _that_ think" vs "machines _who_ think"). This makes no sense to me in a way that deserves a double-click. This was introduced in ["The Conscious Mind: In Search of a Fundamental Theory"](https://www.amazon.com/dp/0195117891).
* Hofstadter talks about "élan mental", taking inspiration from Bergson's "élan vital". Going to the source of that term feels worth it. Go read Henri Bergson's [Creative Evolution](https://en.wikipedia.org/wiki/Creative_Evolution_(book)).
* Another fascinating thought experiment is the "inverted spectrum" theory. I don't buy into it but I think it's worth reading about. See [Qualia inverted (Stanford)](https://plato.stanford.edu/entries/qualia-inverted/).