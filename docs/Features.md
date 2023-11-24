---
title: Features
layout: docs
---

Below is a list of undocumented features implemented since the [original Theos](https://github.com/theos/theos/tree/legacy) by Dustin Howett. Said features are sorted in ascending order by their implementation date (where the latest additions are at the bottom).

*(To do: These features should be properly documented and this file removed.)*

* Imports Cocoa and AppKit when targeting OS X. (kirb)
* Adds `simbltweak.mk` to help in the building of SIMBL tweaks for OS X. (kirb)
* Building for iOS Simulator now disables linking Substrate by default, allows linking against OS X binaries, and builds for only x86_64 by default (rather than both i386 and x86_64) when building for iOS 8.0 or newer. (kirb)
