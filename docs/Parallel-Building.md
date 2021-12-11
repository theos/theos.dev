---
title: Parallel Building
layout: docs
---

For the best results, Theos recommends that you use the latest version of [GNU Make](https://www.gnu.org/software/make/). Unfortunately, the Xcode toolchain does not include the latest version of Make. In fact, it includes Make 3.81 from 2006!

While the Theos maintainers do their best to support Make 3.81, there are certain limits to what they can do. One of these limits is with parallel building. Parallel building is where a build tool like Make divides its work up in order to take full advantage of all logical cores (threads) of the CPU. This is one significant way a build can be sped up, especially for larger projects.

You may have been directed here by the following notice output by Theos:

> **==> Notice:** Build may be slow as Theos isn’t using all available CPU cores on this computer. Consider upgrading GNU Make: https://github.com/theos/theos/wiki/Parallel-Building

…In which case, you are using a version of Make older than 4.0. To remain compatible, Theos will not activate its parallel building support, so only one logical core of your CPU will be used, leading to slow build times.

----

These instructions will help you install the latest version of GNU Make on macOS. No other modern operating system should end up in this situation, as Make 4.0 was released in 2013. If you see this notice on any other OS such as Linux, you should consider upgrading your entire OS.

These instructions assume you use Homebrew and have installed Theos as outlined in the [installation instructions](/docs/Installation.html).

1. Install GNU Make from Homebrew:

    ```bash
    brew install make
    ```
2. Set up your environment so the newer version of `make` takes precedence over Apple’s provided version of `make`. Use the following:

    ```bash
    echo PATH=\"$(brew --prefix make)/libexec/gnubin:\$PATH\" >> ~/.zprofile
    ```

    For versions of macOS earlier than 10.15 Catalina, the default shell is bash rather than zsh. As such, you’ll want to use `~/.bash_profile` instead of `~/.zprofile` in the command above.
3. In order for this change to take effect, you must restart your shell. Open a new tab and type `make`. Now, the aforementioned notice should no longer appear and you should find that it’s significantly faster!

----

If you’d rather not perform these steps, you can permanently ignore this notice by using the following:

```bash
echo 'THEOS_IGNORE_PARALLEL_BUILDING_NOTICE = yes' >> ~/.theosrc
```
