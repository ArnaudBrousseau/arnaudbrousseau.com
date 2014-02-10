---
title: "HTML5DevConf 2013"
date: 2013-10-23
layout: "note"
pageType: "note"
---
## From Grassroots to Green Pastures<br>★☆☆☆☆
**Christos Georgiopoulos, Intel**

Keynote about Intel and HTML5. This seemed like a careful mix of corporate BS,
advertising Intel's new "XDK NEW" project and getting developers psyched about
the "Era of integrated computing". I don't think it was particularly useful.

Things he kept hammering at the audience:

- we have to invest in HTML5
- HTML5 has grown from being a simple dream to being a fundation for the "age of integrated computing"
- Intel believes in openness and is committed to keep investing in major OS efforts
- closing statement: "join us together and we'll make the world a better place" (heh)

## Finally! Layout in CSS<br>★★★★★
**Alan Stearns, Adobe**

Talk was about some exciting CSS specs that are coming up and/or implemented already.

### Flexbox
*Status: READY TO USE!*

Fun fact: I was the only one raising my hand when he asked "who's using flexbox
in a production website?" (we use flexbox on Yelp's mobile site) \o/

Flexbox is a lot better than what we have in CSS. CSS wasn't made to be a
layout language and flexbox is an attempt at solving that.

flexbox is a one dimensional layout system. In a flex container you can:

- distribute items along the x axis -> flex-start, flex-end, center, space-between, spce-around
- inside a flex-container contained element -> flex-start, flex-end, center, stretch, baseline

Flexbox gives you:

- vertical centering
- flexing
- rearranging
- "holy grail layout"

Sample code for a **flex container**:
<pre class="brush:css">
    display: flex;
    /* or display: inline-flex; */
    flex-direction: row;
    /* Other options:
    flex-direction: column;
    flex-direction: row-reverse;
    flex-direction: column-reverse;
    */
    justify-content:
    align-items: stretch;
</pre>

Any direct child of a flex container becomes a **flex item**. Flex items can:

- have an "order" css property which indicates the order in which flex items
  should appear
- have a "flex" property that indicates the ratio at which an item gets space
  when extra space becomes available to its flex container

Solutions for  vertical centering:

- align everything to center (use `align-items`)
- declare `margin: auto` on flex items. When margins are set to auto, flex
  automatically adjusts the space around those items

There's a lot more to flexbox, this introduces only the basics.


### Grid Layout
*Status: not ready. Expect early implementations of that next year.*

That's a full 2D layout system. It brings:

- length/percentages
- based on content
- flexing

You can align things based on lines, space between lines, horizontally, vertically, etc.
It's currently being spec'd.

### CSS Exclusions
*Status: not ready. Experimental implementations in IE10, IE11*

CSS Exclusions are solving the overlap problem.
An exclusion is a region causing the content to float around it.

<pre class="brush:css">
.exclusion {
  wrap-flow: both/start/end/clear/maximum/minimum
}
</pre>

### CSS Shapes
*Status: Implementation in latest webkit and blink*

CSS Shapes enable you to wrap text around all sorts of shape (circles, square, polygon)

Possible shapes:

- rectangle
- circle
- ellipse
- polygon(x1, y1, x2, y2, x3, y3, etc)
- shape from image url('image.png')

<pre class="brush:css">
.circle-float:
   float:left;
   shape-outside: circle(50%, 50%, 50%);
}

.ellipse-exclusion {
  wrap-flow: both;
  shape-outside: ellipse(50%, 50%, 90%, 30%);
  shape-margin: 10px;
}
</pre>

### CSS regions
*Status: not ready. But implementation in webkit, blink, iOS7, IE10, IE11.*

Allows you to specify how the content flows from one region to another.
Another name for CSS regions: CSS named flows. Basically it lets you create a
named flow and use it.

<pre class="brush:css">
article > p {
  flow-into: philip;
}

article::before {
  display: block;
  height: 50vh;
  width: 50vw;
}

article::after {
  flow-from:philip;
  display:block
}
</pre>

### Demos

- Google toolbar which puts items that don't fit in the header in a "burger"
  items triggering a dropdown. That can be done using just CSS using name
  flows.
