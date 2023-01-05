---
title: Features
layout: docs
---

Below is a list of undocumented features implemented since the [original Theos](https://github.com/theos/theos/tree/legacy) by Dustin Howett. Said features are sorted in ascending order by their implementation date (where the latest additions are at the bottom).

*(To do: These features should be properly documented and this file removed.)*

* Each architecture is compiled separately, rather than all being compiled at once. This avoids some issues with the original design of Theos. (rpetrich)
* Different SDKs can be used for different architectures, making it possible to for instance use Xcode 4.4 for armv6 compilation alongside a newer Xcode for armv7/arm64. (rpetrich)
* All generated files are stored in `.theos`, rather than many different directories in the root of the project. (rpetrich)
* `File.m_CFLAGS` support, to have compiler flags on one particular file. (rpetrich)
* Provides `IS_IPAD` and `IN_SPRINGBOARD` macros in the prefix header. (kirb)
* Imports Cocoa and AppKit when targeting OS X. (kirb)
* Adds `simbltweak.mk` to help in the building of SIMBL tweaks for OS X. (kirb)
* Includes NIC templates from [DHowett, conradev, WillFour20](https://github.com/DHowett/theos-nic-templates); [uroboro](https://github.com/uroboro/nicTemplates); and [bensge, kirb](https://github.com/sharedInstance/iOS-7-Notification-Center-Widget-Template). **[Add to theos/templates/README.md]**
* Default rules, variables, etc. can be set in `~/.theosrc` (a makefile). (kirb)
* A `THEOS_INSTANCE_NAME` constant is passed to the compiler so the current instance’s name can be used in the code. (kirb)
* Allows `int argc, char **argv, char **envp` arguments to be utilised in `%ctor` and `%dtor`. (uroboro)
* Adds backwards compatibility for [nullability](https://developer.apple.com/swift/blog/?id=25) keywords when building with older versions of clang that don’t support it. (kirb)
* Building for iOS Simulator now disables linking Substrate by default, allows linking against OS X binaries, and builds for only x86_64 by default (rather than both i386 and x86_64) when building for iOS 8.0 or newer. (kirb)
