---
title: "Installation instructions for Linux & Windows"
layout: docs
---

This guide will help you install Theos on your Linux machine, Windows machine via [Windows Subsystem for Linux](https://aka.ms/wsl), or a [Google Cloud Shell](https://console.cloud.google.com/cloudshell) instance.

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **Linux** <br> **Windows 10** | Linux kernel 3.16 <br> Windows 10 build 14393 | Linux, iOS |

All the commands shown in the following instructions are meant to be run as a normal user, _not_ root. Similarly, Theos is also meant to be run as a normal user, _not_ root.

1. If you are running on Windows and haven’t already installed a Linux distribution, follow [Microsoft’s instructions](https://aka.ms/wslinstall) to do so.

1. Install the following prerequisites:

		sudo apt install build-essential fakeroot libtinfo5 libz3-dev rsync curl perl unzip git

	If you don’t use a distribution that uses the APT package manager such as Debian, Ubuntu, Linux Mint, or Pop!_OS, you will need to determine the equivalent packages to install from your distribution’s package manager.

1. If you are running on Windows using WSL 1 ([how do I know?](https://aka.ms/wslinstall#check-which-version-of-wsl-you-are-running)), apply the following fix so `fakeroot` works:

		sudo update-alternatives --set fakeroot /usr/bin/fakeroot-tcp

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
		curl -LO https://github.com/CRKatri/llvm-project/releases/download/swift-5.3.2-RELEASE/swift-5.3.2-RELEASE-ubuntu20.04.tar.zst
		TMP=$(mktemp -d)
		tar -xvf swift-5.3.2-RELEASE-ubuntu20.04.tar.zst -C $TMP
		mkdir -p $THEOS/toolchain/linux/iphone $THEOS/toolchain/swift
		mv $TMP/swift-5.3.2-RELEASE-ubuntu20.04/* $THEOS/toolchain/linux/iphone/
		ln -s $THEOS/toolchain/linux/iphone $THEOS/toolchain/swift
		rm -r swift-5.3.2-RELEASE-ubuntu20.04.tar.zst $TMP

	Note that compiling Swift code requires a fairly modern SDK. It is recommended that you use the latest SDK that you can get.

1. Get an iOS SDK:

	You can get patched SDKs from [our SDKs repo](https://github.com/theos/sdks).

		curl -LO https://github.com/theos/sdks/archive/master.zip
		TMP=$(mktemp -d)
		unzip master.zip -d $TMP
		mv $TMP/sdks-master/*.sdk $THEOS/sdks
		rm -r master.zip $TMP
