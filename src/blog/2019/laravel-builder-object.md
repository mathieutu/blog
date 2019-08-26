---
title: Laravel dedicated builder object
lang: en-EN
date: 2019-05-20 10:17
tags: [laravel]
hints: [model, scope, query]
---

🍭 Want to thin out your <twl id="laravelphp">@laravelphp</twl> models? 
You can relocate scopes to dedicated builder object.

Gain:
<br>✅ Thinner models
<br>✅ Click through in your editor
<br>✅ Static analysis (if that&#39;s ur bag)

Lose:
<br>❎ Having every co-located

Step 1: Make a custom builder 
<image-offline src="https://pbs.twimg.com/media/D2dfDzNUgAAqyAf.jpg" alt="step1" />

Step 2: Return your dedicated builder from the `newEloquentBuilder` method on your model.<br>

📌 Scopes on your model will continue to function, so you can progressively refactor if you need.
<image-offline src="https://pbs.twimg.com/media/D2dfdnVU4AEjFIz.jpg" alt="step2" />

Enjoy!
<image-offline src="https://pbs.twimg.com/media/D2dieUVU8AAEGht.png" alt="enjoy" />

From [@timacdonald87](https://twitter.com/timacdonald87/status/1109964446766497793).
