---
title: "VelocityConf 2015"
date: 2015-05-31
---

## Service Workers, The Practical Bits<br>★★★★☆
**Patrick Meenan, Google**

Slides: http://www.slideshare.net/patrickmeenan/service-workers-for-performance

### Basics about service workers
Tutorial about service workers. Pat isn't an expert. Real experts -- they wrote
the specs and/or are working on implementations -- Alex Russell, Jake
Archibald.

Basic concept: service workers are a layer in between the browser's resource
fetcher and the networking stack (which includes the net cache). In other
words, service workers intercept all requests issued by a page, whether it's
fetched from the browser's disk cache or goes out to the internet.

Information captured include original URL, all request headers, and the
response when available. It even includes cross-origin requests (response
inspection depends on Cross-Origin policy.)

Service workers share a programmable cache in the form of an IndexedDB.

Service workers are available for HTTPS only pages

Service workers are not active on first view

service workers support async APIs only. They run in the background and have no
notion of "page". From a service worker's point-of-view, there's only request
coming through. No page load, no after page load. That logic has to be built.

### How to use service workers?
How do you register a service worker?
<pre class="brush:js">
navigator.serviceWorker.register(serviceWorkerFile, scope)
</pre>

What do you do with it? Attach handlers:
<pre class="brush:js">
self.addEventListener('install', function(event) {
    // runs on install...
});
self.addEventListener('install', function(event) {
    // runs once the service worker is installed
});
self.addEventListener('fetch', function(event) {
    // runs on every request
});
</pre>

From @patmeenan: "In the grand scheme of developers shooting themselves in the
foot, this is a big cannon.". For instance:

<pre class="brush:js">
// Would intercept every request and makes it return 'hello world'. That
// includes the main HTML document!
self.addEventListener('fetch', function(event) {
    self.respondWith(new Response('Hello world'));
});
</pre>

Regardless of everything else, the browser will check for an updated service worker every 24hrs.
That means your site could get busted for 24hrs. So, you need good test coverage


<pre class="brush:js">
cache.open(cacheName).then(function(cache) {
    return cache.addAll(['file1', '/path/to/file/2', etc]);
})
</pre>

Service workers' cache is fully programmable. But that also means you have to
manually expire entry or reset them. Double-edge sword?

Service workers' main use case is offline, through `navigator.online` check you
can customize what the browser returns when the network is not available.

Important to note: all ES6 request/response are **streams**. So you need to clone them if
you want to do something without burning your one time chance to read them.

### Use cases

**Set custom timeouts**<br>
Service workers let you set custom timeouts on ads, social widgets, etc. to prevent SPOFs (Single Point of Failure)

