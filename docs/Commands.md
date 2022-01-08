---
title: Features
layout: docs
---

# Commands

Commands in theos are implemented as Makefile targets, and executed with

`make <commands>`

These can often be combined to accomplish multiple things in one go. Theos includes a variety of commands for everything from packaging to installation.

### Packaging

`make package` - Build a package

`make clean package` - Clean the build directory and rebuild the project. If you've updated a header without touching any source files, you may need to use the clean command to see the update in your build.

`make do` will build and install a package, and is a shortcut for `make package install`

`make package FINALPACKAGE=1` will optimise assets (runs [pincrush](https://github.com/DHowett/pincrush) on PNG images, and converts plists to binary format) and generate a package with a “clean” version (ie, no build number). Recommended when building a package you’re about to release.

`make package FINALPACKAGE=1 STRIP=0` will build a release package, but without stripping [symbols](https://cdmana.com/2021/07/20210727053112972M.html)


### Installation

`make install` will install a package to the device located at `$THEOS_DEVICE_IP:$THEOS_DEVICE_PORT`. If ran on an iOS Device (and `$THEOS_DEVICE_IP` is not set,) it will install the package locally instead.

`make do` will both build and install a package.

### Misc

`make update-theos` will, predictably enough, updates Theos to the latest commit.

`make troubleshoot` will present quick links to troubleshooting info, and upload the `make` output to GitHub Gist for sharing.

Built packages will be placed in a subdirectory named `packages/`

`make show` will open this directory in your system's file manager
