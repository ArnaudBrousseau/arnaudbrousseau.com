
<!-- TITLE/ -->

# Extend on Class

<!-- /TITLE -->


<!-- BADGES/ -->

[![Build Status](http://img.shields.io/travis-ci/bevry/extendonclass.png?branch=master)](http://travis-ci.org/bevry/extendonclass "Check this project's build status on TravisCI")
[![NPM version](http://badge.fury.io/js/extendonclass.png)](https://npmjs.org/package/extendonclass "View this project on NPM")
[![Gittip donate button](http://img.shields.io/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Add a backbone-like extend method onto your CoffeeScript classes, making it easy for JavaScript users to extend your CoffeeScript classes

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

## Install

### [Node](http://nodejs.org/)
- Use: `require('extendonclass')`
- Install: `npm install --save extendonclass`

### [Browserify](http://browserify.org/)
- Use: `require('extendonclass')`
- Install: `npm install --save extendonclass`
- CDN URL: `//wzrd.in/bundle/extendonclass@1.0.0`

### [Ender](http://ender.jit.su/)
- Use: `require('extendonclass')`
- Install: `ender add extendonclass`

<!-- /INSTALL -->


## Usage

``` coffeescript
# Import
{extendOnClass} = require('extendonclass')

# Fixtures
class A
	name: 'default'

	constructor: (name) ->
		@name = name  if name

	@extend: extendOnClass

`
var B = A.extend({
	name: 'unknown'
});

var C = B.extend({
	constructor: function (name) {
		if ( name )  this.name = name.toUpperCase();
	}
});

# Tests
console.log('---');

var a = new A();
console.log(a.name)  // 'default'

var aa = new A('bob');
console.log(aa.name)  // 'bob'

var b = new B();
console.log(b.name)  // 'unknown'

var bb = new B('bob');
console.log(bb.name)  // 'bob'

var c = new C();
console.log(c.name)  // 'unknown'

var cc = new C('bob');
console.log(cc.name)  // 'BOB'
```


<!-- HISTORY/ -->

## History
[Discover the change history by heading on over to the `HISTORY.md` file.](https://github.com/bevry/extendonclass/blob/master/HISTORY.md#files)

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/bevry/extendonclass/blob/master/CONTRIBUTING.md#files)

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

## Backers

### Maintainers

These amazing people are maintaining this project:

- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton)

### Sponsors

No sponsors yet! Will you be the first?

[![Gittip donate button](http://img.shields.io/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")

### Contributors

No contributors yet! Will you be the first?
[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/bevry/extendonclass/blob/master/CONTRIBUTING.md#files)

<!-- /BACKERS -->


<!-- LICENSE/ -->

## License

Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT license](http://creativecommons.org/licenses/MIT/)

Copyright &copy; 2013+ Bevry Pty Ltd <us@bevry.me> (http://bevry.me)

<!-- /LICENSE -->


