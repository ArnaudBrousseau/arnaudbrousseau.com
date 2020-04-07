---
title: "Vim Tips"
date: 2014-02-09
---

Here are some nice tips and tricks I learned while practicing VIM at work or at
home.

## Setting VIM's syntax highlighter to a particular language
The answer is a single command: `setf`  
(`setf markdown`, `setf javascript`, etc)

## Look up docs about a function, a command, anything
When your cursor is on a word, press shift+K.

## Delete efficiently
`dtx` => __d__eletes un__t__il `x` (NOT including character `x`). It's super useful to delete until the next parens. For instance: `dt)` or `dt{`  
`ctx` => lets you go to insert mode after deletion (__c__hange vs __d__elete)

## Ctags
Ctags are pretty old fashioned but they work surprisingly well. I use them
mostly at work when diving into unfamiliar Python code.  
`ctrl+]` lets you lookup a symbol, `ctrl+T` brings you back to where you were.

## Autocomplete
Vim has native autocomplete!  
`ctrl+N` to trigger autocomplete and `ctrl+N`/`ctrl+P` to iterate over
suggestions. By default Vim searches the current file and opened buffers.

## Editing multiple files
You can start Vim and tell it to open multiple files `vim file1 file2 file2`.

Better still: when inside of Vim you can tell it to edit a bunch of files.  
Let's say I want to edit all my `.scss` file. I'd type `:args
path/to/css/files/*.scss`. Magic! Now I can do edits, and type `:wnext` to save
and switch to the next file in the list. I can also type `:args` to see which
files have/have not been edited yet.

Last tip about this: `vim -p path/to/css/files/*.scss` will open a Vim session
with all `.scss` files, each one opened in a different tab. How awesome is
that.

## `grep`ing in the current directory
One way to `grep` for things:

* In Vim, press `Ctrl+z` to go to bash
* `git grep TERM` or `grep -R TERM .`
* Select for name of file
* `fg` to come back to Vim
* `:tabe <filename>` to edit the file you're interested

I've done the above for many years and it works okay, but it has a few major
disadvantages: it doesn't bring you to the exact line that `git grep` or `grep`
found, and it involves using a trackpad or mouse to select filenames.

Here's a better way that I've been experimenting with lately:

* In Vim: `:vim /TERM/ */**`. `vim` is short for `vimgrep`. This command
  populate's vim "quickfix" list with the results of the search (we're
  searching for TERM in all files/folders of the current directory). The `j`
  flag is here to prevent `:vimgrep` from jumping to the first occurrence of
  the search (it does that by default)
* Then `:copen` to open the quickfix list. I like to open it with `:vert copen
  80` so that the list appears on a separate window, and is 80 chars wide

Bringing these altogether: `:vim /TERM/j */** | vert copen 80`. Alias this to a
shortcut and you never have to leave Vim to `grep` for things!

Note: `:grep -r TERM .` also works but this shuts Vim temporarily, and forces
you to press "Enter" after the search is done. I personally prefer `vimgrep`
because it feels like you're not exiting the editor. You can look at code the
whole time.

Another thing: if your current directory contains a large amount of files,
try adding some of them to Vim's `wildignore` (e.g. `:set
wildignore+=node_modules`) or be more specific: `vim /TERM/j src/tests/**/* |
vert copen 80`). Otherwise `vimgrep` will be slow.

## Personal .vimrc
Each vim user has to have his/her personal .vimrc. I open sourced mine on
Github, over there: https://github.com/ArnaudBrousseau/dotfiles/blob/master/vimrc
