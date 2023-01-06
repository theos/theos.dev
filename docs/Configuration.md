---
title: Configuration
layout: docs
---

Theos, and your project(s), can be configured in a few differents ways:
- At runtime
- At buildtime via project Makefiles
- At buildtime by passing variables to `make`

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

## Utilizing Theos' message commands

Theos utilizes a variety of custom `echo` and `printf` commands which it defines as variables in $THEOS_MAKE_PATH/messages.mk. These can be utilized by users in their own project makefiles if so desired.

Such variables include:
- $(ECHO_BEGIN)
    - Defines start of command users wants printed after running

- $(ECHO_NOTHING)
    - Defines start of command users wants printed after running
        - Note that when verbosity is enabled, `set -o pipefail` is run beforehand

- $(ECHO_END)
    - Defines end of command user wrapped in $(ECHO_BEGIN) or $(ECHO_NOTHNG)

- $(STDERR_NULL_REDIRECT)
    - Defined as `2> /dev/null`
        - Disabled if verbosity is enabled

- $(STDOUT_NULL_REDIRECT)
    - Defined as `> /dev/null`
        - Disabled if verbosity is enabled

- $(PRINT_FORMAT)
    - Defined as `printf "\e[0;36m==> \e[1;36mNotice:\e[m %s\n"`

- $(PRINT_FORMAT_WARNING)
    - Defined as `printf "\e[0;33m==> \e[1;33mWarning:\e[m %s\n"`

- $(PRINT_FORMAT_ERROR)
    - Defined as `printf "\e[0;31m==> \e[1;31mError:\e[m %s\n"`

- $(PRINT_FORMAT_RED)
    - Color a print statement red
        - Disabled if COLOR=0

- $(PRINT_FORMAT_GREEN)
    - Disabled if COLOR=0

- $(PRINT_FORMAT_YELLOW)
    - Disabled if COLOR=0

- $(PRINT_FORMAT_BLUE)
    - Disabled if COLOR=0

- $(PRINT_FORMAT_MAGENTA)
    - Disabled if COLOR=0

- $(PRINT_FORMAT_CYAN)
    - Disabled if COLOR=0

## Utilizing GNU Make

$(error)
$(info)
$(warning)
@echo
@print
$(shell)
