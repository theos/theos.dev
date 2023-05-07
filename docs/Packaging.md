---
title: Packaging
layout: docs
---

Theos supports building for many common targets and packaging formats including:

### Platforms
- iOS
- macOS
- Linux
- Windows

### Formats
- `.deb`
- `.ipa`
- `.pkg`
- `.rpm`
- null (packaging w/o compiling anything)

The most common configuration is targeting jailbroken iOS via .deb's. As jailbroken iOS is bootstrapped by a Debian-esque platform, .deb's follow many of the standard Debian Linux conventions.

## control files

control files are required for Debian packages (.deb's) and are configured for you by default when a project is initialized via the NIC.

The most commonly used fields include:

- `Name:`
	- Name of the package

- `Package:`
	- ID of the package
	- Follows the format `com.name.package`
	- Choose wisely - don't change this once your package has been released

- `Author:`
	- Name of the package's author

- `Maintainer:`
	- Name of the package's maintainer

- `Version:`
	- The package's version

- `Depends:`
	- Package ID(s) for the package(s) that your package depends on
	- Comma-separated list
	- The version of the dependency can be specified by providing it in the format `(>> dep-ver)`, `(>= dep-ver)`, `(= dep-ver)`, `(<= dep-ver)`, or `(<< dep-ver)`
	- Note that there is a meta-package (i.e., an empty package with just a control file) provided on modern jailbreaks named `firmware` that can be placed in Depends: in order to restrict the iOS versions your package can be installed on
		- Example `Depends: firmware (>= 12.0)`

- `Pre-Depends:`
	- This field is like Depends:, but it completes installation of the package(s) named before starting your package's installation

- `Recommends:`
	- Package ID(s) for the package(s) that your package can make use of, but that aren't required
	- Comma-separated list

- `Provides:`
	- Package ID(s) for the package(s) your package is considered a drop-in replacement for
	- Comma-separated list

- `Conflicts:`
	- Package ID(s) for the package(s) your package cannot be installed alongside
	- Comma-separated list

- `Architecture:`
	- The target architecture of the installable package
		- Use `iphoneos-arm` for rootful iOS or `iphoneos-arm64` for rootless iOS

- `Section:`
	- The section that your package should appear under in a package manager
	- `Tweaks` or `Utilities` are most common

- `Description:`
	- The description for your package

- `Icon:`
	- The local or remote path to your package's icon (includes the file's extension)

- `Depiction:`
	- A link to your package's depiction

- `SileoDepiction:`
	- A link to your package's [native depiction](https://developer.getsileo.app/native-depictions) as used by package managers such as Sileo

Aside from a few jailbroken iOS-specific fields, the available fields can be found in [Debian documentation](https://www.debian.org/doc/debian-policy/ch-controlfields.html).

## Maintainer scripts

As with standard Debian packages, maintainer scripts can be added to your project to be run at various points throughout its (un)install cycle.

The scripts should be placed in $THEOS_LAYOUT_DIRECTORY and include:

- `preinst`
	- A script to be run *prior* to your package's installation

- `postinst`
	- A script to be run *after* your package's installation

- `extrainst_`
	- A script to be run after your package's installation, but only on installation and not on upgrade
	- An iOS-specific extension created by Jay Freeman (saurik) - review [this explanation](https://iphonedevwiki.net/index.php/Packaging#extrainst) to understand if you need to use `extrainst_` rather than `postinst`

- `prerm`
	- A script to be run *prior* to your package's removal

- `postrm`
	- A script to be run *after* to your package's removal

**Note:** please ensure that your script's hashbang is accurate. That is, if you use bashisms, please set the hashbang to either `#!/bin/bash` or `#!/usr/bin/env bash`. This has caused issues in the past when the default shell was changed.

## Filter property list (.plist)

Building for jailbroken iOS also requires configuring for process injection via CydiaSubstrate (et al).

This filter is implemented as a property list that is installed alongside the .dylib(s) in the .deb. The property list is created for you when initializing a project via the NIC.

The filter can be for bundles, classes, and/or executables and is declared in the form of an xml/plist dictionary of arrays. Your tweak will only be loaded if the filter items specified are matched.

The format of said filter plist is as follows:

XML:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Filter</key>
	<dict>
		<key>Bundles</key>
		<array>
			<string>some.bundle.id</string>
		</array>
		<key>Executables</key>
		<array>
			<string>executable-name</string>
		</array>
		<key>Classes</key>
		<array>
			<string>class-name</string>
		</array>
	</dict>
</dict>
</plist>
```

*or*

Text (i.e., NeXTSTEP format):
```xml
{
	Filter = {
		Bundles = (
			"some.bundle.id"
		);
		Executables = (
			"executable-name"
		);
		Classes = (
			"class-name"
		);
	};
}
```

For more information, see the [iPhoneDevWiki](https://iphonedev.wiki/index.php/Cydia_Substrate#Filters)
