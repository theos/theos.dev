---
title: "Installation instructions for Linux"
layout: docs
---

This guide will help you install Theos on your Linux machine, Linux within Windows via [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl), or [Google Cloud Shell](https://console.cloud.google.com/cloudshell).

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **Linux** <br> **Windows 10** | Linux kernel 3.16 <br> Windows 10 build 14393 | Linux, iOS |

All the commands shown in the following instructions are meant to be run as the "user" user, _not_ **root**. Similarly, Theos is also meant to be run as a normal user, _not_ **root**.

1. Install the following prerequisites:

		sudo apt-get install fakeroot git perl unzip build-essential libtinfo5

	<sup>
	<sup>*</sup> build-essential and libtinfo5 or the equivalents for your distro.
	</sup>

	Additionally on WSL:

		sudo update-alternatives --set fakeroot /usr/bin/fakeroot-tcp

	Additionally on Google Cloud Shell:

		sudo apt install rsync

1. Set up the `THEOS` environment variable:

		echo "export THEOS=~/theos" >> ~/.profile

	For this change to take effect, you must restart your shell. Open a new tab and do `echo $THEOS` on your shell to check if this is working.

1. Clone Theos to your device:

		git clone --recursive https://github.com/theos/theos.git $THEOS

1. Get a toolchain:

	Without Swift support (smaller toolchain size):

		curl -LO https://github.com/sbingner/llvm-project/releases/latest/download/linux-ios-arm64e-clang-toolchain.tar.lzma
		TMP=$(mktemp -d)
		tar -xvf linux-ios-arm64e-clang-toolchain.tar.lzma -C $TMP
		mkdir -p $THEOS/toolchain/linux/iphone
		mv $TMP/ios-arm64e-clang-toolchain/* $THEOS/toolchain/linux/iphone/
		rm -r linux-ios-arm64e-clang-toolchain.tar.lzma $TMP

	With Swift support (larger toolchain size):

		sudo apt install zstd
		curl -LO https://github.com/CRKatri/llvm-project/releases/download/swift-5.3.2-RELEASE/swift-5.3.2-RELEASE-ubuntu18.04.tar.zst
		TMP=$(mktemp -d)
		tar -xvf swift-5.3.2-RELEASE-ubuntu18.04.tar.zst -C $TMP
		mkdir -p $THEOS/toolchain/linux/iphone $THEOS/toolchain/swift
		mv $TMP/swift-5.3.2-RELEASE-ubuntu18.04/* $THEOS/toolchain/linux/iphone/
		ln -s $THEOS/toolchain/linux/iphone $THEOS/toolchain/swift
		rm -r swift-5.3.2-RELEASE-ubuntu18.04.tar.zst $TMP

	Note that compiling Swift code requires a fairly modern SDK. It is recommended that you use the latest SDK that you can get.

1. Get an iOS SDK:

	You can get patched SDKs from [our SDKs repo](https://github.com/theos/sdks).

		curl -LO https://github.com/theos/sdks/archive/master.zip
		TMP=$(mktemp -d)
		unzip master.zip -d $TMP
		mv $TMP/sdks-master/*.sdk $THEOS/sdks
		rm -r master.zip $TMP
