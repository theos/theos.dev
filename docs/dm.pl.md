---
title: dm.pl
layout: docs
---

dm.pl is a basic drop-in replacement for `dpkg-deb -b` that allows for the creation of Debian software packages (.deb's).

## Notable features

- Maintains lzma compression support
    - `dpkg` switched to xz compression in v1.17.0 and marked lzma as deprecated
- Is platform independent (i.e., doesn't require `dpkg`)

## Usage

```
Usage:
    dm.pl [options] <directory> <package>

Options:
    -b      This option exists solely for compatibility with dpkg-deb.

    -Z<compression>
            Specify the package compression type. Valid values are gzip
            (default), bzip2, lzma, xz and cat (no compression).

    -z<compress-level>
            Specify the package compression level. Valid values are between
            0 and 9. Default is 9 for bzip2, 6 for others, and 0 is
            equivalent to cat. Refer to gzip(1), bzip2(1), xz(1) for
            explanations of what effect each compression level has.

    --help, -?
            Print a brief help message and exit.

    --man   Print a manual page and exit.
```

## Theos usage

dm.pl is provided with Theos and is run, by default, with lzma compression at level 1 for debug builds and level 9 when building FOR_RELEASE or FINALPACKAGE.

Note: the compression type and its level can be modified by the user if desired.
