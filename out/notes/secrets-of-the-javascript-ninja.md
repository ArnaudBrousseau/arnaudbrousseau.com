## What Is This Book? Who Is It For?
[Secrets Of The JavaScript Ninja](http://www.manning.com/resig/) is designed
for intermediate to advanced JavaScript programmers. It expects you to have a
firm understanding of JavaScript and a working knowledge of HTML/CSS.  
The strength of this book lies in its ability to force you to
revisit concepts most JS programmers (including myself) always take for
granted. It puts the focus on functions as objects, function invoking, closures,
cross-browsers strategies, etc.

Resig sets the tone pretty early on. After a short introduction in a chapter
titled "Arming With Testing And Debugging" he tells us about the importance of
testing and goes on to explain how one can create a simple JavaScript
`assert` method and its associated test runner. Testing is usually briefly
mentioned towards the end of a textbook. Not this time. Testing is mentioned
throughout the book.

So why am I writing about reading "Secrets of the JavaScript Ninja"?
Several reasons:

1. Writing about something helps you remember it better
2. I'm adding some reference and extra information here and there.
3. Hopefully this is useful to you, the reader, to a) get a sense of what's in
   this book and b) get better at JavaScript!

The remainder of this article is organized in sections, matching roughly the
order of the book's chapters. In each of those sections I go through what
picked my interest while reading the book, with a focus on concepts that
"clicked" and interesting discoveries.

## Functions
Created via the `Function` constructor, functions are special objects with
one superpower: they can be **invoked**. Besides that, functions are object and
nothing but objects:

- they're created via literals `function <optionalName> (<optionalArguments) {<functionBody>}`
- they can be assigned to variables or properties
- they can be passed as function parameters and returned as function results
- they can have properties and methods. For instance each function has a `name`
  property and a `call` and `apply` method. More on that later.

### Function Declaration
Two main ways to declare a function:

<pre class="brush: js">
    // option 1
    function blah() { console.log('called'); }
    // option 2
    var blah = function() { console.log('called'); };
</pre>

In both cases the function can be called via `blah()` after its declaration.
However there's a crucial difference: in the first case the function is
**named** `blah` which means the function will be assigned a property `name`
with the value `blah`.  
In the second case, we're assigning an **anonymous** function to the variable
`blah`. The function's `name` property in this case will be `''`.

### Arguments and Invocation
`this` and `arguments` are implicit parameters passed to every function. They
are just that. Parameters. The difference between `this`, `arguments` and
standard function parameters is that they are *implicit*. You won't see them in
 function signatures but they'll be available from within function bodies.

#### Arguments
`arguments` represent a list of all arguments passed to a function. It has
array-like accessors (`arguments[i]`) and properties (`arguments.length`) but
**is not an array** (`arguments.slice(1)` fails for instance).  
How can you get around that?

<pre class="brush: js;">
    Object.prototype.toString.call
    Array.prototype.slice.call
    //...etc
</pre>

#### Invoking a Function, and `this`
`this` is defined as the **function context**. Available within a function body,
`this` should really be referred to as  **invocation context**, because its value
varies based on the way a function is invoked:

- as a function, `this` refers to the global context `window`
- as a method, `this` refers to the object owning it
- as a constructor, `this` refers to the newly created object
- via `call` or `apply`, `this` is passed in and can be what we want

### Referencing Functions
Referencing functions from within themselves is necessary to achieve recursion.
Resig enumerates four ways.

First option: through a named function. Nothing out of the ordinary.

<pre class="brush: js; highlight: [1,3]">
    function fact(x) {
        if (x !== 1) {
            return x * fact(x - 1);
        } else {
            return 1;
        }
    };
</pre>

Second option: through a method name. Note the danger: if we decide to change
that method's name to `newfact`, we'll have to remember to change the inner
reference to `this.newfact`.

<pre class="brush: js; highlight: [2,4]">
    var math = {
        'fact': function (x) {
            if (x !== 1) {
                return x * this.fact(x - 1);
            } else {
                return 1;
            }
        }
    };
</pre>

Third option: through inline name. This addresses the shortcoming of the
previous solution.

