---
title: Git Nah
lang: en-EN
date: 2019-03-17 20:15
tags: [git, tips]
hints: [reset]
---

If you want to reset totally your repo to the last commit:

```bash
git reset --hard && git clean -df
```

<br/>

You also would like to add it as an alias:
```bash
alias nah="git reset --hard && git clean -df"
```
