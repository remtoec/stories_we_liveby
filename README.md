# 人生之書 — Stories We Live By companion

An interactive, Traditional Chinese (Hong Kong voice) reading companion for chapters 6–9 of Dan P. McAdams' *The Stories We Live By* (《我們賴以生存的故事》, 隋真 譯). Readers discover the imagoes (意象原型), walk through the real life stories behind them, and finish by drafting their own personal myth.

## Plan

| Section | Book | What the reader does |
|---|---|---|
| 序 | ch. 1–5 concepts | Personal myth, imago, agency × communion, an interactive imago map |
| 第六章 角色 | ch. 6 | 8 imago cards → full story dialog (person, quotes, author's reading, a reflection prompt) |
| 第七章 卡關 | ch. 7 | 5 "stuck" stories, then two belief journeys (Shirley vs Ted, with the mile-race animation) |
| 第八章 整合 | ch. 8 | Four midlife features, integrative imagoes, Richard / Gail / Karen Horney |
| 第九章 尾聲 | ch. 9 (+ ch. 10 interview) | Generativity, Daniel Kessinger, then **寫你自己的個人神話** — a guided builder (saved only in the reader's browser, printable to PDF) |

## Design

- **Concept:** a risograph-printed "book of life". Paper grain, two inks — red for agency (能動), blue for communion (共融). They overprint into a dark violet in ch. 8, where integration happens.
- **Mood per chapter:** ch. 6 bright paper · ch. 7 grey and "stuttering" · ch. 8 overprint and Horney's light · ch. 9 night → dawn, ending on the reader's own page.
- **Type:** Chiron Sung HK (HK-standard Song) for the book's voice; Chiron Hei HK for UI; LXGW WenKai TC (handwriting) for the site's own Cantonese margin notes (「旁白」). That keeps it visible what is the book and what is the site.
- **Faithfulness:** every life story follows the book — same people, events, ages and the author's interpretation — retold and condensed, with short attributed quotes. Nothing is invented about anyone's life.

## Stack

Plain static HTML/CSS/JS — no build step, no dependencies.

```
site/index.html   page + chapters 7–9 prose
site/data.js      chapter 6 imago stories + map positions
site/app.js       cards, map, dialog, reveals, myth builder
site/styles.css   everything visual
site/_headers     security headers (CSP etc.)
wrangler.jsonc    Cloudflare Worker (static assets only)
```

## Run & deploy

```bash
npx wrangler dev        # http://localhost:8787
npx wrangler deploy     # Cloudflare Workers free tier
```

The book source (`stories.md`, `.epub`) is copyrighted and git-ignored — it is never committed or deployed.
