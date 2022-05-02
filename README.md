Purpose
=======
To demonstrate a problem when attempting to use the webpack nonce with module federation

Implementation notes
===========
Most code generated with the handy [create mf app](https://www.npmjs.com/package/create-mf-app) starter kit.
Minimal changes made to generated code to expose a component in one of the generated packages ("remote"), and consume it in the other package ("host").  The host has a CSP defined that is restrictive, but should theoretically allow access to the remote code via a (hardcoded) nonce.  Using a hardcoded nonce is of course not recommended, but is done to simplify the example.

The host actually contains two CSPs - one that is commented out, but would work.  However, it is far too open, defeating much of the purpose of the CSP.
The second CSP (not commented out) is the desired CSP, but doesn't work because module federation isn't generating all the necessary code in support of the nonce.

Installing the code
============
1. Clone code
2. From root, run **yarn** to install dependencies
3. From root, run **yarn build**.  This will build production builds of each app
4. From root, run **yarn build:start**.  This will serve each app. NOTE: You may need to tweak the build:start script in each of remote/package.json and host/page.json to make it work on a non-Windows environment
5. Open separate browser tabs and navigate to http://localhost:8080 and http://localhost:8081

Expected results
=============
Both pages should load.  One should say "Remote - statically loading button", with the button beneath it.  The second tab should say "Host - dynamically loading button", with the button beneath it.

Actual results
=============
One page loads (remote), but the host fails to load.  The CSP has blocked the attempt to load the button component from the remote

Anaylsis
=======
From examination of the code, it seems like the problem is in the generated remoteEntry.js file.  There's code that looks for the setting of the webpack token and, if set, a nonce would be placed appropriately on the generated script tag (and presumably style tags).  But the webpack token is not set when the remoteEntry.js file is created.

As a proof of concept after step 3 (the build step), I manually modified the generated remote\dist\remoteEntry.js file, adding one small change.  (__Note: This change is not included in the source of the repo__)

I changed this part of the line:

```
var remote;(()=>{"use strict";var e,r,t,n,o,a,i,u,l,f,s,d,p,h,c={677:(e,r,t)=>{var n={"./Button":
```

to this:

```
var remote;(()=>{"use strict";var e,r,t,n,o,a,i,u,l,f,s,d,p,h,c={677:(e,r,t)=>{t.nc="c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=";var n={"./Button":
```
That is, I added this:

```
t.nc="c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM="
```

to the beginning of the function.  The string corresponds to the nonce value I set in both host\src\index.js and remote\src\index.js.  I think **t.nc** refers to **webpack_require.nc** .  I think the fix would be to "just" ensure appropriate entry (the **t.nc = "< value >"** ) is added into the remoteEntry.js file.  This would be comparable to what *is* correctly added to the dist\main.js.