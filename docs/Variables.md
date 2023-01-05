---
title: Variables
layout: docs
---

Theos utilizes a lengthy list of variables to pass information through its Makefile system and to the relevant tools.

The naming convention is as follows:
  - Private
    - Prefixed by an underscore ("_")
    - Reassigned in legacy.mk
  - Public
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

*Note: "XXX" = $(THEOS_CURRENT_INSTANCE)_NAME*

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
  - File path(s) for the current bundle's resource directory
  - Space-separated list or any other standard GNU Make convention

- XXX_BUNDLE_RESOURCE_FILES (str)
  - File path(s) for the current bundle's resource files
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

- XXX_NAME (str)
  - Your project's name

- XXX_WITH_SUBPROJECTS ----- **internal ?**

- XXX_LIBRARY_EXTENSION (str)
  - The file extension for your library

- XXX_WEAK_FRAMEWORKS (str)
  - Frameworks to weak link against
  - Space-separated list

- XXX_WEAK_LIBRARIES (str)
  - Libraries to weak link against
  - Space-separated list

- XXX_GENERATOR (str)
  - The logos generator you'd like to use
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
  - Use MobileSubstrate as the logos generator
  - Will link against CydiaSubstrate

- XXX_ARCHS (str)
  - Space-separated list of architecture(s) to build for

- XXX_ENABLE_BITCODE (bool) **[OSX]**
  - Toggle Bitcode

- TWEAK_TARGET_PROCESS (str)
  - Target process to `killall` after your tweak installs
  - Space-separated list

- SUBPROJECT_OBJ_FILES (str) ----- **internal ?**
- SUBPROJECT_LDFLAGS (str) ----- **internal ?**

## Local Variables

- ARCHS (str)
  - Architecture(s) to build for
  - Space-separated list

- DEBUG (bool)
  - Enable debug symbols
  - Will add `+debug` to the package name

- FINALPACKAGE (bool)
  - Strips debug symbols (i.e., disable DEBUG)
  - Removes incremental version from package name
  - Optimizes xml/plist files to bplist

- FOR_RELEASE (bool)
  - Same as FINALPACKAGE

- STRIP (bool)
  - Strip debug symbols

- PACKAGE_FORMAT (str)
  - Type of package to build
  - `deb`, `ipa`, `pkg`, `rpm`, or `none`

- TARGET (str)
  - Required build configuration items
  - Format `platform:compiler:sdk_version:deployment_version`

- PREFIX (str)
  - Path to your toolchain bin
  - Often used on OSX to switch between xctoolchains

- PACKAGE_VERSION (num)
  - Your package version

- PACKAGE_BUILDNAME (str)
  - Additional string added to the package name (e.g. debug for DEBUG=1)

- TARGET_INSTALL_REMOTE (bool)
  - Specifies whether the install target is remote or local

- PREINSTALL_TARGET_PROCESSES (str)
  - Target process(es) to `killall` *before* package install

- INSTALL_TARGET_PROCESSES (str)
  - Target process(es) to `killall` *after* package install

- DEBUGFLAG (str)
  - Debug flag passed to the linker (default =-ggdb)

- SWIFT_DEBUGFLAG (str)
  - Debug flag passed to the linker (default =-g)

- DEBUG.CFLAGS (str) ----- **unused ?**
  - Debug flag(s) passed to the compiler (default =-DDEBUG -O0)

- DEBUG.SWIFTFLAGS (str) ----- **unused ?**
  - Debug flag(s) passed to `swift` (default =-DDEBUG -Onone)

- DEBUG.LDFLAGS (str) ----- **unused ?**
  - Debug flag(s) passed to the linker (default =-O0)

- OPTFLAG (str)
  - Optimization level passed to compiler/linker

- SWIFT_OPTFLAG (str)
  - Optimization level passed to `swift`

