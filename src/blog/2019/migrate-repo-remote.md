---
title: Migrate a repo to another remote
lang: en-EN
date: 2019-04-17 11:14
tags: [git]
hints: [github, gitlab]
---

- Clone the repo from previous Lab using the `--mirror` option
```bash
git clone --mirror https://gitlab.com/mathieutu/repo myRepo
```

- Cd into newly created repo directory
```bash
cd myRepo
```

- Push to your new remote using the `--mirror` and the `--no-verify` options. 
```bash
git push --no-verify --mirror https://github.com/mathieutu/repo
```
