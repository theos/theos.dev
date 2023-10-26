---
title: arm64e Deployment
layout: docs
---

In iOS 12, Apple introduced a new architecture they call **arm64e**. This implements the armv8.3 architecture and is supported by the Apple A12 and newer processors. Specifically, this architecture is known for implementing pointer authentication.

This architecture is currently in flux and considered private by Apple, so its use is not advised. However, it is necessary to build for this architecture in order to inject code into iOS platform binaries which are built using the arm64e architecture. Due to the nature of pointer authentication, backwards compatibility with arm64 (armv8.0) binaries is not implemented.

For more information on pointer authentication, refer to the [official documentation](https://developer.apple.com/documentation/security/preparing_your_app_to_work_with_pointer_authentication) on the topic.

## Building for iOS 12.0–13.7
You may have been directed here by the following warning output by Theos:

> **Warning:** Building for iOS 7.0, but the current toolchain can’t produce arm64e binaries for iOS earlier than 14.0. More information: https://theos.dev/docs/arm64e-deployment

With iOS 14.0 and Xcode 12.0 (or clang 12.0.0 and newer for toolchains on other platforms), the ABI (application binary interface) of arm64e changed. Binaries built with this version of the compiler will *not* be compatible with the arm64e implementation on iOS 12.0–13.7.

There are two ways to overcome this:

* **Increase your deployment version:** If you only intend for your product to run on iOS 14.0 or newer anyway, make this explicit by setting as such in your `TARGET`. For example, adding to the top of your Makefile:

  ```make
  export TARGET = iphone:latest:14.0
  ```

  This `TARGET` variable indicates to build for iOS using the latest SDK version you have installed, deploying the binary for iOS 14.0 and newer.

* **Install Xcode 11.7:** If you still plan to support versions of iOS earlier than 14.0, you will need to downgrade to Xcode 11.7.

  You can download Xcode 11.7 directly from Apple at the following link: [**Xcode_11.7.xip**](https://developer.apple.com/services-account/download?path=/Developer_Tools/Xcode_11.7/Xcode_11.7.xip). You will need to authenticate with your Apple ID to download.

  Once downloaded, opening the .xip file will begin extracting it. After extraction, rename the app to not conflict with your primary installation of Xcode. A good choice is `Xcode-11.7.app`.

  Finally, change your selected Xcode command line tools version:

  ```bash
  sudo xcode-select -switch /Applications/Xcode-11.7.app/Contents/Developer

  # If you need to use the latest Xcode toolchain from the command line,
  # use --reset:
  sudo xcode-select --reset

  # Alternatively, you can temporarily change your command line tools version
  # for just this terminal session:
  export DEVELOPER_DIR=/Applications/Xcode-11.7.app/Contents/Developer

  # Or you can change the command line tools version for just the particular
  # Theos build command invokation:
  DEVELOPER_DIR=/Applications/Xcode-11.7.app/Contents/Developer make package
  ```

  You can also use the Xcode GUI to change your command line tools version, via Xcode &rarr; Preferences &rarr; Locations &rarr; Command Line Tools.

  Note: On macOS Monterey (12.0) and newer, Xcode 11.7 will have a no-sign 🚫 displayed on top of its icon, and when you double-click it, the error message “In order to use “Xcode-11.7.app”, you need to update to the latest version.” appears. While you won’t be able to use the Xcode app itself, its toolchain still appears to work without issues.
