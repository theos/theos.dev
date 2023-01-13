---
title: "NIC: Syntax"
layout: docs
---

<!-- Dustin did heavy lifting with the styling work, so let's use that -->
<link rel="stylesheet" href="../css/NIC-Syntax.css" type="text/css" media="screen">

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

<code>text</code>
- The text indicated by <code>text</code> is <span class="required">required</span> to be part of the directive and is not to be substituted with any other values.

<code>...</code>
- The tokens preceding the <code>...</code> may be optionally repeated with the specified delimiter.

## Package Control Data (<code>NIC/control</code>)

Each NIC template <span class="required">requires</span> a control file. The control file contains basic static information about the template.

### Directives

<code><strong>name</strong> "<span class="required">name</span>"</code>

- <span class="required">required</span>
- Specifies the name of this NIC template.

<code class="optional"><strong>prompt</strong> <span class="required">variable</span> "<span class="required">prompt text</span>" <span class="optional">"default value"</span></code>

- <span class="optional">optional</span>
- Prompts the user for additional information, which will be stored in *variable*.
- Optionally supports the inclusion of a default value, which the user can accept by entering nothing.
- The user is given a chance to override the prompt variable with his or her <code>~/.nicrc</code>.

<code><strong>constrain</strong> "<span class="required">path</span>" to <span class="required">constraint</span></code>

- <span class="optional">optional</span>
- Constrains the given file, directory or symbolic link *path* to be created only when the *constraint* condition is met.

<code><strong>ignore</strong> <span class="required">built-in variable</span></code>

- <span class="optional">optional</span>
- Do not prompt for the given *built-in variable*. The following built-in variables are supported:
    - <code>USER</code>
	- <code>PACKAGENAME</code>

### Built-in Constraints

<code>package</code>
- Set by default when the new project is expected to be made into a package. Its converse, <code>!package</code>, can be used to create files only when the project is not being packaged.
- The NIC templates that ship with Theos use the <code>package</code> constraint to avoid creating unnecessary <code>control</code> files.

<code>link_theos</code>
- Used in some templates to include an optional link to theos. Set/overridden by <code>link_theos</code> in the user's <code>~/.nicrc</code>.
- The NIC templates that ship with Theos use this constraint to avoid creating unnecessary <code>theos/</code> symlinks.

### Example <code>NIC/control</code>

<code style="display:block;">
    <strong>name</strong> <span class="string">"Awesome Template"</span><br>
    <strong>constrain</strong> <span class="string">"control"</span> <strong>to</strong> <span class="variable">package</span><br>
    <strong>prompt</strong> <span class="variable">PIES</span> <span class="string">"Number of Pies to create"</span> <span class="string">"10"</span><br>
</code>

## Package Control Script (<code>NIC/control.pl</code>)

The package control script is an <span class="optional">optional</span> addition to the NIC format.

Control scripts are written in Perl and have access to the current template.

### API

There are various objects available to you via the NIC scripting interface.

#### Public Methods

- <code>print <span class="required">$data</span></code>
    - *method*
    - Display information to the user.

- <code>warn <span class="required">$warning</span></code>
    - *method*
    - Display a warning.

- <code>error <span class="required">$error</span></code>
    - *method*
    - Display an error and abort building the template.

- <code>exit <span class="required">$status_code</span></code>
    - *method*
    - Exit the control script. Any status code other than <code>1</code> will abort building the template.

- <code>prompt(<span class="required">$prompt_text</span> <span class="optional">, {default => $default_value}</span>)</code>
    - *method*
    - Prompt the user for additional information. The default value is optional. Returns the user's response.

#### NIC

The <code>NIC</code> object represents the current template.

##### Metadata Manipulation

- <code>NIC->name</code>
    - **read/write**
    - The name of the current template.

- <code>NIC->variables</code>
    - **read-only**
    - A list of the variables currently set on this template.

- <code>NIC->variable(<span class="required">$name</span>)</code>
    - **read/write**
    - The value of the named variable. Can be used as a left-hand value, such as in <code>NIC->variable("NAME") = "Value";</code>

