---
title: "Installation instructions for Linux & Windows"
layout: docs
---

This guide will help you install Theos on your Linux machine, Windows machine via [Windows Subsystem for Linux](https://aka.ms/wsl), or a [Google Cloud Shell](https://console.cloud.google.com/cloudshell) instance.

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **Linux** | Linux kernel 3.16 | Linux, iOS |
| **Windows 10/11** | Windows 10 build 14393 | Linux, iOS |

Unless otherwise stated, all of the commands shown in the following instructions are meant to be run as a normal user, _not_ root. Similarly, Theos is meant to be run as a normal user, _not_ root.

1. If you are running on Windows and haven’t already installed a Linux distribution, follow [Microsoft’s instructions](https://aka.ms/wslinstall) to do so.

1. Install the following prerequisites<sup>1</sup> as *root*:

	- Debian-based distros (includes Ubuntu, Pop!_OS, etc.)

			apt install bash curl sudo

	- Arch-based distros (includes Manjaro, EndeavourOS, etc.)

			pacman -S --needed bash curl sudo

	- Red Hat-based distros (includes Fedora, CentOS, etc.)

			dnf install bash curl sudo

	- SUSE-based distros (includes openSUSE, etc.)

			zypper install bash curl sudo

	<sup>
	<sup>1</sup> In order to use <i>sudo</i>, your non-root user may need to be added to the sudoers file (/etc/sudoers). See [ArchWiki](https://wiki.archlinux.org/title/Sudo#Example_entries) for more information.
	</sup>

1. Run the installer:

		bash -c "$(curl -fsSL https://raw.githubusercontent.com/theos/theos/master/bin/install-theos)"
