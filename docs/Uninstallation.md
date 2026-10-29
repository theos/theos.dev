---
title: Uninstallation
layout: docs
---

## How to Uninstall Theos
Remove your Theos installation with the following shell command:
```bash
[[ -d $THEOS ]] && rm -rvf $THEOS || echo "An error was encountered during Theos' removal. Please see above." && echo "Theos has been successfully uninstalled!"
```

**Please note:** this will NOT remove/revert the following:
- [ALL] Any additions made to your shell profile (i.e., defining the THEOS environment variable)
- [ALL] Any system packages installed as part of the installation process (i.e., tooling dependencies)
- [LINUX] Any symlinks made for system libraries to support Theos' toolchain (e.g., `libncurses.so.6` --> `latest libncurses.so`)
- [LINUX] Any changes made to the default `fakeroot` binary (i.e., `fakeroot-tcp` --> `fakeroot-sysv` or vice versa)
