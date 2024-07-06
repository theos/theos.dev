---
title: Concepts
layout: docs
---

#### Make

[Make](https://www.gnu.org/software/make/) is a language used to outline the procedure for a program's creation. The steps are written in Makefiles which are then read by `make` and used to route your project files to tools such as `clang` or `ld` via rules. Theos relies on a [collection of such Makefiles](https://github.com/theos/theos/tree/master/makefiles) to build and package your project. While this allows for significant configuration, the interaction between the various Makefiles severely limits the speed from `make` invocation to build completion.

#### Logos

[Logos](https://github.com/theos/logos) is a preprocessor written by the Theos team to simplify C-based hooking. This "hooking" is technically swizziling, which is the process of replacing a method/function's implementation at runtime. Logos translates simple statements such as `%hook` into the equivalent [MobileSubstrate](http://www.cydiasubstrate.com/api/c/MSHookMessageEx/), [libhooker](https://libhooker.com/docs/), or [internal](https://developer.apple.com/documentation/objectivec/objective-c_runtime?language=objc) (i.e., ObjC Runtime) hooking API. Logos syntax is converted to these APIs during the preprocessing of your [Logos files](Logos-File-Extensions).

#### Instance

Theos projects are defined through instances, where each instance is a separate piece of the project. For example, a tweak with a preferences subproject is said to be comprised of two instances. These instances' names are given by the user via the `XXX_NAME` variable, where `XXX` is the project type (e.g., tool, tweak, etc). Each instance is built separately and then combined, if specified, in staging (see below).

#### Objects

When your project files (e.g., .c, .m, .x, etc) are compiled, they are converted into object files (.o). These files reside in `THEOS_OBJ_DIR` along with a number of other files. The object directory is configured as such:

```
.theos/
    obj/
        $(THEOS_SCHEMA)/
            $(THEOS_CURRENT_ARCH)/
            $(THEOS_CURRENT_INSTANCE)
```

If a schema is configured, Theos will place the object files within an aptly named subdirectory in order to differentiate between possible schema builds. If a `release` schema is specified, the files will be placed within the object directory itself and not a schema-based subdirectory. Within said directory, there will be any number of additional subdirectories for the specified architecture(s) your project is built for (e.g., armv7, arm64, arm64e, etc). Within these directories will be the object files for the given project along with a thin binary built from said objects for the given architecture. Outside of these architecture subdirectories will be a fat binary created from each of the architecture thin binaries via `lipo`. This fat binary is considered the final object.

To solely build objects, run `make` within your project.

#### Staging

Staging is the term given to the two step pre-packaging process comprised of:

1) The creation of the package hierarchy for the chosen project type

2) The placement of the product objects within this structure in preparation for packaging

This staging occurs within the `THEOS_STAGING_DIR` which has a number of potential configurations all of which reside in ```.theos/_/``` by default. If present, the contents of `THEOS_LAYOUT_DIR` are copied into the staging directory along with any resource bundles that may be associated with your project.

If a `THEOS_PACKAGE_SCHEME` containing a `THEOS_PACKAGE_INSTALL_PREFIX` is provided, Theos will create a second stage with the install prefix in `.theos/_tmp/` in order to separate the project type's package structure from the scheme's packaging prefix. The two will be merged prior to packaging.

To build and complete staging without packaging, run `make stage` within your project.
