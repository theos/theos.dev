---
title: "Logos: Hook Splitting"
layout: docs
---

By default, the Logos pre-processor will only process one .xm file at build time. However, it is possible to split the Logos hooking code into multiple files.

To do this, the main file has to be renamed to an .xmi file. Then, other .xm files can be included in it using the `#include` directive. The Logos pre-processor will add those files to the main file before processing it.

## Groups

Normally, it isn't possible to initialize hooking groups across multiple Logos files, but there is a workaround that can be used to unlock this functionality. This is done by wrapping group initializations inside of static methods that can then be called from other files.

Take a look at the following code. All it does is log a message when the SpringBoard application has finished launching. It is inside of a group called **TweakGroup**, which is initialized in a static function called **InitGroup()**.

```objc
// Group.xm
#import "Shared.h"

%group TweakGroup
%hook SpringBoard

- (void)applicationDidFinishLaunching:(id)arg1 {
    %orig;
    NSLog(@"[Group Test] SpringBoard has finished launching");
}

%end
%end

extern "C" void InitGroup() {
    %init(TweakGroup);
}
```

As you may have noticed, there is an import for *Shared.h* at the top of *Group.xm*. That is simply a header file that will be imported into our main Logos file so that we may call the function there:

```objc
// Shared.h
extern "C" void InitGroup();
```

Finally, *Shared.h* can be imported into the Logos file that contains your constructor. Calling the static function will initialize the group from Group.xm and run its hooks:

```objc
// Tweak.xm
#import "Shared.h"

%ctor {
	NSLog(@"[Group Test] Our hook for SpringBoard should show up below this");
	InitGroup();
}
```

If done correctly and compiled without errors, this could should log two messages: one from the constructor and the other one from the method inside the group. Keep in mind that this doesn't apply to hooks that aren't inside of a group.

**A few things to note:**
- This doesn't work in normal C, so you must use .xm files for your groups and constructor.
- You have to pay attention to how many times you call the initialization as Logos will no longer tell you if it is called more than once.
