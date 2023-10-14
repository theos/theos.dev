---
title: Rootless
layout: docs
---

### Context

Practically all jailbreaks prior to iOS 15 have been 'rootful' as they work on and install files to the (root) system directories (e.g., `/usr`, `/Library`, `/Applications`, etc). Moving forward with iOS 15 and beyond, most if not all jailbreaks will have to be 'rootless' as Apple now prevents writing to the system directories with a protection called [Signed System Volume (SSV)](https://support.apple.com/guide/security/signed-system-volume-security-secd698747c9/web). There are workarounds for this, namely bindFS, but these are less than ideal.

To work around SSV, the [Procursus Team](https://github.com/procursusteam/) has thought up a rootless scheme that is now the de facto rootless standard. The changes namely involve working in and installing tweaks/addons to `/var/jb` and using the `iphoneos-arm64` package architecture. To learn more about the specifics of this implementation, see [The Apple Wiki](https://theapplewiki.com/wiki/Rootless).

With this new target location, *all* projects will have to be recompiled to reference resources from and install to `/var/jb`. This involves changing the internal structure of .deb's to include this new path and specifying library and framework install paths using `@rpath` instead of absolute paths. Theos will handle both of these changes for you. For more information on what `@rpath` is and how it works, see Mike Ash's [informative blog post](http://www.mikeash.com/pyblog/friday-qa-2009-11-06-linking-and-install-names.html).

### Implementation

---

**Important Notes**:
- You must run `make clean` when switching between a rootful and rootless build

- If you maintain a library, you'll want to add some variation of the following to your code so that it will have the correct install path:
```make
ifeq ($(THEOS_PACKAGE_SCHEME),rootless)
XXX_LDFLAGS += -install_name @rpath/<lib-name>.dylib
endif
```

- Likewise, if you maintain a framework, you'll want to add some variation of the following to your code so that it will have the correct install path:
```make
ifeq ($(THEOS_PACKAGE_SCHEME),rootless)
XXX_LDFLAGS += -install_name @rpath/<project-name>.framework/<project-name>
endif
```

- The iOS 14 arm64e ABI mentioned in [arm64e Deployment](arm64e-Deployment.html) is now *required* for the relevant devices
    - Currently, it's only possible to build for the new ABI on macOS
        - If you want to maintain support for earlier versions, you can grab the toolchain from an earlier Xcode release as specified in [arm64e Deployment](arm64e-Deployment.html) and switch between it and the newer toolchain as desired by setting the `PREFIX` variable to the older toolchain's bin (i.e., `<xcode-ver>.xctoolchain/usr/bin/`) in your project's makefile
    - That being said, developers on other platforms can circumvent this *if necessary*:
        - By adding `oldabi` as a dependency to their package (preferably only as a last resort)

---

Theos supports building for the rootless scheme in a few ways:
- Provides rootless-compatible libraries and frameworks in `$THEOS_VENDOR_LIBRARY_PATH/iphone/rootless`

- Provides `rootless.h` -- a header that contains convenient macros to easily convert rootful paths to rootless ones in your code at compile-time, assuming you compile for the rootless scheme (see below)
    - `#import <rootless.h>`
    - Courtesy of [opa334](https://github.com/theos/headers/commit/9f00c9663aff892b512f87666dbfbf8fe4943e84)

- `THEOS_PACKAGE_SCHEME=rootless` -- a variable to enable a handful of internal changes including:
    - Searching for libraries and frameworks when linking in `$THEOS_LIBRARY_PATH/iphone/rootless` and `$THEOS_VENDOR_LIBRARY_PATH/iphone/rootless`
    - Passing the relevant prefixed rpaths to the linker so your project can find the linked rootless libraries and frameworks on-device
    - Sharing the install prefix (`THEOS_PACKAGE_INSTALL_PREFIX=/var/jb`) with the compiler for use in your code
    - Setting the package architecture to `iphoneos-arm64` if your control file specifies `iphoneos-arm`

Additional notes:
- You do *not* need to create separate package identifiers for rootful/rootless versions of the same package
    - Newer versions of rootless-compatible package managers (e.g., Sileo and Zebra) will present only the compatible version to users
    - The behavior of other package managers varies and may or may not supply the correct package to users

- This new rootless scheme only supports iOS 15+, which itself only supports newer devices
    - This means that you do not need to compile for legacy architectures (e.g., `armv7(s)` or older) if you were previously and can bump your deployment target to 15.0 when building for rootless
