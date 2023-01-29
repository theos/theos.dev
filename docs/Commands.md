---
title: Commands
layout: docs
---

Commands in Theos are implemented as Makefile targets, and are executed by using `make <commands>`. These can often be combined to accomplish multiple things in one go. Theos includes a variety of commands for everything from packaging to installation.

### The core commands

| Command | Description |
|---------|-------------|
| `make`  | Compile source that has changed since your last build. No further action is taken. |
| `make clean` | Clean the build directory so the project is completely rebuilt the next time you run `make`. |
| `make stage` | Compile source and stage the output into `$THEOS_STAGING_DIR` (by default, `.theos/_/`). This creates the filesystem hierarchy that will be installed on a target device. |
| `make package` | Compile source, execute staging, and build an output package into `$THEOS_PACKAGE_DIR` (by default, `packages/`). |
| `make install` | Install the last built package to the device located at `$THEOS_DEVICE_IP:$THEOS_DEVICE_PORT`. If ran on an iOS device without `$THEOS_DEVICE_IP` set, it will install the package locally. |

You most frequently want to use **`make do`** to build your latest changes, stage and package it up, and install on your configured device. This is a shortcut for `make package install`.

### Useful commands

| Command | Description |
|---------|-------------|
| `make clean package` | Clean the build directory and rebuild the project. If you've updated a header without touching any source files, you may need to use the clean command to see the update in your build. |
| `make package FINALPACKAGE=1` | Optimise assets, convert plists to binary format, and generate a package with a “clean” version (ie, no build number). Recommended when building a package you’re about to release. |
| `make package FINALPACKAGE=1 STRIP=0` | Build a release package, but without stripping symbols. |

### Miscellaneous

| Command | Description |
|---------|-------------|
| `make all` | The same as running `make`. |
| `make messages=yes` | Enable verbosity for the build. Useful to provide when asking for assistance. |
| `make update-theos` | Update Theos to the latest commit. See [Installation](/docs/Installation.html) for more info. |
| `make troubleshoot` | Present quick links to troubleshooting info, and upload the `make` output to GitHub Gist for sharing. See [Help](/docs/Installation.html) for more info. |
| `make clean-packages` | Remove all packages from `$THEOS_PACKAGE_DIR`. |
| `make show` | Open the directory where packages are placed in your system's file manager. |
