---
title: FAQ
layout: docs
---

## All of my package versions contain `+debug` now! How do I stop this?
By default, Theos favors the use of debug builds over release builds. Debug builds provide more information for debuggers, allow for debug logging with HBLogDebug(), and color the syslog, making your log(s) easier to spot in the sea of other messages.

To disable debug mode, pass `DEBUG=0` as part of your command line to `make`. This will, among other things, remove the build number from your project’s version string. It’s worth noting that debug mode is also disabled when you make a release build with FINALPACKAGE=1.

## Where’s the `theos` symlink?
Theos has opted to stop using this symlink by default for a few reasons. First, there are a fair number of “noisy” files dropped in the root of a project by standard Theos; this fork prefers to have as few of those as possible (and you may have noticed some are now stashed into the `.theos` directory). Second, this can be very different between developers and even between each of a developer’s devices as Theos can be located anywhere. Lastly, it's easy to unintentionally commit this symlink to source control or not know that this shouldn’t be committed to source control.

Of course, this does mean that you have to export `$THEOS` in your environment. This should be done in your shell’s profile or environment script (for instance `~/.bash_profile` or `~/.zshrc`) to ensure it’s always set and you don’t have to worry about it. It might look like this:

```bash
export THEOS=/usr/local/theos
```

If this is undesirable, you can tell NIC to revert to symlinking `theos`:

```console
echo 'link_theos = "1"' >> ~/.nicrc
```

See [here](/docs/NIC.html#nicrc) for more details on `.nicrc`.

## How do I use Swift in my projects?
This information has moved to the [Swift](/docs/Swift.html) page.
