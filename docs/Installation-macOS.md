---
title: "Installation instructions for macOS"
layout: docs
---

This guide will help you install Theos on your macOS device.

| Platform | Minimum OS version | Targets supported
|----------|--------------------|-------------------|
| **macOS** | Mavericks (10.9) | macOS, iOS, watchOS, tvOS, and simulators |

All of the commands shown in the following instructions are meant to be run as a normal user, _not_ root. Similarly, Theos is meant to be run as a normal user, _not_ root.

1. Install the following prerequisites:

	* [Homebrew](https://brew.sh/)
		* or [MacPorts](https://www.macports.org/install.php)
		* or [Procursus](https://docs.procurs.us/Installation/macOS.html)
	* [Xcode](https://developer.apple.com/download/applications/)<sup>1</sup> is mandatory. The Command Line Tools package isn’t sufficient for Theos to work. Xcode includes toolchains for all Apple platforms.

	<sup>
	<sup>1</sup> Xcode 5.0 or newer. Xcode 4.4 supported, but only when building for ARMv6 (1st/2nd generation iPhone/iPod touch).
	</sup>

1. Run the installer:

		bash -c "$(curl -fsSL https://raw.githubusercontent.com/theos/theos/master/bin/install-theos)"

# Troubleshooting
## Third-party Toolchains
Some third-party toolchains have issues with [Modules](https://clang.llvm.org/docs/Modules.html) on macOS. In such cases, you can either try a different third-party toolchain (e.g., a newer or older version) or disable Modules for your project with `XXX_USE_MODULES = 0`.

**Example**:  
```
TWEAK_NAME = Test
Test_USE_MODULES = 0
```
