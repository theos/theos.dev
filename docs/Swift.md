---
title: Swift
layout: docs
---

Theos is capable of compiling [Swift](https://swift.org/) files, and supports using them in conjunction with files written in other languages, such as Objective-C. These capabilities are supported on macOS, iOS, and Linux. Instructions for installing the Swift toolchains on [iOS](/docs/Installation-iOS.html) and [Linux](/docs/Installation-Linux.html) can be found on their respective installation wiki pages.

## Swift Runtime
In order to run Swift binaries built with Theos, you must install the Swift runtime on your iOS device. Currently, the runtime can be found on BigBoss under the `org.swift.libswift` package (Swift 5+) or the `com.modmyi.libswift4` package (Swift 4). It is recommended that you add libswift as a dependency in your control file with `Depends: ${LIBSWIFT}` as this will automatically select the correct package based on your Swift version.

## Interoperability with Objective-C

### Swift to Objective-C
In order to use Swift classes in Objective-C, you must import the [auto-generated swiftmodule header](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_swift_into_objective-c) by adding `#import <[instance]-Swift.h>` to your Objective-C file. Swift declarations that you wish to expose to Objective-C must be marked with the `public` or `open` modifier.

### Objective-C to Swift
Create a file named `<instance>-Bridging-Header.h` in your project directory and import any Objective-C headers into it which you wish to expose to Swift. This header file is automatically imported into any Swift files you create.

## Variables
* `<instance>_SWIFTFLAGS` or `<file>_SWIFTFLAGS` *string*. Default: empty. Custom flags to pass to the Swift compiler for all files or a specific file (respectively).
* `<instance>_SWIFT_BRIDGING_HEADER` *filename*. Default: `<instance>-Bridging-Header.h`. The path to the [Objective-C bridging header](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_objective-c_into_swift) to be imported into all Swift files during compilation. For more information, see [Objective-C to Swift Interoperability](#objective-c-to-swift).

## Tweaks
You can make Swift tweaks using [Orion](https://orion.theos.dev). Do note that Orion does not support hooking Swift code at the moment. 
