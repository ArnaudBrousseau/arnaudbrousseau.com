---
title: "Deep Dive Into JavaScript Errors"
date: 2014-04-27
layout: "note"
activeNavItem: "notes"
---
## What is a JavaScript Error


## Catching JavaScript Errors
### Exceptions
### Events listeners
### Direct Reporting

## Code Instrumentation

## Initialization vs. Runtime

## Reporting Mechanisms
### Immediate POST
### Queuing Reports
### Throttling

## Filtering
## Reporting Mechanisms

## Components of a JavaScript Monitoring System
- solid reporting
- flood prevention
- information gathering and enhancement
- consistency
- filtering, bucketing

# The future of JS errors
https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
https://developers.google.com/chrome-developer-tools/docs/javascript-debugging#source-maps
https://github.com/mozilla/source-map/
http://fitzgeraldnick.com/weblog/55/

https://github.com/occ/TraceKit

## Links & References
https://www.youtube.com/watch?v=4Tys-VuBPgo
http://davidwalsh.name/track-errors-google-analytics

http://dailyjs.com/2014/01/30/exception-error/

Navigation error logging
https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/Fo7szw0rmwc

Good writeup on subclassing native types in JS:
http://speakingjs.com/es5/ch28.html

MDN Docs
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FURIError

JS built in objects -- What's the error constructor?
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#Error_constructors

DOMException, DOMError -- WTF is that? All the same?
https://developer.mozilla.org/en-US/docs/Web/API/DOMException
https://developer.mozilla.org/en-US/docs/Web/API/DOMError

Some research from errorception
http://blog.errorception.com/2013/02/error-object-compatibility-table.html

Interesting threads on es-discuss
https://mail.mozilla.org/pipermail/es-discuss/2013-July/031677.html
https://mail.mozilla.org/pipermail/es-discuss/2013-July/thread.html#31677

Spec -- what DOMError should be
http://dom.spec.whatwg.org/#concept-domerror

Debugger API, by Mozilla
https://wiki.mozilla.org/Debugger

Error stack strawman. Sort of abandoned.
We need a new way forward for stacktrace reporting.
http://wiki.ecmascript.org/doku.php?id=strawman:error_stack

Node's error domains/realms
http://nodejs.org/api/domain.html
(see also Dart's domains)
https://github.com/btford/zone.js/

https://mikewest.org/2013/08/debugging-runtime-errors-with-window-onerror
http://code.google.com/p/chromium/issues/detail?id=147127

http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/
