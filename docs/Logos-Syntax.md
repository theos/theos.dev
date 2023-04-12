---
title: "Logos: Syntax"
layout: docs
---

Logos is a component of the Theos development suite that allows method hooking code to be written easily and clearly, using a set of special preprocessor directives.

## Top Level

The directives in this category should not exist within a group/hook/subclass block.
An exception is [%hookf](#hookf) which can exist in a [%group](#group) block.

### %config

```objc
%config(Key=Value)
```

Set a logos configuration flag.

#### Configuration Flags

<table>
	<thead>
		<tr>
			<th>Key</th>
			<th>Values</th>
			<th>Notes</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="3">generator</td>
			<td>MobileSubstrate</td>
			<td>generate code that uses <a href="https://libhooker.com/docs/" title="MobileSubstrate">MobileSubstrate</a> for hooking.</td>
		</tr>
		<tr>
			<td>libhooker</td>
			<td>generate code that uses <a href="http://www.cydiasubstrate.com/" title="libhooker">libhooker</a> for hooking.</td>
		</tr>
		<tr>
			<td>internal</td>
			<td>generate code that uses only internal Objective-C runtime methods for hooking. Currently, <a href="#hookf">%hookf</a> is <strong>not</strong> supported in this generator.</td>
		</tr>
		<tr>
			<td rowspan="3">warnings</td>
			<td>none</td>
			<td>suppress all warnings</td>
		</tr>
		<tr>
			<td>default</td>
			<td>non-fatal warnings</td>
		</tr>
		<tr>
			<td>error</td>
			<td>make all warnings fatal</td>
		</tr>
		<tr>
			<td>dump</td>
			<td>yaml</td>
			<td>dump the internal parse tree in YAML format</td>
		</tr>
	</tbody>
</table>

Example:

```objc
%config(generator=internal);
```

### %hookf

```objc
%hookf(return type, functionName, arguments list...) {
	/* body */
}
```

Generate a function hook for the function named `functionName`.
Set `functionName` in `%init` to an expression if the symbol should be dynamically looked up.

Example:

```objc
// Given the function prototype (only add it yourself if it's not declared in an included/imported header)

FILE *fopen(const char *path, const char *mode);

// The hook is thus made
%hookf(FILE *, fopen, const char *path, const char *mode) {
	puts("Hey, we're hooking fopen to deny relative paths!");
	if (path[0] != '/') {
		return NULL;
	}
	return %orig; // Call the original implementation of this function
}

// functions can also be looked up at runtime, if, for example, the function is in a private framework
%hookf(BOOL, MGGetBoolAnswer, CFStringRef string) {
	if (CFEqual(string, CFSTR("StarkCapability"))) {
		return YES;
	}
	return %orig;
}
%ctor() {
	%init(MGGetBoolAnswer = MSFindSymbol(NULL, "_MGGetBoolAnswer"));
}
```

### %ctor

```objc
%ctor {
	/* body */
}
```

Generate an anonymous constructor (of default priority).
This function is executed after the binary is loaded into memory.
`argc`, `argv`, and `envp` are implicit arguments so they can be used as they would be in a `main` function.

### %dtor

```objc
%dtor {
	/* body */
}
```

Generate an anonymous deconstructor (of default priority).
This function is executed before the binary is unloaded from memory.
`argc`, `argv`, and `envp` are implicit arguments so they can be used as they would be in a `main` function.

## Block level

The directives in this category open a block of code which must be closed by an [%end](#end) directive (shown below).
These should not exist within functions or methods.

### %group

```objc
%group GroupName
/* %hooks */
%end
```

Generate a hook group with the name `GroupName`.
Groups can be used for conditional initialization or code organization.
All ungrouped hooks are in the default group, initializable via [%init](#init) without arguments.

Cannot be inside another [%group](#group) block.

Grouping can be used to manage backwards compatibility with older code.

Example:

```objc
%group iOS8
%hook IOS8_SPECIFIC_CLASS
	// your code here
%end // end hook
%end // end group ios8

%group iOS9
%hook IOS9_SPECIFIC_CLASS
	// your code here
%end // end hook
%end // end group ios9

%ctor {
	if (kCFCoreFoundationVersionNumber > 1200) {
		%init(iOS9);
	} else {
		%init(iOS8);
	}
}
```

### %hook

```objc
%hook ClassName
/* objc methods */
%end
```

Open a hook block for the class named `ClassName`.

Can be inside a [%group](#group) block.

Example:

```objc
%hook SBApplicationController
- (void)uninstallApplication:(SBApplication *)application {
	NSLog(@"Hey, we're hooking uninstallApplication:!");
	%orig; // Call the original implementation of this method
}
%end
```

### %new

```objc
%new
/* objc method */
```
```objc
%new(signature)
/* objc method */
```

Add a new method to a hooked class or subclass by adding this directive above the method definition.
signature is the Objective-C type encoding for the new method; if it is omitted, one will be generated.

Must be inside a [%hook](#hook) or [%subclass](#subclass) block.

Example:

```objc
%new
- (void)handleTapGesture:(UITapGestureRecognizer *)gestureRecognizer {
	NSLog(@"Recieved tap: %@", gestureRecognizer);
}
```

### %subclass

```objc
%subclass ClassName: Superclass <Protocol list>
/* %properties and methods */
%end
```

Generate a subclass at runtime.
Like @property in normal Objective-C classes, you can use [%property](#property) to add properties to the subclass.
The [%new](#new) specifier is needed for a method that doesn't exist in the superclass.
To instantiate an object of the new class, you can use the [%c](#c) operator.

Can be inside a [%group](#group) block.

Example:

```objc
// An interface is required to be able to call methods of the runtime subclass using block syntax.
@interface MyObject : NSObject
@property (nonatomic, retain) NSString * someValue;
@end

%subclass MyObject : NSObject

%property (nonatomic, retain) NSString * someValue;

- (instancetype)init {
	if ((self = %orig)) {
		[self setSomeValue:@"value"];
	}
	return self;
}

%end

%ctor {
	// The runtime subclass cannot be linked at compile time so you have to use %c().
	MyObject *myObject = [[%c(MyObject) alloc] init];
	NSLog(@"myObject: %@", [myObject someValue]);
}
```

### %property

```objc
%property (nonatomic|assign|retain|copy|weak|strong|getter=...|setter=...) Type name;
```

Add a property to a [%subclass](#subclass) just like you would with @property to a normal Objective-C subclass as well as adding new properties to existing classes within [%hook](#hook).

Must be inside a [%hook](#hook) or [%subclass](#subclass) block.

### %end

```objc
%end
```

Close a [%group](#group), [%hook](#hook) or [%subclass](#subclass) block.

## Function level

The directives in this category should only exist within a function or method body.

### %init

```objc
%init;
```
```objc
%init([<ClassName>=<expr>, …]);
```
```objc
%init(GroupName[, [+|-]<ClassName>=<expr>, …]);
```

Initialize a group's method and function hooks.
Passing no group name will initialize the default group.
Passing `ClassName=expr` arguments will substitute the given expressions for those classes at initialization time.
The `+` sigil (as in class methods in Objective-C) can be prepended to the classname to substitute an expression for the metaclass.
If not specified, the sigil defaults to `-`, to substitute the class itself.
If not specified, the metaclass is derived from the class.

The class name replacement is specially useful for classes that contain characters that can't be used as the class name token for the [%hook](#hook) directive, such as spaces and dots.

Example:

```objc
%hook ClassName
- (id)init {
	return %orig;
}
%end

%ctor {
	%init(ClassName=objc_getClass("SwiftApp.ClassName"));
}
```

### %c

```objc
%c([+|-]ClassName)
```

Evaluates to `ClassName` at runtime.
If the `+` sigil is specified, it evaluates to MetaClass instead of Class.
If not specified, the sigil defaults to `-`, evaluating to Class.

### %orig

```objc
%orig
```
```objc
%orig(args, …)
```

Call the original hooked function or method.
Doesn't work in a [%new](#new)'d method.
Works in subclasses, strangely enough, because MobileSubstrate will generate a super-call closure at hook time.
(If the hooked method doesn't exist in the class we're hooking, it creates a stub that just calls the superclass implementation.) `args` is passed to the original function - don't include `self` and `_cmd`, Logos does this for you.

Example:

```objc
%hook ClassName
- (int)add:(int)a to:(int)b {
	if (a != 0) {
		// Return original result if `a` is not 0
		return %orig;
	}
	// Otherwise, use 1 as `a`
	return %orig(1, b);
}
%end
```

#### &%orig

```objc
&%orig
```

Get a pointer to the original function or method.
Return type is `void (*)(id, SEL[, arg types])`

Example:

```objc
// Call from outside hooked method:
void (*orig_ClassName_start)(id, SEL) = nil;

void doStuff(id self, SEL _cmd) {
	if (self && orig_ClassName_start) {
		orig_ClassName_start(self, _cmd);
	}
}

%hook ClassName
- (void)start {
	%orig;
	orig_ClassName_start = &%orig;
	dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 1 * NSEC_PER_SEC),
		dispatch_get_main_queue(), ^{
			doStuff(self, _cmd);
	});
}
%end

// Call with another object:
%hook ClassName
- (int)add:(int)a to:(int)b {
	int (*_orig)(id, SEL, int, int) = &%orig;
	ClassName * myObject = [ClassName new];
	int r = _orig(myObject, _cmd, 1, 2);
	[myObject release];
	return r;
}
%end
```

Real world example at [PreferenceLoader](https://github.com/DHowett/preferenceloader/blob/master/prefs.xm#L237-L263)

### %log

```objc
%log;
```
```objc
%log([(<type>)<expr>, …]);
```

Dump the method arguments to syslog.
Typed arguments included in `%log` will be logged as well.
