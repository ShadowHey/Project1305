/* CareLens prototype data. ALL MEMBERS, IDS, NUMBERS AND FACILITIES ARE FICTIONAL. No real PHI.
   Minutes are estimates in line with the CareLens deck (chart prep ~18 -> ~5 min, documentation ~40 -> ~12 min per member).
   Conversation time is kept identical in both modes on purpose: CareLens saves the time around the call, not the call. */
window.CL = {
meta:{ day:"Monday 9 Nov 2026, 08:00", user:"Maria R., RN, CCM", role:"Complex CM · 48 active cases (MA + D-SNP + Medicaid)" },
obstacles:{
  "Messy data":"Same member, conflicting diagnoses and med lists across claims, pharmacy, HIE and old notes.",
  "Untimely data":"Claims lag 30-90 days; ADT says admitted but not why; discharge summaries arrive late or never.",
  "Work burden":"Unprioritized queues, manual task tracking, side spreadsheets.",
  "Documentation burden":"The same facts re-typed into assessment, care plan, call note and audit form, often after hours.",
  "Outreach":"Wrong numbers, voicemail, unknown best time or language."
},
queue:[
  {id:"darnell",rank:"1",nm:"Darnell P., 34",ln:"Medicaid · Frequent ED",why:[["In Mercy ED now · 06:52",""],["7 ED visits / 6 mo (2 IDs)","b"],["New mobile via pharmacy","y"]],win:"Until ED discharge (hours)",reach:"ED care coordinator, now",act:"Call ED coordinator",parts:[70,100,85,95],score:85.8,data:"f"},
  {id:"ernest",rank:"2",nm:"Ernest O., 78",ln:"MA-HMO · HF transitions",why:[["Discharged Sat (HF)",""],["Entresto not picked up","y"],["Lisinopril still filled",""]],win:"TRC contact due Tue 17:00",reach:"Home phone, 9-11 am",act:"Start call prep",parts:[85,80,90,85],score:84.5,data:"a"},
  {id:"rosa",rank:"3*",nm:"Rosa D., 82",ln:"D-SNP · Spanish",why:[["2 anticoagulants",""],["Fall ED 2 Nov","y"],["Caregiver called 3x","b"]],win:"Safety: alert today",reach:"Daughter Carmen, 12-1 pm",act:"Send prescriber alert",parts:[90,75,85,40],score:77.0,data:"a"},
  {id:"tanya",rank:"4",nm:"Tanya W., 41",ln:"Medicaid · BH",why:[["FUH-7 missed",""],["Lithium runs out Sat",""],["Now at a shelter","b"]],win:"FUH-30 due 29 Nov",reach:"Shelter worker, 10-12",act:"Verify consent, then call",parts:[80,60,75,55],score:69.3,data:"a",demo:false},
  {id:"luis",rank:"5",nm:"Luis O., 67",ln:"MA-PD · Diabetes",why:[["No Jardiance ~69 days","y"],["A1c 7.4 to 9.0%","y"],["Copay tripled","b"]],win:"This week · PDC by 31 Dec",reach:"Mobile, after 6 pm",act:"Schedule call 18:15",parts:[55,35,80,20],score:48.8,data:"s",demo:false}
],
weights:[["Acuity",0.35],["Time-window",0.30],["Impactability",0.20],["Reachable now",0.15]],
/* Who does what: every CareLens action belongs to exactly one of these four kinds. */
kinds:{
  auto:{icon:"⚙",short:"Auto",label:"Automated",count:"automated",def:"Done by CareLens with no human involved: ingest, de-duplicate, merge IDs at 0.95+, label freshness, rank, request missing documents, log attempts, pre-fill."},
  suggest:{icon:"✦",short:"AI",label:"AI suggests",count:"AI suggestions",def:"Drafted or ranked by AI. Maria accepts, edits or dismisses it with a reason."},
  review:{icon:"✋",short:"Maria",label:"Maria decides",count:"Maria decisions",def:"A clinician must confirm. CareLens waits until she does."},
  guard:{icon:"⛨",short:"Rule",label:"Safety rule",count:"safety rules",def:"A hard rule that overrides the AI or the score."}
},
kindOrder:["auto","suggest","review","guard"],
/* Case lifecycle stage (from the brief) for each CareLens step */
stages:{pre:"Identify",queue:"Identify",m360:"Assess",prep:"Outreach",call:"Assess & plan",note:"Plan, coordinate, document"},
order:["darnell","ernest","rosa"],
patients:{

/* ======================================================= DARNELL */
darnell:{
 id:"darnell", name:"Darnell P.", age:34, plan:"Medicaid", mrn:"M-30391 (+ M-28807)", color:"#E07A1F", qn:"#1",
 headline:"Unreachable frequent ED user", cond:"Asthma, back pain",
 card:["In Mercy ED right now (ADT 06:52)","History split across 2 member IDs","Eligibility phone disconnected","Case set to auto-close 15 Nov"],
 eightam:"He is in the ED right now. Call the ED care coordinator before discharge for a bedside warm handoff, merge IDs, text the new mobile, get the controller filled, book PCP within 7 days, stop the auto-close.",
 earlier:{
  intro:"Maria starts at 08:00 with three unsorted inboxes. Darnell's live ED alert is in there, but nothing says it is urgent, and his history lives under two member IDs.",
  steps:[
   {sys:"queues",name:"Three work queues",sl:"ADT inbox · tasks · referrals",cost:5,login:"CM system login (#1)",
    view:{title:"CM System > Inbox > ADT alerts (14 unread, sorted by received time)",cols:["#","Received","Member","Event","Facility","Reason"],
     rows:[["1","Fri 16:10","Luis O.","Lab result","Quest","-"],["2","Fri 17:42","Ernest O.","A03 discharge","St. Hilda","-"],["3","Sat 09:13","Ernest O.","A03 discharge (dup)","St. Hilda","-"],["...","","","6 more","",""],["9","Mon 06:52","Darnell P.","A04 ED registration","Mercy ED","(blank)"],["...","","","5 more","",""]],hl:4,
     text:"Tasks tab: 4 open tasks (not dated).  Referrals tab: 2 new, unsorted."},
    issue:{t:"The live ED alert for Darnell is item 9 of 14, sorted by arrival time, not urgency. Nothing tells Maria he can still be reached in the ED.",ob:["Work burden","Untimely data"]},
    fact:"Darnell: ED alert at Mercy 06:52, reason blank",
    hint:{how:"Earlier, case managers scanned three inboxes top to bottom every morning and copied names into a personal Excel list before starting.",why:"Live ED visits were often found after the member had already gone home."}},
   {sys:"excel",name:"Excel side tracker",sl:"Maria_caseload_Nov.xlsx",cost:2,login:"File on shared drive",
    view:{title:"Maria_caseload_Nov.xlsx  (last saved Fri 17:31)",cols:["Member","ID","Attempts","Last try","Plan"],
     rows:[["Darnell P.","M-30391","6","4 Nov","Close as unable to reach 15 Nov"],["Ernest O.","M-30117","0","-","Call after discharge"],["Rosa D.","M-30552","1","5 Nov","Call member home #"]],hl:0},
    issue:{t:"The tracker says close Darnell as unable to reach on 15 Nov. It does not know he is in the ED right now.",ob:["Work burden"]},
    fact:"Tracker: 6 failed attempts, auto-close 15 Nov",
    hint:{how:"Most case managers kept a private spreadsheet because the CM system had no view of who needed them today.",why:"The spreadsheet goes stale the minute a new event arrives."}},
   {sys:"claims",name:"Claims portal",sl:"Search by member ID",cost:4,login:"Claims portal login (#2)",
    view:{title:"Claims Portal > Member M-30391 > Last 6 months",cols:["Service date","Type","Provider","Dx"],
     rows:[["14 Oct","ED","Mercy","J45.901"],["22 Sep","ED","Mercy","M54.5"],["30 Aug","ED","County General","J45.901"],["2 Aug","ED","Mercy","J45.901"]],
     text:"Search name + DOB instead: 2nd record M-28807 found -> 3 more ED visits (May-Jul). PCP visits in 12 months: 0. Latest claim is 26 days old; today's ED visit will not show for weeks."},
    issue:{t:"His history is split across two member IDs (4 + 3 ED visits). Maria only finds the second ID by searching name and date of birth.",ob:["Messy data","Untimely data"]},
    fact:"Two IDs: M-30391 + M-28807 = 7 ED visits, 0 PCP",
    hint:{how:"Case managers re-ran searches by name and DOB when a history looked thin, and added the counts up by hand.",why:"Duplicate member IDs hide how often someone really uses the ED."}},
   {sys:"um",name:"UM / prior auth system",sl:"Authorizations",cost:2,login:"UM system login (#3)",
    view:{title:"UM > Authorizations > M-30391",cols:["Auth","Type","Status"],rows:[["-","No inpatient or home-health auths on file","-"]],text:"ED treat-and-release visits do not create authorizations."},
    issue:{t:"A dead end: 2 minutes and a login for no new information. Earlier there was no way to know that before opening it.",ob:["Work burden"]},
    fact:"UM: nothing on file",
    hint:{how:"Opening every system for every member was the safe habit, because any one of them might hold the reason for the visit.",why:"Most systems add nothing for this member, but you only learn that after opening them."}},
   {sys:"pbm",name:"Pharmacy file (PBM)",sl:"Weekly fill export",cost:3,login:"PBM portal login (#4)",
    view:{title:"PBM fill history > M-30391 (export dated Sun 8 Nov)",cols:["Fill date","Drug","Days","Pharmacy","Phone on file"],
     rows:[["28 Oct","Albuterol HFA","25","Walgreens Main St","(555) 010-0143"],["2 Oct","Albuterol HFA","25","Walgreens Main St","(555) 010-0143"],["...","Albuterol x3 more","","",""],["11 Mar","Fluticasone (controller)","30","Walgreens Main St","(555) 010-0118"]],hl:0,
     text:"Rescue inhaler 5 fills in 6 months, controller once: asthma medication ratio 0.17."},
    issue:{t:"A newer mobile, (555) 010-0143, sits in the pharmacy record. The CM system never sees it, so outreach keeps using the dead number.",ob:["Outreach","Messy data"]},
    fact:"New mobile (555) 010-0143 in pharmacy record",
    hint:{how:"Experienced case managers knew to look for phone numbers in pharmacy data, but it was a personal trick, not a workflow.",why:"Most never found the newer number."}},
   {sys:"hie",name:"HIE portal",sl:"Regional exchange",cost:3,login:"HIE portal login (#5)",
    view:{title:"HIE > Encounters > Darnell P.",cols:["Start","Facility","Status","Diagnosis"],rows:[["Mon 06:52","Mercy ED","In progress","(not sent)"],["14 Oct","Mercy ED","Discharged","Asthma exacerbation"]],hl:0},
    issue:{t:"The ADT feed says he is in the ED but gives no reason. Maria has to call to learn why.",ob:["Untimely data"]},
    fact:"HIE: in ED now, no diagnosis",
    hint:{how:"The HIE portal was a separate login most case managers checked only when something looked serious.",why:"Hospital alerts carry the minimum: patient, practitioner, facility."}},
   {sys:"cm",name:"CM notes",sl:"Old free-text notes",cost:3,login:"Back in the CM system",
    view:{title:"CM System > Notes > M-30391",cols:["Date","Author","Note"],rows:[["4 Nov","Maria","No answer x2. Number disconnected?"],["18 Aug","J. Kim RN","Member works nights at warehouse. HRA not done."]],hl:1},
    issue:{t:"The best time to reach him ('works nights') is buried in a free-text note from August.",ob:["Outreach","Documentation burden"]},
    fact:"Works nights; HRA never done",
    hint:{how:"Reading old notes end to end was the only way to recover context from the last case manager.",why:"Useful facts stay buried in prose."}},
   {sys:"phone",name:"Softphone + attempt log",sl:"Dial, then log 3 fields",cost:4,login:"Softphone login (#6)",
    view:{title:"Softphone > Dial (555) 010-0118 (eligibility file)",cols:["Time","Number","Result"],rows:[["08:31","(555) 010-0118","Number not in service"]],hl:0,
     text:"Then log by hand in CM system: Attempt date / Channel / Outcome (3 fields)."},
    issue:{t:"The eligibility phone is disconnected. Each attempt is typed into the CM system by hand.",ob:["Outreach","Documentation burden"]},
    fact:"Eligibility phone dead; attempt 7 logged by hand",
    hint:{how:"Case managers dialled the number on the eligibility file first, because that is what the system showed.",why:"Wrong and stale numbers waste the most predictable minutes of the day."}},
   {type:"call",name:"Reach the member",cost:10,
    result:{ok:false,title:"10:40: reached the Mercy ED care coordinator",text:"Darnell was discharged at 10:15, before Maria found him. The warm handoff and the controller-inhaler prescription were missed. The new mobile goes to voicemail."},
    hint:{how:"By the time all eight systems were checked, the ED window had usually closed.",why:"The call itself took the same 10 minutes. What was lost was the timing."}},
   {type:"docs",name:"Document it 4 times",
    forms:[{name:"40-field assessment",min:15,fields:"Living situation: ?\nWork schedule: nights (typed from Aug note)\nAsthma control: ...\n... 37 more fields from memory"},
           {name:"Care plan update",min:8,fields:"Goal: reduce ED use (re-typed)\nBarrier: unreachable (re-typed)\nPhone: (555) 010-0143 (re-typed)"},
           {name:"Call note",min:7,fields:"Called Mercy ED coord. Member already discharged.\nNew mobile found in pharmacy data..."},
           {name:"Audit / attempt form",min:5,fields:"Attempt 7 · Channel: phone · Outcome: not reached\n(same facts again)"}],
    hint:{how:"The same facts went into four forms. Most of it was typed after hours.",why:"This is the largest single block of lost time in the day."}}
  ],
  outcome:{title:"Earlier: Darnell took 71 minutes, and the ED window was missed",
   pts:["7 logins and 12 screens before one useful call","Duplicate IDs and the new number found only by digging","Discharged before contact: no warm handoff, no controller inhaler","Still at risk of the 15 Nov auto-close, because the tracker drives the plan"]},
  stats:{logins:7,screens:12,retyped:4,late:4}
 },
 carelens:{
  intro:"The live ADT at 06:52 moved Darnell from #31 to #1. His two IDs are already merged and the new mobile is offered first.",
  ledger:{
   pre:[
    {k:"auto",time:"02:00",t:"Nightly feeds refreshed",d:"Claims, pharmacy, HIE and eligibility are loaded once and standardized. Every fact keeps its source and age.",src:"13 feeds",at:"pre0"},
    {k:"auto",time:"06:52",t:"ED registration received",d:"ADT A04 from Mercy ED. It has no diagnosis, so the visit reason shows as 'unknown, ask the ED'.",src:"ADT",at:"pre1"},
    {k:"auto",time:"06:52",t:"Second member ID merged at 0.97",d:"M-28807 holds 3 more ED visits. 0.97 is above the 0.95 line, so the merge needs no review: 7 ED visits in 6 months.",src:"ID match",at:"pre2"},
    {k:"guard",time:"06:52",t:"Merges under 0.95 go to Maria",d:"A weaker match is never merged automatically. It waits in her review list instead.",src:"Rule",at:"pre3"},
    {k:"auto",time:"06:52",t:"New mobile picked up from the pharmacy",d:"(555) 010-0143 from the 28 Oct pickup goes first; the eligibility number is disconnected.",src:"PBM",at:"pre4"},
    {k:"auto",time:"06:52",t:"Re-ranked from #31 to #1",d:"A live ED visit lifts acuity and the time window. Score 85.8.",src:"CareLens",at:"pre5"},
    {k:"guard",time:"06:52",t:"Auto-close on 15 Nov paused",d:"A live ED visit stops automatic closure. Only a clinician closes a case.",src:"Rule",at:"pre6"}
   ],
   queue:[
    {k:"auto",t:"Today queue ranked",d:"48 cases sorted by score; 43 with no new events are collapsed so the day plan fits above the fold.",src:"CareLens",at:"q-row"},
    {k:"auto",t:"Score shown in parts",d:"Acuity, time window, impactability and reachable-now, with weights. The rank is never a black box.",src:"CareLens",at:"q-score"},
    {k:"auto",t:"Why-now evidence attached",d:"Live ADT, 7 ED visits across 2 merged IDs and the new mobile, each with its source.",src:"ADT · ID · PBM",at:"q-ev"},
    {k:"suggest",t:"Next best action: call the ED coordinator",d:"Suggested because the window closes at ED discharge. Maria can snooze or re-rank with a reason.",src:"CareLens",at:"q-act"},
    {k:"review",t:"Maria chooses who to work on",d:"The queue orders the work; she decides to open Darnell. Snooze and re-rank need a reason code, which tunes the weights.",src:"Maria",at:"q-act",gate:"step:queue"}
   ],
   m360:[
    {k:"suggest",t:"'What changed' summarized for her",d:"5 bullets from ADT, PBM, claims and CM notes, each cited. Labelled 'verify', because AI wrote it.",src:"AI summary",at:"m-changed"},
    {k:"auto",t:"Freshness on every source",d:"ADT 1 h, pharmacy 12 d, claims 26 d (labelled history), eligibility phone flagged dead.",src:"Trust panel",at:"m-trust"},
    {k:"auto",t:"Rescue vs controller pattern computed",d:"Albuterol 5 fills, controller once in 8 months (AMR 0.17), straight from pharmacy fills.",src:"PBM",at:"m-meds"},
    {k:"review",t:"Maria confirms the controller inhaler",d:"Nothing is auto-resolved. She ticks the fluticasone row once Darnell tells her what he actually takes.",src:"Maria",at:"m-meds",gate:"conf:m1"},
    {k:"suggest",t:"3 next best actions, with evidence",d:"Call the ED coordinator, get the controller filled, pause auto-close and book the PCP. Never more than 3.",src:"CareLens",at:"m-nba"},
    {k:"review",t:"Maria accepts, edits or dismisses each action",d:"Accepted actions become tasks or script lines. A dismissal needs a reason and is not shown again for 14 days.",src:"Maria",at:"m-nba",gate:"nba:all"},
    {k:"guard",t:"Auto-close stays paused",d:"Shown as a chip at the top of the record. Only a human can close this case.",src:"Rule",at:"m-chips"}
   ],
   prep:[
    {k:"auto",t:"Call prep built from the 360",d:"Number, why now, consent and last contact are already filled in. No searching.",src:"CareLens",at:"o-prep"},
    {k:"suggest",t:"Best person to reach: the ED coordinator",d:"He is in the ED right now, so the bedside handoff beats his mobile. The dead eligibility phone is skipped.",src:"CareLens",at:"o-prep"},
    {k:"suggest",t:"Talking points drafted",d:"Warm handoff, visit reason, controller prescription, confirm the new mobile. Maria can edit every line.",src:"AI draft",at:"o-talk"},
    {k:"guard",t:"Consent shown before the dial",d:"Treatment coordination is covered under Medicaid CM. Without a consent basis the call is not offered.",src:"Rule",at:"o-prep"},
    {k:"review",t:"Maria starts the call",d:"CareLens never dials, texts or messages a member on its own.",src:"Maria",at:"o-dial",gate:"step:prep"}
   ],
   call:[
    {k:"auto",t:"Attempts log themselves",d:"The softphone writes each dial and outcome: 08:03 ED desk, 08:20 bedside. No form per dial.",src:"Softphone",at:"o-attempts",do:"call"},
    {k:"review",t:"The conversation is Maria's",d:"10 minutes, same as before. Coaching, judgment and the agreement with Darnell are hers. She types a few words of shorthand.",src:"Maria",at:"o-short",gate:"called"},
    {k:"guard",t:"No recording without consent",d:"Only Maria's shorthand is captured unless the member agrees to recording.",src:"Rule",at:"o-short"}
   ],
   note:[
    {k:"suggest",t:"Shorthand turned into a cited note",d:"Every sentence links to its source: this call, PBM, ADT. Facts she did not confirm stay grey.",src:"AI draft",at:"o-draft",do:"structure"},
    {k:"auto",t:"28 of 40 assessment fields pre-filled",d:"From claims, ADT and CM notes. 6 to confirm, 6 she must still ask (housing, asthma action plan).",src:"CareLens",at:"o-assess"},
    {k:"suggest",t:"Tasks drafted from the call",d:"PCP visit within 7 days, fill check Wed, text the appointment, short HRA next call.",src:"AI draft",at:"o-tasks"},
    {k:"review",t:"Cancel the auto-close (RN confirm)",d:"A case decision. AI cannot make it; Maria ticks it.",src:"Maria",at:"o-task0",gate:"conf:t0"},
    {k:"guard",t:"Sign stays blocked until RN tasks are ticked",d:"The button is disabled until every RN-confirm task has her tick.",src:"Rule",at:"o-sign"},
    {k:"review",t:"Maria signs once",d:"Nothing posts until she signs. Then note, assessment and 5 tasks go to the CM system with an audit trail.",src:"Maria",at:"o-sign",gate:"sign"}
   ]
  },
  steps:[
   {id:"pre",name:"Before 08:00: what ran overnight",cost:0},
   {id:"queue",name:"Today queue: why #1",cost:1},
   {id:"m360",name:"Member 360: one picture",cost:4},
   {id:"prep",name:"Call prep: ED coordinator",cost:1},
   {id:"call",name:"Warm handoff call",cost:10},
   {id:"note",name:"Note, tasks, sign once",cost:8}
  ],
  hints:{
   queue:[{n:1,t:"Day plan above the fold",now:"Counts, time-critical items and a capacity bar. Darnell is #1 because he is in the ED now.",before:"Three unsorted inboxes plus an Excel tracker (7 min).",ob:["Work burden"]},
          {n:2,t:"Why #1, not a black box",now:"Score parts and evidence: live ADT, 7 ED visits across 2 merged IDs, new mobile. Rank moved #31 Fri to #1 Mon.",before:"No ranking at all; the alert was item 9 of 14.",ob:["Work burden","Untimely data"]}],
   m360:[{n:1,t:"Identity merged, with confidence",now:"M-30391 + M-28807 merged at 0.97, showing 7 ED visits. Below 0.95 it would ask Maria to review.",before:"Second ID found by searching name + DOB (4 min).",ob:["Messy data"]},
         {n:2,t:"Freshness on every fact",now:"ADT is live (1 h). Claims are labelled history (26 days). The missing diagnosis shows as 'reason unknown, ask the ED'.",before:"Eight systems, no ages, no way to know what is current.",ob:["Untimely data"]},
         {n:3,t:"Auto-close guard",now:"The 15 Nov auto-close is paused: only a human closes a case.",before:"The spreadsheet plan said close as unable to reach.",ob:["Work burden"]}],
   prep:[{n:1,t:"Reach is planned",now:"Best person right now is the ED care coordinator. The new mobile from the pharmacy record (12 days old) is offered for the text.",before:"Dialled the disconnected eligibility number first.",ob:["Outreach"]}],
   call:[{n:1,t:"The call itself is unchanged",now:"10 minutes, same as before. CareLens saved the time around it, so the call happens while he is still in the ED.",before:"Reached the ED after he was discharged.",ob:[]}],
   note:[{n:1,t:"Shorthand in, note out",now:"Maria types a few lines; the AI structures a note where every fact links to its source. Nothing posts until she signs.",before:"Four forms, the same facts typed four times (35 min).",ob:["Documentation burden"]},
         {n:2,t:"Sign once, write back",now:"Note, assessment fields and tasks post together to the CM system of record, with an audit trail. Attempts were logged by the softphone.",before:"Attempt form typed by hand for every dial.",ob:["Documentation burden"]}]
  },
  m360:{
   chips:[["Medicaid","c-b"],["Frequent ED: 7 visits / 6 mo","c-s"],["In Mercy ED now","c-s"],["Auto-close 15 Nov: paused","c-a"]],
   changed:[["Registered at Mercy ED 06:52 today; reason not sent","ADT"],["Two member IDs merged (0.97): 4 + 3 = 7 ED visits in 6 months","ID"],["Rescue inhaler 5 fills, controller once (AMR 0.17)","PBM"],["New mobile (555) 010-0143 captured at pharmacy pickup 28 Oct","PBM"],["0 PCP visits in 12 months; HRA never done; works nights","Claims · CM"]],
   medsTitle:"Medication picture: 2 sources, 1 gap",
   meds:[["Albuterol HFA (rescue)","5 fills / 6 mo","Active","Not asked","a","Overuse"],["Fluticasone (controller)","1 fill, 11 Mar","Active","Not asked","r","Not taking?"],["Prednisone burst","Mercy ED 14 Oct","-","Not asked","a","Recent"]],
   medCols:["Drug","PBM","HIE list","Member says","Status"],
   timeline:[["May-Jul","3 ED visits under M-28807","ID"],["2 Aug","ED (asthma)","Claims"],["30 Aug","ED County General","Claims"],["22 Sep","ED (back pain)","Claims"],["14 Oct","ED (asthma)","HIE"],["28 Oct","Albuterol fill, new mobile","PBM"],["06:52 today","In Mercy ED now","ADT"]],
   trust:[["ADT","f","1 h"],["Pharmacy","f","12 d"],["Eligibility","s","phone dead"],["Claims","a","26 d, history"],["HIE","a","no diagnosis"]],
   trustNote:"2 IDs merged (0.97) · eligibility phone replaced by pharmacy mobile · ADT reason unknown: ask the ED",
   nbas:[["Call the Mercy ED care coordinator now","In ED since 06:52 (ADT, 1 h). Ask for a bedside warm handoff before discharge.","Start call prep"],
         ["Get the controller inhaler filled before he leaves","Controller filled once in 8 months (PBM). Ask the ED to send it to Walgreens Main St.","Add to call script"],
         ["Pause auto-close; book PCP within 7 days","0 PCP visits in 12 months (claims). Only a human can close a case.","Create 2 tasks"]],
   context:["Works nights: best mobile window after 6 pm (CM note, Aug)","HRA never done: short version on the call if he can talk","Housing, food, transport: not yet screened"]
  },
  out:{
   who:"Calling: Mercy ED care coordinator (for Darnell P.)", lang:"English", status:"Live ADT: in ED 06:52",
   prep:[["Number","Mercy ED care coordination desk (555) 010-0400"],["Why now","Member in ED; window closes at discharge"],["Then","Text new mobile (555) 010-0143 (pharmacy, 12 d old) to confirm"],["Consent","Treatment coordination: OK under Medicaid CM"],["Last spoke","Never reached (6 attempts)"]],
   talking:["Ask the ED to page Maria for a bedside warm handoff before discharge","Ask what brought him in today (ADT gave no reason)","Ask for the controller inhaler prescription to Walgreens Main St","Confirm the new mobile with Darnell at bedside"],
   attempts:[["Mon 08:03","ED coordination desk","Connected, 10 min","g"],["Mon 08:20","Bedside, via ED nurse","Darnell on the line","g"]],
   shorthand:"in mercy ED asthma flare. ED coord paged me 0820, spoke w darnell bedside. confirmed new mobile 0143. controller never refilled, cost + forgets. ED sending fluticasone to walgreens main. works nights, call after 6. agrees PCP this wk.",
   draft:[["Contact","ED care coordinator 08:03, then Darnell at bedside 08:20 [this call]"],["Reason for visit","Asthma exacerbation [ED coordinator]; ADT had none [ADT]"],["Meds","Controller not refilled since March [PBM]; ED to send fluticasone to Walgreens Main St [this call]"],["Contact update","Mobile (555) 010-0143 confirmed by member [this call; pharmacy 28 Oct]"],["Plan","PCP visit within 7 days; call after 6 pm; auto-close cancelled"]],
   assess:{pre:28,confirm:6,ask:6,items:[["Contact & phone","g","confirmed on call"],["ED use (6 mo)","g","claims + ADT, IDs merged"],["Medications","a","update from call"],["Work schedule","g","CM note Aug"],["Housing / food","r","must ask"],["Asthma action plan","r","must ask"]]},
   tasks:[["Cancel auto-close 15 Nov","RN confirm"],["PCP visit within 7 days","auto-drafted"],["Controller fill check Wed","scheduled"],["Text appointment to (555) 010-0143","auto-drafted"],["Short HRA on next call","scheduled"]],
   signed:"08:38 · note, assessment v1 and 5 tasks written to the CM system. Doc time ~8 min vs ~35 min.",
   callResult:{ok:true,title:"08:03: ED coordinator reached; 08:20 bedside with Darnell",text:"Warm handoff done before discharge. Controller inhaler sent to his pharmacy. New mobile confirmed. Auto-close stopped."}
  },
  outcome:{title:"CareLens: Darnell took 24 minutes, and he was reached while still in the ED",
   pts:["1 login, 3 screens","IDs merged and the new number offered before the call","Warm handoff and controller inhaler done before discharge","Auto-close paused: only a human closes a case"]},
  stats:{logins:1,screens:3,retyped:1,late:0}
 },
 files:{
  earlier:[
   ["ADT_inbox_2026-11-09.hl7","CM inbox","1 h","ED registration, no diagnosis field",`MSH|^~\\&|MERCY_ED|MERCY|PLAN_CM|PLAN|202611090652||ADT^A04|88211|P|2.5.1
PID|1||M-30391^^^PLAN||P^DARNELL||19920314|M|||12 FICT LN^^SPRINGFIELD|||(555)010-0118
PV1|1|E|ED^^^MERCY|||||||||||||||V7734
DG1|            <- empty: no diagnosis sent`],
   ["Maria_caseload_Nov.xlsx","Shared drive","3 d","Private tracker, not linked to events","Member,ID,Attempts,LastTry,Plan\nDarnell P.,M-30391,6,2026-11-04,Close as unable to reach 15 Nov"],
   ["claims_M-30391_6mo.csv","Claims portal","26 d","Only one of his two IDs","service_date,type,provider,dx\n2026-10-14,ED,Mercy,J45.901\n2026-09-22,ED,Mercy,M54.5\n2026-08-30,ED,County General,J45.901\n2026-08-02,ED,Mercy,J45.901"],
   ["claims_M-28807_6mo.csv","Claims portal (2nd search)","4 mo","Second ID, found by name + DOB","service_date,type,provider,dx\n2026-07-11,ED,Mercy,J45.901\n2026-06-03,ED,Mercy,J45.901\n2026-05-19,ED,County General,M54.5"],
   ["pbm_fills_weekly_2026-11-08.txt","PBM portal","1 d","Newer phone number hidden here","FILL 2026-10-28 ALBUTEROL HFA 25D WALGREENS-MAIN PH:(555)010-0143\nFILL 2026-03-11 FLUTICASONE 30D WALGREENS-MAIN PH:(555)010-0118"],
   ["hie_encounters_darnell.pdf","HIE portal","live","In progress, diagnosis not sent","Mercy ED · Start 06:52 · Status: In progress · Diagnosis: (pending)"],
   ["cm_notes_M-30391.rtf","CM system","3 mo","Best time buried in prose","18 Aug, J. Kim RN: Member works nights at warehouse. HRA not done.\n4 Nov, Maria: No answer x2. Number disconnected?"],
   ["softphone_calllog.csv","Softphone","live","Must be re-typed into CM system","time,number,result\n08:31,(555)010-0118,NOT IN SERVICE"]
  ],
  carelens:[
   ["member360_M-30391.json","CareLens","live","One record built from 13 feeds, both IDs merged",`{
 "member": "Darnell P.", "ids": ["M-30391","M-28807"], "merge_confidence": 0.97,
 "now": {"event":"ED registration","facility":"Mercy","at":"2026-11-09T06:52","source":"ADT","age_min":68,"reason":"unknown - ask ED"},
 "ed_visits_6mo": {"value":7,"sources":["claims","HIE"]},
 "best_contact": {"number":"(555)010-0143","source":"PBM pickup 2026-10-28","confidence":"high"},
 "dead_numbers": ["(555)010-0118"],
 "flags": ["auto-close paused - human only"]
}`],
   ["writeback_note_M-30391.json","CareLens to CM system","on sign","Note, assessment fields and tasks in one post","{ \"signed_by\":\"Maria R., RN\", \"signed_at\":\"2026-11-09T08:38\", \"targets\":[\"CM note\",\"assessment v1\",\"care plan\",\"attempt log\"], \"tasks\":5 }"]
  ]
 }
},

/* ======================================================= ERNEST */
ernest:{
 id:"ernest", name:"Ernest O.", age:78, plan:"MA-HMO", mrn:"M-30117", color:"#14907A", qn:"#2",
 headline:"Fresh heart-failure discharge", cond:"Heart failure (HFrEF)",
 card:["Discharged Sat 7 Nov after 4-day stay","Three sources disagree on furosemide","Lisinopril refilled while new Entresto not picked up","Discharge summary not received"],
 eightam:"Call by Tue (TRC 2-day). Confirm he stopped lisinopril before Entresto (36-h washout), reconcile the furosemide dose, arrange Entresto delivery, book a visit by 14 Nov, check for a scale.",
 earlier:{
  intro:"Ernest went home on Saturday. To understand what changed, Maria has to stitch together claims, the UM system, the pharmacy file, the HIE and old notes, and none of them agree.",
  steps:[
   {sys:"queues",name:"Three work queues",sl:"ADT inbox · tasks · referrals",cost:4,login:"CM system login (#1)",
    view:{title:"CM System > Inbox > ADT alerts (14 unread)",cols:["#","Received","Member","Event","Facility","Reason"],rows:[["2","Fri 17:42","Ernest O.","A03 discharge","St. Hilda","-"],["3","Sat 09:13","Ernest O.","A03 discharge","St. Hilda","-"]],hl:1},
     issue:{t:"Two discharge messages for the same stay, neither with a diagnosis. Was he discharged twice? Maria has to check.",ob:["Messy data","Untimely data"]},
    fact:"Ernest: discharged St. Hilda (2 messages), reason not stated",
    hint:{how:"Duplicate ADT messages were common; case managers opened each to be sure.",why:"No de-duplication, so every duplicate costs a check."}},
   {sys:"excel",name:"Excel side tracker",sl:"Maria_caseload_Nov.xlsx",cost:2,login:"File on shared drive",
    view:{title:"Maria_caseload_Nov.xlsx",cols:["Member","ID","Last contact","Plan"],rows:[["Ernest O.","M-30117","21 Oct","Call after discharge"]],hl:0},
    issue:{t:"The tracker has no TRC deadline. Maria works out by hand that contact is due within 2 business days: Tue 17:00.",ob:["Work burden"]},
    fact:"TRC contact due Tue 17:00 (worked out by hand)",
    hint:{how:"Deadlines lived in case managers' heads or on sticky notes.",why:"Easy to miss when the caseload spikes."}},
   {sys:"claims",name:"Claims portal",sl:"Search by member ID",cost:3,login:"Claims portal login (#2)",
    view:{title:"Claims Portal > M-30117 > Recent",cols:["Service date","Type","Provider","Dx"],rows:[["25 Sep","Office visit","Dr. L. Moreau (PCP)","I50.22"],["12 Aug","Cardiology","Dr. P. Nair","I50.22"]],hl:0,
     text:"Latest claim: 45 days old. The 3-7 Nov admission is not here yet."},
    issue:{t:"The latest claim is 45 days old and hides the admission entirely.",ob:["Untimely data"]},
    fact:"Claims: latest is 25 Sep; admission not billed yet",
    hint:{how:"Claims were the default history, so case managers learned to distrust anything recent in them.",why:"Claims lag 30-90 days."}},
   {sys:"um",name:"UM / prior auth system",sl:"Authorizations",cost:3,login:"UM system login (#3)",
    view:{title:"UM > Authorizations > M-30117",cols:["Auth","Dx","Dates","Status"],rows:[["IP-55120","I50.23 acute on chronic systolic HF","3-7 Nov","Closed"],["HH-55188","Home health","from 9 Nov","Pending since 6 Nov"]],hl:0},
    issue:{t:"This is where Maria finally learns why he was admitted: acute on chronic heart failure. The home-health auth is still pending.",ob:["Untimely data","Messy data"]},
    fact:"UM: admitted for acute on chronic HF; home health pending",
    hint:{how:"Few case managers knew the admission reason lived in the UM system, not the ADT alert.",why:"Context is split by department."}},
   {sys:"pbm",name:"Pharmacy file (PBM)",sl:"Weekly fill export",cost:3,login:"PBM portal login (#4)",
    view:{title:"PBM fill history > M-30117",cols:["Fill date","Drug","Dose","Days"],rows:[["28 Oct","Lisinopril","10 mg daily","90"],["12 Oct","Furosemide","20 mg daily","90"],["20 Oct","Metoprolol succinate","50 mg","90"],["-","Sacubitril/valsartan (Entresto)","-","No fill"]],hl:0},
    issue:{t:"Lisinopril was refilled 28 Oct, and the new Entresto has not been picked up. Taking both is dangerous (36-hour washout).",ob:["Messy data"]},
    fact:"PBM: lisinopril refilled 28 Oct (90 d); no Entresto fill; furosemide 20 mg",
    hint:{how:"Case managers compared pharmacy fills to the discharge list on paper.",why:"The most important safety fact here takes three systems to see."}},
   {sys:"hie",name:"HIE portal",sl:"Regional exchange",cost:5,login:"HIE portal login (#5)",
    view:{title:"HIE > Documents > Ernest O.",cols:["Document","Date","Content"],rows:[["CCD (discharge med list)","8 Nov","Furosemide 40 mg BID · Sacubitril/valsartan 24/26 NEW · Lisinopril STOP"],["Discharge summary","-","Not received"],["Labs","5 Nov","BNP 1,240 (Jun 610) · K 5.1 · Cr 1.6"]],hl:0,
     text:"Discharge summary missing -> fax request form to St. Hilda medical records (2 min)."},
    issue:{t:"The discharge summary never arrived; Maria faxes a request. The CCD says furosemide 40 mg twice a day, the pharmacy says 20 mg once.",ob:["Untimely data","Messy data"]},
    fact:"HIE: furosemide 40 BID, Entresto new, lisinopril STOP; summary faxed for",
    hint:{how:"Faxing records requests was routine and slow.",why:"Discharge summaries often arrive after the follow-up visit, or never."}},
   {sys:"cm",name:"CM notes",sl:"Old free-text notes",cost:3,login:"Back in the CM system",
    view:{title:"CM System > Notes > M-30117",cols:["Date","Note"],rows:[["21 Oct","Med list per member: furosemide 20 mg daily, lisinopril 10 mg. Wife Grace manages meds. Answers mornings."]],hl:0},
    issue:{t:"A third med list, from June notes, agrees with the pharmacy, not the hospital. Three sources, three answers.",ob:["Messy data"]},
    fact:"Notes: wife Grace manages meds; answers mornings",
    hint:{how:"Case managers kept a scratch pad of med lists to compare by hand.",why:"Holding three lists in your head is where errors happen."}},
   {sys:"phone",name:"Softphone + attempt log",sl:"Dial, then log 3 fields",cost:5,login:"Softphone login (#6)",
    view:{title:"Softphone > (555) 010-2210 home",cols:["Time","Result"],rows:[["Mon 14:05","Voicemail"],["Mon 16:30","Voicemail"]],hl:0,text:"Each attempt typed into the CM system (3 fields x 2)."},
    issue:{t:"Maria calls in the afternoon because the morning went on chart prep. Ernest answers mornings, so it goes to voicemail twice.",ob:["Outreach","Documentation burden"]},
    fact:"2 voicemails; next try Tue morning",
    hint:{how:"Calls happened whenever prep finished, not when the member could answer.",why:"Failed attempts are mostly a timing problem."}},
   {type:"call",name:"Reach the member",cost:20,
    result:{ok:false,title:"Tue 10:05: reached Ernest and Grace",text:"Contact made just inside the TRC window. Maria reads three med lists off her scratch pad. Ernest has been taking lisinopril and has Entresto waiting at the pharmacy unopened. The 7-day visit is booked for 16 Nov, outside the window."},
    hint:{how:"The conversation is the same 20 minutes. It just started a day late and without the facts in one place.",why:"Late contact pushes the 7-day visit outside the window."}},
   {type:"docs",name:"Document it 4 times",
    forms:[{name:"40-field assessment",min:15,fields:"Meds: (re-typed from 3 lists)\nWeight monitoring: ?\nCaregiver: Grace (re-typed)\n... 37 more fields"},
           {name:"Care plan update",min:10,fields:"Goal: no readmission in 30 days\nBarrier: med confusion (re-typed)"},
           {name:"Call note",min:9,fields:"Spoke with member and wife. Lisinopril stopped today..."},
           {name:"Audit / TRC form",min:6,fields:"TRC engagement: Tue 10:05\nMRP: pending (re-typed)"}],
    hint:{how:"Four forms, the same facts each time, finished after hours.",why:"Documentation is the largest block of lost time."}}
  ],
  outcome:{title:"Earlier: Ernest took 88 minutes, and contact came a day late",
   pts:["Admission reason found in the 4th system (UM)","Dangerous lisinopril + Entresto overlap found only by comparing 3 lists by hand","Reached Tue 10:05, inside TRC by hours; 7-day visit missed","40 minutes of re-typing after hours"]},
  stats:{logins:7,screens:12,retyped:4,late:3}
 },
 carelens:{
  intro:"In 30 seconds Maria sees Entresto not picked up and lisinopril refilled. She sends the prescriber alert first, then calls at 09:15, when Ernest answers.",
  ledger:{
   pre:[
    {k:"auto",time:"02:00",t:"Nightly feeds refreshed",d:"Claims, pharmacy, HIE and eligibility are loaded once and standardized. Every fact keeps its source and age.",src:"13 feeds",at:"pre0"},
    {k:"auto",time:"Sat 7 Nov",t:"Discharge alert received, duplicate removed",d:"St. Hilda sent the discharge twice. One message is kept.",src:"ADT",at:"pre1"},
    {k:"auto",time:"Sat 7 Nov",t:"Admission reason filled in from UM",d:"The ADT had no diagnosis. The UM authorization gives it: acute on chronic systolic heart failure.",src:"ADT · UM",at:"pre2"},
    {k:"auto",time:"Sat 7 Nov",t:"Transition-of-care clocks started",d:"2-day contact due Tue 10 Nov 17:00. 7-day visit due Sat 14 Nov.",src:"TRC rule",at:"pre3"},
    {k:"auto",time:"Sun 8 Nov",t:"Discharge med list compared with fills",d:"Discharge list stops lisinopril and adds Entresto. Pharmacy shows lisinopril refilled and no Entresto fill.",src:"HIE · PBM",at:"pre4"},
    {k:"guard",time:"Sun 8 Nov",t:"Conflict flagged, never fixed",d:"CareLens shows the lists side by side. It never edits a medication list.",src:"Rule",at:"pre5"},
    {k:"auto",time:"08:01",t:"Discharge summary requested",d:"The missing document becomes an automatic request to St. Hilda, with a clock.",src:"HIE",at:"pre6"}
   ],
   queue:[
    {k:"auto",t:"TRC countdown in the row",d:"Tue 17:00 shows as a window in the queue, not a sticky note.",src:"CareLens",at:"q-row"},
    {k:"auto",t:"Amber data dot",d:"The discharge summary is missing, so the picture is marked 'verify before you trust it'.",src:"Trust",at:"q-row"},
    {k:"auto",t:"Score shown in parts",d:"Acuity, time window, impactability and reachable-now, with weights. Score 84.5.",src:"CareLens",at:"q-score"},
    {k:"auto",t:"Why-now evidence attached",d:"Discharged Saturday, Entresto not picked up, lisinopril still filled.",src:"ADT · PBM · HIE",at:"q-ev"},
    {k:"suggest",t:"Next best action: start call prep",d:"Suggested from the TRC window and his best time (9-11 am).",src:"CareLens",at:"q-act"},
    {k:"review",t:"Maria chooses who to work on",d:"She opens Ernest. Snooze or re-rank needs a reason code.",src:"Maria",at:"q-act",gate:"step:queue"}
   ],
   m360:[
    {k:"suggest",t:"'What changed' replaces six screens",d:"Admission reason, discharge med list, fills, labs and the pending home-health auth: 5 cited bullets.",src:"AI summary",at:"m-changed"},
    {k:"auto",t:"Trust panel",d:"Claims 45 days old, labelled history. 1 duplicate ADT removed. Discharge summary requested 08:01.",src:"Trust panel",at:"m-trust"},
    {k:"guard",t:"Conflicts are never auto-resolved",d:"3 sources side by side. CareLens does not pick a winner.",src:"Rule",at:"m-meds"},
    {k:"review",t:"Is lisinopril stopped? Maria confirms",d:"Discharge list says stop, pharmacy refilled it 28 Oct, and Entresto needs a 36-hour gap. She confirms with Ernest and Grace.",src:"Maria",at:"m-meds",gate:"conf:m1"},
    {k:"review",t:"Furosemide dose: Maria confirms",d:"Discharge list 40 mg twice a day vs pharmacy fill 20 mg once a day.",src:"Maria",at:"m-meds",gate:"conf:m2"},
    {k:"suggest",t:"3 next best actions, with evidence",d:"Call 9-11 am; alert Dr. Moreau about lisinopril; Entresto delivery and a visit by 14 Nov.",src:"CareLens",at:"m-nba"},
    {k:"review",t:"Maria accepts, edits or dismisses each action",d:"The prescriber alert is drafted by AI but only sent when she accepts it.",src:"Maria",at:"m-nba",gate:"nba:all"}
   ],
   prep:[
    {k:"auto",t:"Call prep built from the 360",d:"Home landline, wife Grace as authorized rep, last contact 21 Oct, all filled in.",src:"CareLens",at:"o-prep"},
    {k:"suggest",t:"Best time: 9-11 am",d:"He answered mornings 3 times out of 4 (phone system history).",src:"CTI",at:"o-prep"},
    {k:"suggest",t:"5 talking points drafted",d:"Stop lisinopril, which furosemide dose, Entresto delivery, a scale, a visit by Saturday. Editable.",src:"AI draft",at:"o-talk"},
    {k:"review",t:"Prescriber alert reviewed and sent by Maria",d:"CareLens drafted it; she sent it to Dr. Moreau at 09:02, before the call.",src:"Maria",at:"o-prep",gate:"nba:1"},
    {k:"guard",t:"Authorized rep checked",d:"Grace can discuss his care because she is on file as his authorized representative.",src:"Rule",at:"o-prep"},
    {k:"review",t:"Maria starts the call",d:"CareLens never dials or messages a member on its own.",src:"Maria",at:"o-dial",gate:"step:prep"}
   ],
   call:[
    {k:"auto",t:"Attempt logged by the softphone",d:"09:15, connected first try, 20 minutes. No form to fill.",src:"Softphone",at:"o-attempts",do:"call"},
    {k:"review",t:"Reconciliation happens in the conversation",d:"Maria finds out what Ernest really takes. Only she and the prescriber act on it.",src:"Maria",at:"o-short",gate:"called"},
    {k:"guard",t:"No recording without consent",d:"Only Maria's shorthand is captured unless the member agrees to recording.",src:"Rule",at:"o-short"}
   ],
   note:[
    {k:"suggest",t:"Shorthand turned into a cited note",d:"Every sentence links to its source. Facts she did not confirm stay grey.",src:"AI draft",at:"o-draft",do:"structure"},
    {k:"auto",t:"31 of 40 assessment fields pre-filled",d:"From UM, ADT, labs and the authorized-rep record. 5 to confirm, 4 to ask (scale, transport).",src:"CareLens",at:"o-assess"},
    {k:"suggest",t:"Tasks drafted from the call",d:"Entresto home delivery, scale via DME order, MRP evidence for TRC, visit Thu 12 Nov.",src:"AI draft",at:"o-tasks"},
    {k:"review",t:"Furosemide dose question to Dr. Moreau (RN confirm)",d:"A clinical question. AI cannot send it on its own; Maria ticks it.",src:"Maria",at:"o-task0",gate:"conf:t0"},
    {k:"guard",t:"Sign stays blocked until RN tasks are ticked",d:"The button is disabled until every RN-confirm task has her tick.",src:"Rule",at:"o-sign"},
    {k:"review",t:"Maria signs once",d:"Note, assessment v2, MRP evidence and 5 tasks post together.",src:"Maria",at:"o-sign",gate:"sign"}
   ]
  },
  steps:[
   {id:"pre",name:"Before 08:00: what ran overnight",cost:0},
   {id:"queue",name:"Today queue: TRC clock",cost:1},
   {id:"m360",name:"Member 360: conflicts",cost:5},
   {id:"prep",name:"Call prep: Ernest + Grace",cost:1},
   {id:"call",name:"Reconcile on the call",cost:20},
   {id:"note",name:"Note, tasks, sign once",cost:12}
  ],
  hints:{
   queue:[{n:1,t:"Windows sort the list",now:"The TRC 2-day contact (Tue 17:00) is a countdown in the row, not a sticky note.",before:"Deadline worked out by hand from a duplicate ADT message.",ob:["Work burden"]},
          {n:2,t:"Freshness dot",now:"Amber dot: the discharge summary is missing, so Maria knows to verify before she trusts the picture.",before:"No signal about what was missing.",ob:["Untimely data"]}],
   m360:[{n:1,t:"What changed replaces six screens",now:"Admission reason from UM, discharge med list from HIE, fills from PBM, labs: one summary, every bullet cited.",before:"Five systems and 18 minutes to assemble the same story.",ob:["Messy data","Untimely data"]},
         {n:2,t:"Conflicts side by side",now:"Lisinopril, Entresto and furosemide each show discharge list vs pharmacy vs notes. Nothing is auto-resolved; Maria confirms on the call.",before:"Three lists compared on a scratch pad.",ob:["Messy data"]},
         {n:3,t:"Max 3 next best actions",now:"Call Ernest 9-11 am, alert Dr. Moreau about lisinopril, arrange Entresto delivery + visit by 14 Nov. Accept, edit, or dismiss with a reason.",before:"Maria worked out the plan herself after the call.",ob:["Work burden"]},
         {n:4,t:"Trust panel",now:"Claims are 45 days old and labelled history; the discharge summary was auto-requested from St. Hilda at 08:01.",before:"Faxed request at mid-morning.",ob:["Untimely data"]}],
   prep:[{n:1,t:"Call when he answers",now:"Ernest answers mornings 3 out of 4 times. Wife Grace is the authorized rep and manages his pills.",before:"Called at 14:05 and 16:30: two voicemails.",ob:["Outreach"]}],
   call:[{n:1,t:"Same conversation, better timing",now:"20 minutes, same as before, but on Monday morning with every conflict in front of her.",before:"Tuesday 10:05, reading from a scratch pad.",ob:[]}],
   note:[{n:1,t:"Pre-filled assessment",now:"31 of 40 fields pre-filled with sources; Maria confirms meds and asks about the scale.",before:"40 fields typed from memory.",ob:["Documentation burden"]},
         {n:2,t:"Sign once, write back",now:"Note, assessment, MRP evidence and 3 tasks post to the system of record together.",before:"Four forms, after hours.",ob:["Documentation burden"]}]
  },
  m360:{
   chips:[["MA-HMO · PCP Dr. L. Moreau","c-b"],["HF transitions · day 2","c-b"],["TRC contact due Tue 10 Nov 17:00","c-s"],["Wife Grace: authorized rep","c-f"]],
   changed:[["Admitted 3 Nov via ED, acute on chronic systolic HF (dx from UM auth; ADT had none)","ADT · UM"],["Discharge med list adds Entresto, stops lisinopril; furosemide raised to 40 mg BID","HIE CCD 8 Nov"],["No Entresto fill; lisinopril refilled 28 Oct for 90 days","PBM 1 d"],["BNP 1,240 (Jun 610), K 5.1, Cr 1.6","Lab 5 d"],["Home-health auth pending since 6 Nov; no follow-up visit booked","UM · HIE"]],
   medsTitle:"Medication reconciliation: 3 sources, 2 conflicts, 1 not filled",
   medCols:["Drug","Discharge list (CCD)","PBM fill","Last CM note","Status"],
   meds:[["Sacubitril/valsartan 24/26","NEW, BID","No fill","-","r","Not picked up"],["Lisinopril 10 mg","STOP","Filled 28 Oct · 90 d","Taking","r","Must stop: 36-h washout"],["Furosemide","40 mg BID","20 mg daily · 12 Oct","20 mg daily","a","Dose conflict"],["Metoprolol succinate 50 mg","Continue","Filled 20 Oct","Taking","g","Consistent"]],
   timeline:[["25 Sep","PCP claim (45 d)","Claims"],["12 Oct","Furosemide fill","PBM"],["21 Oct","CM call","CM"],["28 Oct","Lisinopril fill","PBM"],["3 Nov","ED, admitted","ADT"],["4 Nov","BNP 1,240","Lab"],["7 Nov","Discharged (2 msgs, deduped)","ADT"],["8 Nov","CCD med list","HIE"]],
   trust:[["ADT","f","2 d"],["Pharmacy","f","1 d"],["Labs","a","5 d"],["HIE","a","summary missing"],["Claims","s","45 d, history"]],
   trustNote:"2 conflicts · 1 gap. Discharge summary auto-requested from St. Hilda 08:01. 1 duplicate ADT removed. Next claims refresh Tue 02:00.",
   nbas:[["Call Ernest today, 9-11 am","Answers mornings 3/4 (CTI). TRC engagement due Tue · discharge 2 days ago.","Start call prep"],
         ["Confirm lisinopril stopped; alert Dr. Moreau if not","PBM refilled 28 Oct · CCD: STOP · Entresto needs a 36-h gap.","Draft alert"],
         ["Get Entresto delivered + book visit by Sat 14 Nov","No fill (PBM 1 d) · no appointment in 7 days (HIE).","Create 2 tasks"]],
   context:["TRC: engagement by 10 Nov · MRP by 7 Dec · 7-day visit by 14 Nov (none booked)","Lives with wife Grace (82) · HRA Mar 2026, 8 months old: re-ask transport and 'do you have a scale?'","Cardiologist Dr. P. Nair, last seen Jun · English · landline"]
  },
  out:{
   who:"Calling: Ernest O. and wife Grace (authorized rep)", lang:"English", status:"TRC due Tue 17:00",
   prep:[["Number","(555) 010-2210 home landline"],["Best time","9-11 am (answered 3 of 4)"],["Consent","Wife Grace: authorized rep on file"],["Before the call","Prescriber alert to Dr. Moreau sent 09:02"],["Last spoke","21 Oct, Grace, 12 min"]],
   talking:["Are you still taking lisinopril? Please stop it today; Entresto starts 36 hours after the last dose","Which furosemide dose are you taking: 20 mg once or 40 mg twice?","Entresto is waiting at the pharmacy: can we deliver it?","Do you have a scale? Weigh every morning","Can we book Dr. Moreau by Saturday 14 Nov?"],
   attempts:[["Mon 09:15","Home landline","Connected, 20 min","g"]],
   shorthand:"took lisinopril this am, grace stopping it now. entresto not picked up, didnt know. furosemide taking 20 once, discharge says 40 bid. no scale. ok w delivery. visit thu 12 nov 10am moreau.",
   draft:[["Contact","Telephonic with member and wife Grace (authorized rep), 09:15-09:35 [this call]"],["Meds","Lisinopril last dose 9 Nov am, stopped [this call]; Entresto to start after 36 h, delivery arranged [PBM, this call]; furosemide taking 20 mg daily vs discharge 40 mg BID: prescriber to confirm [CCD, PBM, this call]"],["Monitoring","No scale at home: DME order requested [this call]"],["Plan","PCP visit Thu 12 Nov 10:00 (inside 7 days); TRC engagement met Mon 9 Nov"]],
   assess:{pre:31,confirm:5,ask:4,items:[["Medications","a","updated on call"],["Recent admission","g","UM + ADT"],["Labs","g","HIE 5 Nov"],["Caregiver","g","authorized rep on file"],["Home scale","r","must ask"],["Transport","r","must ask"]]},
   tasks:[["Furosemide dose question to Dr. Moreau","RN confirm"],["Entresto home delivery","auto-drafted"],["Scale via DME order","auto-drafted"],["Visit Thu 12 Nov 10:00","scheduled"],["MRP evidence for TRC","auto-drafted"]],
   signed:"09:47 · note, assessment v2, MRP evidence and 5 tasks written to the CM system. Doc time ~12 min vs ~40 min.",
   callResult:{ok:true,title:"09:15: reached Ernest and Grace, first try",text:"Lisinopril stopped today, Entresto delivery arranged after the washout, dose question sent to the prescriber, visit booked Thu 12 Nov: inside the 7-day window."}
  },
  outcome:{title:"CareLens: Ernest took 39 minutes, and the 7-day visit is inside the window",
   pts:["1 login, 3 screens","The lisinopril + Entresto risk was visible in 30 seconds","Reached Monday 09:15 on the first try","Visit booked Thu 12 Nov; TRC engagement and MRP evidence captured"]},
  stats:{logins:1,screens:3,retyped:1,late:0}
 },
 files:{
  earlier:[
   ["ADT_A03_x2_M-30117.hl7","CM inbox","2 d","Two discharge messages, no diagnosis","MSH|...|ADT^A03|77120|...\nPID|1||M-30117||O^ERNEST\nPV1|1|I|4W^^^STHILDA|...|20261103|20261107\n---\nMSH|...|ADT^A03|77188|...   <- duplicate of the same stay"],
   ["claims_M-30117_recent.csv","Claims portal","45 d","Admission not billed yet","service_date,type,provider,dx\n2026-09-25,Office,Dr. L. Moreau,I50.22\n2026-08-12,Cardiology,Dr. P. Nair,I50.22"],
   ["um_auths_M-30117.pdf","UM system","same day","Only place with the admission reason","IP-55120 · I50.23 acute on chronic systolic HF · 3-7 Nov · Closed\nHH-55188 · Home health · Pending since 6 Nov"],
   ["pbm_fills_weekly_2026-11-08.txt","PBM portal","1 d","Lisinopril refilled; no Entresto","FILL 2026-10-28 LISINOPRIL 10MG 90D\nFILL 2026-10-12 FUROSEMIDE 20MG 90D\nFILL 2026-10-20 METOPROLOL SUCC 50MG 90D"],
   ["hie_ccd_M-30117.xml","HIE portal","1 d","Discharge med list; summary missing","<medication>Furosemide 40 mg BID</medication>\n<medication status=\"new\">Sacubitril/valsartan 24/26 mg BID</medication>\n<medication status=\"stopped\">Lisinopril 10 mg</medication>\n<!-- discharge summary: not received -->"],
   ["records_request_fax.pdf","Fax","sent 10:20","Manual request to St. Hilda","To: St. Hilda Medical Records · Re: Ernest O. · Please send discharge summary for 3-7 Nov stay."],
   ["cm_notes_M-30117.rtf","CM system","19 d","Third med list","21 Oct: Furosemide 20 mg daily, lisinopril 10 mg. Wife Grace manages meds. Answers mornings."],
   ["softphone_calllog.csv","Softphone","live","Afternoon voicemails","time,number,result\n14:05,(555)010-2210,VOICEMAIL\n16:30,(555)010-2210,VOICEMAIL"]
  ],
  carelens:[
   ["member360_M-30117.json","CareLens","live","Conflicts kept side by side, never auto-resolved",`{
 "member": "Ernest O.", "id": "M-30117",
 "admission": {"dates":"2026-11-03..07","reason":"I50.23","source":"UM","note":"ADT carried no diagnosis"},
 "adt_duplicates_removed": 1,
 "med_conflicts": [
   {"drug":"lisinopril","ccd":"STOP","pbm":"filled 2026-10-28 90d","cm_note":"taking","severity":"high"},
   {"drug":"furosemide","ccd":"40 mg BID","pbm":"20 mg daily","severity":"medium"}],
 "not_filled": ["sacubitril/valsartan"],
 "clocks": {"trc_contact_due":"2026-11-10T17:00","visit_7d_due":"2026-11-14"},
 "requests": [{"doc":"discharge summary","to":"St. Hilda","sent":"2026-11-09T08:01","auto":true}]
}`],
   ["writeback_note_M-30117.json","CareLens to CM system","on sign","One post, four destinations","{ \"signed_by\":\"Maria R., RN\", \"signed_at\":\"2026-11-09T09:47\", \"targets\":[\"CM note\",\"assessment v2\",\"care plan\",\"TRC/MRP evidence\"], \"tasks\":5 }"]
  ]
 }
},

/* ======================================================= ROSA */
rosa:{
 id:"rosa", name:"Rosa D.", age:82, plan:"D-SNP dual", mrn:"M-30552", color:"#7C4DDB", qn:"#3*",
 headline:"Dual-eligible senior, caregiver strain", cond:"Parkinson's, AFib, CKD · Spanish",
 card:["Possible double anticoagulant after a fall","Phone is her daughter's, labelled 'member home'","Daughter called member services 3x in Oct","Home-health episode ended 20 Oct"],
 eightam:"Safety first: alert the prescriber about two anticoagulants after a fall. Call daughter Carmen 12-1 pm in Spanish, confirm the real regimen, screen caregiver strain, restart home health.",
 earlier:{
  intro:"Rosa fell on 2 Nov. The danger is that she may be on two blood thinners from two pharmacies, but that only shows if Maria opens both pharmacy files and the cardiology list.",
  steps:[
   {sys:"queues",name:"Three work queues",sl:"ADT inbox · tasks · referrals",cost:4,login:"CM system login (#1)",
    view:{title:"CM System > Inbox > ADT alerts",cols:["#","Received","Member","Event","Facility"],rows:[["12","Mon 2 Nov 21:40","Rosa D.","A04 ED + A03 same day","County General"]],hl:0,text:"Alert is 7 days old and sits low in the list."},
    issue:{t:"The fall-to-ED alert from a week ago is near the bottom of the inbox. Nothing marks it as a safety issue.",ob:["Work burden","Untimely data"]},
    fact:"Rosa: ED visit for a fall 2 Nov, sent home",
    hint:{how:"Older alerts drifted down the inbox under newer ones.",why:"The riskiest items are not always the newest."}},
   {sys:"excel",name:"Excel side tracker",sl:"Maria_caseload_Nov.xlsx",cost:2,login:"File on shared drive",
    view:{title:"Maria_caseload_Nov.xlsx",cols:["Member","Phone","Plan"],rows:[["Rosa D.","(555) 010-2231 member home","Call member"]],hl:0},
    issue:{t:"The tracker says call the member at home. That number is actually her daughter Carmen's mobile.",ob:["Outreach","Messy data"]},
    fact:"Phone (555) 010-2231 labelled member home",
    hint:{how:"Phone labels were copied from enrollment and rarely corrected.",why:"Wrong labels mean the wrong script and the wrong time."}},
   {sys:"claims",name:"Claims portal",sl:"Search by member ID",cost:3,login:"Claims portal login (#2)",
    view:{title:"Claims Portal > M-30552",cols:["Service date","Type","Provider"],rows:[["18 Sep","Cardiology","Dr. Ruiz"],["2 Nov","ED (fall)","Not yet billed"]],hl:1},
    issue:{t:"The fall visit is not in claims yet, so claims cannot show it.",ob:["Untimely data"]},
    fact:"Claims: fall visit not billed yet",
    hint:{how:"Case managers checked claims out of habit even for recent events.",why:"Claims are history, never current."}},
   {sys:"um",name:"UM / prior auth system",sl:"Authorizations",cost:2,login:"UM system login (#3)",
    view:{title:"UM > Authorizations > M-30552",cols:["Auth","Type","Status"],rows:[["HH-54021","Home health episode","Ended 20 Oct"]],hl:0},
    issue:{t:"Home health ended on 20 Oct, 13 days before the fall. Nobody re-referred.",ob:["Untimely data"]},
    fact:"Home health ended 20 Oct",
    hint:{how:"Ended authorizations did not raise any task.",why:"Gaps in care stay silent."}},
   {sys:"pbm",name:"Pharmacy files (2)",sl:"Retail + mail order",cost:5,login:"PBM portal login (#4)",
    view:{title:"PBM retail fills + mail-order export > M-30552",cols:["Fill date","Drug","Channel"],rows:[["14 Oct","Apixaban 2.5 mg BID","Retail (Walgreens)"],["3 Sep","Warfarin 3 mg","Mail order (shipping monthly)"]],hl:0,
     text:"The two channels are separate exports. Neither shows the other."},
    issue:{t:"Two anticoagulants from two pharmacies: apixaban retail and warfarin by mail order. After a fall, this is the most dangerous fact in her chart, and it needs two files to see.",ob:["Messy data"]},
    fact:"Apixaban (retail) + warfarin (mail order): possible double anticoagulation",
    hint:{how:"Mail-order and retail fills came in separate exports; few case managers opened both.",why:"A same-day safety issue hidden by data split across vendors."}},
   {sys:"hie",name:"HIE portal",sl:"Regional exchange",cost:3,login:"HIE portal login (#5)",
    view:{title:"HIE > Medication list > Rosa D.",cols:["Source","Anticoagulant","INR"],rows:[["Cardiology, Sep","Warfarin","No INR on file"],["ED 2 Nov","Not listed","-"]],hl:0},
    issue:{t:"Cardiology still lists warfarin, with no INR checks. Which one is she taking?",ob:["Messy data"]},
    fact:"Cardiology list: warfarin, no INR",
    hint:{how:"Case managers called the cardiology office to ask, often getting a callback days later.",why:"Conflicts stay unresolved while time passes."}},
   {sys:"cm",name:"CM notes + member services",sl:"Two systems",cost:4,login:"Member services portal (#6)",
    view:{title:"CM notes + Member services call log > M-30552",cols:["Date","Source","Note"],rows:[["Jan 2026","HRA","No issues"],["Oct (3 calls)","Member services","Daughter called about home health ending, falls, and being exhausted"]],hl:1},
    issue:{t:"Her daughter called three times in October, but those calls sit in member services, outside the CM record. The HRA from January says no issues.",ob:["Messy data","Untimely data"]},
    fact:"Daughter Carmen called 3x in Oct (member services only)",
    hint:{how:"Member services calls were in a different system that most case managers could not search.",why:"Caregiver strain was invisible to the person who could help."}},
   {sys:"phone",name:"Softphone + attempt log",sl:"Dial, then log 3 fields",cost:6,login:"Softphone login (#7)",
    view:{title:"Softphone > (555) 010-2231",cols:["Time","Result"],rows:[["Thu 5 Nov 10:10","No answer"],["Mon 9 Nov 10:30","Answered, Spanish only: interpreter needed, call back"]],hl:1,text:"Language was not flagged. Rebooked with interpreter line for tomorrow."},
    issue:{t:"Called mid-morning when Carmen is at work (works 8-6), and in English. The call has to be rebooked with an interpreter.",ob:["Outreach"]},
    fact:"Carmen works 8-6; Spanish; interpreter needed",
    hint:{how:"Best time and language lived in someone's memory, not on the screen.",why:"Each failed call costs minutes and a day."}},
   {type:"call",name:"Reach the caregiver",cost:20,
    result:{ok:false,title:"Tue 12:10: reached Carmen with an interpreter",text:"A day late. Carmen confirms only apixaban is taken, but the warfarin mail order is still shipping. The prescriber is alerted Tuesday afternoon, more than 24 hours after Maria first could have known."},
    hint:{how:"The same 20-minute conversation, a day later.",why:"For a safety issue, a day matters."}},
   {type:"docs",name:"Document it 4 times",
    forms:[{name:"40-field assessment",min:15,fields:"Falls (6 mo): 1 (re-typed)\nCaregiver strain: ?\nLanguage: Spanish (re-typed)\n... 37 more"},
           {name:"Care plan update",min:10,fields:"Goal: one anticoagulant only\nGoal: home health restarted (re-typed)"},
           {name:"Call note",min:9,fields:"Spoke with daughter via interpreter..."},
           {name:"Audit / attempt form",min:6,fields:"Attempts 1-3 · channel · outcome (re-typed)"}],
    hint:{how:"Four forms, the same facts each time.",why:"Finished after hours."}}
  ],
  outcome:{title:"Earlier: Rosa took 89 minutes, and the safety alert went out a day late",
   pts:["Double anticoagulation visible only after opening 2 pharmacy files + HIE","Caregiver strain hidden in member services","First call at the wrong time and in the wrong language","Prescriber alerted Tuesday afternoon"]},
  stats:{logins:7,screens:12,retyped:4,late:4}
 },
 carelens:{
  intro:"Safety first: the prescriber alert goes at 09:02 as a non-call task. The call waits for Carmen's 12-1 pm window, with Spanish and an interpreter line ready.",
  ledger:{
   pre:[
    {k:"auto",time:"02:00",t:"Nightly feeds refreshed",d:"Claims, both pharmacy channels, HIE and member-services logs are loaded once and standardized.",src:"13 feeds",at:"pre0"},
    {k:"auto",time:"02:04",t:"Two pharmacy channels combined",d:"Retail apixaban (14 Oct) and mail-order warfarin (3 Sep) now sit in one medication picture.",src:"PBM retail · mail",at:"pre1"},
    {k:"auto",time:"02:04",t:"Combined with cardiology and the fall",d:"Cardiology lists warfarin with no INR, and ADT shows a fall on 2 Nov. Together: possible double anticoagulation after a fall.",src:"HIE · ADT",at:"pre2"},
    {k:"guard",time:"02:04",t:"Safety flag overrides the score",d:"Rosa ranks #3 (score 77.0), but the hard rule creates a prescriber-alert task for today, whatever the rank.",src:"Rule",at:"pre3"},
    {k:"auto",time:"02:05",t:"Member-services calls pulled in",d:"Carmen's 3 calls in October (home health, falls, exhaustion) now appear on the timeline.",src:"Member services",at:"pre4"},
    {k:"auto",time:"02:05",t:"Phone relabelled as Carmen's mobile (92%)",d:"Inferred from call outcomes: 'member home' was really the daughter's mobile.",src:"Call history",at:"pre5"},
    {k:"auto",time:"02:05",t:"Old self-report marked stale",d:"The Jan 2026 HRA ('no issues') is 10 months old. It shows amber, with a prompt to ask again.",src:"HRA",at:"pre6"}
   ],
   queue:[
    {k:"auto",t:"Ranked #3, with a safety marker",d:"The * on '3*' means a hard rule applies above the score.",src:"CareLens",at:"q-row"},
    {k:"auto",t:"Score shown in parts",d:"Reachable-now is only 40, which is why the call itself is not first.",src:"CareLens",at:"q-score"},
    {k:"guard",t:"Hard rule above the score",d:"The safety flag makes a non-call task now: alert the prescriber today.",src:"Rule",at:"q-ev"},
    {k:"suggest",t:"Next best action: send the prescriber alert",d:"The call waits for Carmen's 12-1 pm window, when she answers.",src:"CareLens",at:"q-act"},
    {k:"review",t:"Maria opens Rosa and acts on the flag",d:"She decides to work the safety task first. Snooze or re-rank needs a reason code.",src:"Maria",at:"q-act",gate:"step:queue"}
   ],
   m360:[
    {k:"suggest",t:"One insight from four sources",d:"Retail fill + mail-order fill + cardiology list + ADT fall. No single file shows the risk.",src:"AI summary",at:"m-changed"},
    {k:"auto",t:"Trust panel",d:"HRA 10 months stale, no INR in the HIE, phone owner inferred at 92%.",src:"Trust panel",at:"m-trust"},
    {k:"guard",t:"Possible double anticoagulation: shown, never fixed",d:"CareLens never stops or changes a drug. It raises the flag.",src:"Rule",at:"m-meds"},
    {k:"review",t:"Which blood thinner? Maria confirms",d:"She ticks apixaban and warfarin once Carmen reads her both bottles.",src:"Maria",at:"m-meds",gate:"conf:m0,conf:m1"},
    {k:"suggest",t:"3 next best actions, with evidence",d:"Alert the prescriber, call Carmen 12-1 pm in Spanish, restart home health and screen caregiver strain.",src:"CareLens",at:"m-nba"},
    {k:"review",t:"Prescriber alert reviewed and sent by Maria",d:"Drafted by CareLens; she sent it at 09:02, three hours before the call.",src:"Maria",at:"m-nba",gate:"nba:0"}
   ],
   prep:[
    {k:"auto",t:"Call prep built from the 360",d:"Carmen's mobile, best time, language, consent, backup SMS, last contact: all filled in.",src:"CareLens",at:"o-prep"},
    {k:"suggest",t:"Right person, time and language",d:"Carmen, 12-1 pm (answered 3 of 3), Spanish with an interpreter line, SMS backup at 18:00.",src:"CareLens",at:"o-prep"},
    {k:"suggest",t:"Talking points drafted",d:"The fall, both bottles, who helps during the day, how Carmen is coping. Editable.",src:"AI draft",at:"o-talk"},
    {k:"guard",t:"Authorized rep on file",d:"Carmen can discuss her mother's care; consent shows before the dial.",src:"Rule",at:"o-prep"},
    {k:"review",t:"Maria starts the call at 12:04",d:"CareLens never dials or messages a member on its own.",src:"Maria",at:"o-dial",gate:"step:prep"}
   ],
   call:[
    {k:"auto",t:"Attempts log themselves",d:"Thu 10:10 no answer and Mon 12:04 connected, both written by the softphone.",src:"Softphone",at:"o-attempts",do:"call"},
    {k:"review",t:"Caregiver strain is Maria's judgment",d:"She hears that Carmen is overwhelmed and screens for strain (Zarit-4: 11 of 16). No model does that for her.",src:"Maria",at:"o-short",gate:"called"},
    {k:"guard",t:"No recording without consent",d:"Only Maria's shorthand is captured unless the caregiver agrees to recording.",src:"Rule",at:"o-short"}
   ],
   note:[
    {k:"suggest",t:"Shorthand turned into a cited note",d:"Every sentence links to its source. Facts she did not confirm stay grey.",src:"AI draft",at:"o-draft",do:"structure"},
    {k:"auto",t:"31 of 40 assessment fields pre-filled",d:"From ADT, home-health discharge and eligibility. 9 she must ask (caregiver strain, home safety).",src:"CareLens",at:"o-assess"},
    {k:"suggest",t:"Operational tasks drafted",d:"Home-health referral, personal-care hours review, Spanish caregiver resources, follow-up Thu 12:00.",src:"AI draft",at:"o-tasks"},
    {k:"review",t:"Cancel the warfarin mail order (RN confirm)",d:"A medication action. Only Maria can confirm it.",src:"Maria",at:"o-task0",gate:"conf:t0"},
    {k:"review",t:"Tell PCP and cardiology: apixaban only (RN confirm)",d:"A clinical message to the prescribers. Maria ticks it.",src:"Maria",at:"o-task1",gate:"conf:t1"},
    {k:"guard",t:"Sign stays blocked until RN tasks are ticked",d:"The button is disabled until every RN-confirm task has her tick.",src:"Rule",at:"o-sign"},
    {k:"review",t:"Maria signs once at 12:31",d:"Note, assessment v3, care-plan goal and 6 tasks post together, before her next call.",src:"Maria",at:"o-sign",gate:"sign"}
   ]
  },
  steps:[
   {id:"pre",name:"Before 08:00: what ran overnight",cost:0},
   {id:"queue",name:"Today queue: safety flag",cost:1},
   {id:"m360",name:"Member 360: 2 anticoagulants",cost:4},
   {id:"prep",name:"Call prep: Carmen, Spanish",cost:1},
   {id:"call",name:"Call with interpreter",cost:20},
   {id:"note",name:"Shorthand to note, sign once",cost:12}
  ],
  hints:{
   queue:[{n:1,t:"Hard rules sit above the score",now:"Safety flag makes an instant non-call task (prescriber alert) whatever the rank. The call waits for the daughter's 12-1 pm window.",before:"A 7-day-old alert near the bottom of the inbox.",ob:["Work burden"]},
          {n:2,t:"Reach is planned",now:"Reachable-now is only 40, so the call is scheduled rather than dialled now.",before:"Dialled at 10:10, no answer.",ob:["Outreach"]}],
   m360:[{n:1,t:"Combinations are the insight",now:"Retail fill + mail-order fill + cardiology list + ADT fall = 'possible double anticoagulation after a fall'. No single file shows it.",before:"Two pharmacy exports and the HIE, opened separately.",ob:["Messy data"]},
         {n:2,t:"Siloed calls pulled in",now:"Carmen's 3 member-services calls appear on the timeline.",before:"Invisible to the case manager.",ob:["Messy data"]},
         {n:3,t:"Stale self-report decays",now:"The Jan HRA ('no issues') shows its age in amber and a re-ask prompt.",before:"Read as current.",ob:["Untimely data"]}],
   prep:[{n:1,t:"Call prep built from the 360",now:"Carmen's mobile (relabelled from 'member home', 92% confidence), 12-1 pm (answered 3/3), Spanish, authorized rep, SMS backup at 18:00.",before:"Wrong slot, wrong language, rebooked to tomorrow.",ob:["Outreach"]}],
   call:[{n:1,t:"Attempts log themselves",now:"The softphone records each attempt; no 3-field form per dial.",before:"Each attempt typed by hand.",ob:["Documentation burden"]}],
   note:[{n:1,t:"Shorthand in, note out",now:"Maria types live; the AI structures the note with every fact cited. Facts she did not confirm stay grey.",before:"Four forms from memory.",ob:["Documentation burden"]},
         {n:2,t:"Tasks from the note",now:"Clinical tasks (cancel warfarin, tell PCP) need RN confirm; operational ones are auto-drafted.",before:"Tasks re-typed into the care plan.",ob:["Documentation burden","Work burden"]},
         {n:3,t:"Sign once",now:"Note, assessment and 6 tasks post together at 12:31, before the next call.",before:"Finished after hours.",ob:["Documentation burden"]}]
  },
  m360:{
   chips:[["D-SNP dual · Spanish","c-b"],["Safety: prescriber alerted 09:02","c-s"],["Daughter Carmen: authorized rep","c-f"],["Home health ended 20 Oct","c-a"]],
   changed:[["ED visit for a fall 2 Nov, sent home","ADT"],["Apixaban 2.5 mg BID filled at retail 14 Oct","PBM retail"],["Warfarin 3 mg still shipping by mail order (last 3 Sep)","PBM mail"],["Cardiology list shows warfarin; no INR on file","HIE"],["Daughter called member services 3x in Oct (home health, falls, exhaustion)","Member services"]],
   medsTitle:"Anticoagulants: 3 sources, 1 safety conflict",
   medCols:["Drug","Retail PBM","Mail order","HIE / cardiology","Status"],
   meds:[["Apixaban 2.5 mg BID","Filled 14 Oct","-","Not listed","r","Possible double"],["Warfarin 3 mg","-","Shipping, last 3 Sep","Listed, no INR","r","Possible double"],["Carbidopa/levodopa","Filled 20 Oct","-","Listed","g","Consistent"]],
   timeline:[["Jan 2026","HRA: no issues","HRA"],["3 Sep","Warfarin mail order","PBM"],["14 Oct","Apixaban retail","PBM"],["Oct","Carmen called 3x","Member svc"],["20 Oct","Home health ended","UM"],["2 Nov","Fall, ED, sent home","ADT"],["09:02 today","Prescriber alerted","CareLens"]],
   trust:[["ADT","f","7 d"],["Pharmacy (2)","f","3-26 d"],["Member services","f","log pulled in"],["HIE","a","no INR"],["HRA","s","10 mo"]],
   trustNote:"Phone owner inferred from call outcomes: Carmen's mobile (92%). Calls siloed outside the CM record now on the timeline.",
   nbas:[["Alert the prescriber: two anticoagulants after a fall","Apixaban retail 14 Oct + warfarin mail order (PBM) · fall 2 Nov (ADT).","Sent 09:02"],
         ["Call Carmen 12-1 pm in Spanish","Answered 3/3 in that slot; authorized rep on file.","Start call prep"],
         ["Restart home health; screen caregiver strain","Episode ended 20 Oct (UM); 3 calls in Oct (member services).","Create tasks"]],
   context:["Lives alone 8 am-6 pm while Carmen works","HRA Jan 2026 'no issues': 10 months old, re-ask","Parkinson's, AFib, CKD: fall risk high"]
  },
  out:{
   who:"Calling: Carmen D. (daughter, authorized rep)", lang:"Spanish · interpreter line ready", status:"Safety: prescriber alerted 09:02",
   prep:[["Number","(555) 010-2231 · Carmen's mobile (was labelled 'member home'; relabelled, confidence 92%)"],["Best time","12-1 pm (answered 3/3) or after 6 pm"],["Language","Spanish · Consent: authorized rep on file"],["Backup","SMS in Spanish at 18:00"],["Last spoke","5 Oct, Carmen, 9 min"]],
   talking:["How is your mother since the fall on 2 Nov? Any new falls, bruising, bleeding?","Which blood thinner does she take? Can you read me both bottles?","Home health ended 20 Oct: who helps her during the day?","You called us 3 times in October: how are you coping?"],
   attempts:[["Thu 5 Nov 10:10","Member line","No answer (wrong slot)","a"],["Mon 9 Nov 12:04","Carmen mobile","Connected 12:05","g"]],
   shorthand:"only takes eliquis. warfarin = old mail order, still arriving -> stop. no new falls, bruise L hip, no bleeding. carmen crying, \"can't keep doing this\". wants HH back. pharmacy = walgreens main st. mom uses walker inside only. call carmen thurs lunch.",
   draft:[["Contact","Telephonic with daughter / authorized rep Carmen D., Spanish, 12:05-12:19 [this call]"],["Meds","Confirms apixaban 2.5 mg BID only [caregiver, 9 Nov]. Warfarin is an obsolete mail-order refill still being shipped [PBM 3 Sep]. Prescriber alerted 09:02."],["Falls","No new falls since ED visit 2 Nov [ADT]; bruise left hip, no bleeding reported"],["Caregiver","Member alone 8 am-6 pm; caregiver reports strain (Zarit-4 = 11/16, high)"],["Plan","Cancel warfarin mail order; home-health re-evaluation; personal-care hours review; Spanish caregiver-support resources; follow-up Thu 12 Nov 12:00"]],
   assess:{pre:31,confirm:0,ask:9,items:[["Medications","a","updated on call"],["Falls (6 mo): 1","g","ADT 2 Nov"],["ADLs","g","HH discharge 20 Oct"],["Language: Spanish","g","eligibility"],["Caregiver strain","r","must ask"],["Home safety","r","must ask"]]},
   tasks:[["Cancel warfarin mail-order refill","RN confirm"],["Tell PCP + cardiology: apixaban only","RN confirm"],["Home-health re-eval referral","auto-drafted"],["Personal-care hours review (Medicaid)","auto-drafted"],["Spanish caregiver resources (SMS)","auto-drafted"],["Follow-up call Thu 12:00","scheduled"]],
   signed:"12:31 · note, assessment v3, care-plan goal #2 and 6 tasks written to the CM system. Doc time ~12 min vs ~40 min, done before the next call.",
   callResult:{ok:true,title:"12:05: reached Carmen on the first try, in Spanish",text:"Only apixaban is taken; the warfarin mail order is cancelled. Caregiver strain screened. Home health re-referred. The safety alert went out at 09:02, three hours before the call."}
  },
  outcome:{title:"CareLens: Rosa took 38 minutes, and the safety alert went out at 09:02",
   pts:["1 login, 3 screens","Double anticoagulation shown as one insight, alerted before any call","Right person, right time, right language on the first try","Note signed at 12:31, before the next call"]},
  stats:{logins:1,screens:3,retyped:1,late:0}
 },
 files:{
  earlier:[
   ["ADT_A04_A03_M-30552.hl7","CM inbox","7 d","Fall to ED, low in the inbox","MSH|...|ADT^A04|...|202611022030\nPID|1||M-30552||D^ROSA\nPV1|1|E|ED^^^COUNTYGEN\n---\nADT^A03 discharge 21:40, disposition home"],
   ["Maria_caseload_Nov.xlsx","Shared drive","3 d","Wrong phone label","Rosa D.,M-30552,(555)010-2231,member home,Call member"],
   ["claims_M-30552_recent.csv","Claims portal","52 d","Fall not billed yet","service_date,type,provider\n2026-09-18,Cardiology,Dr. Ruiz"],
   ["um_auths_M-30552.pdf","UM system","20 d","Home health ended, no follow-up task","HH-54021 · Home health episode · Ended 20 Oct"],
   ["pbm_retail_2026-11-08.txt","PBM portal","1 d","Apixaban at retail","FILL 2026-10-14 APIXABAN 2.5MG BID 30D WALGREENS-MAIN"],
   ["pbm_mailorder_2026-11.csv","Mail-order vendor","monthly","Warfarin still shipping","ship_date,drug,qty\n2026-09-03,WARFARIN 3MG,90\nnext_ship,2026-12-03,WARFARIN 3MG,90"],
   ["hie_medlist_M-30552.xml","HIE portal","2 mo","Cardiology still lists warfarin","<medication source=\"cardiology\">Warfarin 3 mg</medication>\n<!-- no INR results on file -->"],
   ["member_services_calls_Oct.csv","Member services","separate system","Caregiver calls, invisible to CM","date,caller,topic\n2026-10-06,daughter,home health ending\n2026-10-19,daughter,mother fell at home (no ED)\n2026-10-27,daughter,exhausted, needs help"]
  ],
  carelens:[
   ["member360_M-30552.json","CareLens","live","Safety conflict raised as a non-call task",`{
 "member": "Rosa D.", "id": "M-30552", "language": "es",
 "safety": [{"rule":"two anticoagulants after a fall","evidence":["PBM retail apixaban 2026-10-14","mail order warfarin 2026-09-03","HIE cardiology list warfarin","ADT fall 2026-11-02"],"action":"prescriber alert","sent":"2026-11-09T09:02"}],
 "contact": {"number":"(555)010-2231","owner":"Carmen D. (daughter)","owner_confidence":0.92,"best_window":"12:00-13:00","authorized_rep":true},
 "siloed_calls_pulled_in": 3,
 "stale": [{"field":"HRA","age_months":10,"prompt":"re-ask"}]
}`],
   ["writeback_note_M-30552.json","CareLens to CM system","on sign","Note, assessment v3, goal #2, 6 tasks","{ \"signed_by\":\"Maria R., RN\", \"signed_at\":\"2026-11-09T12:31\", \"targets\":[\"CM note\",\"assessment v3\",\"care plan goal #2\",\"attempt log\"], \"tasks\":6 }"]
  ]
 }
}
}
};
/* Feeds CareLens ingests once (13 MVP datasets, three layers, from the CareLens deck) */
window.CL.feeds=[
 ["01 Member context","Eligibility & enrollment","Plan 834 · daily"],["01 Member context","Contact & outreach history","CTI / SMS / mail · real time"],["01 Member context","Preferences & consent","CM / member services · real time"],["01 Member context","SDOH","HRA / claims / CBOs · periodic"],
 ["02 Clinical signals","ADT event alerts","Hospitals / HIE · minutes-hours"],["02 Clinical signals","UM / prior authorization","Plan UM · same day"],["02 Clinical signals","Pharmacy claims","PBM / NCPDP · 1-2 days"],["02 Clinical signals","Medical claims","Plan 837 · 30-90 days"],["02 Clinical signals","Clinical records","HIE / EHR · 3-30 days"],["02 Clinical signals","Lab results","Lab / HIE / LOINC · 3-30 days"],
 ["03 Action intelligence","Case management history","CM system · real time"],["03 Action intelligence","Care gaps & quality windows","Quality engine · weekly"],["03 Action intelligence","Risk & program eligibility","Plan models · monthly"]
];
