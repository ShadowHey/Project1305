# mCase Workbench: master content spec (source of truth for deck and annex)

"Today" in the case = **Monday 9 Nov 2026, 08:00**. All patients are fictional; IDs start SYN-, phones use reserved 555-01xx.
Product name: **mCase Workbench** (echoes HiLabs' "MCheck" naming, but is our own proposal). Tagline: "Give Maria back her judgment."
Tabs on every content slide: **Problem | Data Strategy | Synthetic Patients | Product Design | Prioritize & Measure | Pilot & GTM**.
Evidence grade tags to use on stats: [Rule] [Measured] [Proxy] [Vendor] [Our estimate]. Numbers without a tag must not appear.

## Storyline (one sentence per slide; these are the slide action titles)
1. Title + "the answer in 30 seconds".
2. Maria's problem is not effort; it is that her best hours go to assembling the member, not caring for them.
3. We estimate 49% of her day goes to chart assembly and documentation and only 12.5% to real conversations.
4. 20 datasets earn their place only if they change what Maria does; 12 are MVP, 8 wait.
5. Data becomes useful when combined and when it admits its age: 8 insight recipes and 1 trust model.
6. Five fictional members, each built to break a different part of the product.
7. mCase is a 3-screen overlay: who now, what is true, what next; AI drafts and a clinician decides.
8. Screen 1, Work Queue: sorted by the nearest clock and what can be acted on today, always with a reason. (Walk: all 5 patients ranked.)
9. Screen 2, Member 360: every field shows its age and source; conflicts stay visible until a clinician resolves them. (Walk: Walter.)
10. Screen 3, Outreach & Documentation: reach the right person first, then sign a draft whose every line links to its source. (Walk: Marcus, then Ana.)
11. Build the view before the scribe; measure capacity and clocks, and refuse to promise readmissions.
12. Pilot: 90 days, 30 case managers, a concurrent control, one MA plan, and a stop rule agreed up front.

---
## Slide 1: Title
HiLabs wordmark (text, "Hi" blue, "Labs" near-black). "Problem Statement" box (paraphrase of the brief): "Design a Case Management Workbench MVP (web) for a health plan that (a) assembles a timely, trustworthy, holistic picture of each member; (b) tells the case manager whom to work on and what to do next; and (c) cuts documentation and outreach friction, so clinicians spend their time on judgment and conversations, not data hunting."
Submitter: Aditya Acharya | IIT (BHU) Varanasi | aditya.acharya.bme23@itbhu.ac.in. Annex note: "Annex: mCase_Synthetic_Patients_Annex.xlsx".
Vector illustration of a nurse with a headset/clipboard in blue blobs + dots (original inline SVG).
"The answer in 30 seconds" 5-row strip: 
- Understand: ~49% of Maria's day goes to chart assembly and documentation; 12.5% to real conversations (our estimate, assumptions shown).
- Data: 20 datasets, 12 in MVP, each tied to a decision; every field shows age and source.
- Patients: 5 fictional members with 25 planted imperfections (see annex).
- Product: Queue, Member 360, Outreach & Docs. AI drafts; a clinician confirms.
- Measure: conversations per day 3 to 5. 90-day controlled pilot. We do not promise readmission cuts.

## Slide 2 (tab Problem): Personas, day in the life, caseload check
Left column "Personas (case managers only)". 3 cards:
- **Maria Alvarez, RN, CCM (primary).** Complex case management, MA plan. 20 yrs ICU, 48 active cases. Goal: spend her day on people who need her clinical judgment. Bad day: 2 real conversations by 3 pm. Wants: "Tell me who, tell me why, and let me trust it."
- **Jordan Lee, RN (transitions of care).** ~70 discharges a month, not a static panel [Our estimate, see caseload check]. Lives on clocks: contact within ~2 business days, visit within 7. Wants: never to miss a discharge because an alert said only "admitted".
- **Sam Whitaker, LCSW (behavioral health and social needs).** Lower caseload, higher complexity. Works housing, shelters, crisis plans. Needs consent-aware views. Wants: to see social context that is current, not 8 months old.

Middle: "Monday in Maria's life" vertical timeline (brief's facts + our minutes):
08:00 Six discharge alerts since Friday; no signal for who is first; opens her side spreadsheet.
08:30 First member: 6-7 screens (claims portal, auth system, pharmacy file, HIE portal, old notes, spreadsheet).
09:15 Latest claim is 45 days old; alert says "admitted" but not why; two systems disagree on meds.
10:30 Dials: phone disconnected; voicemail; voicemail. Hunts a new number.
11:30 First real conversation. She notices a med list does not add up. This is what she is for.
13:00 40-field assessment before she can close the contact.
15:00 Second conversation done. Two so far.
17:30 Notes done after hours; same facts re-typed in care plan, call note and audit form.
Callout: "Her clinical instinct is the most valuable thing she brings. It is barely used."

Right: "Reality check on the workload" table:
| Brief's range | Our verdict | Best evidence |
| Complex CM 30-60 | Supported; highest acuity runs 10-29 | ACHP 2011 plan table; Iowa cap 45 avg / 50 max (LTSS, 2025); NC 29:1 and 46:1 (rate model, 2022) |
| Telephonic DM 100-200+ | Supported as a range | Virginia MCO median 144 (2022); ACHP 2011; NC 87:1-142:1 |
| Transitions 60-100+ | Not validated as caseload. Works as flow: about 71 discharges a month | NC ~143 productive hrs/month / 2 one-hour contacts = ~71 [Our estimate]; CTI coach holds 24-28 at a time, ~300/yr |
Below it, 3 stat tiles: **68%** of care managers at one plan rated duplicate entry and multi-system inefficiency a major barrier [Measured, n=80, 2013]; **3 in 4** plan leaders see care managers as information gatherers more than trusted advisors [Vendor]; **$90,070** mean RN pay at insurance carriers, about $53-56/hr loaded [Measured BLS May 2023 + Our estimate].
"So what": "A bad day costs members a call and costs the plan $53-56 an hour of ICU-grade judgment spent reading screens."
Sources: ACHP handbook, Iowa HHS, NC DHHS, AJMC Virginia, AHRQ PSNet, PMC6557451, PointClickCare (vendor), BLS.

## Slide 3 (tab Problem): Where the day goes, ranked pains
Title stat: "We estimate 235 of 480 minutes (49%) go to chart assembly and documentation; 60 minutes (12.5%) to real conversations."
Horizontal stacked 100% bar + table (these numbers are final and sum to 480):
| Activity | Assumption | Min | % |
| Chart assembly | 10 members x (7 screens x 1.5 min + 2 min reconciling) = 12.5 min each | 125 | 26.0 |
| Documentation | 3 contacts x 30 min (40-field assessment ~20 + note ~10) + 13 failed attempts x 1.5 min | 110 | 22.9 |
| Outreach logistics | 16 dials x 3 min + 4 number hunts x 5 min | 68 | 14.2 |
| Real conversations | 3 x 20 min | 60 | 12.5 |
| Clinical coordination | 5 tasks x 10 min (auths, appointments, pharmacy, PCP) | 50 | 10.4 |
| Team, admin, interruptions | residual | 37 | 7.7 |
| Queue triage & side spreadsheet | 30 min each morning-equivalent | 30 | 6.3 |
| Total | | 480 | 100 |
(Display rounding: percentages sum to 100.0.) Colour: lost (chart, documentation, outreach, triage = 333 min = 69%) in red family; judgment (conversations + coordination = 110 min = 23%) in blue; neutral (37 min) grey. Note 49% = chart + docs; 69% = all four lost categories.

"How sure are we?" panel: Confidence: medium-low. **No time-motion study of payer case managers exists in our research; this is a bottom-up estimate to be replaced by a 2-4 week baseline.** Cross-checks: 
- Docs 22.9% sits inside hospital nurse measures: ~22% audit log, ~25%, 35.3% observed, 43% self-reported [Proxy].
- NC Medicaid rate model budgets 36% member contact and 36% prep/doc/travel, 1 hr prep/doc per hr talking [Assumption from a state rate model]. Our conversations + coordination = 23%, below that budget, consistent with the brief's "2 conversations by 3 pm".
- Audit logs and self-report differ two-fold in one system, so measure both.
Sensitivity: screens at 1 or 2 min moves chart assembly from 90 to 160 min (10 x (7x1+2) = 90; 10 x (7x2+2) = 160).

"What a workbench could give back": 3 scenarios
- Scribe only: 10% of documentation = **11 min/day**. Evidence: ambient scribes save ~16-22 min/day, 10% in the largest study [Proxy]. Too small to pay for a seat.
- Base case: **110 min/day**: chart 125 to 60, documentation 110 to 90, triage 30 to 15, outreach 68 to 58. Buys **~2 more conversations a day (3 to 5)** at ~50 min per conversation all-in. [Our estimate]
- Stretch: **155 min/day**: chart 40, documentation 80, triage 10, outreach 48.
Key insight callout: "**Chart assembly (125 min) beats documentation (110 min). Build the view before the scribe.**"
Capacity value: 110 min x 240 days x $53-56/hr = **$23-25k per CM per year** (capacity, not cash savings) [Our estimate].

Ranked pain points (score = time 1-5 x consequence 1-5):
1. Chart assembly across 6-7 screens: 5x3 = 15. "125 min; every other step waits for it."
2. Failed outreach and bad contact data: 3x4 = 12 (tie, ranked above docs because no reach means no care). "68 min; about half of phones/addresses were confirmable in one Medicaid study [Measured, 80,016 WI households]; 38% of safety-net plans trust state contact data."
3. Documentation re-entry: 4x3 = 12. "110 min; same facts typed 3-4 times; after-hours."
4. Unprioritized queue: 2x5 = 10. "30 min, but a missed clock is the costliest error."
5. Stale data shown as if current: 2x4 = 8. "Time cost hides inside #1; the harm is wrong decisions."
Footnote counterpoint box "What we will not claim": In the one payer study, obstacles explained only 2-4% of variance in burnout and turnover intent. We do not sell this as a burnout cure.
Sources: NC DHHS rate guidance, Hendrich PMC3037121, PMC6371290, PMC9300261, Rotenstein/MGB, UCLA, J-PAL, KFF, PMC6557451.

## Slide 4 (tab Data Strategy): Inventory
Header test: "What would Maria do differently because she saw this?"
Table, 12 MVP rows (Dataset & source | What Maria does differently | Freshness | Expected quality problem → how we handle it):
1. **Member & eligibility** (plan core admin) | Routes by language, state licence, LOB; knows which rule applies | Daily | Language and LOB stale → field shows as-of; update from each call
2. **Member contact & preferences** (enrollment, pharmacy, provider, CM log) | Dials the number most likely to work, at the best hour | Static until updated | ~half confirmable in one state → score each number, log wrong numbers
3. **ADT event notices** (hospitals, HIE) | Knows who to call first and that a clock started | Near real-time; no measured latency | Rule requires only name, practitioner, institution; no dx/disposition → treat as trigger, never as clinical content
4. **Discharge summary / CCD** (HIE, TEFCA, fax) | Reads why admitted, med changes, follow-ups | 12-34% available at first visit (older review) | Pending tests missing 65% → "summary not received" is a task with a clock
5. **Claims, medical** (core claims) | Sees history and utilization, never today | 44-46% received in service month, ~95% final at 4 months (FFS; use plan's own lag) | Late, can change → show service + received dates; "may change"
6. **Pharmacy fills** (PBM, Part D) | Spots refill gaps; asks why | First record 99.44% by next month; 80.34% final | Cash fills invisible → label "dispensed", never "taking"
7. **Labs** (lab vendors, HIE) | Sees A1c, eGFR, BNP trend; decides escalation | Varies; no verified latency | LOINC mis-mapped 4.6% of results → show "result not received" distinct from "not done"; surface unmapped
8. **Case history & care plan** (CM system of record) | Doesn't restart; sees open goals, barriers, last promise | Live | Free text → AI extracts with source link; clinician confirms
9. **Outreach log** (dialer, CM system) | Knows attempts, what counts, what failed | Live | Robocalls logged as attempts → channel and automated flag per attempt
10. **Prior authorization** (UM system; CMS-0057 APIs from 1 Jan 2027) | Sees expiring home health or DME before it lapses | Daily; decisions in 72 hr / 7 days | Drugs excluded from rule → show status + last updated
11. **HRA & SDOH screen** (HRA vendor, Z codes) | Asks about food, housing and transport first | Staleness unmeasured | Z codes on just 1.59% FFS, 1.07% MA, 1.66% Medicaid → date every answer; blank is not "no need"
12. **Quality gaps & clocks** (HEDIS engine, rules) | Sees TRC, FMC, FUH, HRA deadlines in hours | Daily | Measure set changes yearly (MRP left Stars 2027, stays in TRC) → rules config, not code

8 "Later" rows, one line each (Dataset | decision | why later):
13. Risk scores (plan models) | who is rising | stale and opaque; MVP uses transparent rules first
14. Appointments & referrals (scheduling, HIE) | is a visit booked | no coverage figure; manual confirm in MVP
15. Provider directory | who to refer to | 52.20% of MA locations inaccurate (2016-17); never sole basis
16. Home health & SNF (OASIS, MDS) | who is in the home | feed varies; auth + claims proxy in MVP
17. Behavioral health / Part 2 (consent-gated) | safe BH coordination | single TPO consent since Feb 2026; consent tags needed first
18. Remote monitoring (devices) | weight gain alerts | few members enrolled; alert risk
19. Community resources (211-type directories) | closes a social need | quality varies; link out first
20. Death data (DMF, state) | stop outreach to deceased | DMF in-hospital sensitivity 88.9% to 14.8% after 2011; never close a case on DMF alone

Left out on purpose (small box): Social media, consumer credit, wearables without consent: fails the "what would Maria do" test or the trust test.
Sources: 42 CFR 482.24(d), CCW/ResDAC Apr 2026, Kripalani 2007, ONC DB71, J-PAL, CMS Z-code, Gutkind 2026, CMS-0057-F, 42 CFR 2.33, CMS 2016-17 directory review, Levin 2019, LOINC study (register).

## Slide 5 (tab Data Strategy): Insight recipes + trust model
Left, "8 insight recipes": each row: dataset chips + dataset chips = insight → Maria's action.
1. ADT discharge + pharmacy fills + appointments = "Has not picked up HF medication since discharge" → call today, fix pickup, book 7-day visit.
2. Discharge med list + PBM + PCP list = "Lisinopril and sacubitril/valsartan on different lists" → confirm with member, escalate same day.
3. Refill gap + A1c + cash-pay signal = "Stopped, or just paying cash?" → ask neutrally about cost before labelling non-adherent.
4. ED alerts + claims + contact log = "5 ED visits, 0 PCP visits, 0 connects" → switch channel, involve CHW.
5. Pharmacy phone + CM log + outreach history = "Pharmacy has a newer number" → dial that first.
6. SDOH screen + ADT address = "Screen says housed; ADT says shelter" → ask, re-screen, route to LCSW.
7. Auth end date + home health claims + notes = "Home health lapses Thursday and caregiver is strained" → extend before it lapses.
8. Rule engine + attempt log = "3 logged, only 1 counts" → schedule compliant attempt at a different time.

Right top, "Data trust model": 4 freshness chips: green Fresh (within expected window), amber Aging, red Stale, grey **Not received** ("not received" is not "none"). Rules: 
- As-of date and source on every clinical field.
- Conflicts stay side by side; no silent winner. Suggested order: member-confirmed today > discharge list > PCP/HIE > PBM > claims.
- Label by what the data can prove: "dispensed", not "taking"; "admitted", not "why".
- Confidence on AI extractions: High/Check/Not found, each with source link.
Right bottom, "Why this matters": 5 stat tiles:
- **44-46%** of inpatient and physician claims received in the service month; ~95% final after 4 months (Medicare FFS, Jul 2023) [Measured]
- **12-34%** discharge summaries available at first follow-up (2007 review, probably overstates today) [Measured, dated]
- **43%** hospitals routinely interoperable, 2023 [Measured]
- **1.59%** of Medicare FFS beneficiaries with a Z code, 2019 [Measured]
- **Name, practitioner, institution**: all the federal ADT rule requires; plans not named as recipients [Rule]
Gap note: "We could not verify a national ADT adoption %, MA claims lag curve, or PBM latency. Each plan's own lag triangle replaces our defaults."

## Slide 6 (tab Synthetic Patients): 5 patients (full data in annex)
Top line: "Each stresses a different product decision; 6+ datasets, 5 planted imperfections each; 8 am line per patient."
Five columns/cards. Fields: name, age, LOB, scenario, what it stresses, planted imperfections (short), 8 am line.

**P1 Walter Brooks, 71 | MA-PPO | SYN-1001 | Fresh HF discharge.** Stresses: clock + med conflict. Imperfections: ADT without diagnosis; last claim 45 days old hides the admission; discharge summary not received; lisinopril active on HIE list while sacubitril/valsartan on discharge list; sacubitril/valsartan not filled. 8 am: "Discharged Saturday; new sacubitril/valsartan not picked up and lisinopril may still be active, a contraindicated pair. Call this morning before Tue's clock, confirm what he takes, alert cardiology same day, book the 7-day visit."

**P2 Denise Carter, 66 | MA-HMO | SYN-1002 | Rising-risk diabetic, stopped refills.** Stresses: false positive + stale risk score. Imperfections: A1c 9.6 under local lab code, missing from structured panel; risk score 3 months stale says "moderate"; metformin gap 32 days but $4 generic cash fills invisible; last PCP note 5 months old; phone typed "home" actually mobile. 8 am: "No emergency. A1c rose 7.8 to 9.6 and fills stopped. Call at lunch, ask without judgment about cost or cash fills, then book PCP and a repeat A1c."

**P3 Marcus Bell, 52 | D-SNP | SYN-1003 | Unreachable frequent ED user.** Stresses: outreach + compliance. Imperfections: disconnected phone; pharmacy has a newer number; one ED visit counted twice across feeds; robocall logged as attempt; 2 human attempts in same morning band. 8 am: "5 ED visits in 90 days and no connect. Log shows 3 attempts, only 1 counts. HRA due 18 Nov. Do not redial the dead number: call the pharmacy-record mobile at 4 pm and send a CHW referral."

**P4 Tanya Reed, 34 | Medicaid MCO | SYN-1004 | Depression + housing instability.** Stresses: routing, privacy, AI restraint. Imperfections: SDOH screen 8 months old says housed; ADT address is a shelter; mail returned; consent-gated record may exist; discharge med list incomplete. 8 am: "Psych discharge 3 Nov: 7-day follow-up lapses tomorrow. Route to Sam (LCSW). Reach her via the shelter caseworker, ask about housing first, book the visit. AI gives no risk statement here."

**P5 Ana Reyes, 82 | D-SNP | SYN-1005 | Senior with caregiver strain.** Stresses: free text, language, expiring auth. Imperfections: eligibility says English, last call needed Tagalog interpreter; caregiver strain only in free text; home-health auth ends Thu 12 Nov; SNF claim delayed 60 days; CKD stage conflict across sources. 8 am: "Home health ends Thursday and her daughter sounded exhausted last call. Extend the auth today, then call the daughter after 5 pm with a Tagalog interpreter available; ask about respite."

Include small coverage matrix: patients vs obstacles (Messy, Untimely, Burden, Documentation, Outreach) with dots:
P1: Messy, Untimely, Documentation. P2: Messy, Untimely, Burden. P3: Messy, Outreach, Burden. P4: Untimely, Outreach, Documentation. P5: Messy, Untimely, Documentation, Burden.
Footer note: "Fictional data, no PHI. Phones use reserved 555-01xx."

## Slide 7 (tab Product Design): Concept, NBA logic, AI line
Left: "Introducing mCase Workbench": short paragraph: web overlay on the plan's existing care system (Jiva, GuidingCare, TruCare etc.). It does not replace the system of record. Flow graphic: Screen 1 Queue: WHO NOW → Screen 2 Member 360: WHAT IS TRUE → Screen 3 Outreach & Docs: WHAT NEXT → write-back to system of record. Maps to brief's (a)(b)(c).

Middle: "How Next Best Action works (rules first, not a black box)":
Priority score 0-100 = 40% Clock urgency + 35% Clinical signal + 15% Actionable today + 10% Complexity.
Worked: Walter 0.40x90 + 0.35x95 + 0.15x90 + 0.10x60 = 88.75. Weights are our assumption, tuned with clinicians in the pilot.
Steps: 1 Trigger (ADT, gap, rule) → 2 Evidence check: is data fresh enough? → 3 Rule picks action from a clinician-approved library → 4 Show reason + source → 5 Maria accepts, edits or dismisses with a reason → 6 Weekly review tunes rules.
Why rules: auditable; explainable; Section 1557 reaches tools that guide care; ML ranking after a pilot baseline.
Clocks wired in (chips): 2 business days (TCM contact); 7/14 day visit; TRC 3/3/30/31 days; FMC 7 days; FUH 7 days; SNP 3 non-automated attempts; HRA 90 days. [Rule]

Right: "What is automated, what a clinician must confirm": 4-tier ladder table:
| AI does, spot-check | Normalize records, find documents, pre-fill demographics, encounter timeline, call-list logistics |
| AI drafts, clinician edits and signs | Chart summary, case note, call summary, suggested goals |
| Clinician confirms each item | Active medications and changes, allergies, new diagnoses, risk statements, social needs, preferences |
| Clinician only, no AI recommendation | Coverage, program discharge, escalation and safety, suicide or abuse assessment |
Evidence under it: "Omissions were 76.3% of AI note errors across 5 scribes (simulated) [Proxy]. GPT-4o F1: 94.0% for med extraction, 72.7% with discontinuation status (preprint) [Proxy]. So: every sentence links to its source; 'not found' is shown; meds confirmed item by item." + "No LLM study for payer case managers exists. Our pilot will produce it."
Sources: 45 CFR 92.210, NCQA TRC/FMC/FUH, 42 CFR 422.101(f), AAFP TCM, Anderson PMC12605248, Shao arXiv 2506.11137.

## Slide 8 (Product Design): Wireframe 1, Work Queue
Laptop frame wireframe (HTML/CSS, not an image) with numbered callouts connected by lines. Screen title "Good morning, Maria. 5 of 48 need you today." Top strip: today's plan: 5 priority, 2 clocks due <24h, capacity bar 6.4 of 7.5 hrs. Filters: All | Clocks | Discharges | Gaps | Unreachable.
Rows (Rank, Member, Why now, Next best action, Clock, Best window, Data trust):
1 **Walter Brooks, 71** MA-PPO | HF discharge Sat; new med not picked up; 2 lists conflict | Call; reconcile meds; book 7-day | Contact by Tue 5 pm | Now-11 am | amber: summary not received | score 88.75
2 **Tanya Reed, 34** Medicaid (routed to Sam, LCSW; Maria sees it only as a shared-team row) | Psych discharge 3 Nov; shelter address on ADT | Reach via caseworker; book visit | FUH 7-day ends Tue | 10 am-12 pm | red: SDOH 8 months old | 84.75
3 **Ana Reyes, 82** D-SNP | Home health ends Thu; caregiver strain in notes | Extend auth; call daughter + interpreter | Auth ends Thu | After 5 pm | amber: language conflict | 64.00
4 **Marcus Bell, 52** D-SNP | 5 ED in 90 days; 1 of 3 attempts counts | Call new mobile; CHW referral | HRA due 18 Nov | 4 pm | red: phone disconnected | 60.00
5 **Denise Carter, 66** MA-HMO | A1c 7.8 to 9.6; fills stopped | Non-judgmental call; PCP + A1c | PDC gap | 12-1 pm | amber: possible cash fills | 43.50
Below fold row: "43 others: no action today (next touch dates shown)".
Callouts (what sits where, why):
1. Above the fold: only members needing action today. Why: answers "who needs me today?" in 10 seconds.
2. "Why now" in plain words beside each name. No unexplained score. Score visible but secondary.
3. Clock column in hours, sorted to nearest regulatory or clinical deadline.
4. Best window shifts Ana to the evening instead of blocking the top of the list: actionable today beats merely urgent.
5. Trust chip warns before the chart is opened.
6. Reorder with a reason: logged and reviewed weekly; Maria stays in charge. Bulk-dismiss not allowed on clock items.
7. Alert budget: max 10 prompts a day, severity-tiered, precision published (override evidence 49-96% in drug alerts [Proxy]; Epic sepsis PPV 12% [Proxy]).
Walkthrough strip at bottom: "8:00 am: Six alerts become one ordered list. Walter is first, not because his score is highest in a black box, but because a clock and a contraindicated pair are both open. Denise is fifth and stays visible, so a slow risk is not lost."
Also note: "Why not sort by risk score? Risk says who is sick, not who Maria can help today."

## Slide 9 (Product Design): Wireframe 2, Member 360 (Walter)
Header: Walter Brooks, 71, MA-PPO, SYN-1001 | English | Spouse Helen (caregiver) | Best time 9-11 am | PCP Dr. Lin | Case day 2.
Above the fold panels:
A. "Why you're here" AI summary (3 lines, each with source link, "Draft"): "Discharged Sat 7 Nov after HF admission (ADT; diagnosis inferred from HIE ED note, not confirmed). New sacubitril/valsartan not filled. Discharge summary not received."
B. "Next best actions" (3 checkboxes with reason + source): 1. Call Walter or Helen today (clock Tue 5 pm). 2. Reconcile meds: lisinopril + sacubitril/valsartan conflict. 3. Book cardiology within 7 days.
C. "Conflicts to resolve": Medication table with columns Drug | Discharge list 7 Nov | HIE/PCP 12 Oct | PBM last fill | Member says (empty) | Maria confirms. Rows: Sacubitril/valsartan 49/51: Yes | No | Not filled | ? | [ ]; Lisinopril 20 mg: No | Yes | Filled 21 Oct | ? | [ ]; Furosemide: 80 mg | 40 mg | 40 mg 21 Oct | ? | [ ]; Metoprolol succ. 50 mg: Yes | Yes | Filled 21 Oct | ? | [ ]. Red flag: "Lisinopril + sacubitril/valsartan: contraindicated if both taken. Clinician confirms."
D. Timeline (encounters w/ freshness chips): 25 Sep cardiology claim (latest claim on file, 45 days old); 2 Nov admitted (ADT); 7 Nov discharged (ADT); summary: Not received (task, requested); BNP 2 Nov 1,240 pg/mL (HIE).
E. "Data health" sidebar: chips: ADT Fresh (2 days); PBM Fresh (1 day); Claims Stale (45 days); Discharge summary Not received; SDOH Aging (5 months).
Below the fold: full claims, care plan, SDOH details, documents.
Callouts: 1 Summary leads, because Maria needs 60 seconds of context. Links required. 2 Conflict table is the core of the screen: the product does not pick a winner. 3 "Member says" column empty until the call: only she can fill it. 4 "Not received" is a task with a clock, not a blank. 5 Freshness chip shows age/source; Stale items never drive an action by themselves. 6 AI labels diagnosis as "inferred", not confirmed.
Maria's move strip: "Before: 6-7 screens, 12.5 min. After: 1 screen, ~6 min [Our estimate]. She notices what she always noticed, the list does not add up, but at 8:06, not 11:30. What she does differently: calls first about lisinopril, not a generic discharge script."

## Slide 10 (Product Design): Wireframe 3, Outreach and Docs (Marcus + Ana)
Two wireframes side by side.
Left "Outreach Cockpit: Marcus Bell". Contact table: Number | Source | Last verified | Confidence: 555-0142 mobile | Pharmacy record, 28 Oct | High, try first; 555-0117 home | Enrollment 2024 | Disconnected, do not dial; Shelter/CHW Ms. Ortiz | CM note | Medium. Best window 4-6 pm (past pickups) ; prepaid phone: early month better. Attempt tracker: 27 Oct 10:15 human, no answer: counts; 29 Oct 18:00 robocall: does not count; 4 Nov 10:30 human, no answer: same time band, does not count. "1 of 3 valid. Next valid attempt: today after 12 pm. Then letter. HRA due 18 Nov." Consent status: Calls yes; SMS not on file. Reason codes: Wrong number / No answer / Reached, declined / Reached, engaged.
Callouts: Number confidence; automated flag and different-time logic from 42 CFR 422.101(f); separate bad data from decline; revoke-all opt-out (TCPA 31 Jan 2027); language shown before dial.

Right "Documentation: Ana Reyes post-call note". Top: Call 3:42 pm... use: "Call with daughter (Grace), Tagalog interpreter, 9 Nov 5:20 pm". Draft note with lines with source chips: "Home health auth ends 12 Nov [UM]"; "Daughter reports exhaustion [This call 05:12]"; "Member's language: Tagalog [This call; eligibility says English]"; "Fall in last 30 days: Not found in call or chart" with amber flag. Assessment pre-filled: "31 of 40 fields pre-filled, 6 from this call to confirm, 3 need Maria". One-entry: Sign once → writes to Assessment, Care plan, Call note, Audit form (4 chips). Buttons: Confirm each flagged, Sign, Log. Note: AI drafts, Maria signs. Interpretation: machine translation needs human review.
Callouts: Every line has a source; Not found is displayed since omissions are the main failure; pre-fill counts make burden visible (40-field form); Write once, 4 destinations; Sign-off log = audit-ready.
Strip: "Documentation per contact: 30 min to ~24 min [Our estimate]. We assume less than the pre-fill promise suggests, because the review must be real."

## Slide 11 (tab Prioritize & Measure)
Top left "What we build first and why": rule: a feature ships in MVP only if it (1) protects a regulated or clinical clock or frees 15+ min/day and (2) passes the "what would Maria do differently" test.
MVP table with scoring (Minutes/day | Clock? | Effort S/M/L): 
Member 360 with freshness + conflicts | 65 | yes | L
Clock-sorted queue + reasons | 15 | yes | M
Next best action rules | indirect | yes | M
Outreach cockpit + attempt rules | 10 | yes | M
Pre-fill + write-once docs | 20 | no | M
AI draft with source links | included above | no | M
Measurement layer (time, clocks, audits) | 0 | n/a | S (pilot needs it)
Later: ML risk model after baseline; capacity balancing across team; closed-loop community referrals; device data; member-facing SMS assistant.
Deliberately out: coverage or UM recommendations; AI suicide or safety assessment; auto-sent messages; replacing the system of record; voice bots (automated calls do not count under the SNP rule).

Top right "Success metrics": North star: **Judgment time share: 23% to 35%+** of the day on conversations + clinical coordination. Table Metric | Baseline | 90-day target:
Prep time per case | 12.5 min [est] | 6 min
Real conversations per CM/day | 3 [est] | 5
Documentation per contact | 30 min [est] | 24 min
Connect rate per dial | 19% (3/16) [est] | 28% (5/18)
Wrong-number dials | 25% (4/16) [est] | 12%
2-business-day contact on time | Measure in baseline (assume 65%) | 90%
Active cases per manager | 48 | 48 during pilot (protect quality); 55 only if guardrails hold
Guardrails: major omission per audited AI draft <2%, stop at 5%; prompts <=10 per CM/day; precision published; opt-outs honored within 10 business days.
Observed, not promised: readmissions, ED visits, cost. Why: **Camden RCT 62.3% vs 61.7%, while naive pre/post showed a 38-point fall [Measured]; Medicare Health Support N=242,417 no reduction in admissions [Measured].** Star context: TRC 3.4, FMC 2.5, PCR 3.4 avg stars 2027; these six measures ~17% of MA-PD weight [Our estimate].

Bottom: Risks and mitigations (5 cards with red header + blue mitigation, like Prateek's Pitfall layout):
- Wrong or stale data drives action → freshness gates; stale data cannot trigger an action alone; plan lag triangles.
- Alert fatigue → prompt budget, severity tiers, dismissed-prompt audit; publish precision.
- Clinician distrust / automation bias → source links, weekly rule review, random audits; AI never fills "Member says".
- AI omission → "Not found" flags; item confirmation; stop rule.
- Regulatory creep (UM, Part 2, TCPA, 1557) → technical wall from coverage decisions; consent tags; global opt-out; model inventory; counsel review.

## Slide 12 (tab Pilot & GTM)
Left "First health plan": ICP: regional MA plan with D-SNP that already works with HiLabs [reports six of top ten plans, unnamed]. Why MA first: federal attempt rules, published Star weights, $13.4B+ bonus pool in 2026. Medicaid next: worse contact data but state-by-state rules.
Buyer map: Sponsor: VP Care Management / CMO. Co-approval: CIO. Users: RN CMs, LCSW. Blocker: Compliance. (Weak evidence from 2 press releases; validate with 3-5 interviews.)
Market tiles: **35.2M** MA enrollees of 64.2M eligible, 2026 (55%) ; **66M+** Medicaid MCO enrollees, Jul 2024; **$13.4B+** quality bonus 2026, 2.3% of MA payments; **37%** of contracts at 4+ stars (188/508), 71% of enrollees.

Middle: pilot timeline (gantt-style chevrons): Weeks -4 to 0 Baseline (logs + observation, plan lag triangles); Weeks 1-4 Cohort A live (15 CMs), Cohort B control (15 CMs); Weeks 5-8 tune rules; Week 9-13 stepped: B goes live; Week 13 Readout: go/no-go. Scope: 30 case managers (range 20-50), one LOB (MA + D-SNP), read-only overlay + write-back of signed notes. Why a control: UCLA's control arm improved on its own; Camden's naive pre/post misled by 38 points.
Exit criteria: Go if conversations per day +1.5 or more vs control; on-time contact 90%; major omission <2%. No-go fallback: "sell compliance and audit layer, or data layer inside incumbents."

Right: Pricing signal: per-case-manager seat, since no public PMPM exists. **$500/seat/month** (inside Salesforce Health Cloud's $350-725 list range) = $6k/yr, ~25% of $23-25k capacity value [Our proposal]. Pilot: 30 seats x 3 months x $500 = **$45k** + data onboarding. At 200 CMs: **$1.2M ARR**.
Competition: Incumbents own the record: Cognizant CareAdvance (Best in KLAS 2026, 83.7), ZeOmega Jiva (82.2), VirtualHealth HELIOS (80.4), MHK CareProminence (77.6), GuidingCare (76.3), TruCare (73.9) in KLAS 2025. Overlay = no rip-and-replace. Our wedge: HiLabs' clinical data ingestion (MCheck Clinical) + published proof no competitor has: no verifiable payer CM time-saving result is public. 75% of payer tech users want human review and audit trails before broad deployment (Black Book poll) [Vendor/poll].
Timing chips: 1 Jan 2027: CMS-0057 APIs; 31 Jan 2027: TCPA revoke-all.
Honest limits box: "Not found: payer CM time-motion study, national connect benchmark, payer CM turnover, public PMPM, verified national HEDIS % rates. Pilot generates the first four."

## Source links (use short labels in footer strip "Sources: 1. Label 2. Label", each hyperlinked)
- NC DHHS rate guidance 2022: https://medicaid.ncdhhs.gov/updated-tailored-care-management-rate-guidance-jan-24-2022/download
- ACHP handbook: https://achp.org/wp-content/uploads/ACHP-Care-Management-Handbook.pdf
- Iowa HHS: https://hhs.iowa.gov/media/15084/download?inline=
- AJMC Virginia: https://www.ajmc.com/view/challenges-faced-by-medicaid-managed-care-coordinators-working-with-members-with-substance-use-disorder
- AHRQ PSNet: https://psnet.ahrq.gov/innovation/transition-coachesr-reduce-readmissions-medicare-patients-complex-postdischarge-needs
- PA plan survey: https://pmc.ncbi.nlm.nih.gov/articles/PMC6557451/
- PointClickCare: https://pointclickcare.com/blog/our-markets/health-plans/what-care-managers-could-be-doing-instead-of-chasing-charts/
- BLS 2023: https://www.bls.gov/oes/2023/may/naics4_524100.htm
- Hendrich: https://pmc.ncbi.nlm.nih.gov/articles/PMC3037121/
- 2018 obs: https://pmc.ncbi.nlm.nih.gov/articles/PMC6371290/
- Audit logs: https://pmc.ncbi.nlm.nih.gov/articles/PMC9300261
- MGB/Rotenstein: https://news.massgeneralbrigham.org/en/ai-scribes-linked-to-modest-reductions-in-ehr-documentation-time
- UCLA: https://www.uclahealth.org/news/release/ucla-study-finds-ai-scribes-may-reduce-documentation-time
- J-PAL: https://www.povertyactionlab.org/evaluation/impact-outreach-and-assistance-navigators-medicaid-renewals-united-states
- KFF safety-net: https://www.kff.org/medicaid/understanding-the-role-of-medicaid-managed-care-plans-in-unwinding-pandemic-era-continuous-enrollment-perspectives-from-safety-net-plans/
- 42 CFR 482.24: https://www.law.cornell.edu/cfr/text/42/482.24
- CCW claims: https://resdac.org/sites/default/files/2026-04/ccw-original-medicare-claims-part-d-events-maturity.pdf
- Kripalani: https://pubmed.ncbi.nlm.nih.gov/17327525/
- ONC DB71: https://healthit.gov/data/data-briefs/interoperable-exchange-patient-health-information-among-us-hospitals-2023/
- CMS-0057: https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f
- 42 CFR 2.33: https://www.law.cornell.edu/cfr/text/42/2.33
- 42 CFR 422.101: https://www.law.cornell.edu/cfr/text/42/422.101
- 45 CFR 92.210: https://www.law.cornell.edu/cfr/text/45/92.210
- NCQA TRC: https://www.ncqa.org/report-cards/health-plans/state-of-health-care-quality-report/measures-list/transitions-of-care-trc/
- NCQA FMC: https://www.ncqa.org/report-cards/health-plans/state-of-health-care-quality-report/follow-up-after-emergency-department-visit-for-people-with-high-risk-multiple-chronic-conditions-fmc/
- NCQA FUH: https://www.ncqa.org/report-cards/health-plans/state-of-health-care-quality-report/measures-list/follow-up-after-hospitalization-for-mental-illness-fuh/
- AAFP TCM: https://www.aafp.org/family-physician/practice-and-career/getting-paid/coding/transitional-care-management/faq.html
- Anderson: https://pmc.ncbi.nlm.nih.gov/articles/PMC12605248/
- Shao: https://arxiv.org/abs/2506.11137v2
- van der Sijs: https://pmc.ncbi.nlm.nih.gov/articles/PMC1447540
- Epic sepsis: https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2781313
- Camden: https://pubmed.ncbi.nlm.nih.gov/31914240/
- MHS RTI: https://www.rti.org/publication/results-medicare-health-support-disease-management-pilot-program
- CMS Stars 2027: https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-part-d-star-ratings
- CMS Star measures: https://www.cms.gov/files/document/2027-star-ratings-measures.pdf
- KFF bonus: https://www.kff.org/medicare/medicare-advantage-quality-bonus-payments/
- KFF MA 2026: https://www.kff.org/medicare/medicare-advantage-in-2026-enrollment-update-and-key-trends/
- KFF Medicaid: https://www.kff.org/medicaid/10-things-to-know-about-medicaid-managed-care/
- KLAS 2025: https://klasresearch.com/best-in-klas-ranking/care-management-solutions-payer/2025/306
- KLAS 2026: https://klasresearch.com/best-in-klas-ranking/care-management-solutions-payer/2026/306
- Salesforce: https://www.salesforce.com/healthcare-life-sciences/health-cloud/pricing/
- Black Book: https://www.newswire.com/news/black-book-polls-find-health-plans-moving-from-digital-transformation-22789286
- HiLabs: https://www.hilabs.com/our-solutions
- HiLabs release: https://digital-release.wowktv.com/business/press-releases/cision/20260812PH24778/hilabs-named-to-the-inc-5000-list-for-the-second-consecutive-year
- TCPA FCC: https://docs.fcc.gov/public/attachments/DA-26-12A1.pdf
- 47 CFR 64.1200: https://www.law.cornell.edu/cfr/text/47/64.1200
Z-code, directory, LOINC, Levin, Gutkind: grep "Z code", "52.20", "LOINC", "88.9", "1.66" in C:\Users\dhruv\Desktop\Hilabs_Deck\reports\Case management workbench evidence.md (Source register section) for exact URLs.
