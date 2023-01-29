---
title: "Installation instructions for iOS"
layout: docs
---

This guide will help you install Theos on your jailbroken iOS device.

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **iOS** | 5.0 | iOS |

Unless otherwise stated, all of the commands shown in the following instructions are meant to be run as a normal user, _not_ root. Similarly, Theos is meant to be run as a normal user, _not_ root.

1. Check that you have the necessary repos installed in your package manager:

	* iOS 12.0 or later:
		* [Procursus](https://apt.procurs.us/) or [Bingner/Elucubratus](https://apt.bingner.com/) (this depends on the jailbreak you are using)
	* Prior to iOS 12.0:
		* [Coolstar's repo](https://coolstar.org/publicrepo/), [Sam Bingner's repo](https://repo.bingner.com/), and [BigBoss](http://apt.thebigboss.org/repofiles/cydia/)

1. Install the following prerequisites<sup>1</sup> as *root*:

		apt-get install bash curl sudo

	<sup>
	<sup>1</sup> In order to use <i>sudo</i>, your non-root user may need to be added to the sudoers file (/etc/sudoers). See [ArchWiki](https://wiki.archlinux.org/title/Sudo#Example_entries) for more information.
	</sup>

1. Run the installer:

		bash -c "$(curl -fsSL https://raw.githubusercontent.com/theos/theos/master/bin/install-theos)"
