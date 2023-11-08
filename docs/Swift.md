---
title: Swift
layout: docs
---

Theos is capable of compiling [Swift](https://swift.org/) files, and supports using them in conjunction with files written in other languages, such as Objective-C. These capabilities are supported on macOS, iOS, and Linux.

## Swift Runtime
In order to run Swift binaries built with Theos, you must have the Swift runtime installed on your iOS device. The runtime is bundled with iOS as of iOS 12.2. If your device is on an older version, however, you'll have to install the runtime. It can be found on BigBoss under the `org.swift.libswift` package (Swift 5+) or the `com.modmyi.libswift4` package (Swift 4). It is recommended that you add libswift as a dependency in your control file with `Depends: firmware (>= 12.2) | ${LIBSWIFT}` if your project targets earlier iOS versions as this will automatically select the correct package based on your Swift version. This is not necessary if your project only targets iOS versions >= iOS 12.2.

## Interoperability with Objective-C

### Swift to Objective-C
In order to use Swift classes in Objective-C, you must import the [auto-generated swiftmodule header](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_swift_into_objective-c) by adding `#import <[instance]-Swift.h>` to your Objective-C file. Swift declarations that you wish to expose to Objective-C must be marked with the `public` or `open` modifier.

### Objective-C to Swift
Create a file named `<instance>-Bridging-Header.h` in your project directory and import any Objective-C headers into it which you wish to expose to Swift. This header file is automatically imported into any Swift files you create.

## Variables
* `<instance>_SWIFTFLAGS` or `<file>_SWIFTFLAGS` *string*. Default: empty. Custom flags to pass to the Swift compiler for all files or a specific file (respectively).
* `<instance>_SWIFT_BRIDGING_HEADER` *filename*. Default: `<instance>-Bridging-Header.h`. The path to the [Objective-C bridging header](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_objective-c_into_swift) to be imported into all Swift files during compilation. For more information, see [Objective-C to Swift Interoperability](#objective-c-to-swift).

## Tweaks
You can write tweaks in Swift using [Orion](https://orion.theos.dev). Do note that there is no solution for hooking Swift code at the moment.
