---
title: ES10 Features
lang: en-EN
date: 2019-05-20 10:17
tags: [javascript, watch]
hints: [es2019]
---

Here are the new features of es2019/es10, taken from a thread written by <twl id="souvir">Aurelie AMBAL</twl> (a French javascript lead developer ✌️).

ES10 is not as significant as ES6 in terms of new language features but it does add several interesting ones.
My favorite is definitely the `Object.fromEntries` one!

### String.matchAll()
Given a string and a regular expression, matchAll() returns an iterator for the match objects of all matches. 
<image-offline src="https://pbs.twimg.com/media/D19EbjpWkAAPadG.jpg" alt="String.matchAll()" />

### Array.flat() & Array.flatMap()
The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.<br><br>The flatMap() method maps each element using a mapping function and flattens the result into a new array. 
<image-offline src="https://pbs.twimg.com/media/D19GC9yXQAAiTvH.png" alt="Array.flat()" />
<image-offline src="https://pbs.twimg.com/media/D19GJMRWoAAHyE2.png" alt="Array.flatMap()" />

### Dynamic import
Imports can now be assigned to a variable! 
<image-offline src="https://pbs.twimg.com/media/D19E2NFX4AYyPVB.jpg" alt="Dynamic import" />

### Object.fromEntries()
The Object.fromEntries() method transforms a list of key-value pairs into an object. It can be used to perform the reverse of Object.entries() 
<image-offline src="https://pbs.twimg.com/media/D19E6mKX4AEd_w8.jpg" alt="Object.fromEntries()" />

### string.trimStart & string.trimEnd
The trimStart() method removes whitespace from the beginning of the string.<br><br>The trimEnd() method removes whitespace from the end of a string.<br><br>TrimStart() or trimLeft() do not affect the value of the string itself. 
<image-offline src="https://pbs.twimg.com/media/D19FEfxXgAAW2MN.png" alt="string.trimStart & string.trimEnd" />

### Symbol.prototype.description()
The read-only description property is a string returning the optional description of Symbol objects.<br><br>It is different than Symbol.prototype.toString() as it does not contain the enclosing "Symbol()" string. 
<image-offline src="https://pbs.twimg.com/media/D19FXQaXQAIMWPJ.png" alt="Symbol.prototype.description()" />

### Optional Catch Binding
In the past catch clause from a try/catch statement required a variable.<br>Now it allows developers to use try/catch without creating an unused binding.<br><br>You are free to make use of catch block without a param! 
<image-offline src="https://pbs.twimg.com/media/D19FkMxXcAI16cf.jpg" alt="Optional Catch Binding" />

### Well-Formed JSON.Stringify()
This update fixes processing of characters U+D800 through U+DFFF and prevent JSON.stringify from returning ill-formed Unicode strings. 
<image-offline src="https://pbs.twimg.com/media/D19F0N7X4AI5Tlr.jpg" alt="Well-Formed JSON.Stringify()" />

### Array.sort Stability
The previous implementation of V8 used an unstable QuickSort algorithm for arrays containing more than 10 elements.<br><br>But this is no longer the case. ES10 uses a stable TimSort algorithm.<br><br>In this example, Users with same value retain their sorting order. 
<image-offline src="https://pbs.twimg.com/media/D19GOW2XgAA9ib_.jpg" alt="Array.sort Stability" />

### toString() changes 
The toString() method returns a string representing the source code of the function.<br><br>Earlier white spaces, new lines, and comments were removed, now they are retained with original source code. 
<image-offline src="https://pbs.twimg.com/media/D19GfnwWkAE3kEQ.jpg" alt="toString() changes" />

### Standardized globalThis object
ES10 added the globalThis object which should be used from now on to access global scope on any platform:<br>The global globalThis property returns the top level global object. 
<image-offline src="https://pbs.twimg.com/media/D19GmBaX4AAJOfZ.jpg" alt="Standardized globalThis object" />

You can see all the Finished Proposals here: 
https://github.com/tc39/proposals/blob/master/finished-proposals.md

<tweet url="https://twitter.com/Souvir/status/1107682529371410432"/>
