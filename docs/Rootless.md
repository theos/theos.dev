---
title: Rootless
layout: docs
---

### Context

Practically all jailbreaks prior to iOS 15 have been 'rootful' as they work on and install files to the (root) system directories (e.g., `/usr`, `/Library`, `/Applications`, etc.). Moving forward with iOS 15 and beyond, most if not all jailbreaks will have to be 'rootless' as Apple now prevents writing to the system directories with a protection called [Signed System Volume (SSV)](https://support.apple.com/guide/security/signed-system-volume-security-secd698747c9/web). There are workarounds for this, namely bindFS, but these are less than ideal.

Note that 'rootless' does not imply lack of `root` user permissions, contrary to what its name might suggest.

To work around SSV, the [Procursus Team](https://github.com/procursusteam/) has thought up a rootless scheme that is now the de facto rootless standard. The changes namely involve working in and installing tweaks/addons to `/var/jb` and using the `iphoneos-arm64` package architecture. To learn more about the specifics of this implementation, see [The Apple Wiki](https://theapplewiki.com/wiki/Rootless).

With this new target location, *all* projects will have to be recompiled to reference resources from and install to `/var/jb`. This involves changing the internal structure of .deb's to include this new path and specifying library and framework install paths using `@rpath` instead of absolute paths. Theos will handle both of these changes for you. For more information on what `@rpath` is and how it works, see Mike Ash's [informative blog post](http://www.mikeash.com/pyblog/friday-qa-2009-11-06-linking-and-install-names.html).

### Implementation

---

**Important Notes**:
- You must run `make clean` when switching between a rootful and rootless build

- The iOS 14 arm64e ABI mentioned in [arm64e Deployment](arm64e-Deployment.html) is now *required* for the relevant devices
    - Currently, it's only possible to build for the new ABI on macOS as the necessary `ld64` changes, included in Xcode, have not been made open source
        - Unfortunately, this newer toolchain does not support building for the old ABI. If you want to maintain support for earlier versions, you can grab the toolchain from an earlier Xcode release as specified in [arm64e Deployment](arm64e-Deployment.html) and switch between it and the newer toolchain as desired by setting the `PREFIX` variable to the older toolchain's bin (i.e., `<xcode-ver>.xctoolchain/usr/bin/`) in your project's makefile
    - That being said, developers on other platforms can circumvent this *if necessary*:
        - By [using GitHub Actions](https://github.com/p0358/SilentScreenshots/blob/master/.github/workflows/build.yml) to compile their tweaks (free for both public and private repos)
        - By using a macOS virtual machine
            - See KVM on Linux and VMware on Windows
            - If you want to reduce resources used by the VM (after installing Xcode and Theos):
                - [Enable SSH access in System Preferences](https://osxdaily.com/2022/07/08/turn-on-ssh-mac/)
                - Disable the WindowServer daemon with `sudo launchctl disable system/com.apple.WindowServer` and reboot.
                    - This will disable macOS's graphical user interface, reducing the idle CPU and RAM usage to ~900 MB
                - Reboot and SSH into the VM to use Theos
        - By using [allemande](https://github.com/p0358/allemande) (static binary converter to old ABI)
            - This is currently the best solution if you cannot use macOS and Xcode 
            - It does not work with tweaks containing Swift code (including the Cephei v2.0 library)
        - By adding `oldabi` as a dependency to their package (preferably only for testing or as a last resort as it applies system-wide and may cause instability for users)
            - If you intend to release packages without the `oldabi` dependency, make sure to uninstall `oldabi` from your device during testing to avoid accidentally releasing a tweak that silently relies on it without your knowledge!
    - **Please note**: this only applies to arm64e binaries (i.e., system binaries and libraries). It does not apply to App Store apps or regular CLI binaries as arm64e is disallowed due to its unstable ABI. That is, you can continue compiling tweaks for non-system apps with any toolchain and do not need to target arm64e for your apps or CLI binaries.

---

Theos supports building for the rootless scheme in a few ways:
- Provides rootless-compatible libraries and frameworks in `$THEOS_VENDOR_LIBRARY_PATH/iphone/rootless`

- Provides [`rootless.h`](https://github.com/theos/headers/blob/master/rootless.h) -- a header that contains convenient macros to easily convert rootful paths to rootless ones in your code at compile-time, assuming you compile for the rootless scheme (see below)
    - `#import <rootless.h>`
    - Courtesy of opa334


#### ``rootless.h`` implementation:
- `ROOT_PATH_NS` for Obj-C strings.
- ``lROOT_PATH` for C strings.
- `ROOT_PATH_NS_VAR` Dynamically constructs a file path by appending the provided path component to ```/var/jb```[Obj-C]

`rootless.h` can be used with Obj-C strings with like so:
```
NSString *dylibPath = ROOT_PATH_NS(@"/Library/MobileSubstrate/DynamicLibraries/libFLEX.dylib");
```
`rootless.h` is included with Theos and it can be imported as shown above.

- `THEOS_PACKAGE_SCHEME=rootless` -- a variable to enable a handful of internal changes including:
    - Searching for libraries and frameworks when linking in `$THEOS_LIBRARY_PATH/iphone/rootless` and `$THEOS_VENDOR_LIBRARY_PATH/iphone/rootless`
    - Handling install_name changes to use @rpath for libraries and frameworks
    - Passing the relevant prefixed rpaths to the linker so your project can find the linked rootless libraries and frameworks on-device
    - Sharing the install prefix (`THEOS_PACKAGE_INSTALL_PREFIX=/var/jb`) with the compiler for use in your code
    - Setting the package architecture to `iphoneos-arm64` if your control file specifies `iphoneos-arm`

Additional notes:
- You do *not* need to create separate package identifiers for rootful/rootless versions of the same package
    - Newer versions of rootless-compatible package managers (e.g., Sileo and Zebra) will present only the compatible version to users
    - Cydia will display duplicate packages, but both point to the rootful version
        - This can be corrected with [cyarchfix](https://github.com/PoomSmart/cyarchfix) by PoomSmart
    - The behavior of other package managers varies and may or may not supply the correct package to users

- All non-DEBIAN items (e.g., maintainer scripts) are placed in `/var/jb`
    - Please ensure that any additional resources you provide (e.g., newly created or laid out files and directories) are stored in a prefixed path and not a rootful path, as the latter could lead to jailbreak detection in a non-jailbroken state

- This new rootless scheme only supports iOS 15+, which itself only supports newer devices
    - This means that you do not need to compile for legacy architectures (e.g., `armv7(s)` or older) if you were previously and can bump your deployment target to 15.0 when building for rootless

---

If desired, you can conditionally check for the package scheme in your project's Makefile to selectively apply rootless build settings:
```make
ifeq ($(THEOS_PACKAGE_SCHEME),rootless)
	ARCHS = arm64 arm64e
	TARGET = iphone:clang:latest:15.0
else
	ARCHS = armv7 armv7s arm64 arm64e
	TARGET = iphone:clang:latest:7.0
endif
```