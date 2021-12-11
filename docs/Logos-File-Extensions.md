---
title: "Logos: File Extensions"
layout: docs
---

<table>
	<thead>
		<tr>
			<th>Extension</th>
			<th>Process order</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>x</td>
			<td>will be processed by Logos, then preprocessed and compiled as Objective-C.</td>
		</tr>
		<tr>
			<td>xm</td>
			<td>will be processed by Logos, then preprocessed and compiled as Objective-C++.</td>
		</tr>
		<tr>
			<td>xi</td>
			<td>will be preprocessed first, then Logos will process the result, and then it will be compiled as Objective-C.</td>
		</tr>
		<tr>
			<td>xmi</td>
			<td>will be preprocessed first, then Logos will process the result, and then it will be compiled as Objective-C++.</td>
		</tr>
	</tbody>
</table>

xi or xmi files enable Logos directives to be used in preprocessor macros, such as `#define`. You can also import other Logos source files with the `#include` statement. However, this is discouraged, since this leads to longer build times recompiling code that hasn’t changed. Separating into x and xm files, sharing variables and functions via `extern` declarations, is recommended.

These file extensions control how a build system such as Theos should build a Logos file. Logos itself does not take the file extension into account and works regardless of whether a file is Objective-C or Objective-C++.