[SPOFomatic](https://chrome.google.com/webstore/detail/spof-o-matic/plikhggfbplemddobondkeogomgoodeg) is a Chrome extension to detect single point of failures

**Catch DNS/CDN/Proxy failures/errors**<br>
Not only do service workers let you catch these errors by inspecting the response code for different type of assets on a page, but you can also do all kinds of cool things like:
- report these errors back to the server for further analysis or graphing
- define custom failover strategies (backup CDN or all the way back to origin)
- serve a custom page

**Race CDNs**<br>
With service workers you can have one request spawn N requests, which means you could A/B test two CDNs. Might not be the best idea money-wise.
Service workers can grab the first CDN to respond so that your CDNs are constantly "racing" one another.

**Stale-While-Revalidate implementation**<br>
With service workers you can go beyond the normal expire headers and prevent
your users from reaching out to the server. For instance, instead of waiting
for a full request, serve a stale version of the asset and in parallel, check
if a fresher version is available. If it is, update the cache! If not, you've
just saved your user the latency of a round-trip. w00t.

**Prefetching resources**<br>
That's an obvious use-case. Since service workers are running in a completely
different process you can start prefetching resources without incurring delay
on the main page.

**Re-writing the browser scheduler**<br>
That's gnarly and super dangerous but can be done with service workers.  You
think that Chrome sucks when it downloads resources that are at the end of the
body early? You can choose to delay that and prioritize your fancy hero image!

**Custom compression**<br>
Service workers can also be used to implement compression algorithms that don't
ship with the browser natively. Got a new idea for a fancy new compression
algorithm? You can do it.
And that also applies for image compression! (but remember, service workers are
written in JS, that's probably not the best place to decompress/recompress an
image!

**Delta compression**<br>
Say a page issues a request for `main.js?v=3`. A service worker can intercept that and, instead of letting the browser reach out to the internet, decide to see what's in its cache and ask the server for the **diff** between the cached version and the fresh version. That can save massive amounts of time.

**Progressive JPEGs**<br>
Have your service worker ask the server just the bytes up until a certain point,
leave the connection open, and serve the rest later!

**Generate images instead of downloading them**<br>
Large images like [webpagetest.org](http://www.webpagetest.org)'s images are
just charts. Instead of generating/serving this image from the server, a service
worker can transparently ask the server for the data to generate that image (say
a JSON blob) and generate a PNG client-side using a `canvas`.

**Metrics**<br>
Service workers are awesome for debugging/metrics. You can not only report the
usual perf data, but also errors cases. This gives visibility into failure modes
that you wouldn't see otherwise.

Last note: service workers can do `importScripts`, so they're composable. At
this point, there's still opportunity to write the jQuery that lets you compose
service workers easily!


## Best Practices for MySQL High Availability<br>★★☆☆☆
**Colin Charles, MariaDB**

What is High availability?

- latency, throughput (performance scalability)
- replicas, snapshots, backups (durability)
- failover (clustering)
- redundancy (replication)

different ways to handle replication:
what is SAN?
simple replication
master to master
Tungsten
NDB cluster, Galera Cluster

Redundancy:
- geographical redundancy

Durability:
- is it really written to disk?
- libeatmydata
- is it written in a transactional way to guarantee atomicity, crash safety, integrity?

Recovery can be long if `innodb_log_file_size` is too large

Redundancy through disk repllication

How can you achieve redundancy through MySQL replication?

- statement based replicaation
- row based replication
- semi-sync replication

Binary log, `relay log`, `master_info_log`, `relay_log_info_log`

Use percona toolkit to monitor replication delay

Galera cluster is a plugin to handle replication in MySQL.

NDBCluster: super high availability, amazing update performance, but very very expensive to run/upgrade.

Deep-dive about MHA (set of perl scripts)


## Metrics, metrics everywhere (but where the heck do you start?)<br>★★☆☆☆
**Tammy Everts & Cliff Crocker, SOASTA**

@tameverts, @cliffcroker

47% of consumers expect pages to load in 2 seconds or less.

There is no one single metric that exists which can unite everyone.

RUM, synthetic? Both!

- RUM: works with a beacon, always on, getting better and better as
  `window.performance.timings` gets better
- Synthetic: automated bots measure website performance given a set path/URL

Interesting idea: plot the conversion rate of a page or a flow against its
performance.

TODO: look into Boomerang.js

Navigation timing API.

The usual talk about how it's great to have that data available and look at it.
Yelp already reports this so it wasn't that new. 
it wasn't that new.

Interesting ideas related to navigation timings:
- let's get a graph running of frontend vs. backend to set minds straight
- let's expose that data for internal IPs
- visualize in a stacked graph (in that order):
  - DOMLoadingStart - NavigationStart
  - DOMInteractive - NavigationStart
  - DOMContentLoaded - NavigationStart
  (which gives a break down of how DOM and page loads)

resource timings
TODO: Timings-Allow-Origin header to be able to get a breakdown of Resource Timings

See beyond-page-timings

Degradations are worse on browse-type pages than on say...checkout.

Concept of conversion impact scores (how much does performance impact conversion depending on pages/flows?)

Example SLA: response time measured using resource timing forom Chrome browsers
in the US should not exceed a median of 100ms or a 95th percentile of 500ms for
a population of more than 500 users in a 24hrs period.

## Linux Performance Tools<br>★★★★★
**Brendan Gregg, Netflix**

**[Link to Slides](http://www.slideshare.net/brendangregg/velocity-2015-linux-perf-tools)**

Objectives:
- recognize the Streetlight Anti-Method
- perform the Workload Characterization Method
- Perform the USE MEthod
- Learn how to start with the questions, before using tools
- Be aware of other methodologies

### Anti-methodologies

- Street light Anti-Method: using tools that are familiar to solve an unfamiliar
  problem (similar to someone searching under a street light something lost in
  the dark because the light is better there)
- Drunk Man Anti-Method: changing things at random until the problem goes away
- Blame Someone Else Anti-Method: self-explanatory!

### Actual Methodologies

#### Problem Statement Method
- What makes you think there is a performance problem?
- Has this system ever performed well?
- What has changed recently?
- Can the performance degradation be expressed in terms of latency or run time?
- Does the problem affect other people or applications (or is it just you?)
- What is the environment? Software, hardware, instance types? Versions? Configuration?

#### Workload Characterization Method

- Who is causing the load? PID, UID, IP address
- Why is the load called? code path, stack trace
- What is the load?IOSPS, tput, type, r/w
- How is the load changing over time?

#### The USE method

For every resource, check:

- **U**tilization (busy time)
- **S**aturation (queue length or queued time)
- **E**rrors

#### Off-CPU Analysis

Try to track when your process gets off CPU and why. Very useful to detect
problems where your program is competing with another process, i/o issues, etc.

#### CPU profile method

Take a CPU profile and understand all software in this profile that runs for
more than one percent of the time.

#### RTFM Method

**R**ead ("**T**he **F**\*cking") **M**an pages, books, web search, co-workers, slides, support services, source
code, experimentation, social forums, etc.

### Command line tools

#### Observability tools

- `uptime`: gives you load average
- `top`/`htop`
- `atop`: better than `top`/`htop` not to miss short lived processes
- `ps -ef f`. Better: `ps -eo user, sz,rzz,minflt,majflt,pcpu,args`: custom fields!
- `vmstat 1`: virtual memory statics. Gives CPU time broken down in user/system,
and break down of memory.
- `iostat -x 1`, `iostat -xmdz 1`: workload characterization (`r/s` is reads per
   second, `w/s` is writes per seconds, `avgqu-sz` is average queue size, `%util`
   is percentage of utilization)
- `mpstat -P ALL 1`
- `free -m`
- `sar -n DEV 1`
- `strace -tttT -p <pid>`: system call tracer (`-ttt`: time since epoch, `-T`:
syscall time). **WARNING**: `strace` has massive overhead since it's `ptrace`
based. It can slow the target by more than 100x. Use with extreme caution in
prod! Tip: `strace p \`pgrep something\` 2>&1 | head -100` to limit the output.
- `tcpdump -i eth0 -w /tmp/out.tcpdump`: let's you study packets sequences with
timestamps. It doesn't scale well though, as soon as you want to analyze nodes
with large amounts of data flowing through them.
- `netstat -s`
- `nicstat 1`
- `pidstat -t 1`: to have process stats, e.g., by-thread, disk I/O
- `lsof -iTCP -sTCP:ESTABLISHED`: to understand network interfaces and who is
talking to who in a sytem
- `sar -m TCP,ETCP,DEV 1`: `sar` (system activity reporter) runs in archive or
live mode. It's well designed, has logical groups, sensible output, etc.
- `collectl`
- `dstat`
- `ss -mop`, `ss -i`: more socket statistics
- `iptraf`: histogram of the network packets
- `iotop`: lock device io by process
- `pcstat`: page cache residency by file (useful for Cassandra apparently)
- `perf`: (`perf\_events`-based). Comes with `linux-tools-command`
- `tiptop`: IPC (Instruction Per Cycle) by process


#### Benchmarking tools


Benchmarks are tricky because it orders of magnitude easier to run them than to
refute them. To avoid that: run the benchmark for hours. In the meantime, run
the observability tools to confirm it's hitting the right things.

unixbench, lmbench, sysbench, perf bench


fio --name=seqwrite --rw=write --bs=.....

pchar (traceroute with bandwidth per hop)

iperf

#### Tuning tools

Tuning tools are acting on your system and modifying it. Be careful. Don't fall
into the drunk-man anti-pattern. Don't fiddle with params until the problem goes
away. Instead:
- ask yourself the question: what do I need to improve and why is this the right
  setting to tune?
- hypothesis
- prediction
- tests
- analysis

Different tools:
- `sysctl`, `/sys`
- `nice`, `renice`, `taskset`, `utimit`, `chcpu`
- for more, see Brendan's slides

#### Static tools

To do static performance tuning, check the static state and configuration of the
system:
- CPU types and flags
- CPU frequency scaling config
- storage devices
- file system capacity
- file system and volume configuration
- route table
- state of hardware
- ...etc

Tools to do that:
- `netstat -rn`
- `ip route get <IP>`
- ...etc


#### Profiling tools

Built-in `perf` is chill.

<pre class="brush:plain">
    perf record -F 99 -ag -- sleep 30
    perf report -n --stdio
</pre>

(then use Bredan's FlameGraph tool to turn the output into a cool flamechart)



#### Tracing

- `uprobe`, `kprobe`
- `perf`, `ftrace`, `eBPF`
- `perf list 'block:\*'`

eBPF is getting integrated into Linux 4.1. Exciting!


## Better Off Bad <br> ★★★★☆
**Lara Bell**

This talk was about security.

Our apps are full of precious things (data), we don't want those precious things to get stolen.

We all liars, cheats and thieves deep inside. The difference between us and real
bad guys is we don't mean harm.

Security is hard because breaking a box is against our nature. We'd rather build
stuff than destroy. We also feel cheated on if an attack is not sophisticated or
elegant. Spoiler alert: most of them aren't!!

Three steps to start at your company:
- Think like a villain: be objective, keep your eyes on the prize. Hackers aren't here for the box. They're after what's inside.
- Create a safe place to create a little chaos in, to be creative
- Don't be afraid to play like you never read the rulebook (fear stop us from learning)

Challenge: mentally plan what would be the worse thing to steal/break in your
organization. How would you steal it?


## Lessons learned for large-scale apps running in a hybrid cloud environment<br>★★★☆☆
**Dana Quinn, Intuit**

Why the cloud? Move quickly, speed up innovation.

How do you get to the cloud?
- Choose things that are non-prod but mission critical like build environments and load test generation
- Select decoupled systems (system that don't interact with data that much, and that are okay being 15ms away)
- Try On-demand dev environment

Don't make your cloud feel like fog!
- don't bring legacy management patters into your cloud environments
- insist on the right patterns as you move to the cloud!
- you'll track new metrics -- average instance age (keep low), utilization
- anti-patterns to watch for when moving from legacy: manual steps in instance setup

Track your costs!
- you can save money
- you can also waste money if your engineers aren't used to tracking their spendings
- remember to shut the cloud off!


## Building a faster, highly available data tier for active workloads<br>★☆☆☆☆
**Dave McCrory, Basho**

Trend: "Scale or fail!". The amount of data is expected to double every two years

Challenge:
- data isolation
- data consistency (CAP)
- data gravity (interacting with data creates more data)

Speaker didn't expose any solutions. Boo!

## Maintaining performance and reliability at the edge <br>★★☆☆☆
**Rob Peters, Verizon**

Conway's law: software architecture will mirror your organization.

What organization do we need to solve problem X given current software?<br>
VS<br>
Given current organization, what software can we efficiently produce to solve problem X?

Second part of the talk was about culture and tooling to ensure good
performance. Ended up being a bit generic like:
- Tools need to have an owner
- When you make features for your tools, be strategic

## Engineering for the long game <br>★★★★★
**Astrid Atkinson, Google**

Loosely coupled systems are very unpredictable.

At Google, the Börg ecosystem rules services' world. Astrid has been at Google
for 10 year and saw that system grow and evolve.

Rules of the long game:
- imagine that you will be very, very successful
- complexity not only increases over time. It increases with failure, success and growth. You'll have to manage complexity somehow.
- good teams and people are the most precious (your team should outlast any single piece of code)
- adding scale should not have to mean adding people

How do systems grow?
- Vertical growth: more of the same type of service, bigger, more involved
  product of the same type
- Horizontal growth: more products, more types

Rules to enable growth:
- manage software, NOT individual machines
- standardize your environment as much as possible: config file in the same place, naming conventions enforced, etc.

Rules to engineer for maintainability:
- keep an eye on what's costing time. Consider cost broadly, otherwise you might just be shifting complexity around
- use shared infrastructure
- if you talk to another service: use exponential back-off, use timeouts (and do
  something sensible with it!), think about failure modes. Doing something is better than doing nothing generally speaking

Warning: if you share everything and consolidate too much, you're sacrificing flexibility, so don't do it too early. When do you consolidate? Pick your moment, be conservative -- avoid building new systems wherever possible.

**Make boring infrastructure choices.** Those usually holds longest in time.

Shared systems require coordination. It's not enough just to build it, you have
to move existing workloads.

Systems should protect themselves (Google's DDOS attacks comes from inside!).
You don't want to have a system where every user interacting with it has to file
a ticket either, so AUTOMATE and build defense mechanisms early.

Second systems: cake or death?
- Iterate early and often when you build a second system
- if your second system doesn't unlock new capabilities, don't do it. Big
  changes require long lead times.
- move the biggest customer first to the new, second system. If that doesn't
  work, your new system won't be a success.

Generally speaking: don't let the weeds get higher than the garden.<br>
Invest in your tools, keep an eye out for complexity and time sink and **take care of your people**.

There's no victory. It's an ongoing game.

## Not your Parents' Microsoft<br>★☆☆☆☆
**Jessica DeVita, Microsoft**

Marketing talk about Azure and how Microsoft is doing "cool" things now. No
content at all. Entertaining I guess, they had some good memes in there.

## Prevent rather than fix<br>★☆☆☆☆
**Jason Ding, Salesforce**

When you have customers of different sizes...scope/plan/test/optimize.
Talk is about how you should test and plan before taking on large customers...yup!
Got it. Thanks.

##A practical type of Empathy<br>★★★☆☆
**Indi Young**

A broader range of ideas pop up when you solicit input from other people.

How do you do this? Empathy.<br>
Empathy is a hot buzzword. It just means: be more sensitive.

There are several kinds of empathy:
- mirrored empathy: somebody smiles at you, you automatically smile back
- personal distress: identifying with someone who goes through a bad moment
- emotional empathy: a friend tells you some good news, you feel happy! Although
  really powerful, this kind of empathy is not repeatable. It either happens or
  doesn't. When it happens it's great though!
- cognitive empathy: understand what went through a person's mind and what
  happened over time. You can make that happen. It's repeatable, reliable and
  has structure and viable purpose. Words are unreliable on the surface
  (opinions, preference, explanation) because they vary with mood, interlocutor,
  etc. Words **are** reliable when it comes to reasoning, reaction and guiding
  principles. If you dig beneath the surface for the reasoning, there is much
  more clarity of meaning.

Instead of checking, thinking and making (usual cycle when you chew on an
engineering problem): try listening, then walking in that person's shoes, then
let that simmer for a bit. You'll be surprised at the number of new ideas!

You have to **listen** to develop empathy.

Interesting idea: try to do your 1-1s on the phone to prevent fear of talking,
assumptions and immediate reactions. It'll prevent the conversation from
steering too much.

Talk by Twitter
## Stream processing and anomaly detection @Twitter<br>★☆☆☆☆
**Arun Kejariwal and Sailesh Mittal, Twitter**

Real-time analytics: streaming or interactive? You have two different
architectures possible as a result.

Real-time means different things for different people (wall-street real-time is
insane)

Storm is a streaming platform for analyzing real-time data as it arrives
We already use storm at Yelp. Womp womp, wrong talk to attend :/

## Visualizing performance data in engaging ways<br>★★★☆☆
**Mark Zeman, SpeedCurve**

We implicitly recognize and seek out patterns, textures and colors. Try to make
your visualizations more interesting!

Sick demos at [SpeedCurve Lab](http://lab.speedcurve.com).


## Crafting Performance alerting tools<br>★★★★☆
**Allison McKnight, Etsy**

Story of how Etsy added performance monitoring tools.

Etsy is PHP on the backend. They monitor backend with `phptime`, aggregate with [Logster](https://github.com/etsy/logster)

At first performance monitoring was done through dashboard. Dashboards are good, but they have problems:
- too many graphs
- people pushing code don't have time to look at graphs

Solution: monitoring!!

**First iteration**: email top 5 slowest pages. <br>
Cons: didn't catch regressions on fast pages, the ones that people actually care about optimizing

**Second iteration**: perf regression report <br>
Cons: didn't catch small/slow-creep regressions, difficult to tune, alert fatigue (which regressions are meaningful?)

**Third Iteration**: change alerting mechanism! Instead of email, use Nagios! <br>
Cons: alerts were hard to read

**Fourth Iteration**: change format with [Nagios Heralds](https://github.com/etsy/nagios-herald), to add context to Nagios alerts. Also, added relevant timing graphs to the email (past 1hr/24hrs) <br>
Cons: lots of false positives on downstream services affecting top level alerts
(if payment processor is slow, yes, payment flows are gonna be slow but there's
nothing you can do about it!)

**Fifth Iteration**: use Nagios service dependencies to cut down on non actionable alerts
Cons: why do I have to use my mouse or my email for things?

**Sixth Iteration**: Improving sleuthing tools, Graphing integrated with IRC bot (!!)

**Next up**: alerting on perf improvements to celebrate more.


## Maintaining the biggest machine in the world with mobile apps<br>★★☆☆☆
**Lukasz Pater, CERN**

What is CERN? The world's largest reserach center for particle physics.<br>
Also, the place where the web was born.

Large Hadon Collider, or LHC is millions of high-tech components installed in a
27km long circular tunnel.

Infor EAM is used throughout the whole organization to support asset management
With 1000+ users working in the field, simple and mobile interfaces are vital.

Mobile strategy?
- Native "one size fits all" application: didn't work that great because a lot
  of use cases couldn't be foreseen and it was tied to expensive hardware (the
  actual phones)
- native applications for specific user tasks work great
- HTML5 web applications for everything else!

On the backend: Infor EAP, then a middle server that does all the mobile
friendly stuff like compression, checksumming, caching, logging, web sockets,
etc.

Mobile clients then make use of HTML5 features like `localStorage` and `appcache` to be able to function in tunnel when technicians do maintenance.

Then talk steered towards how JS is not Java, and how jQuery is great. Wat. It
went downhill from there.

Conclusion: HTML5 is great, let's hope JS gets more standardized. Wow. Really.

## Performance for the next billion<br>★★★★☆
**Bruce Lawson, Opera**

How will the next billion Internet users come online? Asia, Africa.

Number of people in asia: 4 billions.

Indonesia is the 3rd top user of Facebook, yet they are still stuck with 2G
connections!

India is also growing super fast from 400 million internet users today to 900
millions in 2018.

We have more and more low end devices coming online. Those markets aren't
dominated by iPhones and high end Android devices. Websites have to be
performant on lower end devices because that's what Asia and Africa use and will
continue to use.

Apps don't scale in those markets. Websites are the only solution to propagate
updates faster.<br>
Solution: installable web apps through web manifest specification. Apple has
been doing it in a non-standard way for a long time. Now you can do it on
Android and Opera browsers.

In rich nations, 1-2% of income is spent on internet connectivity.
In developing nations, up to **10%** of income is spent on connectivity. We
cannot waste people's money with large images. Instead, serve the right images
for each device! Use responsive images (`<picture>`, `srcset`.)

Opera mini is a proxy browser used heavily in India/Africa to solve this exact
problem: get users decent access to the web. How it works? Opera renders
websites on the server, then proxies rendered websites to low-end devices.

"Doesn't matter how smart your phone is if your network is dumb"

## Great. You're a software company. Now what?<br>★☆☆☆☆
**Patrick Lightbody, New Relic**

Talk about Chipotle's burrito button on the Apple Watch and how this changes
everything.

"Every company is now a software company."

History of monitoring:
- 80s/90s: on the server
- 2000s: on the apps
- today: on the users
- tomorrow: on the business

"Fast isn't enough, we need to delight users."


## Twenty Thousand Leagues Inside the optical fiber<br>★★★☆☆
**Ariya Hidayat, Shape Security**

This talk was about the history of optical fiber.

At first: talk! Sound waves.
As people are further and further away, they naturally tend to switch to visual
communication (light waves!) like semaphores, smoke signals, lighting signals.

Bell invented the photophone but instead, telephone took off and radio took over
the world.

It's not until the invention of Laser light that light-based communication
became popular again. Very popular. Now optical fiber is what everything runs
on. The amount of data we can send through one optical fiber is mind-boggling.

How? Since Laser light is monochromatic, modulations (amplitude, frequency) are
possible, but also multiplexing (by having multiple colors sent through the same
optical fiber.

"I have seen further, it is by standing on the shoulders of giants." -- Isaac
Newton.

## Beyond the Hype Cycle<br>★★☆☆☆
**Shane Evans, HP**

Talk about the entreprise and how HP is helping them move the needle. QA and
testing budgets have gone up from 18% to 30%. Yet a prime factor that hinders agile in enterprise is lack of testing.

Unicorn, horses and mules (respectively early, mid-range and late adopters).
Mules are companies engineers hate (late adopters), yet people rely on them more
than any other company.

How to move forward in enterprise?
1. Build smarter automation
2. Address the legacy
3. Think about process and scalability

## Overcoming the challenges of image delivery<br>★★★☆☆
**Mohammed Aboui-magd, Akamai**

Users demand better images. Users love images. Web pages are getting heavier and
heavier.

Number of images served by Akamai per day: 0.75 trillion

If you want to do it right you need a version of an image for each:
- user agent
- screen size
- connection type

That's A LOT of different images to pre-generate, store, manage and serve
dynamically. How do you manage that complexity?

Akamai does just that. (talk ended on that, no solutions given...kinda sucks.)


## Reflections on mountain moving, from the first year of USDS<br>★★★☆☆
**Mikey Deckerson, US Digital Service administrator**

Talk about bureaucracy. Bureaucracy is a word everyone hates but it's really
just what happens when a large group of people have to take a decision that
matters. Saying "my office has no bureaucracy" is like saying "my town has no
climate". At best, the climate doesn't affect you, but it's still there.

Rules to deal with bureaucracy:
- The simpler your message/statement the better
- Open data is rad because other people get to build stuff instead of you
- Open source is rad because you get to use other people's stuff instead of
  building it
- The bigger you can pitch your tent the better. Get as many stakeholders
  onboard as possible. They will either be part of the solution or part of the
  problem.
- Make it possible for people who have been part of the problems to be part of
  the solution.

Closing wish: apply your human capital to healthcare, education, or energy.
Those are the things that matter.

## Measurement is not enough<br>★☆☆☆☆
Buddy brewer, SOASTA

Performance means very different things to different people.

You have to find relationships between the data to establish relationship between people.

## Recruiting for Diversity in Tech<br>★★★☆☆
**Laine Campbell, Pythian**

Diversity is a goal unto itself
- assume good intentions
- create a culture of forgiveness
- don't be afraid to speak up, call out and engage
- recognize privileges and implicit biases as real

There are two types of diversity:
- Inherent diversity (nationality, religious, gender, age, sexual orientation,
race,...)
- Aquired diversity (been to military? Which school/university?...)

**Meritocracy is bullshit**. It doesn't work because of implicit biaises. That's
why a ridiculously small amount number of women lead open source projects.
People nominate people they're comfortable with. They don't make the choice of
diversity unless they're forced or at least incentivized to.

Instead, create goals, enforce and track them!

Inbound recruiting is bad for diversity. Do outbound recruiting (meetups, online
groups, linkedin, ...)

Have a code of conduct and enforce it!
- mistakes are forgiven when intentions are good
- hatred, insults and anger get shut down
- education is encouraged
- don't let individuals be isolated

Just try it: eliminate names and pictures from applications. Anonymize online
handles and technical test results. It'll help you build balanced and diverse
teams.

## Reaching everywhere<br>★★★☆☆
**Tim Kadleck, Akamai**

This talk was about how Radio Free Europe responsive site was built with
performance in mind.

Accessing Radio Free europe is punishable by death in certain country like
Iran.<br>
Our internet is **not** their internet.

2099KB is the average page size now. This is not acceptable when they are
accessed over very slow networks.

"The future is already here--it's just not very evenly distributed"

We have to be performant by default. How? Set a performance budget.

20% rule: most people don't notice that it's faster unless it's at least 20%
faster.

Goal set for Radio Free Europe: visually complete in less than 4000ms.

Tips to feel performance as you develop:
- Network throttling on your laptop
- Perf budget enforced at the build process
- display perf number for every page prominently: green for good, red for bad

Other tools for performance:
- `grunt-penthouse` for critical CSS (`grunt-critical-css` works too)
- use SVG sprites. One `<svg>` elements and several `<use>` to include icons
- progressive enhancement by "cutting the mustard". If cuts the mustard, then
  use `loadCSS`, `loadJS`. Otherwise, don't bother! This lets you have a high
  dynamic range (difference between the largest size and the smallest size)

## Mobile image processing<br>★★★★☆

Today, 1.8 billion photos per day are taken.
They also add up to 62.4% of the average webpage!

We usually don't think about it, but browsers have to perform a lot of work to
display an image:
- request
- decode
- copy to GPU
- display

To decode an image, we have to reverse the process of encoding an image. How are
JPEGS encoded?
- RGB to YUV
- Chroma subsamplig
- CDT quantization
- Huffman encoding

You can view this on `chrome://tracing` or in Firefox at `about:memory`. Just capture your page loading and search
for `DecodeAndSampling`.

Decoding images takes a LOT more time to do when images are too big for the
requested display size. If the size fits: 5ms. If it's twice the size: 30ms. If
the image is six times bigger: 200-300ms!

Mind your fancy hero images. Please please resize your images!

Badly sized images are impacting:
- memory
- battery
- life of device
- CPU/GPU overhead

Talk about chroma subsampling. What the heck is this? Interesting stuff (4:4:4
vs 4:2:2 vs 4:2:0). Basically 4 pixels can be condensed by just taking 2 samples
of color (or one) within them.

IE led the charge on offloading chroma upsampling (the step that reverses subsampling) to the GPU. With this, decoding images takes less time. Still, resize images!

Takeaways:
- Resize images
- use small breakpoints for large images
- meta viewport is your friend
- use 4:2:0 subsampling when possible
- image size divisible by 8 compress better


## Building the new fast MSN<br>★★★☆☆
**Amiya Gupta, Microsoft**

[Link to slides](http://1drv.ms/1JZlYLc)

Several types of optimizations.

Basic:
- domain sharding
- concatenation
- Gzip
- spriting
- etc


Intermediate:
- async scripts
- DNS prefetch
- single jQuery URL
- lazy load images below the fold

Advanced. Let's talk about those.

How Microsoft quantifies perceived performance: not speed index, not page phase
time (rate of change of pixels displayed on the screen over time)

Microsoft's approach to visual metrics:
- first render
- hero image render
- above fold render
- ad render

Basically, not one number but several, to help narrow down where the regression
might be. Also, heavy use of user timing markers to identify problems. They are
displayed in the timeline view in IE's F12 tools.

Lessons learned:
- network isn't always the bottleneck
- looking at the waterfall isn't enough
- CPU cycles spent on repeated layout/styling operations
- Forced layout operations: the silent killer

What is a forced layout operation? How does it happen?
1. Invalidate a section of the display tree through DOM or style
   updates
2. Read property under that tree when invalidated: e.g.
   `clientWidth`, `getBoundingClientRect`, etc

How to fix?
- batch writes together
- avoid client-side inserts if they can be included server-side (client-side
  templating is bad for performance. Avoid it!)
- execute reads before writes
- schedule read and write operations with `requestAnimationFrame`
- move operations into the head or outside the DOM whenever possible

Caution! HTTP2 is coming!! With HTTP2 all of the following are anti-patterns:
- cookie-less domains
- CSS and JS bundling
- domain sharding
- image spriting

## TCP and the lower bound of web performance<br>★★★★★
**John Rauser, Pinterest**

Talk about how the web works. Very, very good talk. Nicely delivered.

[Link to
Slides](http://cdn.oreillystatic.com/en/assets/1/event/44/TCP%20and%20the%20Lower%20Bound%20of%20Web%20Performance%20Presentation.pdf)

Stuart Cheshire said:
- Making more bandwidth is easy
- Once you have bad latency, you're stuck with it

Let's take the example of Seattle/New York latency. If those two cities were
linked with a single, continuous piece of optical fiber, the theoretical latency
would be 37ms.

Now, what's the actual Seattle/NYC latency? 90ms. Only a factor of 2! The point
is: we've already done a pretty good job at reducing latency. Latency is going
to be there no matter what we do and what protocol we use.

Now, story about TCP/IP, the protocol which rules the web today.

Early days of the telephone: people were connected to each other physically,
with operators operating switching. One conversation was going on in each
circuit.

With a digital form of communication we switched to packet switched networks:
messages are broken down into packets, and packets of different messages can be
interleaved into the same circuit. This allows for a lot of multiplexing and a
better utilization rate of our networking infrastructure.

But there's no free lunch: for packet switched networks, you need congestion
control!

RFC 793 is the initial TCP/IP RFC: reliability is implemented via ACKs, flow control is implemented through the concept of TCP window.

In October 1986 a series of congestion collapses hit the ARPA net. John Nagles,
in RFC 896 describes the problem really well. Van Jacobson later on, through his
research comes up with the concept of TCP slow start.

Later on, delayed ACK is proposed in RFC 813, reasoning being that immediate
ACKs are a ton of extra overhead in most cases.

RFC 1122 recommends/codified both TCP slow start and delayed ACK, in 1989.

With those two things in place, network latency strictly limits the throughput
of new TCP connection!

Takeaways:
- Make sure you set your initial congestion window to more than 3
- Mind your cookies!
- Download small assets first
- Accept the speed of light. It's not going away anytime soon.
