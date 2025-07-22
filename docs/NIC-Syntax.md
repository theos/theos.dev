---
title: "NIC: Syntax"
layout: docs
---

The New Instance Creator (NIC) is a component of the Theos development suite that allows projects (“instances”) to be created quickly based on templates.

A NIC template is a collection of files representing a basic project, before any user customizations have been added.

## Terms and Semantics

Constraint
- A condition under a which a file, directory or symlink will be created.
- A file is said to be *constrained* when given a condition.

<span class="required">required</span>
- The item indicated by this tag must be present.

<span class="optional">optional</span>
- The item indicated by this tag is optional.

`text`
- The text indicated by `text` is <span class="required">required</span> to be part of the directive and is not to be substituted with any other values.

`...`
- The tokens preceding the `...` may be optionally repeated with the specified delimiter.

## Package Control Data (`NIC/control`)

Each NIC template <span class="required">requires</span> a control file. The control file contains basic static information about the template.

### Directives

<code class="highlighter-rouge"><strong>name</strong> "<span class="required">name</span>"</code>

- <span class="required">required</span>
- Specifies the name of this NIC template.

<code class="highlighter-rouge"><strong>prompt</strong> <span class="required">variable</span> "<span class="required">prompt text</span>" <span class="optional">"default value"</span></code>

- <span class="optional">optional</span>
- Prompts the user for additional information, which will be stored in *variable*.
- Optionally supports the inclusion of a default value, which the user can accept by entering nothing.
- The user is given a chance to override the prompt variable with their <code class="highlighter-rouge">nicrc</code>.

<code class="highlighter-rouge"><strong>constrain</strong> "<span class="required">path</span>" to <span class="required">constraint</span></code>

- <span class="optional">optional</span>
- Constrains the given file, directory or symbolic link *path* to be created only when the *constraint* condition is met.

<code class="highlighter-rouge"><strong>ignore</strong> <span class="required">built-in variable</span></code>

- <span class="optional">optional</span>
- Do not prompt for the given *built-in variable*. The following built-in variables are supported:
    - <code class="highlighter-rouge">USER</code>
	- <code class="highlighter-rouge">PACKAGENAME</code>

### Built-in Constraints

`package`
- Set by default when the new project is expected to be made into a package. Its converse, `!package`, can be used to create files only when the project is not being packaged.
- The NIC templates that ship with Theos use the `package` constraint to avoid creating unnecessary `control` files.

`link_theos`
- Used in some templates to include an optional link to theos. Set/overridden by `link_theos` in the user's `nicrc`.
- The NIC templates that ship with Theos use this constraint to avoid creating unnecessary `theos/` symlinks.

### Example <code class="highlighter-rouge">NIC/control</code>

<div class="highlight">
<pre class="highlight">
<span class="k">name</span> <span class="s">"Awesome Template"</span>
<span class="k">constrain</span> <span class="s">"control"</span> <span class="k">to</span> <span class="nv">package</span>
<span class="k">prompt</span> <span class="nv">PIES</span> <span class="s">"Number of Pies to create"</span> <span class="s">"10"</span>
</pre>
</div>

## Package Control Script (<code class="highlighter-rouge">NIC/control.pl</code>)

The package control script is an <span class="optional">optional</span> addition to the NIC format.

Control scripts are written in Perl and have access to the current template.

### API

There are various objects available to you via the NIC scripting interface.

#### Public Methods

- <code class="highlighter-rouge">print <span class="required">$data</span></code>
    - *method*
    - Display information to the user.

- <code class="highlighter-rouge">warn <span class="required">$warning</span></code>
    - *method*
    - Display a warning.

- <code class="highlighter-rouge">error <span class="required">$error</span></code>
    - *method*
    - Display an error and abort building the template.

- <code class="highlighter-rouge">exit <span class="required">$status_code</span></code>
    - *method*
    - Exit the control script. Any status code other than <code class="highlighter-rouge">1</code> will abort building the template.

- <code class="highlighter-rouge">prompt(<span class="required">$prompt_text</span> <span class="optional">, {default => $default_value}</span>)</code>
    - *method*
    - Prompt the user for additional information. The default value is optional. Returns the user's response.

#### NIC

The `NIC` object represents the current template.

##### Metadata Manipulation

