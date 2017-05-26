---
title: "TIL: shred"
date: 2017-05-26
layout: "note"
activeNavItem: "notes"
---

Ever wondered about `rm` and how file recovery utilities might or might not be able to bring delete files?
I recently stumbled upon `shred`, a Unix coreutil to lower the chance of recovery. Here's the exciting excerpt

> Ordinarily when you remove a file (see rm invocation), the data is not actually destroyed. Only the index listing where the file is stored is destroyed, and the storage is made available for reuse. There are undelete utilities that will attempt to reconstruct the index and can bring the file back if the parts were not reused.
>
> On a busy system with a nearly-full drive, space can get reused in a few seconds. But there is no way to know for sure. If you have sensitive data, you may want to be sure that recovery is not possible by actually overwriting the file with non-sensitive data.
>
> However, even after doing that, it is possible to take the disk back to a laboratory and use a lot of sensitive (and expensive) equipment to look for the faint “echoes” of the original data underneath the overwritten data. If the data has only been overwritten once, it’s not even that hard.
>
> The best way to remove something irretrievably is to destroy the media it’s on with acid, melt it down, or the like. For cheap removable media like floppy disks, this is the preferred method. However, hard drives are expensive and hard to melt, so the shred utility tries to achieve a similar effect non-destructively.
>
> This uses many overwrite passes, with the data patterns chosen to maximize the damage they do to the old data. While this will work on floppies, the patterns are designed for best effect on hard drives.

See [shred](https://www.gnu.org/software/coreutils/manual/coreutils.html#shred-invocation) for the complete manual, or type `man shred`! Checkout [this paper](https://www.cs.auckland.ac.nz/~pgut001/pubs/secure_del.html) if you're into the nitty-gritty details.
