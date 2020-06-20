---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
---

# H1 Title

## H2 Title

Some text

> This is a quote

And there

* is
* a
* list

## Pics

![Bobas before cooking](/img/boba-resting.jpg)

## Math!
<script> MathJax = { loader: { load: ['input/asciimath', 'output/chtml'] } }; </script>
<script type="text/javascript" src="/js/mathjax/tex-chtml.js" id="MathJax-script" async></script>

\`(:(:(n),(k):):)=(:(n+k-1),(k):)=((n+k-1)!)/(k!xx(n-1)!)\`

## Code!

<pre class="brush: js">
    function blah() { console.log('called'); }
</pre>
