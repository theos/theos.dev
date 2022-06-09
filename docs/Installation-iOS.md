---
title: "Installation instructions for iOS"
layout: docs
---

This guide will help you install Theos on your jailbroken iOS device.

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **iOS** | 5.0 | iOS |

All the commands shown in the following instructions are meant to be run as the "mobile" user, _not_ root. Similarly, Theos is also meant to be run as a normal user, _not_ root.

1. Install the following prerequisites:

	* If your jailbreak uses **Elucubratus**, ensure that you have the [Elucubratus repo](https://apt.bingner.com) installed in your package manager of choice and then install `ca-certificates`, `clang`, `coreutils`, `curl`, `dpkg`, `git`, `grep`, `ldid`, `make`, `odcctools`, `perl`, `com.bingner.plutil`, `rsync`, `unzip`, and `xz` from it if they're not installed already (*not* the packages available on BigBoss)

	* If your jailbreak uses **Procursus**, ensure that you have the [Procursus repo](https://apt.procurs.us/) installed in your package manager of choice and then install the `Theos Dependencies` package from it (*not* the one available on BigBoss)

	* If your jailbreak uses **Telesphoreo**, ensure that you have [Sam Bingner’s repo](http://repo.bingner.com/) installed in your package manager of choice and then install the `Theos Dependencies` package from BigBoss

1. If your device is jailbroken with [checkra1n](https://checkra.in/), run the following commands to create a directory to house Theos:

		su
		install -d -o mobile -g mobile /opt
		exit

1. Set up the `THEOS` environment variable:

	**Note**: if your device is jailbroken with checkra1n, replace "~/theos" in the command below with "/opt/theos"

	bash:

		echo "export THEOS=~/theos" >> ~/.profile

	zsh:

		echo "export THEOS=~/theos" >> ~/.zshenv

	For this change to take effect, you must restart your shell. Kill the terminal app in the taskswitcher then re-open the terminal app and do `echo $THEOS` on your shell to check if this is working.

1. Clone Theos to your device:

		git clone --recursive https://github.com/theos/theos.git $THEOS

1. Get the toolchain:

	Theos Dependencies installs iOS Toolchain.

1. Get an iOS SDK:

	You can get patched SDKs from [our SDKs repo](https://github.com/theos/sdks).

		curl -LO https://github.com/theos/sdks/archive/master.zip
		TMP=$(mktemp -d)
		unzip master.zip -d $TMP
		mv $TMP/sdks-master/*.sdk $THEOS/sdks
		rm -r master.zip $TMP

1. Install the Swift toolchain (optional):

	Install `swift` if using Procursus, else install `swift-toolchain` from the BigBoss repo.

	Note that compiling Swift code requires a fairly modern SDK. It is recommended that you use the latest SDK that you can get.
