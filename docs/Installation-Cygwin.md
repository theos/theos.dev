---
title: "Installation instructions for Cygwin (Deprecated)"
layout: docs
---

This guide will help you install Theos on your Windows machine via Cygwin.

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **Windows** | XP | Windows (via Cygwin), iOS |

<div class="alert alert-warning">
**Cygwin support is deprecated.** The latest toolchain releases for Cygwin are several years out of date. You will have a much better experience by using [Windows Subsystem for Linux](/docs/Installation-Linux.html).

Please note that the latest toolchain provided for Cygwin only supports iOS SDKs earlier than iOS 11. For 32-bit installations of Cygwin, this is more severely limited to iOS SDKs earlier than iOS 8, and lacks support for building arm64 binaries.
</div>

All of the commands shown in the following instructions are meant to be run as a normal user, _not_ root. Similarly, Theos is meant to be run as a normal user, _not_ root.

1. Install the following prerequisites:

	* [Cygwin](https://cygwin.com/install.html)
	* git (under Devel)
	* make (under Devel)
	* ca-certificates (under Net)
	* openssh (under Net)
	* perl (under Perl)
	* python (under Python)

1. Set up the `THEOS` environment variable:

		echo "export THEOS=~/theos" >> ~/.profile

	For this change to take effect, you must restart your shell. Open a new tab and do `echo $THEOS` on your shell to check if this is working.

1. Clone Theos to your device:

		git clone --recursive https://github.com/theos/theos.git $THEOS

1. Get the toolchain:

	On 32-bit:

		git clone https://github.com/coolstar/iOSToolchain4Win.git $THEOS/toolchain/windows/iphone

	On 64-bit:

		git clone -b x86_64 https://github.com/coolstar/iOSToolchain4Win.git $THEOS/toolchain/windows/iphone

1. Get an iOS SDK:

	You can get patched SDKs from [our SDKs repo](https://github.com/theos/sdks).

		curl -LO https://github.com/theos/sdks/archive/master.zip
		TMP=$(mktemp -d)
		unzip master.zip -d $TMP
		mv $TMP/sdks-master/*.sdk $THEOS/sdks
		rm -r master.zip $TMP
