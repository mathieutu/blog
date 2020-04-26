#!/usr/bin/env node

const slugify = require('@vuepress/shared-utils/lib/slugify');
const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { resolve, dirname } = require('path');

const [, , title] = process.argv;

if (!title) {
  throw Error('The title is needed.');
}

const add0 = number => number < 10 ? '0' + number : number;

const fileName = slugify(title);
const now = new Date();
const nowFormatted = `${now.getFullYear()}-${add0(now.getMonth() + 1)}-${add0(now.getDate())} ${add0(now.getHours())}:${add0(now.getMinutes())}`;

const body = (
  `---
title: ${title}
lang: en-EN
date: ${nowFormatted}
tags: []
hints: []
---

<tweet url="https://twitter.com/ralex1993/status/1161653313332342784" :media="true" :parent="false" />
<twl id="kentcdodds">Kent C. Dodds</twl>
<url-preview url="https://medium.com/design-code-repository/css-selectors-cheatsheet-details-9593bc204e3f" />
<image-offline src="https://pbs.twimg.com/media/D19GfnwWkAE3kEQ.jpg" alt="toString() changes" />
`);


const path = resolve(__dirname, `../blog/${now.getFullYear()}/${fileName}.md`);

if (!existsSync(dirname(path))){
  mkdirSync(dirname(path));
}

writeFileSync(path, body);
