This is my summary of the book "Working Effectively with Legacy Code" by
Michael C. Feathers.

Gist of the book
----------------
> Legacy code is untested code.  
> Bad code is untested code.  
> Even good, untested code is bad code.  
> Write tests. Write code. Write more tests. Write more code. Write more tests.

Did you say TDD?

Yes, this book is about tests. It introduces some vocabulary to talk about tests, then actually talk about tests by looking at specific use cases. It specifically looks at legacy use cases, where putting a piece of code under test can lead to a lot of stress.

Introduction to new concepts
----------------------------
If you're new to TDD, and if you're never written tests before you probably
have some catchup to do on vocabulary. This book introduces those potentially
new concept pretty well.

### Test harness ###
A test harness is a piece of code written to exercice some piece of software.

### Sensing ###
Getting access to internals of a piece of software. Think about loop indexes
fot instance. Or internal state of an object. Things that you usually have to
print out in order to debug your program.

### Fake and mock objects ###
A fake object is an object to enable test harness. It basically exists in place
of a real object, for instance a DB connection.  
A mock object is a fake object containing assertions.

### Seams ###
A place where a program's behavior can be changed without editing it.  
For instance:
- preprocessing seam
- link seam
- object seam
Every seam has an enabling point (classpath, call to a method, etc).

### Pinch points ###
A pinch point is a point where tests can detect change in meny methods at the
same time.

### Characterization tests ###
Tests that describe the behavior of the piece of software in its harness.

Sprouts
---------
Sprouting refers to a technique aiming at extracting new behavior to a new
method ("sprout method") or class ("sprout class").

Wraps
-----
Wrapping a method ("Wrap method") or a class ("Wrap class") refers to the
process of encapsulation or decoration to add new behavior to legacy code.

In the case of the Wrap Method, the new behavior is implemented in a `new`
method, and the old function calls the new one, so that new behavior will be
called by `old(new())`.  
The Wrap Class is really similar: the new class inherits from the old one and
adds the new behavior required.

Dependency inversion principle
------------------------------
Code should depend on interface, not implementation.

Open/Closed principle
---------------------
A piece of code should be open for extension but closed for modification, which
basically means a good design doesn't require to change much code: you just
have to write new code for a new feature.

How should you develop a new feature?
-------------------------------------
TDD + programming by difference (subclass and override behavior).  
Gotcha: "Liskov Substitution Principle" — avoid overiding concrete methods. The
ideal hierarchy is a hierarchy where no class overides one of its parents'
methods. You can achieve that via abstract classes and inheritance from
interfaces instead.

I can't get this class into a test harness
------------------------------------------
Extract interface and subclass into a test. That's how you can get around
annoying params.

I can't run this method into a test harness
-------------------------------------------
First, ask yourself if you should run this method to begin with. You should
avoid testing private methods. Test public interfaces or make a private method
public if you really need to test it.  
Cheap solution to test a private method: make it protected and subclass.

Command/Query separation principle
----------------------------------
A "query" method is a method that has no side effect and returns a value.  
A "command" method is a method that has side effect and returns no value.  

The "Command/Query separation principle" simply dictates that a method
shouldn't be a query and a command at the same time.

Finding test points
-------------------
Learning to reason about effects, draw effect stucture and find pinch points.
Make sure to include subclasses and other callers in the system to have a full
picture.

I don't know what tests to write
--------------------------------
If you're working with legacy code, write characterization tests:
- aim for piece of logic, don't hesitate to make use of sensing variables
- think about the responsabilities of your code and cber what can go wrong
- test extreme values of inputs
- try to look for and expose invariant

I don't understand the code well enough to change it
----------------------------------------------------
If you don't understand the code well enough, here are a couple of things you can try:
- print the code and try to make sense of it
- scratch refactoring: just experiment with refactoring the code, make it run...but don't commit!
- look for, and delete unused code

Dealing with big classes
------------------------
The problem with big classes is that they tend to be confusing, not well-tested
(because they ARE a pain to test), and extremely hard to change since intance
variable can make any refactor affect the whole class.

### Single Responsability Principle ###
Every class should have a single responsibility: it should have a single
purpose in the system, and there should be only one reason to change it.

### Heuristics to break a monster class ###
Several heuristics are listed in this chapter:
- Group methods together. Look at names to give you hints about what methods
  should go together. Try to look for instance var reuse
- Look at hidden methods (protected or private). They often indicate that
  another class should emerge.
- Try to think of decisions that can change. This is a hard one, but try to see
  hard-coded decisions in the class. Now make them configurable.
- Point out internal relations or isolations. Very often, instance variable are
  used by parts of a class, but not by another.
- Describe the responsability of that monster class as a single sentence. Write
  it as a comment at the top of the file, and cut what's not relevant in
  another class. Quite drastic.
- Scratch refactoring: let your imagination flow and edit some code. Don't
  commit.
- Focus on your work (new feature) and evaluate how this impacts this class'
  responsability. Hopefully you'll see things through a new lens.

### Interface Segregation Principle ###
When a class is really large, the other parts of the system interacting with it
rarely need to use all its methods at once. So we can use different groupings
of methods to "segregate" the clients. The way to do it is to define those
groupings as interface and make the monster class implement them all. That will
bring isolation between the large class and the rest of the system.

Dealing with big methods
------------------------
Big methods are kind of the same as big classes. They should be avoided because
monster methods are complex, confusing, hard to test and really difficult to
change.

Two kinds of big methods out here: bulleted methods and snarled methos. A
bulleted method is a method having a flat structure. It's basically saying: do
A, then do B, then do C, etc. Snarled methods are worst because they have
conditionals, and loops mixed in. Their structure is dominated by indented
blocks, which makes them far less readable.

Misc
----
- A "slow" test is a test that takes 0.1s to run or more.
- Abbreviations are okay when they're used consistently, but they are generally
  a bad idea. Try not to abbreviate when you can avoid it.
