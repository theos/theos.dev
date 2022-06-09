---
title: New Instance Creator (NIC)
layout: docs
---

NIC is the New Instance Creator ([you can call him Nicolas!](https://github.com/theos/theos/commit/6c623614612ac07d1963c851e4a54302be6bf40d)). It provides a way to create projects (“instances”) based on templates. Theos comes with a handful of useful templates and others are available from various developers in the community.

See also [iPhone Dev Wiki: NIC](http://iphonedev.wiki/index.php/NIC).

## Usage
Most commonly, NIC is used interactively like so:

```console
~$ $THEOS/bin/nic.pl
NIC 2.0 - New Instance Creator
------------------------------
  [1.] iphone/activator_event
  [2.] iphone/activator_listener
  [3.] iphone/application_modern
  [4.] iphone/application_swift
  [5.] iphone/control_center_module-11up
  [6.] iphone/cydget
  [7.] iphone/flipswitch_switch
  [8.] iphone/framework
  [9.] iphone/library
  [10.] iphone/notification_center_widget
  [11.] iphone/notification_center_widget-7up
  [12.] iphone/preference_bundle
  [13.] iphone/preference_bundle_swift
  [14.] iphone/theme
  [15.] iphone/tool
  [16.] iphone/tool_swift
  [17.] iphone/tweak
  [18.] iphone/tweak_with_simple_preferences
  [19.] iphone/xpc_service
  [20.] iphone/xpc_service_modern
Choose a Template (required):
Choose a Template (required): 17
Project Name (required): Example
Package Name [com.yourcompany.example]: dev.theos.example
Authour/Maintainer Name [Craig Federighi]: Craig Federighi <notfederighi@theos.dev>
[iphone/tweak] MobileSubstrate Bundle filter [com.apple.springboard]:
[iphone/tweak] List of applications to terminate upon installation (space-separated, '-' for none) [SpringBoard]:
Instantiating iphone/tweak in example/...
Done.

~$ cd example

~/example$ ls
Example.plist  Makefile  Tweak.x  control
```

Where there is a default value displayed in `[square brackets]`, you can simply press return without entering a value and the default will be used. It is highly recommended that the author value is formatted like `Your Name <yourself@example.com>`, as this will make it possible for users to easily contact you about bugs and other questions.

In almost all cases you can type `make` from within your new project directory and it will build successfully (assuming Theos is set up correctly). The resulting binaries most likely won’t do anything – this is the fun part that’s completely up to you!

The following command line arguments are supported. Note that providing arguments *does not* guarantee NIC will not prompt for extra information.

* **`-t` `--template`** *string*. The name of a template to use, as displayed in the template selection list. Use only this or `--nic` at a time.
* **`--nic`** *string*. The path to a `.nic.tar` or `.nic` template to use. Use only this or `--template` at a time.
* **`-n` `--name`** *string*. The name of the project.
* **`-p` `--packagename`** *string*. The package identifier to use.
* **`-u` `--user`** *string*. The author value to use.

## Included templates
* **activator_event**: an [event](http://iphonedev.wiki/index.php/Libactivator#Sending_Events_.28via_LAEvent.29) for Activator.
* **activator_listener**: a [listener](http://iphonedev.wiki/index.php/Libactivator#Observing_Events_.28via_LAListener.29) for Activator.
* **application_modern**: a standard iOS app (for unsandboxed jailbreak use).
* **application_swift**: a standard, Swift-based iOS app (for unsandboxed jailbreak use).
* **control_center_module-11up**: a custom control center module for iOS 11+ deployed via [CCSupport](https://github.com/opa334/CCSupport/wiki).
* **cydget**: a [Cydget](https://cydia.saurik.com/info/cydget/) lock screen plugin.
* **flipswitch_switch**: a switch for [Flipswitch](https://github.com/A3Tweaks/Flipswitch).
* **framework**: a framework to be used by other developers.
* **library**: a linkable library (e.g. /usr/lib/libblah.dylib).
* **notification_center_widget**: an iOS 5 – 6 Notification Center Today widget.
* **notification_center_widget-7up**: an iOS 7 – 9 Notification Center Today widget.
* **preference_bundle**: a [PreferenceLoader](http://iphonedev.wiki/index.php/PreferenceLoader) preference bundle subproject.
* **preference_bundle_swift**: a Swift-based [PreferenceLoader](http://iphonedev.wiki/index.php/PreferenceLoader) preference bundle subproject.
* **theme**: a means of easily packaging your theme into a .deb using Theos' packaging functionality.
* **tool**: a command line tool (e.g. /usr/bin/blah).
* **tool_swift**: a Swift-based command line tool (e.g. /usr/bin/blah).
* **tweak**: a Cydia Substrate-based tweak.
* **tweak_with_simple_preferences**: a Cydia Substrate-based tweak with a basic preference bundle.
* **xpc_service**: a C-based [XPC](https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingXPCServices.html) service.
* **xpc_service_modern**: an Objective-C-based [XPC](https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingXPCServices.html) service.

This is just the list of templates Theos comes with. Far more is possible with Theos than you can find in the list above, and these templates serve only as starting points to develop a working product without having to deal with various bits of boilerplate.

## .nicrc
NIC reads configuration data from `~/.nicrc`. This file uses a simple key-value format, `key = "value"`. Values must be enclosed in quotes, even if it is a number.

### Instance Metadata
* **`package_prefix`** *string*. The prefix to use by default for reverse DNS package identifiers. The default is `com.yourcompany`. For example, setting `package_prefix = "ws.hbang"` and creating a new project called "Example Instance" will make the default package identifier `ws.hbang.exampleinstance`.
* **`skip_package_name`** *bool*. Whether to prompt for a package identifier, or just always use the one generated by NIC. Most likely you also want to set `package_prefix` if you use this. The default is `0`.
* **`username`** *string*. The value to use as the author/maintainer of new instances. Setting this will cause NIC to skip asking for the author name. It is recommended to also include an email address enclosed in angle brackets. The default is the name of the currently logged in user. Example: `username = "HASHBANG Productions <support@hbang.ws>"`.

### Theos Reference
* **`link_theos`** *bool*. Whether to use a `theos` symlink that points to the location of Theos, or to rely on the `$THEOS` environment variable. The default is `0`. This is changed from the original Theos, which uses a default of `1`. If this is undesirable, you may set this back to `1`.
* **`ignore_parent_theos`** *bool*. When `link_theos` is set to `1`, and an instance is being created within a parent instance, use the destination of the parent `theos` symlink when creating the child one. If `ignore_parent_theos` is set to `0`, the value of `$THEOS` will be used instead. The default is `0`.

## Building templates
Templates are in the `.nic.tar` format – a standard tar archive with a layout recognisable by NIC.

Theos comes with additional scripts alongside NIC: `nicify.pl` and `denicify.pl`. These respectively create and extract `.nic.tar` files.

```console
~$ $THEOS/bin/denicify.pl $THEOS/templates/ios/theos/tweak.nic.tar tweak

~$ ls tweak/
@@PROJECTNAME@@.plist  Makefile  Tweak.xm  control  pre.NIC  theos

# modify the template…

~$ $THEOS/bin/nicify.pl tweak/
[warning] Using legacy pre.NIC as ./NIC/control.
[info] 6 entries.
[info] 1 prompt.
[info] 0 constraints.
[info] Archived template "iphone/tweak" to iphone_tweak.nic.tar.

~$ ls *.nic.tar
iphone_tweak.nic.tar
```

The predecessor to `.nic.tar` was `.nic`, a plain text file. It was upgraded to the current tar-based format to allow greater fidelity, such as the preservation of file permissions, and inclusion of binary files.

*(To do: The syntax of templates should be discussed here. For the time being, this information is available exclusively in [DHowett’s documentation](http://theos.howett.net/nic/)).*
