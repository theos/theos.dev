---
title: Upgrading from legacy Theos
layout: docs
---

Theos in its current state is a continuation of the work done by Dustin Howett, with work from Ryan Petrich’s fork included (among others). As such, you can easily “upgrade” from one of these two most commonly used variants of Theos to this one.

If your copy of Theos was downloaded with Git, read on. If your copy of Theos was downloaded as a ZIP file from GitHub or from DHowett’s Subversion, you'll want to make a backup of everything you’ve changed, delete the Theos directory, and then [install Theos from scratch](/docs/Installation.html).

Simply change the remote repo and pull:

```console
$ git remote set-url origin https://github.com/theos/theos.git
$ git pull origin master
```

Then instruct Git to clone the submodules like so:

```console
$ git submodule update --init --recursive
```

Changing the Git remote URL isn’t strictly required, as DHowett/theos redirects to theos/theos. However, we recommend it to avoid confusion.

## Things to be aware of
Changes made since [legacy Theos](https://github.com/theos/theos/tree/legacy) may catch you off guard. Here are some we think you should be aware of:

* **Theos heavily relies on Git.** Always install Theos [as directed](/docs/Installation.html); do not download it as a ZIP.
* **The `theos` symlink is no longer created by NIC in new projects.** The destination of this symlink can vary between computers, as Theos does not impose requirements on where it must be stored. The symlink is also often committed to source control (i.e., Git) unintentionally. As it was already highly recommended to set the `$THEOS` variable in your environment, we have opted to switch new makefiles to use `$THEOS` instead of the symlink. Changing this in your existing projects is recommended. Refer to [this FAQ entry](/docs/FAQ.html#wheres-the-theos-symlink).
* **Configuration related to your environment, rather than the project, should be in `~/.theosrc`.** If you set variables that are specific to your own setup, such as the location of Xcode/an SDK, device IP, etc., you should avoid placing it in your project makefile, as these types of things can vary between users. Move these to `~/.theosrc`, a makefile that is read and executed during an early stage of Theos’ `common.mk`.
* **Built packages have been moved to a directory called `packages`.** The intent here is to reduce clutter in the root project directory and separate build output from the project source.
* **The `obj` directory has been moved to inside `.theos`.** Again, this is for cleanliness. You may need to enable displaying of hidden files in your operating system/file manager to see this directory.
* **The linker flag required for tweaks to run in 32-bit processes on 64-bit devices running iOS 9 is not necessary.** Theos already applies it for you.
* **Theos comes with some built-in headers and libraries for your convenience.** These are maintained as Git submodules in the `vendor` directory. In particular, the libraries are in the plain-text format `.tbd` which is supported as of Xcode 7.0. If you have your own headers and libraries, place them in the `include` and `lib` directories in the root of Theos, not in `vendor`. You can override files in the vendor directories by using the same file path and name.
* **Theos no longer relies on `dpkg-deb`.** After lzma compression with `dpkg-deb` was deprecated, [dm.pl](https://github.com/theos/dm.pl) became Theos' [primary means of deb creation](https://github.com/theos/theos/commit/bad135c47c1c3e0300fe823e64862f490830eee3), enabling the continued use of lzma compression. This was required because the current format dpkg-deb uses (xz) is not supported by Telesphoreo’s old dpkg build. Additionally, dm.pl eliminates Theos' dependency on dpkg, enabling greater support for platforms that lack dpkg (e.g., Cygwin).
* **Theos defaults to building for ARMv7 and ARM64** when linking against iOS 7.0 SDK or newer. If this needs to be changed in future, Theos will update the default accordingly. You should not set `$ARCHS` in your makefile unless you have a specific reason to.
* **Setting `$THEOS_DEVICE_PORT` is no longer required.** If you use an [SSH host alias](http://mattryall.net/blog/2008/06/ssh-favourite-hosts), the port you specify in the SSH config file will be used. If the port isn’t set here or the hostname isn’t an alias, port 22 will be used.
* **The GCC compiler is no longer supported for Darwin targets.** GCC was removed in Xcode 4.2 and use of it was discouraged for some time before that. On iOS, the very old `iphone-gcc` package has been superseded with a modern LLVM/Clang toolchain. If you use code that Clang does not like, you must port it to Clang or stick to legacy Theos.
* **The [modules](http://clang.llvm.org/docs/Modules.html#introduction) feature of Clang is enabled** if you use the iOS 8.3 SDK or newer. This solves [some limitations](https://clang.llvm.org/docs/Modules.html#problems-with-the-current-model) of the dependency system compilers have traditionally used and improves performance (modules are cached in an optimised file format). That being said, there are [some limitations](https://clang.llvm.org/docs/Modules.html#problems-modules-do-not-solve) that you may encounter.
* **Makedeps is disabled by default.** As error output from Makedeps can be confusing, and the majority of projects do not use this feature, it has been changed to be off by default. To enable it, set `USE_DEPS = 1`.
* **Architecture slices are compiled separately and merged.** This allows for architecture-specific configuration and fixes Makedeps for multi-architecture builds.

If you come across something that should be listed here, edit the page and add it!

Aside from these changes, which shouldn’t affect the majority of projects, we expect projects to continue to build with the latest Theos without any changes required. If you find something odd, [let us know](https://github.com/theos/theos/issues)!
