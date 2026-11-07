# CareLens prototype: Earlier vs CareLens

A clickable prototype for the HiLabs APM case (Case Management Workbench). A case manager walks three synthetic members, **Darnell** (in the ED now), **Ernest** (heart-failure discharge) and **Rosa** (two anticoagulants, Spanish-speaking caregiver), first the **Earlier** way, then with **CareLens**. The switch at the top right flips modes on any page.

All members, IDs, phone numbers and facilities are fictional. There is no real PHI and no backend.

## What a tester sees
- **Home (Monday 9 Nov 2026, 08:00):** three member cards, each showing why the case is hard and the "8 am Monday" line.
- **Earlier:** 8 separate systems per member: 3 unsorted queues, an Excel tracker, claims, UM, pharmacy, HIE, CM notes and the softphone. Then the call, then 4 documentation forms. Each step adds its minutes to the clock, shows what goes wrong, tags the problem from the brief, and adds a fact to "Maria's scratch pad".
- **CareLens:** Step 0 "Before 08:00" (what ran overnight) → Today queue (why-#1 score) → Member 360 (what changed, conflicts, max 3 next best actions, trust panel) → Outreach & Notes (call prep, call, shorthand → cited draft, pre-filled assessment, tasks, sign once).
- **Who does what:** every CareLens action is labelled with one of four kinds: ⚙ Automated, ✦ AI suggests, ✋ Maria decides, ⛨ Safety rule. Each step has a ledger in the right column (click an item to see it on screen), badges on the screen itself, and a running count. Review items show "Waiting for Maria" until she acts. The outcome card lists what Maria decided herself; Compare has the counts per member.
- **Guided demo:** ▶ Play walks every step and spotlights each item with a callout (← → keys, Esc to exit). On Maria items, "Do it as Maria" performs her action so a presenter can run the whole story in clicks.
- **Who does what:** every CareLens action is labelled with one of four kinds: ⚙ Automated, ✦ AI suggests, ✋ Maria decides, ⛨ Safety rule. Each step has a ledger in the right column (click an item to see it on screen), badges on the screen itself, and a running count. Review items show "Waiting for Maria" until she acts. The outcome card lists what Maria decided herself; Compare has the counts per member.
- **Guided demo:** ▶ Play walks every step and spotlights each item with a callout (← → keys, Esc to exit). On Maria items, "Do it as Maria" performs her action so a presenter can run the whole story in clicks.
- **Hints:** on every step: how case managers did it before, what CareLens does now, and which brief problem it solves.
- **Files:** the raw exports each mode needs (8 per member Earlier; one Member 360 record + one write-back with CareLens).
- **Compare:** 248 → 101 min for the three members, logins, screens, facts re-typed, and how each brief problem is handled.

Minutes are estimates in line with the CareLens deck (chart prep ~18 → ~5 min, documentation ~40 → ~12 min per member). Conversation time is identical in both modes on purpose.

## Files
```
prototype/
  index.html        page shell, top bar, mode switch, drawer, modal
  css/app.css       design tokens matching the slides (navy, HiLabs blue, freshness chips)
  js/data.js        ALL content: members, steps, minutes, issues, hints, files
  js/app.js         rendering, routing, clock, state (no framework)
  serve.ps1         optional local server for Windows (no installs)
  serve.js          optional local server for macOS/Linux: node serve.js 8765
  serve.js          optional local server for macOS/Linux: node serve.js 8765
```
To change a number, a hint, a ledger item or a member, edit `js/data.js` only (ledger items live in `carelens.ledger` per member).

## Run locally
- Double-click `index.html`. It works straight from the file system.
- Or run a local server (Windows, nothing to install):
  `powershell -ExecutionPolicy Bypass -File prototype\serve.ps1` and open http://localhost:8765

Deep links for demos: `#/p/ernest/carelens/3` opens Ernest's Member 360 (CareLens step 1 is "Before 08:00"); add `/done` to show a finished walkthrough, e.g. `#/p/rosa/earlier/10/done`.

## Deploy (static hosting, no build step)
1. **Netlify Drop (fastest, no git):** go to https://app.netlify.com/drop and drag the `prototype` folder in. You get a public URL in under a minute.
2. **GitHub Pages:** push the `prototype` folder to a repo, then Settings → Pages → deploy from branch, folder `/` (or `/prototype`).
3. **Vercel / Cloudflare Pages:** import the repo, framework "Other", no build command, output directory `prototype`.

Progress is saved in the viewer's browser only (localStorage); "Reset" clears it. The site loads the Nunito font from Google Fonts and falls back to system fonts offline.
