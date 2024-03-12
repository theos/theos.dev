---
title: Modules
layout: docs
---

## Overview
With Theos being Makefile-based, additional functionality can be provided as-desired through "modules."

Modules are directories containing Makefiles with additional rules, variables, and/or checks that you would like your Theos install to contain. A module structure may look something like
```
my-module/
├── instance
│   ├── framework.mk
│   ├── library.mk
│   └── rules.mk
├── package
│   └── deb.mk
└── package.mk
```
where each `.mk` file contains custom code such as
```makefile
_THEOS_INTERNAL_LDFLAGS += -rpath my/path/here/ -rpath $(THEOS_PACKAGE_INSTALL_PREFIX)/Library/Frameworks -rpath $(THEOS_PACKAGE_INSTALL_PREFIX)/usr/lib
```

## Structure
Modules' structure and the respective `.mk` filenames tell Theos where to add your provided functionality. For example, `my-module/package/deb.mk` tells Theos to add the functionality contained in the module's `deb.mk` file to `$(THEOS_MAKE_PATH)/package/deb.mk`. Providing additional functioanlity through modules is only supported for specific parts of Theos, however. These parts include:

- `rules.mk`
- `common.mk`
- `platform/*.mk`
- `targets/**/*.mk`
- `package/*.mk`
- `install/*.mk`
- `instance/*.mk`
  - Except `aggregate.mk`
- `master/*.mk`

Modules should be placed in `$(THEOS_MODULE_PATH)` and are imported by Theos *only* when you explicitly ask them to be through `MODULES = my-module`. These are "enabled" through Makefile's `-include` feature and are typically included *after* all of the stock Theos functionality has been defined. Thus, modules support all Theos variables that have been defined by the time your specific Module is imported.
