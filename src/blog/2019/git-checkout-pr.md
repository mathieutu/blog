---
title: Checkout directly on PR
lang: en-EN
date: 2019-03-28 19:20
tags: [git, github, tips]
hints: [pull, request]
---

A tiny function to checkout directly on PR:
```bash
function copr {
  git fetch origin pull/$1/head:pr-$1
  git checkout pr-$1
} 

copr 134
```

from:

<Tweet url="https://twitter.com/EmmaWedekind/status/1107529228222910465" />

See more on [github documentation](https://help.github.com/en/articles/checking-out-pull-requests-locally).

