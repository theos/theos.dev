---
title: Variables
layout: docs
---

Theos utilizes a lengthy list of variables to pass information through its Makefile system and to the relevant tools.

The naming convention is as follows:
  - Internal/Private
    - Prefixed by an underscore ("_")
    - Reassigned in legacy.mk
  - External/Overridable
    - See below.

---

The various public (i.e. configurable) variable types are as follows:
  - **Project Variables**
    - Prefixed by current project instance.
      - Tied to a particular project instance.
        - Example: `XXX_FILES`

  - **Local Variables**
    - Named solely according to their purpose.
      - Not tied to any particular project instance and can be set either in the toplevel Makefile or in the environment.
        - Example: `ADDITIONAL_CFLAGS`

  - **System Variables**
    - Prefixed by `THEOS`.
      - These variables are listed for use in toplevel Makefiles, but can be modified if desired.
        - Example: `THEOS_BUILD_DIR`

  - **System Constants**
    - Prefixed by `THEOS`.
      - These constants are listed for use in toplevel Makefiles.
        - Example: `THEOS_BIN_PATH`

---

## Project Variables

*Note: "XXX" = $(THEOS_CURRENT_INSTANCE)*

- XXX_INSTALL_PATH (str)
  - File path where you'd like to install the final product (e.g., app, tool, library, framework, etc)

- XXX_FILES (str)
  - Files to compile
  - Space-separated list or any other standard GNU Make convention

- XXX_CFLAGS (str)
  - Flags to pass to compiler
  - Space-separated list

- XXX_LDFLAGS (str)
  - Flags to pass to linker
  - Space-separated list

- XXX_BUNDLE_RESOURCE_DIRS (str)
  - File path(s) for the current bundle's resource directory (default: Resources)
    - Adding a `Resources` folder to your project will copy over the containing files to the bundle on the target device during install
  - Space-separated list or any other standard GNU Make convention

- XXX_BUNDLE_RESOURCE_FILES (str)
  - File path(s) for the current bundle's resource files
    - This can be used to copy a directory itself into the bundle, while XXX_BUNDLE_RESOURCE_DIRS copies the directory's *contents* into the bundle
  - Space-separated list or any other standard GNU Make convention

- XXX_BUNDLE_INSTALL_PATH (str)
  - File path where you'd like to install the final bundle product

- XXX_BUNDLE_NAME (str)
  - Name of your bundle

- XXX_BUNDLE_EXTENSION (str)
  - The file extension for your bundle

- XXX_FRAMEWORKS (str)
  - Frameworks to link against
  - Space-separated list

- XXX_PRIVATE_FRAMEWORKS (str)
  - Private frameworks to link against
  - Space-separated list

- XXX_EXTRA_FRAMEWORKS (str)
  - Frameworks in $THEOS/lib that you'd like to link against
  - Space-separated list

- XXX_LIBRARIES (str)
  - Libraries to link against
  - Space-separated list

- XXX_LIBRARY_EXTENSION (str)
  - The file extension for your library/tweak
  - "-" for no extension

- XXX_NAME (str)
  - Your project's name

- XXX_WITH_SUBPROJECTS ----- **internal ?**

