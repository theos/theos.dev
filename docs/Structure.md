---
title: Structure
layout: docs
---

Information regarding the various parts of Theos' internal structure:

* **bin/**: Contains various scripts used both internally by Theos and externally by the user.
* **include/**: Provided for you to place your own headers in.
  * **_fallback/**: Allowed to provide drop-in replacements for missing SDK headers.
* **lib/**: Provided for you to place your own libraries and frameworks in.
* **makefiles/**: The makefiles that comprise the majority of Theos itself.
  * **install/**: Rules for installing packages on different platforms. These execute commands upon install and uninstall of the package.
  * **instance/**: Makefiles included from a [sub-`make`](https://www.gnu.org/software/make/manual/html_node/Recursion.html) when building an individual instance (project). This includes the compilation of source.
  * **master/**: Makefiles included from the master `make` invocation.
  * **package/**: Rules for building packages for various packaging formats. These execute commands upon building the package.
  * **platform/**: Makefiles included depending on the current operating system platform. These set up the Theos environment appropriately for the platform.
  * **targets/**: Makefiles included depending on the current operating system platform and the target platform. These set up the Theos environment appropriately to build for a platform.
* **mod/**: Provided for you to place modules in. Theos will automatically include various files from here.
* **sdks/**: Provided for you to place SDKs in.
* **templates/**: Provided for you to place your own [NIC](/docs/NIC.html) templates in.
* **toolchain/**: Provided for you to place toolchains in, as directed at [Installation](/docs/Installation.html).
* **vendor/**: Submodule components included with Theos.
  * **dm.pl/**: The files for [the script](https://github.com/theos/dm.pl) used to build deb packages without the need for dpkg-deb.
  * **include/**: [Built-in headers](https://github.com/theos/headers) that may or may not be useful for most projects.
  * **lib/**: [Built-in library](https://github.com/theos/lib) definitions that may or may not be useful for most projects.
  * **logos/**: The files for [Logos](https://github.com/theos/logos).
  * **mod/**: Provided modules that are enabled selectively for enhanced functionality.
  * **nic/**: The files for [NIC](/docs/NIC.html).
  * **templates/**: [Built-in templates](https://github.com/theos/templates) that may be used to scaffold new projects using [NIC](/docs/NIC.html).
* **Prefix.pch**: The prefix header imported into the compilation process for all C-based languages targeting iOS. Provides convenient [macros](https://github.com/theos/headers/blob/master/theos/IOSMacros.h), backwards compatibility for [nullability](https://github.com/theos/headers/blob/master/theos/BackwardsCompat.h), and imports of [common frameworks](https://github.com/theos/theos/blob/master/Prefix.pch) for legacy projects.
  * Deprecated and non-functional for macOS and tvOS, iOS when taregting iOS 14+, and Swift.
