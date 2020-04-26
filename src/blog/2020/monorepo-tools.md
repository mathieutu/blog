---
title: Monorepo tools
lang: en-EN
date: 2020-04-26 16:04
tags: [git, tools]
hints: [repo, packages, branches]
---

On day, I had to merge several repos into one only monorepo.
I did all the job by hand, and it was painful, especially for git history.

Then, I discovered the [Shopsys Monorepo Tools](https://github.com/shopsys/monorepo-tools) which is basically a set of bash scripts, to do the job for you:

- monorepo_build: build monorepo from specified remotes.
- monorepo_split: split monorepo built by `monorepo_build.sh` and push all `master` branches along with all tags into specified remotes.
- monorepo_add: add repositories to an existing monorepo from specified remotes. The remotes must be already added to your repository and fetched. Only master branch will be added from each repo.
- rewrite_history_into: rewrite git history (even tags) so that all filepaths are in a specific subdirectory.
- rewrite_history_from: rewrite git history (even tags) so that only commits that made changes in a subdirectory are kept and rewrite all filepaths as if it was root.
- original_refs_restore: restore original git history after rewrite.
- original_refs_wipe: wipe original git history after rewrite.
- load_branches_from_remote: delete all local branches and create all non-remote-tracking branches of a specified remote.
- tag_refs_backup: backup tag refs into `refs/original-tags/`
- tag_refs_move_to_original: move tag refs from `refs/original-tags/` into `refs/original/`

<url-preview url="https://github.com/shopsys/monorepo-tools" />