<pre class="brush: js; highlight: [2,4]">
    var math = {
        'fact': function myfact(x) {
            if (x !== 1) {
                return x * myfact(x - 1);
            } else {
                return 1;
            }
        }
    };
</pre>

Last option: `callee` (going to go away in later versions of JS, use sparingly).

<pre class="brush: js; highlight: [2,4]">
    var math = {
        'fact': function (x) {
            if (x !== 1) {
                return x * arguments.callee(x - 1);
            } else {
                return 1;
            }
        }
    };
</pre>

### Auto-Memoizing Functions
Memoizing by using the object nature of functions:

<pre class="brush: js">
    function getElements(name) {
        if (!getElements.cache) { getElements.cache = {}; }
        return getElements.cache[name] =
            getElements.cache[name] ||
            document.getElementsByTagName(name);
    };
</pre>

You can easily guess how useful these techniques are in a library like
jQuery (actually probably more in Sizzle, jQuery's DOM access library).

### Function Overloading
Functions have a `length` property, which corresponds to the number of
arguments declared in their signature. By comparing `fn.length` and
`arguments.length`, function overloading can be implemented in a cool way:

<pre class="brush: js">
    function addMethod(object, name, fn) {
        var old = object[name];
        object[name] = function() {
            if (fn.length == arguments.length) {
                return fn.apply(this, arguments);
            } else if (typeof old === 'function') {
            return old.apply(this, arguments);
            }
        };
    };

    // Overloading then becomes a piece of cake. Pretty neat right?
    var obj = {};
    addMethod(obj, 'method', function() { /* do something */ });
    addMethod(obj, 'method', function(a) { /* do something with a */ });
    addMethod(obj, 'method', function(a, b) { /* do something with a and b */ });
</pre>

## Closures
Closures are probably one of the most confusing concepts when someone with a
classical object-oriented background comes to JavaScript.

Resig's definition of it: *"closures allow a function to access all the
variables, as well as other functions, that are in scope when the function
itself is declared."*

Later in the chapter: *"That's what closures are all about. They create a
'safety bubble,' if you will, of the function and the variables that are in
scope at the point of the function's declaration [...] This 'bubble,'
containing the function and its variables, stays around as long as the function
itself does."*

Let's look at some code samples to go over the main use cases for closures.

### Private Variables
<pre class="brush: js">
    function Counter() {
        var count = 0; // visibility limited to Counter's inner scope
        this.increment = function() { count++; }
        this.getCount = function() { return count; }
    };
    // Can't view/modify count from here. You have to go through Counter.getCount()
</pre>

### Callbacks And Timers
Callback and timers are in the same vain because the idea here is to use a
closure to host values that the function scheduled to be called back is going
to need when executing. Understanding that a closure's environment (function,
variables) stays around even when the outer scope has finished its execution is
fundamental.

<pre class="brush: js">
    /**
     * Callback
     */
    var elem = document.getElementById('my-elem');
    $.ajax({
        url: '/my-endpoint',
        success: function() {
            // Here we have access to elem because our outer anonymous
            // function had access to it when it was declared.
            elem.innerHTML('callback executed successfully');
        }
    });

    /**
     * Timer
     */
     function count() {
        var count = 0;
        setInterval(function() {
            // Here we have access to count for the same reason: our outer
            // anonymous function has access to it when it is declared.
            console.log('Count is ' + count);
            count++;
        }, 1000);
     };
</pre>


### Binding Function Contexts
Here closures are used to set the context of functions properly.

