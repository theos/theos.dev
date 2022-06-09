---
title: "Installation instructions for iOS"
layout: docs
---

This guide will help you install Theos on your jailbroken iOS device.

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **iOS** | 5.0 | iOS |

All the commands shown in the following instructions are meant to be run as the "mobile" user, _not_ root. Similarly, Theos is also meant to be run as the "mobile" user, _not_ root.

1. Install the following prerequisites:

	* [Procursus](https://apt.procurs.us/) or [Sam Bingner’s repository](http://repo.bingner.com/)
	* Theos Dependencies (package on either the Procursus or BigBoss repo, relies on the previous repository being installed first)

1. Set up the `THEOS` environment variable:

	bash:

		echo "export THEOS=~/theos" >> ~/.profile

	zsh:

		echo "export THEOS=~/theos" >> ~/.zshenv

	For this change to take effect, you must restart your shell. Kill the terminal app in the taskswitcher then re-open the terminal app and do `echo $THEOS` on your shell to check if this is working.

1. Clone Theos to your device:

		git clone --recursive https://github.com/theos/theos.git $THEOS

1. Get the toolchain:

	The `Theos Dependencies` package will install the toolchain.

	If you plan on compiling Swift code, you'll also want to install the `swift` package from Procursus (which supports Swift 5), assuming your jailbreak uses Procursus. If it doesn't, you'll want to get the `swift-toolchain` package from BigBoss (which only supports Swift 4).

	Note that compiling Swift code requires a fairly modern SDK. It is recommended that you use the latest SDK that you can get.

1. Get an iOS SDK:

	You can get patched SDKs from [our SDKs repo](https://github.com/theos/sdks).

		curl -LO https://github.com/theos/sdks/archive/master.zip
		TMP=$(mktemp -d)
		unzip master.zip -d $TMP
		mv $TMP/sdks-master/*.sdk $THEOS/sdks
		rm -r master.zip $TMP
