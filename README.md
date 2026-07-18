# Erjon Gjoka — Portfolio

Website personal, statik (HTML/CSS/JS, pa build step), gati për GitHub + Cloudflare Pages.

## Struktura

```
index.html      → struktura e faqes
style.css       → dizajni (temë e errët, devops/terminal)
script.js       → animacioni i terminalit + asistenti Leo (AI)
assets/         → fotot e tua
```

## Para se ta publikosh — 2 gjëra për të ndryshuar

1. **Email & GitHub** — te `index.html`, seksioni `#contact`, zëvendëso:
   - `you@example.com` me email-in tënd
   - linkun `https://github.com/` me profilin tënd real

2. **Linqet e projekteve** — po të duash të shtosh/ndryshosh projekte, gjenden te seksioni
   `#projects` në `index.html` (kartat me `project-card`).

## Si ta ngarkosh në GitHub

```bash
cd site
git init
git add .
git commit -m "Portfolio i parë"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

## Si ta lidhësh me Cloudflare Pages

1. Hyr në [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Zgjidh repository-n që sapo krijove.
3. Build settings: **lëri bosh** (nuk ka build command, s'ka framework — është HTML statik).
   - Build command: (bosh)
   - Build output directory: `/`
4. **Save and Deploy.** Cloudflare do të të japë një URL tip `<repo-name>.pages.dev`.
5. Çdo `git push` i ri drejt `main` do të ri-deploy-ojë automatikisht — pikërisht animacioni
   i terminalit në hero e tregon këtë proces.

## Për Leo (asistenti AI)

Leo përdor [Puter.js](https://developer.puter.com) — një librari falas, pa API keys, që ekzekutohet
plotësisht në browser (client-side). S'ka kosto as për ty si zhvillues, as për vizitorët — Puter
e menaxhon vetë aksesin te modelet AI ("user-pays" model, pa nevojë për konfigurim shtesë nga ana jote).

- Modeli default është `gpt-5-nano` (i shpejtë dhe falas). Mund ta ndryshosh te `script.js`,
  rreshti me `model: 'gpt-5-nano'` — Puter mbështet 400+ modele (GPT, Claude, Gemini, Llama, etj.),
  lista e plotë gjendet te [developer.puter.com/tutorials/free-llm-api](https://developer.puter.com/tutorials/free-llm-api/).
- Meqë Puter ndryshon shpesh emrat/versionet e modeleve, nëse Leo ndalon së funksionuari në ndonjë
  moment, kontrollo dokumentacionin e Puter për emrin e saktë të modelit aktual.
- Konteksti që i jepet Leo-s (kush je, çfarë ndërton) gjendet te `script.js`, në `SYSTEM_CONTEXT` —
  përditësoje kur të shtosh projekte të reja.

## Zhvillim lokal

Është HTML statik — thjesht hape `index.html` në browser, ose:

```bash
npx serve site
```
