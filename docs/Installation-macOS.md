---
title: "Installation instructions for macOS"
layout: docs
---

This guide will help you install Theos on your macOS device.

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **macOS** | Mavericks (10.9) | macOS, iOS, watchOS, tvOS, and simulators |

All the commands shown in the following instructions are meant to be run as the "user" user, _not_ **root**. Similarly, Theos is also meant to be run as a normal user, _not_ **root**.

1. Install the following prerequisites:

	* [Homebrew](https://brew.sh/)
	* [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12)<sup>1</sup> is mandatory. The Command Line Tools package isn’t sufficient for Theos to work. Xcode includes toolchains for all Apple platforms.

	<sup>
	<sup>1</sup> Xcode 5.0 or newer. Xcode 4.4 supported, but only when building for ARMv6 (1st/2nd generation iPhone/iPod touch).
	</sup>

		brew install ldid xz

1. Set up the `THEOS` environment variable:

		echo "export THEOS=~/theos" >> ~/.zprofile

    If you are using macOS 10.14 or older, change `~/.zprofile ` to `~/.profile`. The default shell was changed from bash to zsh in macOS 10.15. You can check which one you are using by running `echo $SHELL`.

	For this change to take effect, you must restart your shell. Open a new tab and do `echo $THEOS` on your shell to check if this is working.

1. Clone Theos to your device:

		git clone --recursive https://github.com/theos/theos.git $THEOS

1. Get the toolchain:

	Xcode contains the toolchain.

1. Get an iOS SDK:

	Xcode always provides the latest iOS SDK, but as of Xcode 7.3, it no longer includes private frameworks you can link against. This may be an issue when developing tweaks. You can get patched SDKs from [our SDKs repo](https://github.com/theos/sdks).

		curl -LO https://github.com/theos/sdks/archive/master.zip
		TMP=$(mktemp -d)
		unzip master.zip -d $TMP
		mv $TMP/sdks-master/*.sdk $THEOS/sdks
		rm -r master.zip $TMP
