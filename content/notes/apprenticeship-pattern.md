---
title: "Apprenticeship Patterns"
date: 2021-04-04T13:30:38-07:00
---

I picked up [Apprenticeship Patterns](https://www.amazon.com/_/dp/0596518382)
and finished reading it recently. It was written in 2009. 10+ years later I
still found it relevant, energizing, and insightful. Let's go through why.

![Apprenticeship Patterns](/img/apprenticeship-patterns-cover.jpg)

# Apprenticeship Patterns: The Good Parts

Our industry's practices have evolved. While some advice or reflections in this
book are dusty, it offers timeless high-quality "patterns" (really, mindsets)
that one can leverage in today's world. Here are some that resonated with me
particularly well:

* **Expose Your Ignorance, Confront Your Ignorance**: don't hide your ignorance,
  and actively seek to discover your own gaps.  Ask questions publicly when
  possible. Confronting one's ignorance is about spending deliberate energy to
  dig deeper and plug the holes.
* **Study The Classics, Use The Source, Dig Deeper**: this is about studying
  "canonical" sources of knowledge rather than derived or second-hand accounts.
  Go read The Mythical Man-Month and judge for yourself. Use "view source" on
  websites that you're impressed by. Clone the libraries you use and pry them
  open. Follow your curiosity as deep as you can.
* **Breakable Toys**: this mindset is a solution to confront a gap in
  understanding. If you do not understand something deeply enough, make a
  small, throwaway, breakable "toy". What matters is that you're allowed to
  fail and goof around, like a kid.
* **Be The Worst**: relevant 20 years ago, and still relevant today. You are an
  average of the people who surround you. Hence, if you're the worst when you
  look around, you're in a great place. Keep pushing.
* **Stay In The Trenches**: an ode to committment to the IC track. Do not go into
  management if you're planning to hone your software skills. It takes a lot of
  willpower to remain close to the code.
* **Kindred Spirits, Rubbing Elbows**: early in my career I've benefitted immensely
  from senior developers taking me "under their wings"
  ([@jrheard](https://twitter.com/jrheard),
  [Buck](https://pypi.org/user/buck/)). Don't underestimate the importance of
  mentorship and social interactions.
* **Learn How you Fail**: this is something I used to prepare for coding interviews.
  As you write a program, write down every mistake you make. Then reflect on
  how you fail as patterns emerge: off-by-one errors? Undeclared variables?
  Syntax problems? What are your most common failure modes?
* **Nurture Your Passion**: passion is not something that exists before you get
  into a craft. Same with software. So, to stay passionate, you have to nurture
  your passion deliberately. Unfortunately it may involve work outside of your
  normal day job if your current job isn't enough to nurture your passion.
* **Record What You Learn**: probably the most important mindset of all in my
  opinion. Writing or recording what you learn is a huge force-multiplier for a
  software engineering career. Do this during your day job if possible; outside if not.

# Mapping my usual advice to patterns

I often take explicit or implicit mentorship responsibilities at work. Reading
through this book I realized the advice I give fits into apprenticeship patterns:
* _"Write things down!"_: I give this advice in the context of promotions (where
  artifacts matter a lot!). Fits squarely inside of Record What You Learn. 
* _"Ship some code first"_: I often tell senior engineers (or even engineering
  managers) who start on the job that the most important thing they can do is
  get a feeling for what it's like to ship code, or acquire deep technical
  expertise about "the reality on the ground". This is a version of Stay In The
  Trenches ("Jump In The Trenches"?)
* _"Learn how to use a debugger, and get good at debugging!"_: I'm triggered when
  I see folks use print-based debugging to diagnose issues in their code. So I
  introduce everyone who works with me to the importance of debuggers.
  Generally speaking, debugging is a crucial skill in software engineering.
  When you write code, when you test code, or when you're handling production
  incidents. This advice doesn't really have a pattern directly mapping to it,
  although it's closest to Confront Your Ignorance
* _"Reduce to the simplest possible case"_: I'm always in favor of reducing a
  problem to its minimal parts. Usually it's in the context of a bug. I'm a big
  fan of "minimal repros" and proof-of-concept implementations ("POCs"). This
  is squarely within the Breakable Toys pattern
* _"Find good mentors, expand your social network, and do more pair
  programming"_: is also a recurring advice I give to anyone who's looking to
  get better at writing software. I realize it is just another way of applying
  Kindred Spirits and Rubbing Elbows.

# Committing to craftsmanship

Reading this book has had a good effect on me. It clarified what I'm committed
to now, and in the future. Specifically, here's what lies ahead for me:

* Resist the temptation to go broad/abstract. Go deep/concrete instead.
* Refuse to go into management. I've done that successfully so far, aside from
  a short stint as an engineering manager for 6 months or so. Luckily I've
  found my way back to engineering. This is a renewed commitment to the
  Individual Contributor ("IC") track.
* Stay in the trenches. The current IC track at Coinbase is pulling me away
  from code in my day job. Time to fight this tendency.
* Read more research papers. Keep reading fundamental books.
* Get involved in open-source work. I haven't found a community I'm passionate
  about yet but I haven't been looking actively either. I'd love to contribute
  to Firefox for example.
* Confront my ignorance of Bazel. I don't know how it works right now.
* Confront my ignorance of Golang. I have a surface-level understanding of the language. Too shallow.
* Practice on toy problems on a regular basis. While interview-type problems
  are boring, I'm hoping that resources like [Etudes for
  Programmers](https://openlibrary.org/books/OL4546158M/Etudes_for_Programmers),
  [Novig's Pytudes](https://github.com/norvig/pytudes), [Project
  Euler](https://projecteuler.net/), or [Advent Of
  Code](https://adventofcode.com) can provide fun challenges

# Looking Ahead: who I aspire to become

Here's a list of people I admire. I realize now that each of them embodies an
aspect of "apprenticeship" or "craftsmanship" described in [Apprenticeship
Patterns](https://www.amazon.com/_/dp/0596518382). Here they are, along with
why I find their work so damn impressive:
* Julia Evans: master of learning in the open with her [blog](https://jvns.ca/)
  and [zines](https://wizardzines.com/), on a variety of topics ranging from
  DNS to CSS.
* Paul Irish: isn't afraid of digging deep and reading the source. See [10
  things I learned from the jQuery source
  code](https://www.paulirish.com/2010/10-things-i-learned-from-the-jquery-source/).
  Paul's also the reason why Chrome devtools have become so good so quickly.
  He's given countless talks about his work and embodies staying in the
  trenches. Fighting the corporate monster that Google is today must not be
  easy. Hats off!
* Brendan Gregg: king of breakable toys and digging deep. See Brendan's work
  [here](http://www.brendangregg.com/); I'm a fan of how systematically he's
  implemented small tools to fill observability gaps, and how he's combined
  them to cover the [entirety of
  Linux](http://www.brendangregg.com/Perf/linux_observability_tools.png) over
  the years
* Ilya Grigorik: a true scholar who's curating the industry standard for web
  performance, in the open, at [hpbn.co](https://hpbn.co/).
* Vitalik Buterin: founder of Ethereum; he's digging deep into research at
  [ethresear.ch](https://ethresear.ch/) and recording what he learns at
  [vitalik.ca](https://vitalik.ca/).
