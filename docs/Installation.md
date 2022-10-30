---
title: Installation
layout: docs
---

## Officially supported platforms
Theos aims to work on, and build for, the following platforms.

**Note**: Theos is meant to be installed as a normal user, _not_ root. Similarly, Theos is meant to be run as a normal user, _not_ root.

- **[iOS](/docs/Installation-iOS.html)** on iOS 5 and up.
- **[macOS](/docs/Installation-macOS.html)** on Mavericks (10.9) and up.
- **[Linux & Windows](/docs/Installation-Linux.html)** on Linux kernel 3.16 or Windows 10 build 14393 and up.
- **[Cygwin](/docs/Installation-Cygwin.html)** (deprecated) on Windows XP and up.

Other platforms (or versions older than listed above) may work, but be aware that they are unsupported. Theos may work on them now, but it may not in future. If you think we should officially support a platform not listed here, [get in touch](https://github.com/theos/theos/issues/new).

## Updating
Theos utilises a [rolling release](https://en.wikipedia.org/wiki/Rolling_release) model, meaning the latest commit to the Git repo is the latest version of Theos available. Occasionally, you should update Theos. This can be done with:

	$THEOS/bin/update-theos

If you get a “no such file or directory” error, you’re probably using a very old version of Theos that lacks this script. As an alternative, switch to a directory containing a Theos makefile and then run:

	make update-theos

(Both commands do the same thing.)

If you experience problems, updating Theos is the first thing you should do. This makes it a lot easier to track down the problem if you ask someone for help.

If you see the following when running the command:

```
make: *** No rule to make target 'update-theos'.  Stop.
```

…then you’re using a legacy version of Theos. Refer to [Upgrading from legacy Theos](/docs/Upgrading-from-legacy-Theos.html).
