---
title: "Installation instructions for iOS"
layout: docs
---

This guide will help you install Theos on your jailbroken iOS device.

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **iOS** | 5.0 | iOS |

Unless otherwise stated, all the commands shown in the following instructions are meant to be run as a normal user, _not_ root. Similarly, Theos is also meant to be run as a normal user, _not_ root.

1. Check that you have the necessary repos installed in your package manager:

	* iOS >= 12.0
		* [Procursus](https://apt.procurs.us/) or [Sam Bingner’s repo](http://repo.bingner.com/) (this depends on the jailbreak you are using)
	* iOS < 12.0
		* [Coolstar's repo](https://coolstar.org/publicrepo/'), [Sam Bingner's repo](https://repo.bingner.com/), and [BigBoss](http://apt.thebigboss.org/repofiles/cydia/)

1. Install the following prerequisites<sup>1</sup> as *root*:

		apt-get install bash curl sudo

	<sup>
	<sup>1</sup> In order to use <i>sudo</i>, your non-root user will have to be added to the sudoers file (/etc/sudoers). For more information, see <a href=https://wiki.archlinux.org/title/Sudo#Example_entries>here</a>.
	</sup>

1. Run the installer:

		bash -c "$(curl -fsSL https://raw.githubusercontent.com/theos/theos/master/bin/install-theos)"
