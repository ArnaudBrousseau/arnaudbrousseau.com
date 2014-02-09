What is devicePixelRatio?
-------------------------
"devicePixelRatio" is a JavaScript property used to determine the pixel density of a device.

Why does that matter?
---------------------
As a web developer working on a mobile product (disclaimer: I work for Yelp, on
the mobile site team), I care a lot about how websites are displayed on mobile
devices.
Very often we fallback to JS to serve the best experience for each device, and
are a couple of areas where JS is required if you want to accomodate the new
displays available for smartphones.

1. Responsive images
Example: http://menacingcloud.com/?c=highPixelDensityDisplays

2. Canvas based interaction
http://www.html5rocks.com/en/tutorials/canvas/hidpi/


Various reasons, including image loading, browser height sniffing, etc.

Nexus7, or how this can go wrong
--------------------------------
Nexus7 reports a devicePixelRatio value of 1.3250000476837158. You read right.