<pre class="brush: js">
    // Simple example
    function bind(context, name) {
        return function() {
            // Access to context and name via closure
            return context[name].apply(context, arguments);
        };
    };

    // Example from PrototypeJS
    Function.prototype.bind = function() {
        var fn = this;
        // Turn arguments into a real array
        var args = Array.prototype.slice.call(arguments);
        var ctx = args.shift(); // args is now args[1:n] and object refers
                                // to the first argument
        return function() {
            return fn.apply(
                ctx,
                // `args` refers to the arguments specified at "bind-time"
                // and `arguments` refers to the arguments specified at
                // "call-time".
                // This lets us specify "default" arguments and bind function
                // context at the same time.
                args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    // Sample usage
    var nameSpace = { a: 1, plop: function(b, c) { return this.a + b + c; } }
    var basicBound = basicBind(nameSpace, "plop");
    var bound = nameSpace.plop.bind(nameSpace, 2);
    basicBound(3, 5) // returns 9 (1 + 3 + 5)
    bound(3); // returns 6 (1 + 2 + 3)
</pre>


### Partial Function Application, Currying
Currying and partials are super simple if you understand `bind`'s definition
above. It's essentially the same trick.

<pre class="brush: js">
    Function.prototype.curry = function() {
        var fn = this;
        var args = Array.prototype.slice.call(arguments); // "curry-time" args

        return function() {
            return fn.apply(
                // unmodified context
                this,
                // concatenation of "curry-time" and "call-time" args, in this order
                args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    Function.prototype.partial = function() {
        var fn = this;
        var args = Array.prototype.slice.call(arguments);

        return function() {
            // Here the args manipulation is a bit more tricky since you can
            // leave an undefined param for partial application later on.
            // (see sample usage)
            var arg = 0;
            for (var i=0; i < args.length && arg < arguments.length; i++) {
                if (args[i] === undefined) {
                    args[i] = arguments[arg];
                    arg++;
                }
            }
            return fn.apply(this, args);
        };
    };

    // Sample usage
    var myFunction = function(a, b, c) { return a + b + c; };
    var curried = myFunction.curry(1, 2);
    var partial = myFunction.partial(undefined, 2);
    curried(3); // 6
    partial(1, 4); // 7
</pre>

### Function Wrapping
<pre class="brush: js">
    function wrap(object, method, wrapper) {
        // Keeps a reference to the original method
        var fn = object[method];

        return object[method] = function() {
            // The wrapper is called with
            // - the original function to be wrapped, as a first argument
            // - the list of arguments to call the original function with
            return wrapper.apply(this, [fn.bind(this)].concat(
                Array.prototype.slice.call(arguments)));
        };
    };

    // Sample usage: automatically adds try/catch on event listeners
    wrap(HTMLElement.prototype, "addEventListener", function(old, type, handler, prop) {
        old(type, function() {
            try {
                handler.apply(this, arguments);
            } catch(e) {
                // Handle error
            }
        }, prop);
    };
</pre>

### Immediate Functions
Closures are also crucial in IIFEs (*Immediately Invoked Function Expression*).
Have you always wonder why `(function() {})()` works the way it does? Well:

<pre class="brush: js">
    // an IIFE like...
    (function() {/* body */})()
    // ...is EXACTLY the same as...
    var myFunc = function() {/* body */};
    (myFunc)();
</pre>

This is clever because it means the body of our IIFE is going to:

- execute immediately after its declaration
- have a reference to the outside scope through the closure it creates
- keep all its variables and inner functions isolated and hidden from outside

Hence IIFEs are a nice way to create isolated scopes for independent pieces of
functionality. It guarantees no conflict with and no leakage to the outside
world. That's why most libraries, including jQuery, are wrapped in a IIFE.

Note that you can pass params to an IIFE:  
`(function(a, b) {return a + b;})(1, 2)`

## Prototypes
JavaScript Prototypes represent a hard-to-grasp concept because most of us
think about it with the classical object oriented background in the back of our
minds.

In a few sentences Resig made me realize how wrong I've been thinking
about prototypes: *"prototypes are a convenient way to define types of objets,
but they're actually a feature of functions"*.

And later: "*each object in JavaScript has an implicit property named
`constructor` that references the constructor [function] that was used to
create the object. And because the prototype is a property of the constructor
[function], each object has a way to find its prototype.*"  
Note that I appended *[function]* to make you realize that constructors are not
a special feature of the language. In fact, **a "constructor" is just a
function invoked in a given way** (using `new`).

Remember what we discussed before:

- functions are just objects with the privilege of being **invoked**
- invoking a function with `new` will call it with a context set to an empty
  object. That object will be returned when the function is done executing.

References in objects are resolved on the object itself first. However when a
property fails to be found on the object itself, a property lookup is made **on
the object contructor's `prototype` property**. And you guessed already: if an
object constructor's `prototype` references an object, lookup can be performed
on that object constructor's `prototype`. And so on and so forth. That's what
**prototype chain lookup** means.

Take the following snippet:

<pre class="brush: js">
    function A() { this.foo = 'bar'; }
    var a = new A();
    A.prototype.baz = 'blah';

    console.log(a.baz); // logs 'blah'
</pre>

What happens in this snippet? A lot!

- a function `A` is defined on line 1
- `A` is invoked with `new` on line 2. That means `A` is called with an
  empty object (let's call it `o`) as its context
- `o` is given a `foo` property with a value `'bar'` (we wrote that ourselves)
- `o` is given a `constructor` property. The value is a reference to
  function `A` (that's automatically handled for us)
- `o` is returned (automatically handled for us) and referenced through a variable `a`
- on line 3 we define a `baz` property on `A`'s `prototype` property
- on line 4 here are the steps to access `baz` property via `a.baz`:
  - `a` points to an anonymous object `o`, which does not have a `baz` property
  - `o` has a `constructor` property which points to `A`
  - `A` has a `prototype` property which points to an anonymous object `o2`
  - `o2` has a `baz` property which points to the string `'blah'`

### Type Introspection
There are 3 ways to instrospect into an object's "type":

- `typeof object === typeStr`. Limitation: `typeStr` is limited to strings
  representing built-in types like `'function'`, `'object'`, `'number'`,
  `'string'`, etc
- `object instanceof ConstructorFunction`. Limitation: you need a reference to
  `ConstructorFunction` and it's not guaranteed that `ConstructorFunction`
  was used to instantiate `object`. It could be higher up in the prototype
  chain.
- `object.constructor === ConstructorFunction`. That's the most robust way to
  check where an object comes from. This necessitates a reference to
  `ConstructorFunction`.

### Achieving Inheritance With Prototypes
Achieving inheritance in JavaScript is as simple as using the prototype chain
lookup to our advantage so that "inherited" properties will be resolved
correctly, thus extending an object's capabilities.

<pre class="brush: js">
    function B() {
        this.dataB = function() {...};
    };
    B.prototype.functionB = function() {...};

    function A() {
        this.functionA = function() {...};
    };
    A.prototype = new B();

    var a = new A();

    a.functionA(); // ok
    a.functionB(); // ok!
    a instanceof A; // ok
    a instanceof B; // ok!
</pre>

Let's go through what happens when we call `a.functionB()`:

- `a` refers to an object (returned from `new A()`)
- that object doesn't have a `functionB` property
- that object does have a `constructor` property, pointing to `A`
- `A` has a `prototype` property, pointing to an object (returned from `new B()`)
- that object does not have a `functionB` property
- that object does have a `constructor` property, pointing to `B`
- `B` has a `prototype` property, pointing to an object
- that object has a `functionB` property. BINGO!

Here's the complete reference chain:  
`a`->`(new A())`->`constructor`->`A`->`prototype`  
->`(new B())`->`constructor`->`B`->`prototype`->`functionB`

### Gotchas And Tricks
Prototypes come with lots of bold warnings, the first of which is: be extra
careful when modifying/extending native objects' prototypes!  
There is only one `Array.prototype` for a whole page. Be aware that modifying
it is similar to modifying a global variable. Actually it's probably worse
because a lot of places are using `Array.prototype` in non-explicit ways.

In most browsers you can access native DOM element prototype and play with it:

<pre class="brush: js">
    HTMLElement.prototype.addEventListener = function(type, fn, useProp) {
        console.log('trooooooll!'); // don't do that, seriously!
    };
</pre>

Second gotcha: use `hasOwnProperty` to loop through object's properties.  
Otherwise you'll loop through non-instance properties:

<pre class="brush: js">
    Object.prototype.foo = 42;
    var obj = {a: 1, b: 2};

    for (var i in obj) { console.log(i); } 
    //-> logs 'a', 'b' *and 'foo'*

    for (var i in obj) { if (obj.hasOwnProperty(i)) { console.log(i); } }
    //-> logs 'a' and 'b'
</pre>


Trick to ensure a function is always invoked as a constructor:

<pre class="brush: js">
    function A() {
        if (!(this instanceof arguments.callee)) {
            return new A();
        }
        this.foo = 'bar';
    };
</pre>

## Timers
JavaScript is _single-threaded_. That's really important to understand. Once
you grasp the fact that the browser has no choice but to queue handlers when
events are firing at the same time, understanding why timers cannot be reliable
is easy.

Browser APIs are well known: `window.setTimeout` and `window.setInterval` to
create timers, `window.clearTimeout` and `window.clearInterval` to clear them.

Nifty trick for all browsers and IE > 9: timer functions can take arguments!
Like so:  
`window.setInterval(myfunction, 100, arg1, arg2)`

Important note! There's a difference between:

<pre class="brush: js">
    # Executes `fn` every 10ms by calling setInterval once
    window.setInterval(fn, 10);
</pre>

and:

<pre class="brush: js">
    # Executes `fn` every 10ms by calling setTimeout over and over
    window.setTimeout(function fn() {
        window.setTimeout(fn, 10)
    }, 10);
</pre>

Second version is guaranteed to run every 10ms or more.  
First version will try to execute every 10ms regardless of what happened before.

Cutting expensive computation into manageable chunks is an interesting
application of timers. Instead of doing a 100% of the work in a big chunk you
can choose to schedule manageable chunk via `setTimeout` thus enabling the
browser to do some work after each chunk finishes and before the next one
begins. Say a click event happens during a computation: the browser would get
a chance to execute the associated handler right after the current chunk is
done as opposed to waiting until the end of the whole computation.

Timers are also super useful to build asynchronous test suites and centralized
timers.  
The idea is to have a single timer handling a queue (of tests to run or of
animations/functions to execute) so that the browser is not overwhelmed by
multiple timers. This centralized timer technique guarantees order of
execution. That's a perk we don't get when we use multiple native timers.

## Cross Browser Strategies
Authoring cross-browser JavaScript is hard. Resig names 5 major concerns:

- Browser bugs
- Browser bug fixes
- Missing browser features
- External code
- Browser regressions

Some strategies/advices to deal with browser bugs/differences:

- encapsulate your code into its own closure/unit, expose it as little as possible
- degrade gracefully when features aren't available and/or bugs arise
- "Safe cross-browser fixes": no feature detection, no side effects. Example:
  ignoring negative width/height value: `if ((key == 'width' || key ==
  'height') && parseFloat(value) < 0) { value = undefined; }`. This makes the
  buggy browser's API comply with the standard. It's a Good Thing ®
- "Object detection": feature detection by inspecting a property/value of an
  object. Example: bind event with W3C's `addEventListener` vs Microsoft's
  `attachEvent`.
- "Feature simulation": create and execute a reduced test case to isolate the
  buggy behavior. That creates a toggle to work around the bug in our code.
  Very often that feature simulation is executed once at load time to minimize
  performance impact.

Interestingly enough Resig gives a list of "untestable" browser issues:

- Event handler bindings (no way to determine if a handler has been bound or not)
- Event firing (no way to check if an event has been or will fire)
- CSS property effects (does it affect appearance)
- Browser crashes (if a feature makes the browser crash, feature simulation will too)
- API performance (prohibitively expensive to test)
- AJAX issues (tricky and expensive to test)

## DOM Attributes and Properties
There is an incredible amount of quirks involved in getting/setting DOM
attributes and properties. Ways to get properties/attributes of DOM nodes:

- `elem.propertyName`
- `elem.getAttribute('attributeName')`
- `elem.getAttributeNode('attributeName').nodeValue` (recommanded way to get
  the unaltered value)

Note that attribute and property names aren't always the same. For instance
`class` is a valid attribute name but the associated property is `className`
The other ones are `for`, `readonly`, `maxlength`, `cellspacing`, `rowspan`,
`colspan`, `tabindex` which match respectively to the property names `htmlFor`,
`readOnly`, `maxLength`, `cellSpacing`, `rowSpan`, `colSpan`, `tabIndex`.)

Major quirks pointed out:

- Form input's `id`/`name` attributes are transferred on the form DOM node as
  properties.  For instance if you have an input element with an `id`/`name`
  attribute set to `foo`, `myForm.foo` will yield a reference this input.  Now
  let's say you have an input with its `name`/`id` attribute set to `action`.
  See the problem? Form element's original `action` property will be lost :/
- `href`, `src` or `action` perform URL normalization (you get a full canonical
  URL when you might expect a relative URL)
- input `type` attribute can't be changed after DOM node is inserted (IE only)
- more problems around the `style` attribute: measuring `width` and `height`,
  getting color, opacity or pixel measures. One interesting API:
  `getComputedStyle` (or IE's `currentStyle`). It gives you the active CSS
  property/value pairs for an element.

## Understanding Event Propagation
The order in which events are triggered throughout the DOM tree is not
consistent across browsers.

Netscape implements event propagation "outside-in". An event propagates
from the root of the DOM tree all the way through its target (a button on which
you clicked for instance). This event propagation model is referred to as
**capturing**.

IE implements it in the exact opposite way: "inside-out". An event
propagates from the target element up to the DOM tree's root. This event
propagation model is referred to as **bubbling**

When the W3C had to choose, they didn't. Instead W3C's model lets you register
handlers for capturing or bubbling phase.  
Concretely, compliant browsers will do the following when an event is triggered:

1. start at DOM tree's root node. See if there are handlers set for **capturing phase** for our event type. If yes, call them.
2. go down one level in the tree, do the same (check and call potential handlers set for capturing)
3. go down one more level, do the same
4. ...etc... (do the same and go down until we reach our event's target)
5. on the event's target (i.e.,the button we clicked) check and call potential handlers set for capturing
6. on the event's target, see if there are handlers set for **bubbling phase** for out event type. If yes, call them.
7. go up one level in the tree, do the same (check and call potential handlers set for bubbling)
8. go up one more level, do the same
9. ...etc... (do the same and go up until we reach the DOM tree's root)
10. on DOM tree's root node, check and call potential handlers set for bubbling

The standard API `elem.addEventListener(type, handler, useCapture)` has 3
params. First one is the type of event to listen to ('click', 'focus', etc),
second is the handler we want to trigger when the type of event we're listening
to happens. The third parameter `useCapture` is the propagation phase we're interested in.

- if set to `false`, your handler will be called during the bubbling phase (step 6 through 10)
- if set to `true`, your handler will be called during the capturing phase (step 1 through 5)
- `useCapture` defaults to `false`

Another important thing to consider: browsers have hooks to stop event
propagation at any point. Inside a handler, `e.stopPropagation()` and
`e.cancelBubble = true;` (in IE) will do just that.

That was a lengthy explanation but I think it describes what happens fairly
accurately. I hope that it will help you understand a few things. Namely:

- `addEventListener('click', handler, false)` will have consistent behavior in
  IE and modern browsers out-of-the-box (remember, IE's model only supports
  bubbling phase). **That's why jQuery won't let you set register handlers for
  capturing phase**. Letting you doing do wouldn't be cross-browser compatible.
  jQuery supports bubbling in a cross browser fashion by emulating bubbling. In
  browsers that don't support it, the library manually walks the DOM tree up to
  call registered handlers. That's also how jQuery goes about supporting custom
  events (`someJqueryElem.bind('my-custom-event', handler)`).
- `document.addEventListener(type, handler)` is a catch-all that will run
  **after** every handler for this type in the path Root-Target has executed.
- `document.addEventListener(type, handler, true)` is a catch-all that will run
  **before** every handler for this type of event in the path Root-Target
  executes.
- use `stopPropagation` and `cancelBubble = true` with **extreme caution**.
  When you do that you're effectively preventing other handlers scheduled
  to run after you from doing so.
- when registering multiple handlers on the same element for the same event
  type, order **is not guaranteed**.

A good page to help you understand that if the explanation above didn't stick:
[Quirksmode On Events](http://www.quirksmode.org/js/events_order.html)

## jQuery's Event System
At its core jQuery's event system doesn't rely much on the browser to work.
There are so many quirks that jQuery had to came up with a solution to
implement event binding, unbinding and triggering in a consistent manner.  
Key ideas:

- the only handler actually registered by jQuery is a dispatcher. There is one
  dispatcher per event type.
- to keep track of individual handlers, each DOM element is given a `data`
  property. Concretely it's a mapping of event type to an array of handler for
  that type.
- a dispatcher is responsible for looking at a DOM's data store and calling
  handlers if it finds handlers registered for its type (remember, there is one
  dispatcher per event type).
- thus registering/unregistering a handler becomes equivalent to "add/remove a
  function to a DOM's data store"

This is really clever because it enables inventory of handlers at any point in
time and programmatic triggering of registered handler.

If you're interested in the nitty-gritty details head to [jQuery's
source](https://github.com/jquery/jquery/blob/master/src/event.js)

## Concept Of Event Delegation
jQuery's `.delegate(type, selector, handler)` (or `.on(type, selector,
handler)` in later versions) seems really magic if you don't understand
the concept of event delegation.

To put it in simple terms: **event delegation is the process of registering a
handler high up in the DOM tree to handle events happening at lower levels.**  
Event delegation is made possible by 2 things:

- event bubbling
- ability to inspect event object's `target` property in handlers

Concretely, instead of just doing some work, a delegated handler will **check
the target first** and **then** do some work:

<pre class="brush: js">
    var doWork = function() { console.log('did some work'); }
    var button = document.findElementsByClassName('a-button')[0];

    // NON-DELEGATED version (the handler is bound directly)
    button.addEventListener('click', doWork, false); // use bubbling

    // DELEGATED version (we're checking the target first)
    document.addEventListener('click', function(e) {
        if (e.target.className === 'a-button') { // <== "Target check"
            doWork();
        }
    }, false); // use bubbling too
</pre>

The delegated version above has several advantages:

- a button with class 'a-button' can be inserted in the DOM **after** we
  perform event binding. It's crucial if you're inserting content after an XHR
  request for instance
- multiple buttons with a class 'a-button' could be on the page, things will
  just work. This is awesome if you have behavior that you want to attach to a
  big number of elements. Say you want to have JS behavior for all cells of a
  HUGE table. Instead of looping through all the elements to bind a handler to
  each and every one of those cells you can use delegation to bind a single
  handler to a common container (the containing `<table>` element for instance)
- hey we're not bound to just buttons anymore! Every element on page that
  satisfies our target check gets to trigger `doWork` when clicked on.

Of course jQuery is more sophisticated and lets you delegate your handler on a
container by specifying a *jQuery selector*. Under the hoods jQuery will check
if the event target matches this jQuery selector. If it does your handler will
be called.

## DOM Manipulation
DOM manipulations are expensive. Libraries such as jQuery do a very good job of
thinking about performance which is why relying on an abstraction to manipulate
the DOM makes sense (manipulating the DOM yourself would most likely result in
your app being slow and leaking memory). For instance you're very unlikely to
use methods such as `createDocumentFragment` if you're authoring a one-off DOM
manipulation.

Steps to implement DOM insertion correctly:

- *Parse the string into a HTML string*: no surprise there, pretty much What you
  would expect: regular expression, yadda, yadda, yadda.
- *Create HTML nodes from the HTML string*: that step has to go around the fact
  that certain elements have to be created within a specific element in order
  to be inserted in the DOM successfully. For instance, `<td>` must be withing
  a `<tr>`, which must be within a `<tbody>` which must be withing a `<table>`.
  To go around those restrictions, the HTML string is wrapped before insertion,
  elements are inserted in an empty div (using `innerHTML`), and used from there.
- *Insert those nodes into the document*: straightforward, except for the fact
  that you have to deal with inline scripts potentially contained in the
  collection of DOM nodes you're about to insert in the page. Workaround is to
  delete `<script>` nodes from the inserted nodes and execute them
  individually by inserting and removing them immediately after the `<head>`
  tag.

*Removing* elements is tricky because you have to be careful to remove the
associated handlers not to create memory leaks.  
Cloning elements is difficult in IE because IE copies not only the DOM node
but also event handlers (heh.)  

## Conclusion?
If you found this article useful I highly recommend the full book,
[Secrets Of The JavaScript Ninja](http://www.manning.com/resig/). I personally
found the book super useful and illuminating in a lot of ways.

It's good to be able to read about "real-world" JavaScript, including about
browser quirks, language pitfalls and testing.
