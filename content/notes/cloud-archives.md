---
title: "Cloud Archives"
date: 2020-06-20T11:38:00-07:00
---

# Cloud Archives

I've wanted to dig into my stack of "important" papers and sort through them
for a while. Why? Because of a moderate to high fear that some will burn, get
damaged or lost in some way, maybe stolen or misplaced. Who knows.

Here's what I decided to do: archive them all digitally. Let's walk through how.

## Capturing

A table with ambiant lighting works best. I use my phone's camera (Pixel 2) to
capture everything.

## Uploading

This happens automatically with Google Photos. Nice.

## Archiving

I then hop on my laptop (the one I'm using to write this), download these
photos, correct for orientation if needed.

Then I drop these photos into well-named Dropbox folders. To save on space I
use [ImageMagick](https://www.imagemagick.org/Usage/resize/):

    $ magick mogrify -resize 1280x1280\> -quality 80 /Users/arnaud/path/to/dropbox/folder/*.jpg

The command above resizes all jpg images in the target folder such that they
have a max witdth of 1280px, a max height of 1280px, and a jpeg quality of 80.
This saves a ton of disk space (my Pixel 2 camera spits out images with an
insane quality (typically 3-4MB per picture)

## Conclusion

Pretty easy right? Just do it, your future self will thank you.