- GO_EASY_ON_ME (bool)
  - Quiets all errors
  - Bad practice and in the process of being deprecated
    - Migrate to Clang directives (e.g., -Wno-<blah> or #pragma clang diagnostic)

- MAKEFLAGS (str)
  - Flags passed to your make invocation

- FAKEROOT (str) ----- **internal ?**

- LEGACYFLAGS (str)
  - Flags passed to compiler and linker if building for legacy platforms (e.g., armv6, armv7, and/or armv7s or iOS < 9)

- NEUTRAL_ARCH (str)
  - Fallback arch(s) if ARCHS is empty and not set by the platform's respective target makefile

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

- VERSIONFLAGS (str)
  - Platform-dependent target/version-min flags passed to compiler and linker

- SWIFTBINPATH (str)
  - Parent directory for `swift` binary (default =$THEOS/toolchain/swift/bin/)

- TARGET_SWIFT (str)
  - Target `swift` binary (default =SWIFTBINPATH/`swift`)

- TARGET_DSYMUTIL (str)
  - Target `dsymutil` binary (default =`dsymutil`/`llvm-dsymutil`)

- TARGET_STRIP_FLAGS (str)
  - Strip flag(s) to use

- TARGET_CC (str)
  - Target CC binary (default =`clang`/`gcc`)

- TARGET_CXX (str)
  - Target CXX binary (default =`clang`/`gcc`)

- TARGET_LD (str)
  - Target LD binary (default =TARGET_CXX)

- TARGET_LIPO (str)
  - Target `lipo` binary (default =`lipo`)

- TARGET_STRIP (str)
  - Target `strip` binary (default =`strip`)

- TARGET_CODESIGN_ALLOCATE (str)
  - Target `codesign_allocate` binary

- TARGET_LIBTOOL (str)
  - Target `libtool` binary

- TARGET_XCODEBUILD (str) **[OSX]**
  - Target `xcodebuild` binary

- TARGET_XCPRETTY (str) **[OSX]**
  - Target `xcpretty` binary

- TARGET_CODESIGN (str)
  - Target codesign binary (default =`codesign`/`ldid`)

- TARGET_CODESIGN_FLAGS (str)
  - Target codesign flag(s)

- TARGET_EXE_EXT (str)
  - Target Windows executable extenstion (default =.exe)

- TARGET_LIB_EXT (str)
  - Target dynamic/shared library extension

- TARGET_AR_EXT (str)
  - Target static archive extension (default =.a)

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

- ALL_XCODEFLAGS (str) ----- **internal ?**
- ALL_XCODEOPTS (str) ----- **internal ?**
- EXPANDED_CODE_SIGN_IDENTITY_NAME (str) **[OSX]** ----- **unused ?**
- EXPANDED_CODE_SIGN_IDENTITY (str) **[OSX]** ----- **unused ?**

- LOCAL_INSTALL_PATH (str)
  - File path where you'd like to install the final product (e.g., app, tool, library, framework, etc)
  - (default =XXX_INSTALL_PATH)

- LOGOS_DEFAULT_GENERATOR (str)
  - Default generator passed to logos (default =MobileSubstrate)

- ADDITIONAL_CFLAGS (str)
  - Additional flag(s) passed to CC for c code

- ADDITIONAL_CPPFLAGS (str)
  - Additional flag(s) passed to CXX for c++ code

- USE_DEPS (str)
  - Toggle dependency tracking
  - Compiler writes headers to $THEOS_OBJ_DIR/*.Td

- MDFLAGS (str)
  - Flags passed for makedeps

- ARCH_FILES_TO_LINK (str)
- SHOULD_STRIP (bool)
- TARGET_CFLAGS_DYNAMICLIB (str)
- LOCAL_BUNDLE_NAME (str)
- LOCAL_BUNDLE_EXTENSION (str)

- TARGET_ARCHS (str) ----- **internal ?**
- PREPROCESS_ARCH_FLAGS (str)  ----- **internal ?**
- OBJ_FILES_TO_LINK (str) ----- **internal ?**
- ALL_*FLAGS * (str) ----- **internal ?**
- *_FILES (str) ----- **internal ?**

## System Variables

- THEOS_STAGING_DIR (str)
- THEOS_STAGING_DIR_NAME (str)
- THEOS_LAYOUT_DIR (str)
- THEOS_LAYOUT_DIR_NAME (str)
- THEOS_BUILD_DIR (str)
- THEOS_OBJ_DIR (str)
- THEOS_OBJ_DIR_NAME (str)
- THEOS_PACKAGE_DIR (str)
- THEOS_PACKAGE_DIR_NAME (str)
- THEOS_PACKAGE_FILENAME (str)
- THEOS_PACKAGE_NAME (str)
- THEOS_PACKAGE_ARCH (str)
- THEOS_PACKAGE_BASE_VERSION (num)
- THEOS_DEVICE_USER (str)
- THEOS_DEVICE_IP (num)
- THEOS_DEVICE_PORT (num)
- THEOS_SUDO_COMMAND (str)
- THEOS_CURRENT_ARCH (str)
- THEOS_TARGET_NAME (str)
- THEOS_SUBPROJECT_PRODUCT (str)
- THEOS_SCHEMA (str)
- THEOS_PLATFORM_NAME (str)
- THEOS_RSYNC_EXCLUDES (str)
- THEOS_LINKAGE_TYPE (str)
- THEOS_PLATFORM_SDK_ROOT (str)
- THEOS_PLATFORM_DEB_COMPRESSION_LEVEL (num)
  - [0-9]
- THEOS_PLATFORM_DEB_COMPRESSION_TYPE (str)
- THEOS_USE_PARALLEL_BUILDING (bool)
- THEOS_IGNORE_PARALLEL_BUILDING_NOTICE (bool)
- THEOS_SHARED_BUNDLE_BINARY_PATH (str)
- THEOS_SHARED_BUNDLE_RESOURCE_PATH (str)
- THEOS_SHARED_BUNDLE_HEADERS_PATH (str)

## System Constants

- THEOS (str)
- THEOS_BIN_PATH (str)
- THEOS_LIBRARY_PATH (str)
- THEOS_TARGET_LIBRARY_PATH (str)
- THEOS_VENDOR_LIBRARY_PATH (str)
- THEOS_INCLUDE_PATH (str)
- THEOS_VENDOR_INCLUDE_PATH (str)
- THEOS_TARGET_INCLUDE_PATH (str)
- THEOS_FALLBACK_INCLUDE_PATH<sup>[1]</sup> (str)
- THEOS_MODULE_PATH (str)
- THEOS_SDKS_PATH (str)
- THEOS_MAKE_PATH (str)
- THEOS_PROJECT_DIR (str)
- THEOS_CURRENT_INSTANCE (str)

## Notes

[1] - $(THEOS)/include/_fallback