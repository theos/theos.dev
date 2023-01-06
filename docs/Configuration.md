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

## Utilizing Theos' makefile rules

Makefile rules are defined as:
```Makefile
targets: prerequisites
	command
	command
```

Theos utilizes a variety of such rules internally, many of which can also be utilized by users by adding the following to your project's Makefile:
```Makefile
rule-name::
	your_command
	your_command
```

Such rule names include:
- before-clean
- internal-clean
- after-clean
- before-all
- internal-all
- after-all
- before-stage
- internal-stage
- after-stage
- before-package
- internal-package
- after-package
- before-$(THEOS_CURRENT_INSTANCE)-all
- after-$(THEOS_CURRENT_INSTANCE)-all
- internal-$(_THEOS_CURRENT_TYPE)-all

## Utilizing Theos' print rules



## Utilizing GNU Make


