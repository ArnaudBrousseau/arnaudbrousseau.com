---
title: "Playing with Firefly and Fitbit data"
layout: "note"
pageType: "note"
---

## Initial idea
Plot Fitbit data using Firefly, a plotting library recently open sourced by Yelp.

## Install steps
As of now, the install process is still a bit rough, but nothing you can't get away with.

    git clone https://github.com/Yelp/firefly.git
    git submodule update --init
    sudo easy_install tornado
    sudo easy_install pyyaml
    sudo easy_install simplejson
    sudo easy_install tornado

And then, you need to install RDDTool. This library is a pain to install if
you're on MAC OS X. Here's what I did:

  - Go to http://www.macports.org/install.php#pkg and download the version that suits your OS X version
  - Install mac port
  - run "sudo port install rrdtool". This will take care of all the dependancies not installed on your system
  - sudo port build rrdtool, which will give you a build version
  - `cd /opt/local/var/macports/build/*_net_rrdtool/rrdtool/work/rrdtool-1.4.7/bindings/python/`
  - sudo /opt/local/bin/python setup.py build
  - sudo /opt/local/bin/python setup.py install
  - sudo port install rrdtool

Once that's done, you can hopefully run Firefly with the following:

  python -m firefly.main --testing -c firefly.yaml.example

I personnaly had issues with the python version I was running. If you're in some
trouble see this SO thread: http://stackoverflow.com/questions/12658141/python-cannot-import-urandom-module-os-x

## Troubles
The value returned by socket.getfqdn() was awfully wrong for me. I had to hardcode stuff in main.
(firefly/main.py)
Also, even after doing that, the json encoding in the index template would cause everything to fail once again. I had to harcode things again here.
