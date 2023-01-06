---
title: Commands
layout: docs
---

Commands in theos are implemented as Makefile targets, and executed with

`make <commands>`

These can often be combined to accomplish multiple things in one go. Theos includes a variety of commands for everything from packaging to installation.

### Packaging

`make package` - Build a package

`make clean package` - Clean the build directory and rebuild the project. If you've updated a header without touching any source files, you may need to use the clean command to see the update in your build.

`make do` will build and install a package, and is a shortcut for `make package install`

`make package FINALPACKAGE=1` will optimise assets, convert plists to binary format, and generate a package with a “clean” version (ie, no build number). Recommended when building a package you’re about to release.

`make package FINALPACKAGE=1 STRIP=0` will build a release package, but without stripping symbols.


### Installation

`make install` will install a package to the device located at `$THEOS_DEVICE_IP:$THEOS_DEVICE_PORT`. If ran on an iOS Device without `$THEOS_DEVICE_IP` set, it will install the package locally instead.

`make do` will both build and install a package.

### Miscellaneous

`make all` is the same as running pure `make`.

`make messages=yes` will enable verbosity for the build. Useful to provide when asking for assistance.

`make update-theos` will, predictably enough, update Theos to the latest commit. See [Installation](/docs/Installation.html) for more info.

`make troubleshoot` will present quick links to troubleshooting info, and upload the `make` output to GitHub Gist for sharing. See [Help](/docs/Installation.html) for more info.

`make clean-packages` will remove all packages from $THEOS_PACKAGE_DIR.

`make show` will open the directory packages have been placed in, via your system's file manager.
