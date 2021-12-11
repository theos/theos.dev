---
title: Help
layout: docs
---

## Places you can ask for help
* Check [Theos/Troubleshooting](https://iphonedev.wiki/index.php/Theos/Troubleshooting) on iPhone Dev Wiki first – common issues are listed here.
* Join our [Discord](https://theos.dev/discord) and ask your question there.
* Post a question at [/r/jailbreakdevelopers](https://www.reddit.com/r/jailbreakdevelopers).
* Post a question on [Stack Overflow](https://stackoverflow.com/questions/tagged/theos) using the “theos” tag.

If you think you’ve found a bug in Theos, [file an issue](https://github.com/theos/theos/issues). Please make sure that you are actually reporting a bug, and not an error in your system or project configuration, or your code. If you’re not sure, ask at one of the options listed above.

## Advice
First and foremost, make sure you know how to program. Generally, the help places listed above will refer you to programming tutorials if it seems like you’re asking basic programming questions. Try searching the web for iOS or Android app development tutorials, or buy a book. They will start with an idea and guide you through writing an app. Remember, there’s no obligation to release any apps you make while initially learning to program. Just use it as a learning exercise. If you don’t have access to a Mac, Android development is an equally good alternative to iOS development — Android Studio is available for Windows, Linux, and macOS — and will help you learn many similar concepts.

When asking a question, provide as much information as you possibly can. It is better that you provide too much information, than to provide fairly little and not end up getting any answers. Providing only your code is not enough to understand what the issue is.

Make sure your question isn’t an [XY problem](http://xyproblem.info/). This means that instead of asking about your *problem*, you ask about a specific *solution* to the problem. This makes it harder to answer your question, and others may ask you to explain more about your problem. Refer to the link for a more detailed explanation.

Be prepared to take on criticism. Experienced programmers may say something that has the ability to upset you if taken the wrong way. Keep in mind that they are providing criticism to help you become a better programmer. There’s no such thing as perfect, but you can get pretty close by listening to the advice of people that were once in your position.

When sharing a snippet of code, it’s usually best to post it to a paste site. We recommend [GitHub Gist](https://gist.github.com/), but any similar site is fine.

* On Stack Overflow and Reddit, you can paste your code directly into the body, and then select it and click “Code” on the toolbar to ensure it is correctly formatted.
* On GitHub and Discord, you can wrap your code in three backticks (<code>\`\`\` … \`\`\`</code>) to ensure it is correctly formatted.

## make troubleshoot
You can run `make troubleshoot` from within a project directory to upload some diagnostic information to [GitHub Gist](https://gist.github.com/), and copy the link to your clipboard. Before using this, follow [GitHub’s intructions](https://cli.github.com/) to install the `gh` CLI tool.

The troubleshoot command will execute `make clean all messages=yes`.
