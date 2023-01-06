---
title: Configuration
layout: docs
---

Theos, and your project(s), can be configured in a few differents ways:
- At runtime
- At buildtime via project Makefiles
- At buildtime by passing variables to `Make`

## `.theosrc`

Variables that are specific to your own setup (e.g., Xcode/an SDK, device IP, etc) should not be placed in your project makefile as it may hinder others from building your project. Instead, these variables should be placed in `.theosrc`, a makefile that is read and executed during an early stage of Theos’ `common.mk`.

`.theosrc` is used to configure Theos at runtime and must be created by the user at `$HOME/.theosrc` or `~/.theosrc`.

## Utilizing GNU Make


