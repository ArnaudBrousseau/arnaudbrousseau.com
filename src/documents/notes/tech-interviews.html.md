---
title: "The Full Stack Tech Interview"
date: 2018-07-15
layout: "note"
activeNavItem: "notes"
---
Full-stack interviews are hard. I do a lot of interviewing at Yelp and I firmly
believe that there is a disconnect or misunderstanding happening.

Candidates (especially fresh graduates) expect to be grilled on fundamental computer
science questions. I, on the other hand, am looking for my next colleague. Sure
it's nice to talk about linked list and binary tree traversals but it's only a
small portion of what software engineers talk about on the job.

This post lists the topics that are relevant to software engineering based on
what I've experienced at Yelp (and yes, this includes CS fundamentals!). This should hopefully convince you that:

* this list is way too long, both for the candidate (how can you expect them to
  learn ALL of this?) and the interviewer (how can you expect to probe on all
  these topics?)
* it's silly to grill candidates on CS fundamentals over and over since it
  represents such a small subset of what's relevant day-to-day

Towards the end I'll close with some thoughts on culture fit and "soft"
questions that you can use to gauge a candidate on whether they are likely to
be a fit for your team (you can also use this to prepare yourself before
interviewing!)

Let's start with the big list, roughly organized from backend to frontend.

# Unix