- XXX_WEAK_FRAMEWORKS (str)
  - Frameworks to [weak link](https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WeakLinking.html#//apple_ref/doc/uid/20002378-107026) against
  - Space-separated list

- XXX_WEAK_LIBRARIES (str)
  - Libraries to [weak link](https://developer.apple.com/library/ios/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WeakLinking.html#//apple_ref/doc/uid/20002378-107026) against
  - Space-separated list

- XXX_GENERATOR (str)
  - The logos generator you'd like to use (default: MobileSubstrate)
  - See https://theos.dev/docs/logos-syntax

- XXX_OBJCC_FILES (str)
  - Objective-C++ files you'd like to compile
  - Space-separated list or any other standard GNU Make convention

- XXX_OBJC_FILES (str)
  - Objective-C files you'd like to compile
  - Space-separated list or any other standard GNU Make convention

- XXX_C_FILES (str)
  - C files you'd like to compile
  - Space-separated list or any other standard GNU Make convention

- XXX_CC_FILES (str)
  - C++ files you'd like to compile
  - Space-separated list or any other standard GNU Make convention

- XXX_LOGOS_FILES (str)
  - Logos files you'd like to compile
  - See https://theos.dev/docs/logos-file-extensions
  - Space-separated list or any other standard GNU Make convention

- XXX_USE_SUBSTRATE (bool)
  - Toggle using MobileSubstrate as the logos generator (default: 1)
  - Will link against CydiaSubstrate

- XXX_ARCHS (str)
  - Space-separated list of architecture(s) to build for

- XXX_ENABLE_BITCODE (bool) **[OSX]**
  - Toggle Bitcode (default: 0)

- File.extension_CFLAGS (str)
  - Flag(s) to pass to the compiler when compiling a specific file
  - Space-separated list

- TWEAK_TARGET_PROCESS (str)
  - Target process to `killall` after your tweak installs
  - Space-separated list

- SUBPROJECT_OBJ_FILES (str) ----- **internal ?**
- SUBPROJECT_LDFLAGS (str) ----- **internal ?**

## Local Variables

- COLOR (bool)
  - Toggles pretty logs (default: 1)

- ARCHS (str)
  - Space-separated list of architecture(s) to build for

- DEBUG (bool)
  - Toggle including debug symbols (default: 1)
  - Will add `+debug` to the package name

- FINALPACKAGE (bool)
  - Strips debug symbols (i.e. DEBUG=0 STRIP=1)
  - Removes incremental version from package name
  - Optimizes xml/plist files by convering to bplist

- FOR_RELEASE (bool)
  - Same as FINALPACKAGE

- STRIP (bool)
  - Toggle stripping debug symbols (default: 0)

- PACKAGE_FORMAT (str)
  - Type of package to build
  - `deb`, `ipa`, `pkg`, `rpm`, or `none`

- TARGET (str)
  - Required build configuration items
  - Format `platform:compiler:sdk_version:deployment_version`
    - `clang` is the only supported CC/CXX for Darwin targets

- PREFIX (str)
  - Path to your toolchain bin
  - Often used on OSX to switch between xctoolchains

- PACKAGE_VERSION (num)
  - Your package version

- PACKAGE_BUILDNAME (str)
  - Additional string added to the package name (e.g. debug for DEBUG=1)

- TARGET_INSTALL_REMOTE (bool)
  - Toggles whether the install target is remote or local

- PREINSTALL_TARGET_PROCESSES (str)
  - Target process(es) to `killall` *before* package install
  - Space-separated list

- INSTALL_TARGET_PROCESSES (str)
  - Target process(es) to `killall` *after* package install
  - Space-separated list

- DEBUGFLAG (str)
  - Debug flag passed to the linker (default: -ggdb)

- SWIFT_DEBUGFLAG (str)
  - Debug flag passed to the linker (default: -g)

- DEBUG.CFLAGS (str) ----- **unused ?**
  - Debug flag(s) passed to the compiler (default: -DDEBUG -O0)
  - Space-separated list

- DEBUG.SWIFTFLAGS (str) ----- **unused ?**
  - Debug flag(s) passed to `swift` (default: -DDEBUG -Onone)
  - Space-separated list

- DEBUG.LDFLAGS (str) ----- **unused ?**
  - Debug flag(s) passed to the linker (default: -O0)
  - Space-separated list

- OPTFLAG (str)
  - Optimization level passed to compiler/linker (default: -Os)

- SWIFT_OPTFLAG (str)
  - Optimization level passed to `swift` (default: -O -whole-module-optimization)

- GO_EASY_ON_ME (bool)
  - Toggle quieting all errors (default: 0)
  - Bad practice and in the process of being deprecated
    - Migrate to Clang directives (e.g., -Wno-<blah> or #pragma clang diagnostic)

- MAKEFLAGS (str)
  - Flags passed to your make invocation
  - Space-separated list

- FAKEROOT (str) ----- **internal ?**

- LEGACYFLAGS (str)
  - Flags passed to compiler and linker if building for legacy platforms
  - Space-separated list
    - Building for armv6, armv7, and/or armv7s (default: -Xlinker -segalign -Xlinker 4000)
    - Building for iOS < 9 (default: -Xlinker -no_data_const)

- NEUTRAL_ARCH (str)
  - Fallback arch(s) if ARCHS is empty and not set by the platform's respective target makefile
  - Space-separated list

- SYSROOT (str)
  - SYSROOT directory passed to linker

- ISYSROOT (str)
  - Include SYSROOT passed to compiler

- TARGET_PRIVATE_FRAMEWORK_PATH (str)
  - Private framework directory within specified SYSROOT

- TARGET_PRIVATE_FRAMEWORK_INCLUDE_PATH (str)
  - Private framework directory within specified ISYSROOT

- MODULESFLAGS (str)
  - Flags used to enable and make use of [clang modules](https://clang.llvm.org/docs/Modules.html#using-modules)
  - Space-separated list

- VERSIONFLAGS (str)
  - Platform-dependent target/version-min flags passed to compiler and linker
  - Space-separated list

- SWIFTBINPATH (str)
  - Parent directory for `swift` binary (default: $THEOS/toolchain/swift/bin/)

- TARGET_SWIFT (str)
  - Target `swift` binary (default: SWIFTBINPATH/`swift`)

- TARGET_DSYMUTIL (str)
  - Target `dsymutil` binary (default: `dsymutil`/`llvm-dsymutil`)

- TARGET_STRIP_FLAGS (str)
  - Strip flag(s) to use (default: -x)
  - Space-separated list

- TARGET_CC (str)
  - Target CC binary (default: `clang`/`gcc`)

- TARGET_CXX (str)
  - Target CXX binary (default: `clang`/`gcc`)

- TARGET_LD (str)
  - Target LD binary (default: TARGET_CXX)

- TARGET_LIPO (str)
  - Target `lipo` binary (default: `lipo`)

- TARGET_STRIP (str)
  - Target `strip` binary (default: `strip`)

- TARGET_CODESIGN (str)
  - Target codesign binary (default: `codesign`/`ldid`)

- TARGET_CODESIGN_ALLOCATE (str)
  - Target `codesign_allocate` binary (default: `codesign_allocate`)

- TARGET_LIBTOOL (str)
  - Target `libtool` binary (default: `libtool`)

- TARGET_XCODEBUILD (str) **[OSX]**
  - Target `xcodebuild` binary (default: `xcodebuild`)

- TARGET_XCPRETTY (str) **[OSX]**
  - Target `xcpretty` binary (default: `xcpretty`)

- TARGET_CODESIGN_FLAGS (str)
  - Target codesign flag(s) (default: --sign 'Apple Development'/-S)
  - Space-separated list

- TARGET_EXE_EXT (str)
  - Target Windows executable extenstion (default: .exe)

- TARGET_LIB_EXT (str)
  - Target dynamic/shared library extension

- TARGET_AR_EXT (str)
  - Target static archive extension (default: .a)

- TARGET_LDFLAGS_DYNAMICLIB (str)
  - Target linker flag(s) to enable dynamic libraries

- TARGET_CFLAGS_DYNAMICLIB (str)
  - Target compiler flag(s) to enable dynamic libraries

- CROSS_COMPILE (str)
  - Enables cross-compilation for TARGET_CC, TARGET_CXX, TARGET_LD, and TARGET_STRIP on compatbile host/target platform pairs
  - Is triple prefix for target platform (prepended to aforementioned binaries)

- SDKBINPATH (str)
  - Toolchain bin path for target platform

- WATCHOS_SIMULATOR_ROOT (str)
  - The root directory of the simulated OS

- IPHONE_SIMULATOR_ROOT (str)
  - The root directory of the simulated OS

- APPLETV_SIMULATOR_ROOT (str)
  - The root directory of the simulated OS

- SUBPROJECTS (str)
  - Directory names of subprojects to build alongside the root project
  - Space-separated list

- ALL_XCODEFLAGS (str) ----- **internal ?**
- ALL_XCODEOPTS (str) ----- **internal ?**
- EXPANDED_CODE_SIGN_IDENTITY_NAME (str) **[OSX]** ----- **unused ?**
- EXPANDED_CODE_SIGN_IDENTITY (str) **[OSX]** ----- **unused ?**

- LOCAL_INSTALL_PATH (str)
  - File path where you'd like to install the final product (e.g., app, tool, library, framework, etc)
  - (default: XXX_INSTALL_PATH)

- LOGOS_DEFAULT_GENERATOR (str)
  - Default generator passed to logos (default: MobileSubstrate)

- ADDITIONAL_CFLAGS (str)
  - Additional flag(s) passed to CC for c code
  - Space-separated list

- ADDITIONAL_CPPFLAGS (str)
  - Additional flag(s) passed to CXX for c++ code
  - Space-separated list

- USE_DEPS (bool)
  - Toggle dependency tracking (i.e. makedeps) (default: 0)
  - Compiler writes headers to $THEOS_OBJ_DIR/*.Td

- MDFLAGS (str)
  - Flags passed for makedeps
  - Space-separated list

- LOCAL_BUNDLE_NAME (str)
  - Name for the current project instance's bundle

- LOCAL_BUNDLE_EXTENSION (str)
  - File extension for the current project instance's bundle

- SHOULD_STRIP (bool) ----- **internal ?**
- ARCH_FILES_TO_LINK (str) ----- **internal ?**
- TARGET_ARCHS (str) ----- **internal ?**
- PREPROCESS_ARCH_FLAGS (str)  ----- **internal ?**
- OBJ_FILES_TO_LINK (str) ----- **internal ?**
- ALL_*FLAGS * (str) ----- **internal ?**
- *_FILES (str) ----- **internal ?**

## System Variables

- THEOS_STAGING_DIR (str)
  - File path for directory to house stage bits and pieces (default: .theos/_/)

- THEOS_STAGING_DIR_NAME (str)
  - Name for the staging directory (default: _)

- THEOS_LAYOUT_DIR (str)
  - File path for directory to house items to move onto the target's filesystem during install (default: $THEOS_PROJECT_DIR/layout/)
  - The containing directory structure is used as an install guide
    - Exception to this is layout/DEBIAN/ which can be used to install Debian-related files
      - Such files include a `control` file, which will get added to the `status` file (i.e. /var/lib/dpkg/status) on-device, and [maintainer scripts](https://wiki.debian.org/MaintainerScripts), which, after being run, will be placed in /var/lib/dpkg/info/.

- THEOS_LAYOUT_DIR_NAME (str)
  - Name for the layout directory (default: layout)

- THEOS_BUILD_DIR (str)
  - File path for directory to house bits and pieces relevant to building (default: ./)

- THEOS_OBJ_DIR (str)
  - File path for directory to house object files (default: .theos/obj/)

- THEOS_OBJ_DIR_NAME (str)
  - Name for the object directory (default: obj/$THEOS_CURRENT_ARCH/)

- THEOS_PACKAGE_DIR (str)
  - File path for directory to house built packages (default: $THEOS_BUILD_DIR/packages/)

- THEOS_PACKAGE_DIR_NAME (str)
  - Name for the packages directory (default: packages/)

- THEOS_PACKAGE_NAME (str)
  - Name of the current project as defined by `Package:` in the `control` file

- THEOS_PACKAGE_ARCH (str)
  - Architecture of the current project as defined by `Architecture:` in the `control` file

- THEOS_PACKAGE_BASE_VERSION (num)
  - Version of the current project as defined by `Version:` in the `control` file

- THEOS_DEVICE_USER (str)
  - User to use when installing to target device (default: root)

- THEOS_DEVICE_IP (num)
  - IP to use when installing to target device

- THEOS_DEVICE_PORT (num)
  - Port to use when installing to target device
    - Left up to ssh to determine default or user to provide

- THEOS_SUDO_COMMAND (str)
  - Target `sudo` binary (default: `sudo`)

- THEOS_CURRENT_ARCH (str)
  - Current architecture being targeted in build process

- THEOS_TARGET_NAME (str)
  - Lowercase name of the target platform

- THEOS_SUBPROJECT_PRODUCT (str) ----- **internal ?**

- THEOS_SCHEMA (str)
  - Schema to build for "Release," "Debug," or "" (default: "")
    - This will adjust what variables are enabled/disabled in Theos' internal configuration

- THEOS_PLATFORM_NAME (str)
  - Lowercase name of the current host platform (default: $(echo uname))

- THEOS_RSYNC_EXCLUDES (str)
  - Files/file extensions to exclude in the `rsync` copy commands used throughout the project (default: _MTN .git .svn .DS_Store ._*)
  - Space-separated list

- THEOS_LINKAGE_TYPE (str)
  - Type of linking to use (default: dynamic)
    - Alternative is static

- THEOS_PLATFORM_SDK_ROOT (str)
  - SDK path for a specific platform (default: $(shell xcode-select -print-path))

- THEOS_PLATFORM_DEB_COMPRESSION_LEVEL (num)
  - Compression level to use with `dm.pl` (Theos' `dpkg-deb` drop-in)
  - Allowed levels are 0 to 9
    - Default is 9 for bzip2, 6 for others, and 0 is equivalent to cat
    - See https://github.com/theos/dm.pl#options

- THEOS_PLATFORM_DEB_COMPRESSION_TYPE (str)
  - Compression format to use with `dm.pl` (Theos' `dpkg-deb` drop-in)
  - Allowed formats are gzip (default), bzip2, lzma, xz and cat (no compression)
    - Default is lzma in order to maintain compatibility with Telesphoreo's older `dpkg` which lacks xz support (which has since become the new standard)
    - See https://github.com/theos/dm.pl#options

- THEOS_USE_PARALLEL_BUILDING (bool)
  - Toggles parallel building (default: 1 (when possible))
    - Will *greatly* speed up build time
    - Requires `Make` >= 4.0

- THEOS_IGNORE_PARALLEL_BUILDING_NOTICE (str)
  - Toggles the notice to update Make so parallel builds can be used (default: "")

- THEOS_SHARED_BUNDLE_BINARY_PATH (str) ----- **internal ?**
- THEOS_SHARED_BUNDLE_RESOURCE_PATH (str) ----- **internal ?**
- THEOS_SHARED_BUNDLE_HEADERS_PATH (str) ----- **internal ?**

## System Constants

- THEOS (str)
  - Root location for Theos and all of its files
    - This should be set in your shell profile
      - Either $HOME/theos/ or ~/theos/ or /opt/theos/

- THEOS_BIN_PATH (str)
  - Location for tools provided by Theos (default: $THEOS/bin/)

- THEOS_LIBRARY_PATH (str)
  - Location for the user to provide libraries for use with Theos (default: $THEOS/lib/)

- THEOS_TARGET_LIBRARY_PATH (str)
  - Location for the user to provide libraries and frameworks for use with a specific target and Theos (default: $THEOS_LIBRARY_PATH/$THEOS_TARGET_NAME/)

- THEOS_VENDOR_LIBRARY_PATH (str)
  - Location for the libraries and frameworks provided by Theos (default: $THEOS/vendor/lib/)

- THEOS_INCLUDE_PATH (str)
  - Location for headers provided by Theos (default: $THEOS/include/)

- THEOS_TARGET_INCLUDE_PATH (str)
  - Location for the user to provide headers for use with a specific target and Theos (default: $THEOS_INCLUDE_PATH/$THEOS_TARGET_NAME/)

- THEOS_VENDOR_INCLUDE_PATH (str)
  - Location for the headers provided by Theos (default: $THEOS/vendor/include/)

- THEOS_FALLBACK_INCLUDE_PATH (str)
  - Location that can be used to provide drop-in replacements for missing SDK headers (default: $THEOS_INCLUDE_PATH/_fallback/)

- THEOS_MODULE_PATH (str)
  - Location for users to place modules in (default: $THEOS/mod/)

- THEOS_SDKS_PATH (str)
  - Location for SDKs provided by Theos (default: $THEOS/sdks/)
    - These SDKs should be patched (i.e. include private frameworks)

- THEOS_MAKE_PATH (str)
  - Location for Makefiles that make up Theos (default: $THEOS/makefiles/)

- THEOS_PROJECT_DIR (str)
  - Location of the current project (default: $(shell pwd))

- THEOS_CURRENT_INSTANCE (str)
  - The name of the current project instance
    - Note that this is passed to the compiler and can thus be used in your code
