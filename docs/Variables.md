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
  - Space-separated list or any other standard GNU Make conventions

- XXX_CFLAGS (str)
  - Flags to pass to compiler
  - Space-separated list

- XXX_LDFLAGS (str)
  - Flags to pass to linker
  - Space-separated list

- XXX_BUNDLE_RESOURCE_DIRS (str)
  - File path(s) for the current bundle's resource directory
  - Space-separated list or any other standard GNU Make conventions

- XXX_BUNDLE_RESOURCE_FILES (str)
  - File path(s) for the current bundle's resource files
  - Space-separated list or any other standard GNU Make conventions

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
  - Space-separated list or any other standard GNU Make conventions

- XXX_OBJC_FILES (str)
  - Objective-C files you'd like to compile
  - Space-separated list or any other standard GNU Make conventions

- XXX_C_FILES (str)
  - C files you'd like to compile
  - Space-separated list or any other standard GNU Make conventions

- XXX_CC_FILES (str)
  - C++ files you'd like to compile
  - Space-separated list or any other standard GNU Make conventions

- XXX_LOGOS_FILES (str)
  - Logos files you'd like to compile
  - See https://theos.dev/docs/logos-file-extensions
  - Space-separated list or any other standard GNU Make conventions

- XXX_USE_SUBSTRATE (bool)
  - Use MobileSubstrate as the logos generator
  - Will link against CydiaSubstrate

- TWEAK_TARGET_PROCESS (str)
  - Target process to `killall` after your tweak installs
  - Space-separated list

- SUBPROJECT_OBJ_FILES (str) ----- **internal ?**
- SUBPROJECT_LDFLAGS (str) ----- **internal ?**

## Local Variables

- ARCHS (str)
- DEBUG (bool)
- FINALPACKAGE (bool)
- STRIP (bool)
- PACKAGE_FORMAT (str)
- DEB_ARCH (str)
- TARGET (str)             (see target.mk)
- FOR_RELEASE (bool)
- PREFIX (str)
- INSTALL_PREFIX (str)
- PACKAGE_VERSION (num)
- PACKAGE_BUILDNAME (str)
- TARGET_INSTALL_REMOTE (bool)
- PREINSTALL_TARGET_PROCESSES (str)
- INSTALL_TARGET_PROCESSES (str)
- DEBUGFLAG (str)
- SWIFT_DEBUGFLAG (str)
- DEBUG.CFLAGS (str)
- DEBUG.SWIFTFLAGS (str)
- DEBUG.LDFLAGS (str)
- OPTFLAG (str)
- SWIFT_OPTFLAG (str)
- GO_EASY_ON_ME (bool)
- MAKEFLAGS (str)
- FAKEROOT (str)
- LEGACYFLAGS (str)
- NEUTRAL_ARCH (str)
- SYSROOT (str)
- ISYSROOT (str)
- TARGET_PRIVATE_FRAMEWORK_PATH (str)
- TARGET_PRIVATE_FRAMEWORK_INCLUDE_PATH (str)
- MODULESFLAGS (str)
- VERSIONFLAGS (str)
- TARGET_SWIFT (str)
- TARGET_DSYMUTIL (str)
- TARGET_STRIP_FLAGS  (str)
- TARGET_CC (str)
- TARGET_CXX (str)
- TARGET_LD (str)
- TARGET_LIPO (str)
- TARGET_STRIP (str)
- TARGET_CODESIGN_ALLOCATE (str)
- TARGET_LIBTOOL (str)
- TARGET_XCODEBUILD (str)
- TARGET_XCPRETTY (str)
- SWIFTBINPATH (str)
- TARGET_CODESIGN_FLAGS (str)
- TARGET_CODESIGN (str)
- TARGET_EXE_EXT (str)
- TARGET_LIB_EXT (str)
- TARGET_AR_EXT (str)
- TARGET_LDFLAGS_DYNAMICLIB (str)
- TARGET_CFLAGS_DYNAMICLIB (str)
- CROSS_COMPILE
- SDKBINPATH (str)
- WATCHOS_SIMULATOR_ROOT (str)
- IPHONE_SIMULATOR_ROOT (str)
- VERSIONFLAGS (str)
- APPLETV_SIMULATOR_ROOT (str)
- SUBPROJECTS (str)
- ALL_XCODEFLAGS (str)
- ALL_XCODEOPTS (str)
- CODE_SIGNING_ALLOWED (bool) **[xcode]**
- ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES (bool) **[xcode]**
- ENABLE_BITCODE (bool) **[xcode]**
- DSTROOT (str) **[xcode]**
- EXPANDED_CODE_SIGN_IDENTITY_NAME (str) **[xcode]**
- EXPANDED_CODE_SIGN_IDENTITY (str) **[xcode]**
- LOCAL_INSTALL_PATH (str)
- LOGOS_DEFAULT_GENERATOR (str)
- OBJ_FILES (str)
- OBJC_FILES (str)
- OBJCC_FILES (str)
- SWIFT_FILES (str)
- OBJ_FILES_TO_LINK (str)
- ADDITIONAL_CPPFLAGS (str)
- TARGET_ARCHS (str)
- ALL_ARCHFLAGS (str)
- PREPROCESS_ARCH_FLAGS (str)
- ALL_PFLAGS (str)
- ADDITIONAL_CFLAGS (str)
- ALL_CFLAGS (str)
- ALL_CCFLAGS (str)
- ALL_OBJCFLAGS (str)
- ALL_OBJCCFLAGS (str)
- ALL_SWIFTFLAGS (str)
- ALL_LOGOSFLAGS (str)
- ALL_LDFLAGS (str)
- ALL_STRIP_FLAGS (str)
- USE_DEPS (str)
- ALL_DEPFLAGS (str)
- ALL_DEPFLAGS_SWIFT (str)
- DEP_FILES (str)
- MDFLAGS (str)
- ARCH_FILES_TO_LINK (str)
- SHOULD_STRIP (bool)
- TARGET_CFLAGS_DYNAMICLIB (str)
- LOCAL_BUNDLE_NAME (str)
- LOCAL_BUNDLE_EXTENSION (str)

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