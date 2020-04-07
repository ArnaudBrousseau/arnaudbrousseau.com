---
title: "Creating a Browser Language"
date: 2013-10-23
---
## Context
During a Hackathon, a coworker and me decided to tackle the problem of creating
a new language which runs in the browser. Our end goal: be able to write script
elements in our language and have the  browser run it for us, in realtime.

## Goals
None of us is a static compiler/JIT expert so the way we went about it is:
- Create a toy language and its toy lexer/compiler
- Make our toy language compile to [LLVM](http://llvm.org/)
- Use LLVM's tools to take advantage of the JIT
- Run our language is Chrome (29+) thanks to [PNaCl](http://www.chromium.org/nativeclient/pnacl)

Hackathons at Yelp last 2 days. That's not much time. To prepare ourselves for
these 48 hours and to make them as productive as they could be, we set up our
environment first.

## Setting up LLVM environment
I'm usually developing on a MacBoook, so I tried first to setup llvm and
friends on my local machine. Huge failure, for which I don't have a solution
yet.

### On OSX
MacOSX makes you install XCode to install compiler tools like gcc or g++.
Com'on Apple, really?  
XCode also comes with some version of llvm installed. As a result executing
`locate llvm | wc -l` yields `610` on my machine. Basically some sort of tools
for llvm is installed with XCode and each version of the iPhone simulator, and
also macports. No idea why those were here in the first place.

Since I had no idea what version of the tools I should go with I decided to go
the hard route and install everything from source in my homedir, following
instructions from the [LLVM getting started
page](http://llvm.org/docs/GettingStarted.html)

<pre class="brush:plain">
    cd ~/bin/
    mkdir llvm
    cd llvm/
    svn co http://llvm.org/svn/llvm-project/llvm/trunk llvm
    cd llvm/tools/
    svn co http://llvm.org/svn/llvm-project/cfe/trunk clang
    cd ../projects/
    svn co http://llvm.org/svn/llvm-project/compiler-rt/trunk compiler-rt
    svn co http://llvm.org/svn/llvm-project/test-suite/trunk test-suite
    cd ../../
    mkdir build
    cd build/
    ../llvm/configure --prefix=/Users/abrousse/bin/llvm
    make -j10
</pre>

The listing above generated lots of output, consumed lots of my CPU, and ended with an error:

<pre class="brush:plain">
    /Users/abrousse/bin/llvm/llvm/projects/compiler-rt/lib/asan/asan_malloc_mac.cc:19:10: fatal error: 'CoreFoundation/CFBase.h' file not found
    #include <CoreFoundation/CFBase.h>
             ^
      COMPILE:   clang_darwin/asan_osx_dynamic/i386: /Users/abrousse/bin/llvm/llvm/projects/compiler-rt/lib/asan/asan_posix.cc
      COMPILE:   clang_darwin/asan_osx_dynamic/i386: /Users/abrousse/bin/llvm/llvm/projects/compiler-rt/lib/asan/asan_preinit.cc
      COMPILE:   clang_darwin/asan_osx_dynamic/i386: /Users/abrousse/bin/llvm/llvm/projects/compiler-rt/lib/asan/asan_report.cc
      COMPILE:   clang_darwin/asan_osx_dynamic/i386: /Users/abrousse/bin/llvm/llvm/projects/compiler-rt/lib/asan/asan_rtl.cc
      COMPILE:   clang_darwin/asan_osx_dynamic/i386: /Users/abrousse/bin/llvm/llvm/projects/compiler-rt/lib/asan/asan_stack.cc
      COMPILE:   clang_darwin/asan_osx_dynamic/i386: /Users/abrousse/bin/llvm/llvm/projects/compiler-rt/lib/asan/asan_stats.cc
    1 error generated.
    make[5]: *** [/Users/abrousse/bin/llvm/build/tools/clang/runtime/compiler-rt/clang_darwin/asan_osx_dynamic/i386/SubDir.lib__asan/asan_malloc_mac.o] Error 1
    make[5]: *** Waiting for unfinished jobs....
    make[4]: *** [BuildRuntimeLibraries] Error 2
    rm /Users/abrousse/bin/llvm/build/Debug+Asserts/lib/clang/3.4/lib/darwin/.dir
    make[3]: *** [compiler-rt/.makeall] Error 2
    make[2]: *** [all] Error 1
    make[1]: *** [clang/.makeall] Error 2
    make: *** [all] Error 1
</pre>

So, fuckit. Another dead end. I'm suspecting all revisions from clang, llvm and
other projects aren't tested together that often. I think something to try next
would be checking out release-tagged revisions instead of the latest master
from each project. WHY THE HELL DON'T THEY HAVE SUBMODULES? That drives me
nuts.

### On Ubuntu
Solution for me was to install things from a Ubuntu VM. Package management is
saner, and installing llvm is a piece of cake:
<pre class="brush:plain">
    sudo apt-get install llvm
</pre>

All done! Just check that the output of `llvm --version` gives you 3.0 and
you're good to go.

### Back to OSX
Back to OSX. I tried what's on the [release
page](http://llvm.org/releases/download.html), where they have precompiled
binaries for OSX. On my version of OSX (10.7.5), LLVM 3.3 didn't work properly.
Building the 3.0 tools worked properly with what's in
https://github.com/bukzor/hackathon2013.7 (check out the `macosx branch`).


## Goals 2.0
_End goal: Do hypercube animation by writing a `<script src="woot.bl" type="application/x-bogolisp">...</script>`_

Sub-goals:

- (optional) Chrome extension to parse and evaluate what's in the script tags
- Lexer with tests -- converts string to tokens, also known as scanner
- Parser with tests -- converts tokens to AST
- Runtime/Interpreter -- Uses AST to run the program in the browser
- (optional) Compiler -- converts AST to asm.js

## Results
We worked in the open, at https://github.com/bukzor/hackathon2013.7.  
Wanna try it out? http://bukzor.github.io/hackathon2013.7/