- <code class="method">NIC->prompt(<span class="required">$variable</span>, <span class="required">$prompt_text</span> <span class="optional">, {default => $default_value}</span>)</code>
    - *method*
    - Prompt the user for additional information, attaching the user's response to the provided NIC variable. The default value is optional. If *$variable* is not specified, <code>NIC->prompt(...)</code> will return the user's response, and will not store it in the template.
    - The key difference between <code>prompt(...)</code> and <code>NIC->prompt(...)</code> is that the user is given a chance to override the prompt variable with his or her <code>~/.nicrc</code>.

- <code class="method">NIC->setConstraint(<span class="required">$constraint</span>)</code>

- <code class="method">NIC->clearConstraint(<span class="required">$constraint</span>)</code>
    - *methods*
    - Set or clear the constraint given by *$constraint*.

##### Files, Directories, and Symbolic Links

- <code>NIC->lookup(<span class="required">$name</span>)</code>
    - *method*
    - Find an existing File, Directory or Symbolic Link in the template archive.
    - Returns the retrieved NICType or <code>undef</code> on failure.

- <code>NIC->mkfile(<span class="required">$name</span> <span class="optional">, $mode</span>)</code>
    - *method*
    - Create a new File with the given name and, optionally, mode.
    - Returns the newly-created File object.

- <code>NIC->mkdir(<span class="required">$name</span> <span class="optional">, $mode</span>)</code>
    - *method*
    - Create a new Directory with the given name and, optionally, mode.
    - Returns the newly-created Directory object.

- <code>NIC->symlink(<span class="required">$target</span>, <span class="required">$destination</span>)</code>
    - *method*
    - Create a new Symbolic Link with the given name pointing to the given target.
    - <code>$target</code> is expected to be an object acquired via <code>NIC->lookup</code>, <code>NIC->mkdir</code>, <code>NIC->mkfile</code>, or <code>NIC->symlink</code>.
    - <code>$target</code> can also be a string.
    - Returns the newly-created Symlink object.

#### NICType

NICType objects are the embodiment of template content. Each file, directory or symbolic link is represented by an instance of a NICType subclass.

NICType objects share a few common propeties.

- <code>$nictype->name</code>
    - **read/write**
    - The name of the given NICType object (filename, directory, symbolic link name).

- <code>$nictype->mode</code>
    - **read/write**
    - The mode of the given NICType object. Defaults to <code>0644</code> for files and <code>0755</code> for directories.

- <code>$nictype->constraints</code>
    - **read-only**
    - A list of the constraints currently attached to the given object.

- <code>$nictype->constrain(<span class="required">$constraint</span>)</code>
    - *method*
    - Apply the given constraint to this object. Similar to <code>NIC/control</code>'s <code><strong>constrain</strong> ...</code>.

#### <code>File <- NICType</code>

- Represents a file in the template.

- <code>$file->data</code>
    - **read/write**
    - The file's data.

#### <code>Directory <- NICType</code>

- Represents a directory in the template.
- *Contains no additional methods.*

#### <code>Symlink <- NICType</code>

- Represents a symbolic link in the template.
- <code>$symlink->target</code>
    - **read/write**
    - The target of the symbolic link, as either a reference to a <code>NICType</code> object or a string.

### Example <code>NIC/control.pl</code>

<code style="display:block;">
    <span class="comment"># Retrieve the package name as specified by the user.</span><br>
    my <span class="variable">$packageName</span> = NIC-><strong>variable</strong>(<span class="string">"PACKAGENAME"</span>);<br>
    my <span class="variable">$packageDirectory</span> = <span class="variable">$packageName</span>;<br>
    <br>
    <span class="comment"># Transform the package name into a package directory, replacing . with / (s!old!new!g acts as a search and replace).</span><br>
    <span class="variable">$packageDirectory</span> =~ s!\.!/!g;<br>
    <br>
    <span class="comment"># Create a new directory entry with the name we just transformed.</span><br>
    my $directory = NIC-><strong>mkdir</strong>(<span class="variable">$packageDirectory</span>);<br>
    <br>
    <span class="comment"># Look up the file "main.m" and set its name to include the new path.</span><br>
    NIC-><strong>lookup</strong>(<span class="string">"main.m"</span>)-><strong>name</strong> = <span class="variable">$directory</span>-><strong>name</strong> . <span class="string">"/main.m"</span>;
</code>
<!-- Modified from http://theos.howett.net/nic/ (CC0) -->