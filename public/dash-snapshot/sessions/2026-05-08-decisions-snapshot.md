# 2026-05-08 — Live decisions snapshot (mid-chat preservation)

> Saved before any potential `/compact` so nothing important from today's chat is lost. This file is auto-loaded by SessionStart and consumed as live context.

## What Brandon decided / clarified today (2026-05-08)

### Approved actions (proceed without re-asking)

- **Patch Next.js** — security CVE fix, `npm install next@latest`, ship
- **Pre-fill WhatsApp message** — change `wa.me/...` link to include `?text=Hi%20Brandon%20...` so the message is pre-typed
- **Build `/go/<asin>` redirect** — Brandon's words: "definitely get that done. We don't wanna lose any commission opportunities"
- **Awin audit** — historical: audit was done. Status updated 2026-05-08: Brandon got rejected by most merchants. Strategy now: stay 100% Amazon. Re-apply later when traffic > ~10k sessions/month.

### Brandon's behavioural rules clarified today (LOCK THESE)

- **No time-frame planning.** Don't say "Monday evening" / "this week" / "next 2 weeks". Just prioritise: most-important to least-important, ordered list. Brandon has variable time, can't commit to a calendar.
- **Memory walkthrough is more important than I rated it.** Brandon corrected me — memory keeps me running well across sessions. Promoted to a higher priority than "calm-evening task".
- **Convenience is the strategic frame for the website.** Brandon's insight: "Everyone buys from Amazon because it's convenient. I need to make my website as convenient as possible." Implications:
  - Tile calculator (room m² → tile count + waste %) — replaces decision overhead
  - WhatsApp with pre-filled, intent-specific messages — Amazon has no human help
  - Stripe Payment Links per SKU — match Amazon's checkout speed without building a full cart flow
  - Brandon's curated picks > Amazon's overwhelming choice (the editorial cut is the value)
  - **NOTE 2026-05-08:** £5 sample-box programme was floated but Brandon killed it. Don't re-suggest.
- **Memory persistence pattern explained:** anything saved to a file persists across `/clear` + new sessions; live chat does not. SessionStart auto-loads `.remember/core-memories.md`. claude-mem injects observations.

### Awaiting Brandon's input (do NOT proceed without his nod)

- Microsoft Clarity sign-up — Brandon to register at clarity.microsoft.com (5 min, free), give me the Project ID
- GA4 attribution switch to data-driven — Brandon must click in GA4 Admin UI
- Memory walkthrough of the 5 drafts in `projects/drafts/memory-files-2026-05-04/` — interactive, needs Brandon to react
- Tile calculator final spec — Brandon to sanity-check before I build the code

### Permanently killed (do NOT re-suggest)

- **£5 sample-box programme** — Brandon decided 2026-05-08: not part of TileFlow strategy.
- **TTA (Tile Association) membership** — same date, same call: no value at this stage.

### What I'm executing now (autonomous, no input needed)

1. Awin audit on `data/affiliateLinks.ts` — output a swap list to `projects/sessions/2026-05-08-awin-swap-audit.md`
2. Patch Next.js + ship
3. Pre-fill WhatsApp text on every product page
4. Build `/go/<asin>` redirect (`app/go/[asin]/route.ts`)
5. Strip deprecated schema types from `app/**/page.tsx`
6. Add AI-crawler allows to `robots.txt`
7. Add FAQPage schema to top 3 GSC posts
8. Run schema validator + publish-gate on touched files
9. Submit changed URLs to Google Indexing API
10. Save final session report at `projects/sessions/2026-05-08-autonomous-execution.md`

### Out of scope today (parked for Brandon's return)

- Sentry DSN
- A/B testing tool selection
- Bing IndexNow
- Pinterest pin volume push (deferred until calculator + redirects ship)
- Stripe checkout for direct tile sales (separate 1-2 week project)