For an awesome rundown of what linux is like under the covers, see [Linux
Insides](https://www.gitbook.com/book/0xax/linux-insides/details)

## Common directories

If you work in a Linux-based environment, having intuition on
what goes where generally speaking is a big productivity boost.

<pre class="brush:plain">
    /
      /bin
      /boot
      /dev
      /etc
      /home
      /lib
      /media
      /mnt
      /opt
      /proc
      /root
      /sbin
      /sys
      /tmp
      /unix
      /usr
        /include
        /lib
        /libexec
        /local
        /share
      /var
        /log
        /mail
        /spool
        /tmp
</pre>

## Process vs Threads

In Unix:

* Threads and processes are created by `fork` and `clone`, respectively. Both map to `do_fork` internally.
* Processes do not share memory. `fork` guarantees memory safety. Memory is still copied efficiently with copy-on-write semantics
* Threads are processes sharing memory with the other threads in their group
* Each thread has a pid and a "tgid" -- thread group ID. tgid and pid are the same for processes. Not necessarily for threads.
* To get the thread group ID: getpid (GetProcessID)
* To get the thread ID: gettid (GetThreadID)

One way to think about the difference between threads and processes: when
`fork()` is called the resulting "thread" (really a process!) gets a new tgid
and pid. When `clone()` is called the resulting thread gets a new ID, aka thread
ID (to let the scheduler run it independently), but keeps the same pid.

Note: `getpid` returns the tgid, which is why `getpid` called in different
threads within the same process will return the same result.

## File descriptors
File descriptors of processes:

* 0 stdin
* 1 stdout
* 2 stderr

## Daemons
Daemons are processes running in the background.
Daemons are recognized by the system as any processes whose parent process has
a PID of 1, which always represents the process init.
init is always the first process that is started when a Linux computer is
booted up and it remains on the system until the computer is turned off.
`init` adopts any process whose parent process dies without waiting for the child
process's status.
The common method for launching a daemon involves forking once or twice, and
making the parent (and grandparent) processes die while the child (or
grandchild) process begins performing its normal function.

## Unix File Types

* File (-) -- `touch myfile`
* Directory (d) -- `mkdir mydir`
* Symbolic Links (l) -- `ln -s dest src`
* Named pipes (p) -- `mkfifo mypipe`
* Socket (s) -- `nc -lU mysocket`
* Block device (b) -- (usually disks)
* Character device (c) -- `/dev/null`

## POSIX
**P**ortable **O**perating **S**ystem **I**nterface (POSIX) is a standard to
define basic operations such that systems implementing it are compatible (and
as programmers, working across them seems consistent).

See [wiki:POSIX](https://en.wikipedia.org/wiki/POSIX) for more information.

## Everything is a file?
Everything is a file _descriptor_!

# CS fundamentals

The bread-and-butter of full-stack interviews. Some great resources if you need
to brush up your CS fundamentals in Python:

* [interactivepython.org](http://interactivepython.org/runestone/static/pythonds/index.html)
* Peter Norvig's [Pytudes](https://github.com/norvig/pytudes)

## Sorting algorithms

* Bubble sort: go linearly through the array, swap two items if they're not in
  order. Repeat until array is sorted!
* Selection sort
* Insertion sort
* Shell sort
* Merge sort
* Quick sort


## Data Structures

* Arrays:
  * Append: `[].append(item)`
  * Insert: `[].insert(x, item)`
  * Length: `len([])`
  * Removal: `[].pop(index)` (index is the index of the removed element, defaults to -1)
* Queue: implemented with an array as a backing store. Then `enqueue`/`dequeue` to interact with it.
* Deque: bi-directional queue. Also has an array as a backing store. Then `addFront`/`addRear`/`removeFront`/`removeRear` to interact with it.
* Stack: implemented as a class with an array as a backing store. Then `pop`/`peek`/`push`.
* Linked List:
  * Node: `self.data`, `self.next`
  * List: items are `Node`s. `self.head` is None to start with. To add a `Node`, either point the head to the new Node, and the `newnode.next` to the old head.
* Trees:
  * Binary search trees (treaps)
  * Balancing search trees, to keep the lookup time under a certain time complexity). See [Tree Rotation](https://en.wikipedia.org/wiki/Tree_rotation) and [these slides](http://web.stanford.edu/class/cs166/lectures/05/Small05.pdf) for more.

## Heap and stack
The stack is memory that's always LIFO (**L**ast **I**n **F**irst **O**ut) and
used to keep track of function calls and local variables. The stack is the
running tally of the current program's execution. To remember this, think about
the famous `StackOverflow` exception, which occurs when a function recurs into
itself too many times. It allocates memory onto the *stack* again and again
until it's full.

The heap is a memory space of the size of the process' virtual memory. Access to this memory is a bit slower but much larger. Languages like Java let you set this when you run programs: `-Xmx6g` will set the maximum heap size to be 6G.

Worth noting that threads typically share their heap but not their stack.

## Garbage collection
See [this article](https://spin.atomicobject.com/2014/09/03/visualizing-garbage-collection-algorithms/) for a summary. What matters:

* mark-and-sweep (or any other tracing-type GC) can handle cyclic references easily
* reference counting has more difficulties dealing with cyclic references but
  is generally easier to implement and reason about.

# Networking and Protocols

## HTTP protocol

What's HTTP? Depends on versions.

HTTP/1.x is a text-based protocol. Requests are composed of a method, protocol
version, headers and optional body. Responses are composed of status code (200,
404, 503, 421, etc), headers and optional body.

The best way to understand HTTP is to see it in raw action with telnet! Let's
"GET" Google's UK homepage:

<pre class="brush:plain">
    => telnet www.google.co.uk 80
    Trying 172.217.22.3...
    Connected to www.google.co.uk.
    Escape character is '^]'.
    GET / HTTP/1.1
    Host: www.google.co.uk
    User-Agent: arnaud
    [I pressed ENTER]
</pre>

And Google responds with:
<pre class="brush:plain">
    HTTP/1.1 200 OK
    Date: Mon, 15 Jan 2018 16:18:35 GMT
    Expires: -1
    Cache-Control: private, max-age=0
    Content-Type: text/html; charset=ISO-8859-1
    P3P: CP="This is not a P3P policy! See g.co/p3phelp for more info."
    Server: gws
    X-XSS-Protection: 1; mode=block
    X-Frame-Options: SAMEORIGIN
    Accept-Ranges: none
    Vary: Accept-Encoding
    Transfer-Encoding: chunked
    Connection: Keep-Alive
    Set-Cookie: ...
    Set-Cookie: ...

    2ae9
    <!doctype html>...rest of the response
</pre>

For an overview of all the possible headers, statuses, etc see [this wikipedia article](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).

What about HTTP/2? Most of the structure is the same, but HTTP/2's major
difference lies in the fact that it's a **binary** protocol. Instead of the
newlines being separators, HTTP/2 relies on the concept of frames, messages and
streams.

* a frame is the smallest unit, containing at a minimum a header and a stream ID
* a message is composed of several frames and maps to a "request" or "response"
* a stream is a flow of one or several messages

More info at [High-Performance Browser Networking](https://hpbn.co/http2/).

So, taking our example above, let's GET Google's homepage in HTTP/2. Can't use
`telnet` unfortunately. We need `openssl` (> 1.0.2) to connect because HTTP/2 needs TLS, and since HTTP/2 is a binary protocol it'd be a pain to write a request manually.

I'm lazy and I haven't actually done the work to formulate and
serialize a GET request with HTTP/2. I will get to that someday when I finish
reading [RFC7540](https://tools.ietf.org/html/rfc7540)

## TCP vs. UDP
TCP is reliable, it'll retransmit data. UDP isn't and won't.

* TCP: **T**ransmission **C**ontrol **P**rotocol
* UDP: **U**ser **D**atagram **P**rotocol

From the man pages:

> The TCP protocol provides reliable, flow-controlled, two-way transmission
> of data. It is a byte-stream protocol used to support the `SOCK_STREAM` abstraction.

> UDP is a simple, unreliable datagram protocol which is used to support
> the `SOCK_DGRAM` abstraction for the Internet protocol family.

## TCP protocol
Important topics for full-stack developers:

* TCP initial three-way handshake (SYN, SYN/ACK, ACK)
* TCP congestion control mechanisms: window size adjustments when packet loss
  happens, and TCP slow start.
* TCP head-of-line blocking: if a packet is lost, no further data is delivered
  until that packet is retransmitted
* TCP teardown: FIN, FIN-ACK, ACK

See:
* [Wikipedia:TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Protocol_operation) for a quick refresher on the basics
* [hbpn.co:building-blocks-of-tcp](https://hpbn.co/building-blocks-of-tcp/) for more details on how these basics matter for web browsers/sites/users
* [TCP Puzzlers](https://www.joyent.com/blog/tcp-puzzlers) for some advanced
  considerations on failure modes: and how the state of TCP can get out of sync
  between client and server. An example might be a hard power-cycle, or the
  socket file descriptor not being torn down correctly on either end.


## SSL vs TLS
SSL (**S**ecure **S**ocket **L**ayer) was released by netscape in the 90s. TLS
(**T**ransport **L**ayer **S**ecurity) is the name SSL took once it was taken
over by IETF.

For a good overview of the principles behind HTTPS and what actually happens when a TLS connection is established, see [this post](http://www.moserware.com/2009/06/first-few-milliseconds-of-https.html).

## Certificates and encryption

* Encryption: everyone should understand the basics of the [Diffie-Hellman key
  exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange),
  which enables two parties to exchange secrets in the open.
* Difference between authentication and encryption. Encryption does **not**
  solve the problem of a man-in-the-middle.
* On the web, authentication is solved by the certificate architecture, and
  relies on chained trust (we trust the current certificate because we trust
  its issuer)
* Browsers ship with hardcoded lists of certificate authorities (CAs)

## DNS
DNS (**D**omain **N**ame **S**ystem) queries are made by browsers to be able to
know which host to establish a connection to. DNS packets are transported over
UDP on port 53. Some resolvers use TCP. Here's an example:

<pre class="brush:plain">
    => dig @208.67.222.222 google.com

    ; <<>> DiG 9.8.3-P1 <<>> @208.67.222.222 google.com
    ; (1 server found)
    ;; global options: +cmd
    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 46269
    ;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

    ;; QUESTION SECTION:
    ;google.com.            IN  A

    ;; ANSWER SECTION:
    google.com.     300 IN  A   216.58.209.238

    ;; Query time: 76 msec
    ;; SERVER: 208.67.222.222#53(208.67.222.222)
    ;; WHEN: Mon Jan 15 19:31:33 2018
    ;; MSG SIZE  rcvd: 44
</pre>

For a great refresher on the basics/specs, head to [powerdns.org:basic](https://powerdns.org/hello-dns/basic.md.html).

# Databases
## Document datastores vs. relational DBs vs. graph DBs
Ultimately what matters during an interview is the knowledge that these 3 types
of databases are available, and know one of each type to model data.

### ElasticSearch
ElasticSearch is a popular example. To store data, you'd send an HTTP POST request (see [docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html)):
<pre class="brush:plain">
    POST /$index/$type
    {...JSON of object...}
</pre>

To get data, send a GET request with a few parameters. For example:
<pre class="brush:plain">
    GET /_search
    {
      "query": {
        "bool": {
          "must": [
            { "match": { "rating": "5"}},
            { "match": { "content": "hipster" }}
          ],
          "filter": [
            { "range": { "publish_date": { "gte": "2018-01-01" }}}
          ]
        }
      }
    }
</pre>

### MySQL
MySQL is the most basic datastore, used ubiquitously. MySQL uses straight up TCP to send queries.

To insert data, use `INSERT`:
<pre class="brush:plain">
    INSERT INTO review VALUES ('review text', 4, 1234);
    # OR
    INSERT INTO review SET text='review text' AND review_id=4 AND reviewer_id=1234;
</pre>

To get data use `SELECT`:
<pre class="brush:plain">
    SELECT text, review_id FROM review WHERE reviewer_id=1234;
</pre>

### Neo4j
I haven't looked at graph databases a lot but if I had to look into one, it'd
be Neo4j, mostly because of the quality of the docs available.

Interacting with Neo4j is done over HTTP. Queries are sent in plain text (Cypher instead of SQL) as part of a "statement" key in the body of the request.

[Link to docs](https://neo4j.com/docs/developer-manual)

## ACID
Atomicity, Consistency, Isolation, Durability. These properties are fundamental
to defining proper database transactions.

See [wiki:ACID](https://en.wikipedia.org/wiki/ACID).

## CAP Theorem
Consistency (changes are atomic), Availability (remains accessible at all
times), and Partition Tolerance (small network outages do not cause an outage
or errors). The CAP theorem states that a datastore can only satisfy 2.

# Python

## How is Python interpreted?
Short version:

* Python code (source.py)
* gets compiled to bytecode by a compiler (source.pyc)
* which gets fed into the Python interpreter to be executed

Here's a [YouTube
playlist](https://www.youtube.com/playlist?list=PLzV58Zm8FuBL6OAv1Yu6AwXZrnsFbbR0S) if you enjoy this topic.

## virtualenv
`virtualenv` is a tool to isolate Python code from python version and default
packages installed on a machine.

To create a virtualenv:
<pre class="brush:plain">
    $ virtualenv --python="python3.6"
</pre>

To get inside of it:
<pre class="brush:plain">
    $ source virtualenv_run/bin/activate
</pre>

Then install dependencies, run your code, etc. When you're done: `deactivate`
will take you out of the virtualenv.

## The GIL
The Global Interpreter Lock in Python is a mutex in CPython (the python
*interpreter*) to control access to Python objects and prevent threads from all
executing code at once. Why? Because Python's memory management system
(reference counting) is not thread safe.

## Python 2.x vs py3
There are lots of (small-ish) differences but the main one is the default type
for strings. In Python2 it defaults to `bytes`. In python3 it defaults to
python2's `unicode`.

## Encoding, Decoding
Something that all programmers should know.

* An encoding example: `utf-8`
* To decode **from** bytes **into** a string: `my_str = buffer.decode('utf-8')`
* To encode a string **into** bytes: `my_bytes = str.encode('utf-8')`

## Sorting in Python

* Use `sorted()` if you want to keep a copy of the non-sorted items
* Use inline sorting if you don't: `myarray.sort(key=lambda item: item['somekey'])`

Python uses ["timsort"](https://github.com/python/cpython/blob/master/Objects/listsort.txt) by default


## NamedTuple
Named tuples are a lightweight construct useful where you want immutable types:
<pre class="brush:python">
    Animal = namedtuple('Animal', ['cuteness_factor', 'type', 'continent'])
</pre>

## Classes

* New-style classes: `class Foo(object):`
* Old-style classes: `class Foo:`

What are the differences? Not much. See [this
wiki](https://wiki.python.org/moin/NewClassVsClassicClass). Always lean towards
new-style classes if possible.


## Metaclasses

* Metaclass programming is a last-resort option, avoid at all cost!
* Metaclasses are a way to programmatically create Python classes.
* Python classes are created with `type`:
<pre class="brush:plain">
    >>> print(type.__doc__)
    type(object_or_name, bases, dict)
    type(object) -> the object's type
    type(name, bases, dict) -> a new type
</pre>

This is all you need to know. For further details on this craziness, consult
[this
article](https://blog.ionelmc.ro/2015/02/09/understanding-python-metaclasses/).

## Inheritance

For py2:
<pre class="brush:python">
    class Foo(Bar):

        def __init__(self, quux):
            super(Foo, self).__init__(quux)
</pre>

In py3 you can do:
<pre class="brush:python">
    class Foo(Bar):

        def __init__(self, quux):
            super().__init__(quux)
</pre>

## Abstract Base Classes (abc)
<pre class="brush:python">
    """Python 2.5"""
    class MyInterface:
        def foo(self):
            raise NotImplementedError
</pre>

<pre class="brush:python">
    """Python 2.6+"""

    class MyInterface(object):

        __metaclass__ = abc.ABCMeta

        @abc.abstractmethod
        def foo(self):
            raise NotImplementedError
</pre>


<pre class="brush:python">
    """Python 3"""
    class MyInterface(object, metaclass=abc.ABCMeta):

        @abc.abstractmethod
        def foo(self):
            raise NotImplementedError
</pre>

## Achieving parallelism: `multiprocessing`, `threading` and `gevent`

* `multiprocessing` achieves parallelism by spawning subprocesses with `fork`
  or `spawn` (e.g. `multiprocessing.set_start_method('spawn')`).
  See [docs](https://docs.python.org/3.6/library/multiprocessing.html) for more.
* `threading` achieves parallelism by spawning new threads. Threads are more
  lightweight than processes and share memory with their parent. See
  [docs](https://docs.python.org/3.6/library/threading.html?highlight=threading#module-threading)
  for more.
* `gevent` is an abstraction implementing coroutines. Nothing really happens in
  parallel, but the internal event loop switches between multiple "greenlets"
  to process multiple tasks. Typically this is useful when dealing with
  I/O bound operations (greenlet1 waits on one network call, greenlet2 on
  another, etc). See [docs](http://www.gevent.org/contents.html) for more.

# JavaScript

Good resources for a short, practical review of the key concepts:
[Best Frontend JS interview questions](https://performancejs.com/post/hde6d32/The-Best-Frontend-JavaScript-Interview-Questions-(Written-by-a-Frontend-Engineer).

## What's a closure?

Here's a definition inspired by "Secrets of the JavaScript Ninja", by Resig.

A closure is a lexical scope created by the JavaScript engine each time a
function is created. Closures allow a function to access all the variables, as
well as other functions, that are in scope when the function itself is declared.

They create a 'safety bubble' containing the function and variables
that are in scope at the point of the function's declaration. This bubble,
containing the function and its variables, stays around as long as the function
itself does.

## How to trigger strict mode?
`'use strict';`

## Arrow functions

<pre class="brush:javascript">
    class Bar {
        constructor(name) { this.name = name; };
        getName() { return this.name; };
        delayedGetName() {
            // Correct because arrow function take `this` from their enclosing
            // context, which is, in this case, the context defined by
            // `delayedGetName`, an object method. Rad!
            setTimeout(() => this.name), 1);
        };
        incorrectDelayedGetName() {
            setTimeout(function() {
                // Incorrect because the `function` creates its own context
                return this.name;
            });
        };
    }
</pre>

Other syntaxes:

<pre class="brush:javascript">
    var log = (arg1, arg2) => { console.log(arg1, arg2); };
    var returnFirst = (arg1, arg2) => { return arg1; }
    var returnSecond = (arg1, arg2) => arg2;
    var returnsObject = (arg1, arg2) => ({data1: arg1, data2: arg2})
</pre>

## Value of `this` in different context

* `this` in a function invocation:
  * global object (`window`) in non-strict mode
  * `undefined` in strict mode

* `this` in object methods: object which owns the method
* `this` in class constructors: object being instantiated
* `this` in bound functions: whatever it was set to be! (1s arg to `.bind`)
* `this` in arrow functions: statically set when the arrow function is defined,
  and set to be the enclosing context.


## Context binding

Calling a function with a different context:

* `.call(context, arg1, arg2, ..., argN)`
* `.apply(context, arrayOfArgs)`

Binding a function to the right context for later use:
<pre class="brush:javascript">
    class Bar {
        constructor(name) {
            this.name = name;
        };
        someMethod() { return this.name; };
    };

    var bar = new Bar('Zeitgeist');
    var getBarName = bar.someMethod;
    var boundGetBarName = bar.someMethod.bind(bar);

    getBarName() // Whoops, doesn't work!
    boundGetBarName() // Yay
</pre>


## Prototypes and inheritance in JS
JavaScript is a prototype-based language.

Prototypes are a convenient way to define types of objects, but they're
actually a feature of functions.

Each object in JavaScript has an implicit property named `constructor` that
references the constructor function that was used to create the object. And
because the prototype is a property of the constructor function, each object
has a way to find its prototype.

Constructors are not a special feature of the language. In fact, a
"constructor" is just a function invoked in a special way (using `new`).

Why is this "special way" special you ask?

* Invoking a function with `new` will call it with a context set to an empty
  object.
* `this` is set to this "new" empty object implicitly created for us
* This "new" implicit object is given a `constructor` property which points to
  the function invoked.
* This "new" implicit object will be returned to the caller when that function
  is done executing

Now the order of property/method resolution when calling obj.myMethod is:

* instance lookup (if the property is defined on the object itself)
* prototype lookup. How does one lookup the "prototype" of an object? Through the object's `constructor` property (which points to the original constructor function). Then we look the property up in `.constructor.prototype`, which should be an object. This is the same than `Object.getPrototypeOf(obj)`
* if we haven't found our property/method on `Object.getPrototypeOf(obj)`, then the search continues on `Object.getPrototypeOf(Object.getPrototypeOf(obj)`
* And so on and so forth until we reach a point where `Object.getPropertyOf(...)` is `null`


A more thorough explanation with complete code samples is available at
http://arnaudbrousseau.com/notes/secrets-of-the-javascript-ninja.html

Another good article on prototypes in particular can be found at
https://zeekat.nl/articles/constructors-considered-mildly-confusing.html

Inheritance with standard syntax (`Object.create`):
<pre class="brush:javascript">
    function Animal(name) { this.name = name; }
    Animal.prototype.sleep = function() { console.log('zzz'); }

    function Dog(name) { this.name = name; }
    Dog.prototype = Object.create(new Animal());
</pre>

With the ES6 `class` syntax:
<pre class="brush:javascript">
    class Animal {
        constructor(name) { this.name = name; }
        sleep () { console.log('zzz'); };
    };
    class Dog extends Animal {
        constructor(name) { this.name = name; }
        bark () { console.log('woof'); }
    };
</pre>

## ES5, ES6 vs ES7 classes

Classic:
<pre class="brush:javascript">
    function Foo(arg1) {
        this.name = arg1;
    };
    Foo.prototype.myMethod = function() {
        return this.name;
    };
    var foo = new Foo('ohhai');
</pre>

ES6 class syntax:
<pre class="brush:javascript">
    class Foo {
        constructor(arg1) {
            this.name = arg1;    
        };
        myMethod() {
            return this.name;
        };
    };
    foo = new Foo('ohhai');
</pre>


## Modules in JS

They come in three flavors:

* AMD (RequireJS)
* CommonJS modules (NodeJS)
* ES6 modules

<pre class="brush:javascript">
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
</pre>

See http://2ality.com/2014/09/es6-modules-final.html

## Asynchrony in JavaScript
Three main ways to achieve this:
* Callbacks:
<pre class="brush:javascript">
    window.setTimeout(function() {
        // typical callback, called back by the browser when 10s have elapsed.
    }, 10000)
</pre>
* Promises:
<pre class="brush:javascript">
    var waitingPromise = new Promise(function(resolve, reject) {
        window.setTimeout(function() {
            resolve('wait is over');
        }, 10000);
    });

    waitingPromise.then(function(resolveReturnValue) {
        console.log(resolveReturnValue); // prints "wait is over"
    });
</pre>

* `async`/`await`:
<pre class="brush:javascript">
    var waitingPromise = new Promise(function(resolve, reject) {
        window.setTimeout(function() {
            resolve('wait is over');
        }, 10000);
    });

    // Need to be in an `async` function to be able to use `await`.
    async function wait() {
        let resolveReturnValue = await waitingPromise;
        console.log(resolveReturnValue);
    };

    wait() // waits 10s and prints "wait is over"
</pre>

See [this article](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5) on the topic.


# Web Frontend

[This repo](https://github.com/yangshun/front-end-interview-handbook) contains
a good set of questions/answers to quickly go over a lot of the possible
frontend questions.

## BEM
BEM (**B**lock **E**lement **M**odifier) is the name for a convention in CSS class names.

<pre class="brush:css">
    /** "blocks" are building blocks of a page (reviews, search, sidebar, etc) **/
    .block {...}
    /** "elements" are elements within a given block. Input element, header, etc. **/
    .block__elem {...}
    /** "modifiers" are things like "hidden" or "active" **/
    .block__elem--modifier {...}
</pre>

Full reference at http://getbem.com/naming/

## React
Follow [this tutorial](https://reactjs.org/tutorial/tutorial.html) if you're
not familiar with React. What you need to know as a full-stack developer is
what React is and what problems it solves.

React fundamentally changes the game because it introduces the concept of a **virtual DOM** such that interactions between an app's JS code and the DOM are indirect. This brings a ton of exciting possibilities such as full control over which modifications are persisted, ability to get the state of an app without relying on browser APIs, and optimal scheduling of DOM updates to avoid skipping frames.

## Positioning: CSS grids, tables, floats
Not going to get into a lot of details here but it's good to know that in order of preference:

* [CSS grids](https://css-tricks.com/snippets/css/complete-guide-grid/) are the hot new thing
* float-based layouts (or custom grid systems) are what's realistic in the wild
* table-based layouts are things from the past, but probably the easiest to put together

## SVG
Good to know that SVGs are great alternatives to fixes sizes, especially for
things like icons. It's also nice to know that SVG is nothing but text and very
readable (just like HTML!). See [this MDN tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Getting_Started).

## Script loading
Basic: this is the most straightforward, but browsers have to stop HTML
parsing/building at that point to download and execute the script.
<pre class="brush:plain">
    &lt;script src="/path/to/my/script"&gt;&lt;/script&gt;
</pre>

Asynchronous: the browser doesn't halt while dowloading this script. It blocks
and executes this script when its download completes. Because of the fact that
download times are unpredictable, `async` scripts aren't guaranteed to run in
the order they were included on the page.
<pre class="brush:plain">
    &lt;script async src="/path/to/my/script"&gt;&lt;/script&gt;
</pre>

Deferred: the browser doesn't halt while downloading this script and `defer`s
script execution until after the HTML parsing is completed, but before
`DOMContentLoaded` fires. The order between multiple `defer` scripts should be
respected, but all are executed after document parsing.
<pre class="brush:plain">
    &lt;script defer src="/path/to/my/script"&gt;&lt;/script&gt;
</pre>

[This article](https://www.html5rocks.com/en/tutorials/speed/script-loading/) is a reference on this topic.

## Loading Policies

**Same-origin policy**: when a user-agent loads content via XMLHTTPRequest (XHR aka AJAX), the same-origin policy applies. You can only load resources from the same origin than the page from which the script executes on.

**JSONP, or "JSON with padding"**. A clever hack to let web developers go around the same-origin policy, taking advantage of the fact that `<script>`s can be loaded cross-origin. Concretely:
<pre class="brush:plain">
   &lt;script src="http://other.origin/user?id=1234&amp;cb=parseResp"&gt;
       // Response from other.origin will be
       // parseResp({"name": "Arnaud", "id": 1234, "Rank": 117});
   &lt;script&gt;
</pre>

**CORS, Cross-Origin Resource Sharing**. This is a solution to go around the same-origin policy. This is implemented with a preflight request (OPTION request) from the browser to the server behind the origin from which a resource is fetched. The server can then respond with a list of domains for which that resource is allowed. Note: "simple" requests are not subject to CORS (preflight requests aren't performed). "Simple requests" are any POST, HEAD, GET requests with "simple" headers. "Simple headers" are:

* `Accept=*`
* `Accept-Language=*`
* `Content-Language=*`
* `Content-Type=(application/x-www-form-urlencoded|multipart/form-data|text/plain`

CORS is useful for more that XHR-fetched content! CSS fonts or WebGL textures are subject to CORS for instance.

## How browsers work

### Overall
See [this excellent article](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/). Any web developer should read and understand this.

### CSS engines
I'd just expect that people know that CSS engines exist, that their purpose is to process the CSS code included on a page. See [this article](https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/) for a more in-depth look.

### JS engines
It's good to know that JS is executed by a sandboxed process called a JS
engine. Each browser has its own, hence the differences in behavior and
performance between browsers for a given site. Examples:

* v8 for NodeJS and Chrome
* SpiderMonkey for Firefox

# The non-technical portion of a technical interview

## Mindset
The main question to answer during an interview is: "would I want to work with
this person?", "would I be happy to see them sit next to me next week?", "can I
see them help me with the current projects I'm working on?". I find this
provides a good guide for a yes/no decision.

## Expectations
This varies with roles and levels that you hire for, but the attributes I
generally look for in engineers that I interview are:

* good communication. Not too long, to the point, with a good attitude. The kind that you would want in your daily or weekly meetings
* positive reaction to questions and followups (not defensive)
* ability to see one's own mistakes and point them out (not masking them!)
* ability to say "I don't know" or "I'm not sure" when warranted
* mentoring/teaching: do you see them teaching you something new?

## Assessment
To try to evaluate against my expectations, here are some questions:

* What would you want to learn once hired here?
* How do you release code to production?
* Can you diagram the ecosystem in which the system you worked on fits?
* What did you admire most about the best engineers at your previous job?
* Design your ideal job here
* What was the last time you failed to do something? Can you elaborate?

# Wrapping up
You made it through it all! Wow I'm impressed. Thank you so much for reading!
