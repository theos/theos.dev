---
title: Configuration
layout: docs
---

Theos, and your project(s), can be configured in a few differents ways:
- Via a shared configuration file
- At runtime via project Makefiles
- At runtime by passing variables to `make`

## Config File

Variables that are specific to your own setup (e.g., Xcode/an SDK, device IP, etc) should not be placed in your project makefile as it may hinder others from building your project. Instead, these variables should be placed in a user created makefile that is read and executed during an early stage of Theos’ `common.mk`.

The first matching file is `-include`d:
1. `$(XDG_CONFIG_HOME)/theos/rc.mk`
2. `$(HOME)/.config/theos/rc.mk`
3. `$(HOME)/.theosrc`

## Utilizing Theos' makefile rules

Makefile rules are defined as:
```make
targets: prerequisites
	command
	command
```

Theos utilizes a variety of such rules internally, many of which can also be utilized by users by adding the following to your project's Makefile:
```make
rule-name::
	your_command
	your_command
```

Such rule names include:
- `before-clean`
- `internal-clean`
- `after-clean`
- `before-all`
- `internal-all`
- `after-all`
- `before-stage`
- `internal-stage`
- `after-stage`
- `before-package`
- `internal-package`
- `after-package`
- `before-$(THEOS_CURRENT_INSTANCE)-stage`
- `after-$(THEOS_CURRENT_INSTANCE)-stage`
- `internal-$(_THEOS_CURRENT_TYPE)-stage`
- `before-$(THEOS_CURRENT_INSTANCE)-all`
- `after-$(THEOS_CURRENT_INSTANCE)-all`
- `internal-$(_THEOS_CURRENT_TYPE)-all`

## Schemas ("Schemata")

Schemas are a way to manage a group of specific master variables which can have their effect easily turned on or off. An example is the built-in debug schema, which when enabled adds extra options to `CFLAGS`, `LDFLAGS`, and `SWIFTFLAGS`.

They are enabled via `THEOS_SCHEMA`, with a space-separated list of the schemas you'd like to enable.

The schema is described by specifying what variables have their values affected by its enabling. Doing so can be done by declaring a variable with the format `schema.VARIABLE`, so that enabling schema will do changes to a possible query of variable `VARIABLE` (e.g., `DEBUG.CFLAGS`). `VARIABLE` must be used in Theos for the changes to have an effect. See [common.mk](https://github.com/theos/theos/blob/master/makefiles/common.mk) for schema logic implementation.

Example:
```
# Enabling schema1 will add the '-DSCHEMA1ENABLED' additional compiler flags.
schema1.CFLAGS = -DSCHEMA1ENABLED
```

## Utilizing Theos' message commands

Theos utilizes a variety of custom `echo` and `printf` commands which it defines as variables in $THEOS_MAKE_PATH/messages.mk. These can be utilized by users in their own project makefiles if so desired.

Such variables include:
- `$(ECHO_BEGIN)`
    - Defines start of command user wants printed after it has run

- `$(ECHO_NOTHING)`
    - Defines start of command user wants printed after it has run
        - Note that when verbosity is enabled, `set -o pipefail` is run beforehand

- `$(ECHO_END)`
    - Defines end of command user wrapped in `$(ECHO_BEGIN)` or `$(ECHO_NOTHNG)`

- `$(STDERR_NULL_REDIRECT)`
    - Defined as `2> /dev/null`
        - Disabled if verbosity is enabled

- `$(STDOUT_NULL_REDIRECT)`
    - Defined as `> /dev/null`
        - Disabled if verbosity is enabled

- `$(PRINT_FORMAT)`
    - Defined as `printf "\e[0;36m==> \e[1;36mNotice:\e[m %s\n"`

- `$(PRINT_FORMAT_WARNING)`
    - Defined as `printf "\e[0;33m==> \e[1;33mWarning:\e[m %s\n"`

- `$(PRINT_FORMAT_ERROR)`
    - Defined as `printf "\e[0;31m==> \e[1;31mError:\e[m %s\n"`

- `$(PRINT_FORMAT_RED)`
    - A red-colored print statement
        - Disabled if COLOR=0

- `$(PRINT_FORMAT_GREEN)`
    - Disabled if COLOR=0

- `$(PRINT_FORMAT_YELLOW)`
    - Disabled if COLOR=0

- `$(PRINT_FORMAT_BLUE)`
    - Disabled if COLOR=0

- `$(PRINT_FORMAT_MAGENTA)`
    - Disabled if COLOR=0

- `$(PRINT_FORMAT_CYAN)`
    - Disabled if COLOR=0

## Utilizing GNU Make

Theos relies on GNU Make to function. This means that all standard Make capabilities can be used with Theos as if they were being used in any standard Unix makefile.

Some of the more relevant capabilities include:
- Print formatting
- Running shell commands
- File acquisition via wildcards
- Setting variables to varying degrees of project depth
- Utilizing conditional statements

### Print formatting

The following can be used in your Makefile(s) as desired within Theos' makefile rules:

- `$(info some text here)`
    - Will print `some text here`

- `$(warning some text here)`
    - Will print `Makefile:<line#>: some text here`

- `$(error some text here)`
    - Will print `Makefile:<line#>: *** some text here.  Stop.`
    - Note: will stop the build

- `@echo "some text here"`
    - Will print `some text here` using [`echo(1)`](https://man.cameronkatri.com/echo.1)

- `@printf "some text here"`
    - Will print `some text here` without a trailing newline (i.e., "\n"). Note that [`printf(1)`](https://man.cameronkatri.com/printf.1) uses a format string.

### Running shell commands

If you need to run commands from within a makefile, there are two main ways:

- `$(shell command)`
    - Will return the output of "command" for use

- Typing the command as-is
    - Will print both the command being run and the output, if relevant

### File acquisition via wildcards

For your project instance (where XXX is your project_name), the XXX_FILES variable is required for non-null project types. If your project has a large number of files and/or a complex directory structure, typing out each file by hand would be arduous. To work around this, makefiles have wildcards. The syntax is as follows:

```make
$(wildcard pattern-to-match)
```

An example usage of this would be
```make
XXX_FILES = $(wildcard *.m) $(wildcard files/*.x)
```

Assuming you have a complex directory structure and don't feel like messing with pattern matching, you can also shell out to `find`.

An example usage of this would be
```make
XXX_FILES = $(shell find . -type f -name "*.m")
```

### Setting variables to varying degrees of project depth

In order to configure your project, you will almost certainly need to modify variables in your project's makefile(s).

Variables can be kept local to their project's instance by declaring them normally.

An example of this would be
```make
ARCHS = arm64 arm64e
```

If you want a variable to apply to all instances within a project (i.e., apply to subprojects), then you can preface the variable declaration with `export`. Such exported variables will likely want to be in your root makefile so that the subproject makefiles do not need duplicate declarations.

An example usage of this would be
```make
export TARGET = iphone:clang:latest:12.0
```

### Utilizing conditional statements

Whether you're declaring variables yourself or modifying predefined ones, conditional statements can come in handy for complex configuration.

Makefile `if` statements follow the syntax:

```make
ifeq ($(variable), $(variable-to-check-against))
    something=0
else ifneq ($(variable2), $(variable-to-check-against))
    something=1
else ifdef ($(variable3))
    something=2
else ifndef ($(variable4))
    something=3
else
    something=4
endif
```
