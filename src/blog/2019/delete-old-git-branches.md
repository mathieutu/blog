---
title: Delete old git branches.
lang: en-EN
date: 2019-08-06 10:59
tags: [git, tips]
hints: [prune, purge, remove]
---

To see what will be done :

```sh
git remote prune --dry-run origin
git branch -vv | grep 'origin/.*: gone]' | awk '{print $1}'
```

If you're ok with that, and want to delete the branches:

```sh
git remote prune origin
git branch -vv | grep 'origin/.*: gone]' | awk '{print $1}' | xargs git branch -D
```

from:

<url-preview url="https://erikaybar.name/git-deleting-old-local-branches" />
