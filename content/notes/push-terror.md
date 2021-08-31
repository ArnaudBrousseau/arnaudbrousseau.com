---
title: "Push Terror"
date: 2021-08-31T00:29:06-05:00
draft: false
---
I first experienced "Push Terror" in 2012. At the time I was starting my career
as an engineer, at Yelp.
Yelp was (probably still is) powered by a gigantic Python monolith called
"yelp-main". To support releasing new yelp-main versions a set of
engineers known as "pushmasters" were dedicated to the task of gathering dev
branches, merge them into a release branch, and shepherd it to production,
multiple times a day.

Push Terror describes what happens right after the final "Return" key is pressed;
right after a new yelp-main deployment is launched. Off we go, folks! Now what?
Push Terror. Pushmasters and pushees wait, anxiously. They prepare,
meticulously. The release hits production, slowly. 1%, 2%, 5%, 10%...sweating yet?
Time to prep rollback commands, pull up dashboards, tail error logs, have one more 
look at prod configs, just in case.

Experienced pushmasters would learn to vet individual changes, build a rough
mental map of what could go wrong, and ask pointed questions to new pushees.
Will this be safe to rollback? Did you remember to translate this? What about
your testing plan here?

Experienced pushees would figure out, over time, which pushmaster to lean on
when a risky change had to be deployed. Risky changes go out in the morning
push to minimize blast radius. Safe ones during main business hours. Maybe we
need a custom deployment for this because it's more risky than usual.

In the years I spent at Yelp I've dealt with Push Terror both as a pushmaster
and a pushee. It has taught me a few important, hard-to-teach skills. Let's
cover a couple of them.

The first one is preparation. As in: preparing my code and thinking through how
it's going to make it to production. How do I minimize Push Terror? Logging,
good error handling, feature toggles, a plan when database structure needs to
change, and some tickets to configure the different environments are a good
start. Oh and: a testing plan! You do not want to be figuring out which
commands to run or where to click while Push Terror is lowering your IQ by a
couple dozen points.

Second: embrace risk. I've seen a _comment update_ cause a site-wide
outage when deployed to production. "How on Earth", you ask? Unicode + Python 2
≠ Good Times. But that's besides the point. The point is: some amount of Push
Terror is healthy. You can't aim to feel 100% confident before deploying code.
You'll probably never get there because there's _always_ a chance something
will go wrong. Deployments should feel risky, because they are. Embrace this
feeling and execute on what you've prepared: pull up logs, dashboards, and
pre-written plans. Click around in the production app once your new code is
live. "Do we still have a website/app?" should be a question on your mind.
Don't take this for granted! Did anything regress? Is your feature looking good?
Is your bug actually fixed? Did anything slow down? Did error rates spike up?
And what else?

Push Terror has served me well. It's shaped my instincts about preparation and
risks over time. I hope reading this will instill a healthy dose of Push Terror
during your next production deployment. Godspeed!
