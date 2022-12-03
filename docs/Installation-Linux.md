---
title: "Installation instructions for Linux & Windows"
layout: docs
---

This guide will help you install Theos on your Linux machine, Windows machine via [Windows Subsystem for Linux](https://aka.ms/wsl), or a [Google Cloud Shell](https://console.cloud.google.com/cloudshell) instance.

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **Linux** <br> **Windows 10** | Linux kernel 3.16 <br> Windows 10 build 14393 | Linux, iOS |

Unless otherwise stated, all of the commands shown in the following instructions are meant to be run as a normal user, _not_ root. Similarly, Theos is meant to be run as a normal user, _not_ root.

1. If you are running on Windows and haven’t already installed a Linux distribution, follow [Microsoft’s instructions](https://aka.ms/wslinstall) to do so.

1. Install the following prerequisites<sup>1</sup> as *root*:

	- Debian-based distros

			apt install bash curl sudo

	- Arch-based distros

			pacman -S --needed bash curl sudo

	- Redhat-based distros

			dnf install bash curl sudo

	- SUSE-based distros

			zypper install bash curl sudo

	<sup>
	<sup>1</sup> In order to use <i>sudo</i>, your non-root user will have to be added to the sudoers file (/etc/sudoers). For more information, see <a href=https://wiki.archlinux.org/title/Sudo#Example_entries>here</a>.
	</sup>

1. Run the installer:

		bash -c "$(curl -fsSL https://raw.githubusercontent.com/theos/theos/master/bin/install-theos)"
