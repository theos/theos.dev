---
title: Logos
layout: docs
---

Logos is a Perl regex-based preprocessor that simplifies the boilerplate code needed to create hooks for Objective-C methods and C functions with an elegant Objective-C-like syntax. It’s most commonly used along with the Theos build system, which was originally developed to create jailbreak tweaks. Logos was once integrated in the same Git repo as Theos, but now has been decoupled from Theos to its own repo.

Logos aims to provide an interface for [Cydia Substrate](http://cydiasubstrate.com/) by default, but can be configured to use [libhooker](https://libhooker.com/docs/) or the Objective-C runtime directly.

Logos is a component of the [Theos](https://theos.dev/) development suite.

## Command Line Interface

```
Usage: logos.pl [options] <filename>
Options:
  [-c|--config]         Modify Logos' configuration (MobileSubstrate, default)
     -c generator=[internal|libhooker|MobileSubstrate]
     -c warnings=[default|error|none]
  [-h|--help]           Display this page
```
