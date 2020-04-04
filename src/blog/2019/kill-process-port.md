---
title: Kill a process by port
lang: en-EN
date: 2019-04-10 13:45
tags: [tips, cli]
hints: [node, fkill, cli]
---

How to kill a process with a given port:

On linux:
```bash
function killPort {
  kill -9 $(lsof -t -i:$1)
}
```

On mac:
```bash
function killPort {
  kill -9 `netstat -vanp tcp | grep $1 | head -n 1 | awk '{ print $9 }'`
}
```

And for all plateforms, with Node (and npx) installed:
```bash
npx fkill-cli :3001
```

with a cli tool called fkill, that can kill anything by all the ways you want:

<url-preview :imgUrl="false" url="https://github.com/sindresorhus/fkill-cli" />

