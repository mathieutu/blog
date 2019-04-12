---
title: How many days did I work on that project?
lang: en-EN
date: 2019-04-12 09:35
tags: [git, tips]
hints: [days, commits, count]
---

<url-preview url="https://github.com/tableflip/git-days" />

>A CLI tool to get a print out of how many days each committer committed to a project and how many total commits they've made.

```bash
$ npx git-days --from 2019-01-01 --to 2019-05-01
npx: installed 73 in 2.036s
┌─────────────────┬──────┬─────────┐
│ Author          │ Days │ Commits │
├─────────────────┼──────┼─────────┤
│ Mathieu TUDISCO │ 8    │ 29      │
└─────────────────┴──────┴─────────┘
Total: 8 days (29 commits)
```
