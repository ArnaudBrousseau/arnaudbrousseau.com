---
title: "Bypassing geo-restrictions with ssh"
date: 2021-09-26T10:47:03-05:00
draft: false
---
[`ssh`](http://manpages.org/ssh) is an amazing Unix tool. One of its many
powers: bypassing geo-restrictions by acting as a forward proxy.

# Setting up a forward proxy with ssh

You will need access to a remote server to do this. I already have a
few servers I rent in different regions to host a variety of websites; the
ability to use these as proxies is pure bonus!

Without further ado here's the single `ssh` command you need to create a proxy:
```
$ ssh -D 8123 -f -C -q -N user@host
```

Let's break down the `ssh` options (extracted from the man page):
* `-D`: Specifies a local dynamic application-level port
  forwarding. This works by allocating a socket to listen to
  port on the local side. Whenever a connection is made to this
  port, the connection is forwarded over the secure channel,
  and the application protocol is then used to determine where
  to connect to from the remote machine. ssh will act as a SOCKS server.
* `-f`: Requests ssh to go to background just before command execution. This is
  useful if ssh is going to ask for passwords or passphrases, but the user
  wants it in the background
* `-N`: Do not execute a remote command. This is useful for just forwarding ports
* `-C`: Requests compression of all data. The compression algorithm is the same used by gzip
* `-q`: Quiet mode. Causes most warning and diagnostic messages to be suppressed

In practice I have two aliases to toggle proxying on and off easily:
```
alias proxyon='ssh -D 8123 -f -C -q -N user@host'
alias proxyoff='killall -v ssh'
```

# Browsing with a proxy
Once you have a local port set up to forward traffic onto a remote host,
browsing the web using it is simple.

In Firefox, go to Preferences > Network Settings > Settings > Manual Proxy
Configuration. Then fill in "localhost" and "8123". Click OK and you're good to
go!

![Firefox Preferences](/img/firefox-proxy-settings.png)

Chrome (on MacOSX) relies on system-wide proxy settings: System
Preferences > Network > Advanced > Proxies. Tick "SOCKS Proxy" and fill in
"localhost" and "8123".

![System Preferences](/img/system-proxy-settings.png)

...that's all there is to it! Goodbye geo-restrictions.
