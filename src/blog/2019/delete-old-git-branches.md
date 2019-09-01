---
title: Delete old git branches.
lang: en-EN
date: 2019-08-06 10:59
tags: [git, tips]
hints: []
---

```sh
git remote prune origin
git branch -vv | grep 'origin/.*: gone]' | awk '{print $1}' | xargs git branch -d
```

from:

<url-preview url="https://erikaybar.name/git-deleting-old-local-branches" />