- `NIC->name`
    - **read/write**
    - The name of the current template.

- `NIC->variables`
    - **read-only**
    - A list of the variables currently set on this template.

- <code class="highlighter-rouge">NIC->variable(<span class="required">$name</span>)</code>
    - **read/write**
    - The value of the named variable. Can be used as a left-hand value, such as in `NIC->variable("NAME") = "Value";`

- <code class="highlighter-rouge">NIC->prompt(<span class="required">$variable</span>, <span class="required">$prompt_text</span> <span class="optional">, {default => $default_value}</span>)</code>
    - *method*
    - Prompt the user for additional information, attaching the user's response to the provided NIC variable.
    - The default value is optional.
    - If *$variable* is not specified, `NIC->prompt(...)` will return the user's response, and will not store it in the template.
    - The key difference between `prompt(...)` and `NIC->prompt(...)` is that the user is given a chance to override the prompt variable with their `nicrc`.

- <code class="highlighter-rouge">NIC->setConstraint(<span class="required">$constraint</span>)</code>

- <code class="highlighter-rouge">NIC->clearConstraint(<span class="required">$constraint</span>)</code>
    - *methods*
    - Set or clear the constraint given by *$constraint*.

##### Files, Directories, and Symbolic Links

- <code class="highlighter-rouge">NIC->lookup(<span class="required">$name</span>)</code>
    - *method*
    - Find an existing File, Directory or Symbolic Link in the template archive.
    - Returns the retrieved NICType or `undef` on failure.

- <code class="highlighter-rouge">NIC->mkfile(<span class="required">$name</span> <span class="optional">, $mode</span>)</code>
    - *method*
    - Create a new File with the given name and, optionally, mode.
    - Returns the newly-created File object.

- <code class="highlighter-rouge">NIC->mkdir(<span class="required">$name</span> <span class="optional">, $mode</span>)</code>
    - *method*
    - Create a new Directory with the given name and, optionally, mode.
    - Returns the newly-created Directory object.

- <code class="highlighter-rouge">NIC->symlink(<span class="required">$target</span>, <span class="required">$destination</span>)</code>
    - *method*
    - Create a new Symbolic Link with the given name pointing to the given target.
    - `$target` is expected to be an object acquired via `NIC->lookup`, `NIC->mkdir`, `NIC->mkfile`, or `NIC->symlink`.
    - `$target` can also be a string.
    - Returns the newly-created Symlink object.

#### NICType

NICType objects are the embodiment of template content. Each file, directory or symbolic link is represented by an instance of a NICType subclass.

NICType objects share a few common propeties.

- `$nictype->name`
    - **read/write**
    - The name of the given NICType object (filename, directory, symbolic link name).

- `$nictype->mode`
    - **read/write**
    - The mode of the given NICType object. Defaults to `0644` for files and `0755` for directories.

- `$nictype->constraints`
    - **read-only**
    - A list of the constraints currently attached to the given object.

- <code class="highlighter-rouge">$nictype->constrain(<span class="required">$constraint</span>)</code>
    - *method*
    - Apply the given constraint to this object. Similar to `NIC/control`'s <code class="highlighter-rouge"><strong>constrain</strong> ...</code>.

#### `File <- NICType`

- Represents a file in the template.
- `$file->data`
    - **read/write**
    - The file's data.

#### `Directory <- NICType`

- Represents a directory in the template.
- *Contains no additional methods.*

#### `Symlink <- NICType`

- Represents a symbolic link in the template.
- `$symlink->target`
    - **read/write**
    - The target of the symbolic link, as either a reference to a `NICType` object or a string.

### Example `NIC/control.pl`

```perl
# Retrieve the package name as specified by the user.
my $packageName = NIC->variable("PACKAGENAME");
my $packageDirectory = $packageName;

# Transform the package name into a package directory, replacing . with / (s!old!new!g acts as a search and replace).
$packageDirectory =~ s!\.!/!g;

# Create a new directory entry with the name we just transformed.
my $directory = NIC->mkdir($packageDirectory);

# Look up the file "main.m" and set its name to include the new path.
NIC->lookup("main.m")->name = $directory->name . "/main.m";
```
<!-- Modified from http://theos.howett.net/nic/ (CC0) -->