- [National Geographic named flow examples](http://adobe-webplatform.github.io/Demo-for-National-Geographic-Forest-Giant/browser/src/)
- Lots of demos for flexbox: philipwalthon.github.io/solved-by-flexbox


## Memory management for smooth infinite-scrolling<br>★★☆☆☆
**Sumit Amar, Director of Engineering, EA**

The talk was about memory management in the context of (infinite) scrolling. He
makes the distinction between unnecessary memory allocation vs leaks. Leaks in
modern browsers still exists but they're rare.

This talk is about scrolling strategies: snap-in scrolling, inertia scrolling.

Solutions:

- view more
- snap-in (not ideal for vertical scrolling)

First strategy: push the items onto a stack, remove DOM elements, push to
localStorage. Restore when the user scrolls back.

Second strategy: use a range hash table:  
`{ '0-1000': ['http://url1', 'http://url2'] }`

Demo: http://armar.co.in/view.html

"future ideas": pooling and recycling DOM elements, using a set of elements and
translate 3d. No idea how that would work. Like at all. He was vague during the
whole talk.

## JavaScript Insights<br>★★★★☆
**Ariya Hidayat, Sencha**<br>
**Ann Robson, Yammer**

Both speakers are interested in perf and tools despite very different
backgrounds and career paths.
Talk is about some opensource, powerful JS tools.

3 very important tools that everyone should use:

- Linter => [JSHint](http://www.jshint.com/)
- Code coverage => [Istanbul](http://gotwarlost.github.io/istanbul/). "If you think jslint hurts your feelings, wait till you try istanbul"
- cyclomentic complexity => JS complexity via [Plato](https://github.com/es-analysis/plato)

**Use these tools with pre-commit hooks**  
`git commit -n` to avoid git commit hooks

[esprima](http://esprima.org/) to analyse JS syntax tree
(using `esprima.parse`)

Use strict mode to have better validation out of the box (dupe properties in
obejcts for instance)

Definition of the Boolean trap:

- Obfuscated choice => `var volumeSlider = new Slider(false)`
  (use config object)
- double-negative => `component.setHidden(false)`, `filter.setCaseInsentivive(false)`
  (use `setVisible` and `setCaseSensitive` instead)
- OH => `event.initKeyEvent('keypress', true, tue, true, null, false, 0, 9)`
  (you should quit)

[ESLint](https://github.com/nzakas/eslint) => enforces style standards at the syntax tree level.

Multi-layered defense:

- editor syntax validation, linting. Main feature: be fast! You don't want to slow down code edition
- pre-commit hooks: validation, linting, unit tests. CONSIDER pre-push hooks for slower things
- CI Server: linting, testing, integration, etc

Visualization of large codebases: [code flowers](http://redotheweb.com/CodeFlower/)

*from in-person discussion with Ariya*:
- Let's explore pre-push hooks at Yelp.
- Let's check out [Karma](http://karma-runner.github.io/). It's a piece of
  software hooking up mocha with code quality tools. [Article about it](http://ariya.ofilabs.com/2013/10/code-coverage-of-jasmine-tests-using-istanbul-and-karma.html)

## Programming in CSS<br>★★★☆☆
**Terry Ryan, Adobe**

A few years back: very smart people told us not to use table, but to use css.
Problem: we took that too seriously and ended up with `<div class="table-cell">`
instead. Should doesn't mean "never do it" and "prefer" doesn't mean "always do
that". Let's revisit some best practices.

CSS is not a programming language (no var, loops, functions) => CSS is
generally an unproductive use of our time. Two paths for css:

- optimize for humans (many files, easy to read)
- optimize for browsers (one long, hard to read stylsheet)

Discussion about resets for a while:

- (advantage) you are in control for all styles
- (disadvantage) you have to style *everything*

(note: normalize.css wasn't mention. A shame because it's the best of both
worlds. Oh well whatever!)

Discussion about class vs id, brings discussions about css specificity,
reminder that element < class < id < inline < !important. Nothing brand new.

CSS smell:

- avoid magic numbers
- avoid qualified selectors ('li.phone-number')
- avoid undoing your css ('h2 { text-shadow: ...}, .post h2 { text-shadow: nonw; }')
- avoid super-broad rules ('body {text-shadow: 2px ...;}' )
- prefer classes to ids
- avoid using !important to fix css
- prefer specific classnames

Object Oriented css

- remove skins from structure
- remove content from container

Should you do OOCSS? Yes if you're in a large codebase

Preprocessors. Why bother?

- variables
- nesting
- functions/mixins
- concatenation

The main difference between sass, stylus and less: underlying technology and
syntax. The speaker prefers sass. He went through variables, nesting, mixins,
@import. Nothing new if you've written scss at Yelp.  
Then inheritance through @extend, color functions, math were covered. They're a
bit less common but you can easily read the docs. A neat reminder.

Conclusion:

- be consistent
- be deliberate (do things for a reason)
- be productive (USE A PREPROCESSOR)

## Technical challenges from frontend interviews<br>★★★☆☆

**Shawn Drost, Hack Reactor**

This one was kind of a shot in a dark. I didn't know what to expect.  This talk
was actually about what frontend interviews are about. Can be interesting to
refine a set of questions.

The class taxonomy for frontend interviews

- browser concepts
- algorithms & data structures
- soft skills

### Browser concepts
Top 5 questions:

- what is a closure? why is it useful?
- what is event delegation? Bubbling?
- what is the box model
- how can you speed up page load?
- what are some values for the css position property? how do they work?

More like this: https://github.com/darcyclarke/Front-end-Developer-Interview-Questions

### Algorithm and data structures:
- 3/4 of the time, naive solution is an array and you should consider a hash
- all anagrams, all the time. Go for recursive solution, interviewers love them.
(then he talked about function, base case, step case when you call the same function)
- n-queens, break a dollar and variants
  otherwise => for[cracking the coding interview](http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X)

### Soft skills
http://www.interviewcake.com/tips-and-tricks

[Slides for this talk](https://docs.google.com/a/yelp.com/presentation/d/1PB7gOwRVr1Xiw9jS01bya9oDzdXe5tE7JpWk1KaZjmM/)

## Immersive Interaction Experiences: Pointer Events, Panning & Zooming, and Gestures<br>★★★★★
**Jacob Rossi, Microsoft**

Today we have devices with very very different form factors (TV, tablets,
stylus, etc.)  
Users want to make the user forget they're touching glass. Make them feel like
they're touching the page. It also means 60fps so that the page stays
responsive and feels "stuck" to your finger

KEEP IT SIMPLE (don't use a complex interaction models. 2 fingers swipe to open
the menu, 3 fingers swipe to search...that doesn't work)

For panning and zooming, MS has come up with a really cool, industry leading
solution and that's what's going to be explained in this talk.

### Snap Points
MS submitted a spec for snap point and snap type. Example:

<pre class="brush:css">
.snap {
  overflow-x: scoll;
  -ms-scroll-snap-points-x: snapInterval(0px, 100%);
  -ms-scroll-snap-type: mandatory;
}
</pre>

*WOW holly shit that's a native slider!* Let's use this on m.yelp.com as soon
as it's implemented in IE mobile!  
Other sample use for snap points: pull-down menus.

### Pointer Events
Pointer events now have pressure, touch size, etc...and those are properties of
the event. Sample events: `pointerdown`, `pointerup`,`pointercancel`,
`pointermove`, `pointerover`, `pointerout`, `pointerenter`, `pointerleave`.

You can be device-specific when you need it through `event.pointerType`.

`touch-action: none` is a CSS property to deactivate touch handling on an
element.  `touch-action: none` is acting as `preventDefault` would. There are
other values for `touch-action` (`pan-y`, `pan-x`, etc).

It's important because of the performance implication. If you call
`preventDefault()` the browser has no choice but to run JS to find out if it
must pan or zoom.  
With a CSS rule, things can be determined much faster.  
300ms delay in IE to disable double tap? Just one line of CSS!

Pointer events let you handle multi touch really easily through pointer IDs
(each pointer event gets an ID corresponding to the finger it matches)  
Event properties for pointer events: `width`, `height`, `pressure`, `tiltX`,
`tiltY`. AWESOME! Pointer events reached the candidate recommendation status.
It's now unprefixed in IE11.

Frameworks to enjoy pointer events now:

- [hands.js](http://handjs.codeplex.com/)
- [polymer polyfill](https://github.com/Polymer/PointerEvents)
- [Cordova/PhoneGap plugin](https://github.com/MSOpenTech/cordova-pointerevents)

### Gesture API
Pointer events give you RAW stuff. If you want more abstract info: use gesture
events. To use them here are the steps:

1. Grab an element `elem.addEventListener("MSGestureChange", fn);`
2. instantiate a gesture recognition thing `var g = new MSGesture();`
3. Assign target `g.target = elem;`
4. Profit. The gesture analyzer gives you rotation, scale, translationXY,
   velocity, angle, and all of those are deltas since last gesture event.

### Final advice for mobile

- Use hit targets that are more than 40px width and height
- Avoid hover menus
- Touch is not the same as "no mouse"
- Touch is not the same as mobile
- Use specific HTML5 input types. It's a cheap win.

## How cupcakes, Alice in Wonderland and baby elephants are moving the web forward<br>★★★☆☆

**Arno Gourdol, Adobe**

Arno manages the web team at Adobe. Talks about different medium and how they
came to be what they are. What makes the web different as a media?

- connected
- interactive
- malleable

Then haha! this presentation is actually HTML AND CSS! Woo! (heh)  
=> http://arno.org/20131023/

http://topcoat.io is a skin for webapps components (brief demo)

SVG:

- resolution independence
- fewer http request
- dom based, scriptable

Announcement: snap.svg released. Looks like sort of what jQuery is to JavaScript

From there, several demos follow, demonstrating animations in SVG. Pretty cool
demos for the most part. http://snapsvg.io

Demo:

- [National Geographic named flow examples](http://adobe-webplatform.github.io/Demo-for-National-Geographic-Forest-Giant/browser/src/)
- [Alice in Wonderland](http://adobe-webplatform.github.io/Demo-for-Alice-s-Adventures-in-Wonderland/)
- a chrome plugin that lets you edit `shape-outside` properties in CSS
- speech recognition to have voice commands
- leap motion to switch between pages

All demos are available at http://adobe.github.io

Other features coming up:

- `-webkit-mask`
- `-webkit-clip-path`
- blend modes in canvas
- blend modes in CSS

trick: use canvas as a mask for page transtions


WE DO OPENSOURCE (weeeeee): http://html.adobe.com/opensource


## Rethinking CSS Best Practices<br>★★★★★
**Renato Iwashima, Yahoo**

Talk is introducing Atomic CSS.

Grouping properties by selectors doesn't scale. When you have lots of places
using the same style you end up with something like:

<pre class="brush:css">
.class1,
.class2,
.class3 { /*some style */ }
</pre>

Other ideas: have a reusable class. But once again, when you want to reuse that
class and override, you have specificity problems.

Standard architecture for a site's CSS (page1);

- normalize
- Layout
- Reusable patterns
- Module css 1
- Module css 2
- module css 3
- etc
- page specific styles for page 1

Standard architecture for a site's CSS (page2);

- normalize
- Layout
- Reusable patterns
- Module css 1
- Module css 3
- module css 5
- etc
- page specific styles for page 2

Problems:

- Poor caching
- limited reusability of styles
- specificity wars
- maintainability

What we want instead (as an architecture for a page:

- normalize
- reusable library of atomic classes
- pages pecific styles

About semantic class names: other than microformats, class names are used for
presentational purpose or JS hooks.

Semantic example:

- `.title`...means bold? large? text?
- `.bold`, `.large` => THOSE are semantic classes for a presentational
  perspective. When you read them you can tell how they look. They carry much
  MORE meaning that `.title`

But we stop because best practices recommend to style based on content. BUT WHY?

- seo and responsive web design
- html5 spec (the spec actually says that authors are encouraged to use the
  class attribute to describe content)

BUT a number of people are suggesting that this might not be a good idea for
large scale websites. [Nicolas Gallagher](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/):
"the most reusable classnames are the ones independent of the content". Nicole
Sullivan has the same idea: "keep specificity low, abstract repeating visual
patterns".

...Here comes Atomic CSS. Naming is inspired by Zen Coding (Emmet):

<pre class="brush:css">
    .Fl-start { float: left; }
    .Fl-end { float: right; }
    .Fl-n { float: none; }
    .Mstart-10 { margin-left: 10px }
</pre>

MANAGE TEMPLATES INSTEAD OF STYLESHEETS  
There are lots of template engines and they're smarter than CSS

What should be in a CSS file? fundamental classes, helpers. That's it!

Adantages:

- reduces styles scope
- reduces stylesheet bloat
- improves perf
- removes dependencies
- allows to share content
- leverages cache by being immutable
- facilitates RTL/LTR interface switch

Use case: Media object

<pre class="brush:plain">
    <div class="media">
      <a class="pull-left"></a>
      <div class="media-body"></div>
    </div>
</pre>

But what about column layout? Is "media object" still a relevant name for that?

The Atomic CSS version:

<pre class="brush:plain">
    <div class="Bfc"> (Bfc: block formatting context)
      <div class="Fl-start"></div>
      <div class="Fl-end"></div>
    </div>
</pre>

Use case: hero unit

<pre class="brush:plain">
    <h1 class"Fz-xl Fw-b">Heading</h1>
    <p class="Fz-l Fw-200">Tagline</p>
</pre>

Is that hard? No because it has real meaning.

*CSS bloat vs. HTML bloat, aren't you just shifting complexity?*  
Well, data needs to live somewhere  
Besides, look at `.wrapper` vs `.bfc` (semantic names are longer than ACSS ones) and those
compress better (good GZIP compression because of repetition)

*Aren't you just inventing inline styles again?*  
inline styles have a HUGE specificity and are verbose. Not ACSS. They have
abstractions, they take care of cross-browser problems.

*Performance?*  
Numbers are really nice. They got down to a 18kb super reusable package
containing all the presentational classnames. http://my.yahoo.com has only 3kb
of page specific CSS.

http://bit.ly/atomiccss


## Always bet on JS, convergence of operating system and browser<br>★★★★★
**Nick Desaulniers, Mozilla**

Nick is an "OpenSource zealot". He led protests in SF. OPEN SOURCE PROTESTS.
Talk is about convergence of OS and browser and how HTML5/JS/CSS should win.

Users shouldn't care about "native vs web" because the limit is not clear
anymore: webOS, firefoxOS, Tizen, and many others are blurring the line.

Web's number one advantage is **portability**  
*"but native apps have better access to hardware!"*  
=> this should be fixed. Let's file bugs against browsers. Mozilla has been
adding a lot of APIs to access native hardware. You shouldn't have to rely on
apache cordova to do that.

open webapps (demo installing that on windows, osx, android. wow.)
[more on JITs](http://nickdesaulniers.github.io/blog/2013/04/03/basic-jit/)
(Nick's blog)

A plan for html5 to become the king of the jungle:

- more device apis
- consistent perf improvements
- rocking developer tools
- partnering with carrieres and handset manufactureres
- target growing markets

slid.es/nickdesaulniers/jsos

## React: Rethinking best practices<br>★★★★★
**Pete Hunt, Facebook**

Pretty cool talk on how reactJS is built. It explained the philosophy behind it:

- use JS to express components
- reuse components when building components

ReactJS is at the core of what FB uses. Seems pretty slick.

The main interesting thing to me is their use of a **virtual DOM**. That lets
them virtually update and read from the DOM without actually ever touching it.
That means you can batch updates to the DOM but also batch reads and do all
sorts of crazy optimizations. For instance they diff the virtual DOM against
the real one. Reusing elements becomes super easy.

Interesting part: everything done with virtual DOM does not need to touch the
DOM, which means it can be moved to a separate process by using webworkers.

http://reactjs.org

## Browser Dance Party<br>★★★★☆
**Jordan Santell, Mozilla**

Analyzer node to get data about frequency and time domain.

<pre class="brush:js">
    var a = ctx.createAnalyser();
    a.fftSize = 512;
    var freq = new Uint8Array(256);
    setInterval(function() {
      a.getBytFrequencyData(freq);
    }, 20);
</pre>

Downside: `setInterval` has no knowledge of audio. Instead:

<pre class="brush:js">
    var BUFFER_SIZE = 2048;
    var p = ctx.createScriptProcessor(BUFFER_SIZE);
    a.fftSize = 1024;
    var fft = new Uint8Array(256);
    p.onaudioprocess = function() { a.getByteFrequency...}
</pre>

Beat detection  
beat = drastic changes in sound energy

1st algorithm:  
average magnitude. When it goes over a certain threshold, that's a beat. Very simple.
Depending on the type of music you're trying 

## Image Layout Algorithms<br>★★★★☆
**Christopher Chedeau, Facebook**

No doc on images layout algorithms, did some research on the topic.

### Fixed Grid Layouts
- square grid => from windows 3.1 to ios7. This is super duper easy.
- contain grid => shrink to fit inside, which results in whitespace if you have
  mixed aspect ratios. Whitespace is bad in general. You want to use as much
  space to show photos
- cover grid => shrink to cover, which means you crop some pictures.

`background-size: contain/cover` already exists in CSS and can do that for you!

### Less Boring Grids
500px demo. Where images sometimes take 1 grid items, sometimes 2, etc. Leads
to more iteresting photo page.

Technique: get a canvas (4x2) and some shapes. You then fill canvas with shapes.

Demo with click to enlarge/minimize

How it works: maintain 2 pointers with the first position available for a 2x2 square and 1x1 square.
Not clear what the win is?

### Cropping Algorithm?
Problem with cropping is that you have to find the best crop. Cropping
algorithms are a waste of time. Crop less. Crop square. That's the less risky
thing to do.


### Adaptive Grids

#### organize by colums
**Means landscape will be smaller than portrait**. Example: 9gag.

Algorithm for this: fill smallest column
expand to two column if two columns are the same height. In reality, 2 columns being exactly the same height is really low. Instead, use a coarse grid (if columns are more or less the same height, up to 10px different). Coarse grid means that you have to crop up to 10px

#### organize by rows
**Means portrait images will be smaller than landscape**. Example: Flickr.

Laying out by rows can be considered the same as laying out for text. Turns out
LaTeX has a super cool algorithm for that.

### Irregular Layouts
Aspect ratio of √2. If you devide a √2 ratio image in 2, you get 2 √2 ratio pics. You can exploit that to get cool effects.

### Holy Grail
Kristy Mannix Photography (manual layout)
Google search results (not clear what they do but it's good)

### Images layout Analysis
- Grid, colums, row, irregular
- crop?
- resize, whitespace
- human intervention?
- sizes?
- order is conserved?
- does it maximizes bigger?
- can you insert/remove/move images?

http://blog.vjeux.com/category/image

## PDF JS<br>★★★★☆
**Brendan Dahl, Mozilla**

### PDF format history
- camelot (1991) => pdf (1993)
- PDF got lots of features over the years (3d modeling!!, video, audio, flash, javascript!)
- PDF became a standard in 2008

### What's in a PDF?
<pre class="brush:plain">
    %PDF-1.7 << Header
    2 0 obj
    <<
       /Type /Pages
    >>
    xref tables
    ...trailer
</pre>

- dictionaries in PDF `<< /Length 44 >>`
- strings in PDF `(Hello World!)`
- etc...syntax is all weird. Seriously!

### Why pdf.js?
- security (Adobe has had lots of problems with that in the past)
- user experience (no Adobe updates prompts)
- performance (for small PDFs, not firing up a third party tool is better)

### Rendering a PDF
- grab the bytes (via xhr2)
- parsing, extracting
- render on canvas

Problems:

- PDF supports an awful lot of  image types
- PDF supports an awful lot of  fonts
- PDF has colorspaces (cmyk space for instance)
- PDF has PostScript functions

### About pdf.js
Text is really hard (glyphs,copy paste, unicode, left-to-right vs right-to-left)

Text selection is achieved through a transparent overlay on top of canvas

Solution do janky scrolling: webworkers and `setTimeout` to let the browser do
its thing, priorize rendering, etc.

Timeline:

- april 2012 => pdfjs landed in nightly
- january 2013 => ion monkey (new js engine)
- february 2013 => pdfjs makes it to firefix stable

Improvements since first launch:

- range request loading (don't download all the things at once)
- incremental rendering (sending chunks of 100 operations at once)
- supports the majority of common PDF features
- renders many PDFs quickly
- works in FFx, Chrome, IE9+, Opera

Still no support for forms and JS, working on that.

### Lessons learned:
- plan for asynchronous operations
- do as much as possible in workers
- unit tests. write some. early. they're always a good idea.
- program defensively

http://github.com/mozilla/pdf.js


## Talks I Could Not Attend
The format of the conference (13 parallel tracks!) made some sessions very
busy, to a point where not everyone could fit in the room (nope, not even
space to sit in the alley or stand in the back). I'll have to watch later:

- *New rules for JavaScript*, Kyle Simpson
- *Which way is forward*, Doug Crockford
