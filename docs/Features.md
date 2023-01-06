---
title: Features
layout: docs
---

Below is a list of features implemented since the [original Theos](https://github.com/theos/theos/tree/legacy) by Dustin Howett. Said features are sorted in ascending order by their implementation date (where the latest additions are at the bottom).

*(To do: These features should be properly documented and this file removed.)*

* Fallback/last resort headers can be placed at `include/_fallback`; this can be used to provide drop-in replacements for missing SDK headers. (rpetrich)
* `make update-theos`, predictably enough, updates Theos to the latest commit. (rpetrich)
* `make package FINALPACKAGE=1` will optimise assets (runs [pincrush](https://github.com/DHowett/pincrush) on PNG images, and converts plists to binary format) and generate a package with a "clean" version (ie, no build number). Recommended when building a package you’re about to release. (rpetrich/kirb)
* `INSTALL_TARGET_PROCESSES = Preferences MobileMail` is a shortcut for killing a process. (Previously `TWEAK_TARGET_PROCESS`) (rpetrich)
* Unlike rpetrich’s fork, the internal generator (using Objective-C runtime functions directly) is changed back to the Substrate generator (using Substrate’s wrappers around the runtime functions to assure future compatibility).
* `make do` is a shortcut for `make package install`. (rpetrich)
* Each architecture is compiled separately, rather than all being compiled at once. This avoids some issues with the original design of Theos. (rpetrich)
* Different SDKs can be used for different architectures, making it possible to for instance use Xcode 4.4 for armv6 compilation alongside a newer Xcode for armv7/arm64. (rpetrich)
* All generated files are stored in `.theos`, rather than many different directories in the root of the project. (rpetrich)
* `make clean-packages` removes non-final packages. (rpetrich)
* Makes `dpkg-deb` use lzma compression, because the current format dpkg-deb uses (xz) is not supported by Telesphoreo’s old dpkg build. (kirb)
* Packages are output to a subdirectory called `packages`. (kirb)
* Use [hbang/headers](https://github.com/hbang/headers) as a submodule. (kirb)
* Supports the iOS 7 simulator. (kirb)
* Adds a `%property` directive that allows for creating a property on a hooked class. (eswick)
* `File.m_CFLAGS` support, to have compiler flags on one particular file. (rpetrich)
* Provides `IS_IPAD` and `IN_SPRINGBOARD` macros in the prefix header. (kirb)
* Imports Cocoa and AppKit when targeting OS X. (kirb)
* When using iOS SDK 7.0 or newer, and deploying to iOS 5 or newer, Theos defaults to building for armv7 and arm64. (rpetrich/kirb)
* Adds `simbltweak.mk` to help in the building of SIMBL tweaks for OS X. (kirb)
* Adds modern app and preference bundle templates. (kirb)
* Adds `%dtor { ... }` directive to run code when the process is deconstructing. (uroboro)
* Improves error handling when an SDK isn’t found. (uroboro)
* Adds `%hookf` for hooking functions. [Example](https://github.com/DHowett/theos/pull/106#issuecomment-52142951) (uroboro)
* Supports building rpm packages. (rpetrich)
* Adds `STRIP=0` to not strip on release builds. (rpetrich)
* Adds a stub `libsubstrate.dylib` binary so you don’t need to get one yourself. (kirb)
* Fixes lack of a symlink that allows Theos to work on arm64. (kirb)
* Supports Swift compilation and linking. Incomplete as it is uncertain whether Swift libraries are allowed to be distributed via Cydia. (kirb)
* Deprecates `NSLog` in favor of more detailed log macros, `HBLogDebug`, `HBLogInfo`, `HBLogWarn`, and `HBLogError`. (kirb)
* Makes debug builds the default. Use `make DEBUG=0`, `FOR_RELEASE=1` or `FINALPACKAGE=1` to build without debug. (kirb)
* Bumps default deployment target to iOS 4.3 when using iOS SDK 6.0 and iOS 5.0 when using iOS SDK 7.0. (kirb)
* Includes NIC templates from [DHowett, conradev, WillFour20](https://github.com/DHowett/theos-nic-templates); [uroboro](https://github.com/uroboro/nicTemplates); and [bensge, kirb](https://github.com/sharedInstance/iOS-7-Notification-Center-Widget-Template).
* Supports building for iOS on Windows. (coolstar)
* Theos symlinks are no longer made within projects. The `$THEOS` environment variable is used instead. (kirb)
* `instance_USE_SUBSTRATE = 0` can be used to switch tweaks to the internal generator and not link against Substrate. (kirb)
* `make show` opens the operating system’s file manager and highlights the latest package. (kirb)
* A `THEOS_INSTANCE_NAME` constant is passed to the compiler so the current instance’s name can be used in the code. (kirb)
* `PREINSTALL_TARGET_PROCESSES` and `INSTALL_TARGET_PROCESSES` can be set to a list of processes to kill before and after installation respectively. (rpetrich)
* `instance_LIBRARY_EXTENSION` can be set to a custom file extension when building a library/tweak, or `-` for no extension. (kirb)
* Output is colored so it’s easier to read at a glance. (kirb)
* `instance_WEAK_FRAMEWORKS` and `instance_WEAK_LIBRARIES` allow you to [weak link](https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WeakLinking.html#//apple_ref/doc/uid/20002378-107026) against frameworks/libraries. (kirb)
* Enables [clang modules](http://clang.llvm.org/docs/Modules.html). Note that C++ modules are only enabled with iOS 8.4 and OS X 10.10 or newer, when building on OS X. (kirb)
* Allows `int argc, char **argv, char **envp` arguments to be utilised in `%ctor` and `%dtor`. (uroboro)
* Third party frameworks can be placed inside `$THEOS/lib`, and utilised with `instance_EXTRA_FRAMEWORKS`. (kirb)
* Adds backwards compatibility for [nullability](https://developer.apple.com/swift/blog/?id=25) keywords when building with older versions of clang that don’t support it. (kirb)
* Building for iOS Simulator now disables linking Substrate by default, allows linking against OS X binaries, and builds for only x86_64 by default (rather than both i386 and x86_64) when building for iOS 8.0 or newer. (kirb)
* Integrates the fix needed for tweaks to work in 32-bit processes on iPhone 6s. (saurik)
* Adds `make troubleshoot`, for getting quick links to troubleshooting info and uploading the `make` output to GitHub Gist for sharing. (kirb)
* Adds support for building for watchOS and tvOS. (kirb)
