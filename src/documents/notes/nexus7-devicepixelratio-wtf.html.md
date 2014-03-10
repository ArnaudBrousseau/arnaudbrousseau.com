---
title: "WTF is Nexus7 doing with devicePixelRatio?"
date: 2012-07-24
layout: "note"
activeNavItem: "notes"
---
What is devicePixelRatio?
-------------------------
"devicePixelRatio" is a JavaScript property used to determine the pixel density of a device.

Why does that matter?
---------------------
As a web developer working on a mobile product (disclaimer: I work for Yelp on
the mobile site team), I care a lot about how websites are displayed on mobile
devices.
Very often we fallback to JS to serve the best experience for each device, and
there are a couple of areas where JS is required if you want to take advantage
of the new display capabilities.

1. Responsive images
Example: http://menacingcloud.com/?c=highPixelDensityDisplays

2. Canvas based interaction
http://www.html5rocks.com/en/tutorials/canvas/hidpi/

3. Many other reasons including image loading, browser height sniffing, etc.

Nexus7: what did you do buddy?
------------------------------
Nexus7 reports a devicePixelRatio value of 1.3250000476837158. You read right.
