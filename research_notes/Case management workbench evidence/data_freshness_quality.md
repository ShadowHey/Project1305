# Freshness and Quality of US Healthcare Datasets Used by Health-Plan Case Managers

Research date: November 6, 2026. US only.

How to read these notes:
- **Cited Findings** were read on the linked page or PDF. Each lists figure, population, year and publisher.
- **Unverified** items appeared only in a search-result excerpt, in my prior knowledge, or on a page that refused access. Do not put them on a slide as fact without opening the source.
- Links labelled "Europe PMC" go to the Europe PMC REST API query I opened. They return the PubMed abstract as JSON. pubmed.ncbi.nlm.nih.gov and PMC blocked automated access, so these findings rest on abstracts, not full text. PMIDs are given so a human can check PubMed.
- Several PDFs were read through a local text extraction, because the fetch tool could not decode them. Table values were read from linearized text. Most HTML pages and abstracts were read through a fetch tool that summarizes the page. Spot-check any number against its source before it goes on a slide.

---

## Summary table for the data-inventory slide

| Dataset | Freshness (best evidence) | Expected quality problems (best evidence) | Evidence grade |
|---|---|---|---|
| Medical claims | Original Medicare: about 92% of inpatient and 89% of carrier claims received by end of the month after service; 95% final about 4 months after service (home health 5) | Payment changes more than diagnosis; plan-specific lag not published | Strong for FFS; none verified for MA or commercial |
| ADT / event notifications | Rule says "at the time of"; no measured latency found | Rule requires only 3 fields, none of them diagnosis or disposition; national send rate not found | Rule strong; adoption and latency weak |
| Discharge summaries | 12-34% available at first visit; 51-77% at 4 weeks (old review) | Pending tests missing in 65%; follow-up plans missing in 2-43% | Moderate, dated |
| HIE / CCD / TEFCA | Query-based; TEFCA over 2 billion records since Dec 2023 | 43% of hospitals routinely interoperable; in one study under half of patients had clinical-domain data | Moderate |
| Pharmacy fills | Part D: 99.4% of first records by the month after fill, but only 80.3% final | 14-22% of levothyroxine users lost claims capture over 4 years (from all causes) | Moderate; PBM feed latency not verified |
| Labs | No verified latency | LOINC mis-mapping 4.6% of results (7.5% hematology); admin-only HEDIS rates about 20 points below hybrid | Moderate, HEDIS evidence old |
| Member contact | Static until a member or state updates it | About half of phones/addresses confirmable in Wisconsin Medicaid; 38% of plans call state contact data accurate most of the time | Weak; no national wrong-number rate |
| SDOH | Screening staleness not measured | Z codes on 1.59% of FFS (2019), 1.07% of MA sample (2019), 1.66% of Medicaid (2022) | Strong for capture |
| Prior authorization | Decisions due in 72 hours / 7 days since 2026 | Drugs excluded from CMS rule; APIs not required until 2027 | Strong on rule |
| Provider directory | Slow to correct: 44.8% of bad listings still wrong 117-280 days later | 52.20% of MA locations had an inaccuracy (2016-17) | Strong, dated |
| Death data | 61% of deaths reported within 10 days (NCHS); DMF far weaker | DMF in-hospital death sensitivity fell from 88.9% to 14.8% after 2011 | Moderate |

---

## Claims: lag from service to adjudicated availability, run-out, IBNR, % complete

### Takeaway
The best citable source is a CMS Chronic Conditions Warehouse paper from April 2026. It measures how Original Medicare claims mature month by month. Roughly 9 in 10 claims arrive by the end of the month after service, and 95% are final about 4 months after service. I found no equivalent published curve for Medicare Advantage or commercial plans.

### Cited Findings
Source for this table and the bullets directly below it: [CCW, Original Medicare Claims and Part D Events Maturity, April 2026](https://resdac.org/sites/default/files/2026-04/ccw-original-medicare-claims-part-d-events-maturity.pdf). Population: all Original Medicare claims for July 2023 services, followed for 12 months of run-out. Month 1 is the service month itself.

| Claim type | Received M1 | Received M2 | Received M3 | Final M1 | Final M2 | Final M3 | Final M5 |
|---|---|---|---|---|---|---|---|
| Inpatient | 43.59% | 92.56% | 96.20% | 38.67% | 86.16% | 91.50% | 95.48% |
| SNF | 1.59% | 82.65% | 92.75% | 1.50% | 79.99% | 90.71% | 96.03% |
| Hospice | 4.89% | 89.67% | 95.16% | 4.56% | 86.30% | 93.30% | 97.19% |
| Home health | 26.06% | 77.20% | 88.28% | 24.81% | 74.62% | 86.18% | 94.46% |
| Hospital outpatient | 42.09% | 91.21% | 95.00% | 40.38% | 88.00% | 92.42% | 95.66% |
| Carrier (physician) | 45.63% | 89.40% | 94.05% | 45.20% | 88.73% | 93.50% | 96.97% |
| DME | 57.03% | 89.18% | 93.47% | 55.89% | 87.98% | 92.55% | 96.36% |

- All claim types except home health have 95% of claims in final form four months after the service date. Home health needs one more month. DME also has a month-0 column (about 8.8% processed before the service date), which is left out of this table.
- Providers have up to one year from the date of service to submit, and a claim can have several versions.
- First-version inpatient claims differ from the final version on primary diagnosis in 1.08% of claims first received in month 1 and 0.50% of those first received in month 2. Payment amount changes in 5.19% and 2.79%. Carrier claims are far more stable (0.01% diagnosis, 0.79% payment).
- The Tuva Project chapter gives a completion curve of 60%, 85%, 95%, 98%, 99% and 100% at ages 0-5 months, but states its numbers are illustrative and not benchmarks. It also warns that three or six months "may be a reporting convention" and is not proof of completeness — [Tuva Project](https://thetuvaproject.com/knowledge/data-sources/claims-data/incurred-paid-runout). Use it only to explain the concept.
- A trade report on MedPAC's March 2024 analysis says about 10% of MA encounter data was missing for measuring service use. The share of MA enrollees in both MDS and encounter data rose from 66% (2017) to 81% (2021). About 15% of MA SNF users appeared only in MDS and 4% only in encounters (2021) — [Skilled Nursing News, 2024](https://skillednursingnews.com/2024/03/more-scrutiny-on-medicare-advantage-data-collection-medpac-report-dives-into-encounter-data/). This is secondary. The [MedPAC June 2024 chapter](https://medpac.gov/wp-content/uploads/2024/06/Jun24_Ch3_MedPAC_Report_To_Congress_SEC.pdf) is encrypted, so I could not read it directly.

### Inferences
- The months are calendar bins, so exact 30/60/90-day percentages do not exist. "Received M2" covers services about 31-62 days old, depending on service date. A fair slide phrase is "about 40-45% by the end of the service month, about 90% a month later".
- Institutional clocks start at the claim through date. For a long inpatient stay, the claim says nothing until after discharge.
- These figures describe arrival at the Medicare contractor. A plan's data warehouse adds its own feed delay on top.

### Gaps
- No published 30/60/90 completion curve for MA or commercial plans was found. Plans should use their own lag triangles.
- No verified Medicaid (T-MSIS) lag figure was found.

### Unverified
- Recent months "5 percent to 30 percent complete" (SOA Health Section News, 2003): search excerpt only.
- IBNR of about 12-16% of annual claims, or 1.5-2 months (Monterey Peninsula College reserve report): search excerpt, single employer plan.
- Health Net days claims payable of 58.7 (FY2013) and 57.7 (FY2015): search excerpt only, and old.
- Aetna 27 days to pay (athenahealth ranking): search excerpt, undated.
- Three-year lag in release of MA encounter data to researchers (Brown CAHPR RFI): search excerpt.

---

## ADT / hospital event notifications

### Takeaway
I could not verify the national percentage of US hospitals sending ADT or event notifications. It was not on any ONC/ASTP page I opened. It may exist in the AHA IT Supplement, which is sold by AHA. What can be stated honestly is what the rule requires and how narrow its minimum content is, plus adjacent hospital exchange figures.

### Cited Findings
**The rule ([42 CFR 482.24(d), Cornell LII](https://www.law.cornell.edu/cfr/text/42/482.24)):**
- It applies only if the hospital's system conforms to the content exchange standard at 45 CFR 170.205(d)(2).
- Notifications must include "at least patient name, treating practitioner name, and sending institution name". Diagnosis and disposition are not in the minimum.
- Timing is "at the time of" ED registration or inpatient admission, and "either immediately prior to, or at the time of" discharge or transfer. No latency in minutes is stated.
- Recipients: the hospital must make a "reasonable effort" to reach applicable post-acute providers and suppliers, and the established primary care practitioner, group or entity, or another practitioner the patient identifies. Health plans are not named.
- Sending may be direct or through an intermediary, and is subject to law and the patient's privacy preferences.

**Dates and delivery:**
- A law-firm summary gives May 1, 2021 as the effective date and says a hospital whose system cannot send these is exempt — [Quarles](https://www.quarles.com/newsroom/publications/because-you-needed-another-regulatory-headache-right-now-electronic-notifications-of-admission-transfer-and-discharge-required-in-2021). A search excerpt from another source gives April 30, 2021, so check before citing a date.
- Hospitals are not required to deliver notifications to a physician's EHR inbox — [AMA, updated March 23, 2026](https://www.ama-assn.org/practice-management/sustainability/must-hospitals-send-adt-notifications-physicians-ehr-inbox).

**Adjacent national figures (non-federal acute care hospitals, 2023 AHA IT Supplement, N=2,547, 58% response) — [ONC Data Brief 71, May 2024](https://healthit.gov/data/data-briefs/interoperable-exchange-patient-health-information-among-us-hospitals-2023/):**
- 84% often send electronic health information; 73% often receive.
- [The brief's PDF](https://www.healthit.gov/wp-content/uploads/2024/05/Interoperable-Exchange-of-Patient-Health-Information-Among-U.S.-Hospitals-2023.pdf) reports that only 42% send summary-of-care records to most or all external hospitals and 38% to most or all external ambulatory providers.
- Sending to most or all long-term post-acute and behavioral health providers is about 16-17%. The brief is internally inconsistent: page 1 says 16% LTPAC and 17% BH, while page 7 says 17% LTPAC. These measure summary-of-care records, not ADT.

**What real networks see:**
- Aledade said in March 2020 that partner physicians received ADT notices for 50% of their patients' admissions. This is one network, written before the rule took effect, by an interested party — [AJMC](https://ajmc.com/view/medicare-steps-in-to-make-transitions-of-care-safer).
- About 5% of event notifications were followed by query-based HIE use within 30 days (Vest 2019, JAMIA Open, PMID 31984363). Among 96 surveyed organizations (27% response), recipients reported follow-up care for ED visits (66%) and hospital admissions (73%) (Wiley 2020, PMID 33623895) — [Europe PMC][epmc-notif].
- A non-VA acute care alert was received for 197 (34.9%) of enrolled veterans (Kartje 2021, PMID 33832998). Notified teams were 4 times more likely to make phone contact within 7 days (AOR 4.10) (Dixon 2021, PMID 34597411) — [Europe PMC][epmc-notif].

**Field completeness:**
- In four NYC EDs from July 15 to August 15, 2014, HL7 feeds compared with legacy feeds raised discharge disposition completeness from 53% to 78% and discharge diagnosis from 23% to 87% — [ISDS 2014 abstract](https://distantreader.org/stacks/journals/ojphi/ojphi-5847.pdf). This is syndromic surveillance, not plan alerts, and it is old. It is the only numeric field-completeness evidence I read.

### Inferences
- Slide wording I can support: "The federal minimum is name, practitioner and facility. Diagnosis and disposition are optional, so expect them to be missing or late."
- Plans are not named recipients, so plan coverage depends on HIE or vendor contracts and will vary by region.
- The national "percent sending" number should not be asserted until someone pulls it from the AHA IT Supplement or an ASTP brief.

### Gaps
- National % of hospitals sending ADT: not found.
- Measured real-time latency from event to plan receipt: not found.
- Current measured rates of missing diagnosis or disposition in plan-facing ADT feeds: not found.

### Unverified
- 54% of physicians routinely receiving discharge information (2012 NEHRS, PMID 23710773): search excerpt.
- Illinois Medicaid and Missouri ADT quality specifications that set disposition and diagnosis expectations: search excerpts, not opened.

---

## Discharge summaries at the first post-discharge visit

### Takeaway
Kripalani 2007 is still the reference number. Later US evidence is single-site, disease-specific or survey-based, and none of it shows the problem solved. I found no national post-2020 measure, so the slide should date this number visibly.

### Cited Findings
- Kripalani et al., JAMA 2007 (PMID 17327525), systematic review of 55 observational and 18 controlled studies. Availability at first post-discharge visit was 12%-34%, and 51%-77% at 4 weeks. Missing elements: diagnostic test results 33%-63%; treatment or hospital course 7%-22%; discharge medications 2%-40%; tests pending at discharge 65%; patient or family counseling 90%-92%; follow-up plans 2%-43% — [Europe PMC][epmc-core].
- Kattel et al., J Patient Saf 2020 (PMID 26741789), systematic review of 7 observational and 12 controlled studies. Summaries were completed within 48 hours in a median of 67% and available to PCPs within 48 hours only 55% of the time. It reports pending tests 25%, diagnostic tests 60% and post-discharge medications 78%. These appear to be inclusion rates, but the abstract is not explicit — [Europe PMC][epmc-core].
- Robelia et al., JABFM 2017 (PMID 29180550), national mail survey of 800 AAFP members, 59% response. 27.5% said a summary was available 0-40% of the time. 26.5% said it held all needed information 0-40% of the time. Only 25% reported complete content more than 80% of the time — [Europe PMC][epmc-dc].
- Al-Damluji et al., Circ Cardiovasc Qual Outcomes 2015 (PMID 25587091), 1,501 summaries from 46 hospitals, heart failure. Transmission to the follow-up physician was documented for 33.3%. Discharge weight appeared in 15.7%. No summary had all seven required elements — [Europe PMC][epmc-dc].
- Sakaguchi and Lenert, AMIA 2015 (PMID 26958250), 188 summaries at Intermountain. Only 14% of 358 pending results were mentioned, and medication reconciliation was complete in 3% — [Europe PMC][epmc-dc].
- Change is possible: a single VA hospital went from 43% to 100% availability by first post-discharge contact in 2012 (Gilliam 2017, PMID 28491308) — [Europe PMC][epmc-dc].

### Inferences
- Most Kripalani studies predate widespread EHR use, so 12-34% likely overstates today's gap. Treat it as historical. Kattel's 55% within 48 hours is closer, but its evidence base is also old.
- For a plan, availability is worse than for a PCP unless the plan has HIE or EHR access. I found no number for this.

### Gaps
- No post-2020 national measure of availability at the first visit.
- No figure for how often plans receive discharge summaries at all.

### Unverified
- Quality of care affected in about 25% of follow-up visits (Kripalani): search excerpts only (EurekAlert, News-Medical).
- Kattel literature window ending February 2014: search excerpt.

---

## HIE / CCD / FHIR: coverage, duplicates, missing fields, matching, TEFCA 2026

### Takeaway
Hospital connectivity is broad, but routine use is not. Only 43% of hospitals were routinely interoperable in 2023. TEFCA volume is growing quickly. In the one real-world comparison I found, documents had demographics while under half of patients had clinical-domain data, and networks disagreed. Match rates depend heavily on method and on data standardization.

### Cited Findings
**Coverage (2023 non-federal acute care hospitals) — [ONC Data Brief 71](https://healthit.gov/data/data-briefs/interoperable-exchange-patient-health-information-among-us-hospitals-2023/):**
- 70% engaged in all four domains (send, receive, find, integrate), unchanged from 2022. 43% did so routinely (28% in 2018), 27% sometimes, and 30% were not fully interoperable.
- Routine interoperability: 38% of small vs 53% of large hospitals; 22% of independent vs 53% of system-affiliated hospitals.
- Only 42% said clinicians often used outside information at the point of care. 18% did not find and 22% did not integrate.

**TEFCA in 2026:**
- More than 2 billion health records exchanged since December 2023; nearly 25,000 organizations live; nearly 110,000 unique connections; VA and Department of War joined — [HHS/ASTP, November 5, 2026](https://healthit.gov/?p=217794).
- 11 designated QHINs and Zus Health as a new candidate QHIN; 1.5 billion documents, 23,000 organizations and 100,000 connections as of the August 2026 call — [RCE Monthly Call, August 18, 2026](https://rce.sequoiaproject.org/wp-content/uploads/2026/07/8.18.26-RCE-Info-Call_final.pdf).
- About 10 million documents before 2025 and 464 million by end of 2025; 6 Exchange Purposes; over 71,000 participant and subparticipant sites — [ASTP history page, updated June 5, 2026](https://healthit.gov/resources/data-liquidity-affordability-and-access-the-history-growth-of-tefca/). The 71,000, 25,000 and 110,000 use different definitions and should not be compared.
- The RCE deck says the QHIN compliance review includes "Directory Currency", which shows directory quality is an open concern.

**Missing fields and duplicates — [Europe PMC][epmc-ccda]:**
- Dixon and Apathy 2024 (PMID 38269762): of 1,054 patients sampled, 778 (74%) had at least one C-CDA from two sources. Two-thirds of those had information in only one source. All documents had demographics, but under half of patients had data in clinical domains. Data across HIE networks were not concordant. Conference paper, so verify the site and setting.
- Just et al. 2016 (PMID 27134610): in 398,939 confirmed duplicate pairs, middle name mismatched in 58.30% and SSN in 53.54%. Misspellings explained 53.14% of first-name and 33.62% of last-name mismatches.

**Match rates — [Europe PMC][epmc-ccda]:**
- Grannis 2022 (PMID 35568993): referential matching sensitivity 0.9351 vs probabilistic 0.6366, with PPV about 0.9995 for both, on a gold standard of 30,000 manually reviewed records.
- Grannis 2019 (PMID 30848796): standardizing address and last name raised HIE sensitivity from 81.3% to 91.6%.

**FHIR:**
- Provider Access, Payer-to-Payer and Prior Authorization APIs are generally required from January 1, 2027, so plan FHIR data is not yet a mature source — [CMS-0057-F fact sheet](https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f).

### Inferences
- The most defensible phrasing is "Good at finding the patient's documents, weak at clinical completeness and agreement across sources."
- High precision with variable sensitivity means the likely failure is a missed record rather than a wrong-patient record, in those studies. A false match is still higher harm.

### Gaps
- No verified measure of FHIR field completeness in payer APIs.
- No TEFCA breakdown by exchange purpose, so I cannot say how much of the volume is usable by payers.
- ASTP Data Brief 81 (hospital APIs, February 2026) was found but not opened.

### Unverified
- Average duplicate rate of 8-12%, up to 15-16% in large systems (RAND-cited estimate in trade press): search excerpt.
- eHealth Initiative 2019 survey of duplicate rates: search excerpt, self-reported.
- TEFCA fees and which Exchange Purposes require a response: search excerpt from commentary.
- No 2024-data successor to Data Brief 71 surfaced in my searches, but the ASTP listing would not render, so I cannot rule one out.

---

## Pharmacy: fill latency, blind spots, post-discharge discrepancies, list conflicts

### Takeaway
Part D records arrive quickly but keep changing. Claims miss some fills, with the best US estimate coming from one levothyroxine study. Post-discharge medication problems are common, but the published rates measure different things and should not be merged into one number.

### Cited Findings
**Latency (Part D, January 2023 fills) — [CCW, April 2026](https://resdac.org/sites/default/files/2026-04/ccw-original-medicare-claims-part-d-events-maturity.pdf):**
- First record received: 77.07% in the fill month, 99.44% by month 2, 99.73% by month 3.
- Final version: 58.69% in the fill month, 80.34% by month 2, 83.70% by month 3, 93.02% by month 13, 100% by month 18.
- Plans or their pharmacy managers must send records to CMS at least monthly. The paper warns that the 2026 Medicare Drug Price Negotiation Program may affect these patterns.

**What fill data misses:**
- Tungol et al., J Manag Care Pharm 2012 (PMID 23206212), 13,427 commercial levothyroxine users, 2006-2010. Four-year claims capture persistency was 77.7% at membership-program pharmacies, 85.4% at non-membership discount pharmacies and 85.9% at other pharmacies. Membership programs had higher odds of losing capture (OR 1.61) — [Europe PMC][epmc-tungol]. Even the comparison group lost about 14%, so not all of the loss is discount programs.
- Samples: 4.9% of US children received a free sample in 2004 (10,295 children, MEPS; Cutrona 2008, PMID 18829796) — [Europe PMC][epmc-pippins]. This is pediatric and old. I found no adult figure I could verify.

**Discrepancies after discharge (do not merge, the definitions differ):**
| Study | Population | Figure | Measures |
|---|---|---|---|
| Coleman 2005, PMID 16157827 | 375 patients admitted with 1 of 9 selected conditions | 14.1% with 1+ discrepancy; rehospitalized at 30 days 14.3% vs 6.1% | Discrepancy after discharge |
| Forster 2003, PMID 12558354 | 400 discharged medical patients | 19% had an adverse event after discharge; 66% of those were adverse drug events | Adverse events, not discrepancies |
| Moore 2003, PMID 12911647 | 86 patients seen by PCP within 2 months | 49% had 1+ error of any type | All discontinuity errors |
| Pippins 2008, PMID 18563493 | 180 general medical inpatients | 257 discrepancies (12%) were unintentional with potential for harm, 1.4 per patient | Admission and discharge reconciliation |
| Kripalani 2012, PMID 22751755 | 851 ACS or heart failure inpatients | 50.8% had 1+ clinically important medication error | Clinically important errors, trial population |
| Hale 2015, PMID 26418109 | 70 home health patients | 94% had 1+ discrepancy; median 5 per patient; 46% omissions | Home health list |
| Mixon 2020, PMID 31895895 | 30 veterans in home health | 80% had 1+ discordant medication | Home health list |

Sources: [Coleman, Hale, Mixon][epmc-coleman]; [Forster, Moore][epmc-core]; [Pippins, Kripalani][epmc-pippins].

**Conflicts across lists:**
- Clinic list vs patient report: mean 6.6 discrepancies per patient among 327 patients, 54.1% being "patient not taking medication on list" (Milone 2014, PMID 24531920); 3.2 per patient across 557 forms (Andrus 2015, PMID 25883689) — [Europe PMC][epmc-medlist].
- ED history accuracy: 38% with usual process vs 70% with pharmacy technicians (183 admissions; Do 2021, PMID 33244582); 57.8% for nurses vs 94.1% for technicians (Arrison 2020, PMID 32001155) — [Europe PMC][epmc-medhx].
- Stopped drugs may still look active: before CancelRx, only 34% of clinic-to-pharmacy discontinuations succeeded, versus 93% after (Watterson 2021, PMID 33835183) — [Europe PMC][epmc-medlist].

### Inferences
- A fill record shows that a drug was dispensed and paid for. It does not show that the drug was taken, or that it is still prescribed. The CancelRx result is a concrete reason why.
- Slide wording: "Part D fill records arrive within about a month, but one in five is still changing at that point."

### Gaps
- No verified PBM-to-plan feed latency. I would expect near-real-time adjudication and daily or weekly feeds, but this is my expectation and not evidence.
- No current national share of cash, $4 generic or discount-card fills that bypass claims.
- No adult sample-use rate.

### Unverified
- Moore 2003 "42% medication continuity errors": the abstract I read does not state it, and full text was blocked. Do not cite 42% until checked.
- Only 4% of 2020 US prescriptions bought in cash, 97% of those generic (Schaeffer Center): search excerpt.
- 7.0% of prescriptions missing from claims (Martin and Shewale, 2002 data): search excerpt.
- Medication discrepancies in up to 70% of patients at admission or discharge (JAMA Intern Med review): search excerpt.
- Foust 2012, 71.2% of discharges with a reconciliation problem: search excerpt.
- Post-discharge ADEs of 12-17% (Leapfrog fact sheet): search excerpt.

---

## Labs: LOINC mapping and completeness at payers

### Takeaway
LOINC mapping errors are measurable and vary by test class. Payer lab completeness has much weaker evidence. The best independent number is old and indirect, and the headline figure is from a vendor.

### Cited Findings
- PCORnet analysis, JAMIA 2022 (doi:10.1093/jamia/ocac215): 179,537,986 mapped results for 3,029 quantitative tests in two DataMarts. 4.6% of results were mis-mapped (8.7% by unique test), and an algorithm cut this to about 0.1%. By class: chemistry 0.4%, hematology 7.5%, urinalysis about 18%, flow cytometry about 15%. It cites earlier estimates of about 20% and 40-41% — [PMC9846663](https://pmc.ncbi.nlm.nih.gov/articles/PMC9846663).
- Pawlson et al., AJMC 2007: 283 commercial plans, 15 HEDIS hybrid measures, 2004 and 2006. Administrative-only rates averaged 20.4 points (2004) and 20.6 points (2006) below combined rates. "Measures relying on laboratory claims or laboratory results had the largest discrepancies" — [AJMC](https://www.ajmc.com/view/oct07-2539p553-558).

### Inferences
- Claims show a lab was ordered or billed but usually do not carry the result. The Pawlson gap includes all hybrid measures, not only labs.
- Hematology and urinalysis values need more caution in trending than chemistry.

### Gaps
- No peer-reviewed, recent figure for the share of member lab results a payer receives.
- No verified lab feed latency.
- No national LOINC adoption rate among labs.

### Unverified
- Payer had access to only 61% of member lab results; 18-25% more results from member-based data (Quest Diagnostics): search excerpts. It is vendor marketing, and [the Quest page I opened](https://clinical.questdiagnostics.com/HEDIS-Reporting) does not show these numbers.
- LOINC coverage of 99% at two institutions and 79% at a reference lab, about 4.5% wrong (older multi-institution study): search excerpt.

---

## Member contact data

### Takeaway
There is no national wrong-number rate for health-plan members that I could verify. The evidence is indirect but points the same way: Medicaid contact data is unreliable. Wireless-only status is now the norm, including for older adults.

### Cited Findings
**Wireless share — [CDC/NCHS NHIS Early Release, released September 2026](https://www.cdc.gov/nchs/data/nhis/earlyrelease/wireless202609.pdf), July-December 2025:**
- Adults in wireless-only households: 80.0% (95% CI 78.79-81.20), n=9,865 unweighted. Children: 88.7%. Adults landline-only: 1.0%. Phoneless: 0.4%.
- Trend: 76.0% (Jul-Dec 2023), 78.7% (Jul-Dec 2024), 80.0% (Jul-Dec 2025).
- Personal status (Table 2): 79.2% of adults wireless-only; 63.4% of those 65 and over; 80.5% below poverty.
- Phoneless adults: 2.2% below poverty vs 0.6% at 200%+ of poverty; 2.5% non-metropolitan vs 0.8% metropolitan.
- Caveat: the 2025 federal closure reduced the sample and December cases were not fielded. Weights were adjusted.

**Contact accuracy:**
- Wisconsin fee-for-service Medicaid, 80,016 households, renewals June 2023-June 2024: a vendor could confirm only about half of phone numbers or addresses as likely correct — [J-PAL](https://www.povertyactionlab.org/evaluation/impact-outreach-and-assistance-navigators-medicaid-renewals-united-states). This is one state, and "could not confirm" is not the same as wrong.
- 38% of responding safety-net Medicaid plans said state-provided contact information is accurate "most of the time". 29 of 65 ACAP plans responded, covering over 13.2 million beneficiaries in 15 states, fielded Oct-Nov 2022 — [KFF, February 2023](https://www.kff.org/medicaid/understanding-the-role-of-medicaid-managed-care-plans-in-unwinding-pandemic-era-continuous-enrollment-perspectives-from-safety-net-plans/).

**Returned mail:**
- Colorado estimated about 15% of 12 million public assistance letters were returned, about 1.8 million pieces a year. Of more than 131,000 households with returned mail each year, about 1 in 4 could not be reached — [KFF Health News, November 4, 2019](https://kffhealthnews.org/insurance/tougher-returned-mail-policies-add-to-medicaid-enrollment-drop/). One state, all public assistance programs, pre-pandemic.

**Number churn:**
- The FCC says "Millions of phone numbers are reassigned each year", and that the prior holder can miss calls such as notifications from a doctor's office — [FCC news release, December 12, 2018](https://webharvest.gov/congress115th/20190111204759/https://docs.fcc.gov/public/attachments/DOC-355526A1.pdf).

### Inferences
- Slide wording I can support: "Expect a material share of Medicaid phones and addresses to be wrong. In the one state where it was tested, only about half could be confirmed."
- Do not extrapolate Medicaid figures to Medicare or commercial members. Plans should measure their own wrong-number rate from outreach logs.

### Gaps
- No national wrong or disconnected number rate for any plan population.
- No national Medicaid returned-mail rate.
- No figure for unable-to-reach rates in plan care management.

### Unverified
- CMS assumption that 15% of Medicaid beneficiaries generate returned mail each year, with a 2.1% enrollment effect (September 2022 NPRM, quoted in the April 2024 Federal Register final rule): search excerpt, and federalregister.gov blocked access. This would be a good slide number once a human confirms it, labelled as a CMS assumption, not a measurement.
- 35 million numbers disconnected per year (FCC): not found in anything I read.
- 45-day number aging, monthly database reporting, and 152 million numbers in the database: search excerpts.

---

## SDOH: Z codes, screening staleness, Gravity Project

### Takeaway
Z-code capture remains under 2% of members in the major programs. The newest national figure is Medicaid 2022 at 1.66%. No newer CMS Medicare FFS data highlight surfaced. Claims will therefore miss most social need, and I found no measurement of how fast screening data goes stale.

### Cited Findings
| Population | Year | Share with a Z code | Source |
|---|---|---|---|
| 33.1M continuously enrolled Medicare FFS | 2019 (1.31% in 2016) | 1.59% | [CMS Data Highlight 24, Sept 2021](https://www.cms.gov/files/document/z-codes-data-highlight.pdf) |
| MA sample, one national insurer (OptumLabs) | 2019 (0.94% in 2017) | 1.07% of enrollees; 0.076% of claims | [CMS Data Highlight 30, April 2022](https://www.cms.gov/files/document/data-highlight-april-2022.pdf) |
| Medicaid, 46 states | 2022 (1.15% in 2016) | 1.66% | Gutkind 2026, Am J Prev Med, PMID 42532448, [Europe PMC][epmc-gutkind] |
| Adults with hypertension (Medicaid / commercial / Medicare supplement) | 2020 | 3.02% / 0.46% / 0.42% | Lee 2023, PMID 37790640, [Europe PMC][epmc-z] |
| SEER-Medicare cancer patients, 210,093 | 2016-2019 | 2.1% | Herb 2026, PMID 41849418, [Europe PMC][epmc-z] |

- In 45 of the 46 Medicaid states, the share was below 5% in every year — [Europe PMC][epmc-gutkind].
- 49.6% of FFS Z codes were billed on Part B non-institutional claims, and dually eligible beneficiaries were overrepresented among the top 5 codes — [CMS Data Highlight 24](https://www.cms.gov/files/document/z-codes-data-highlight.pdf).
- Hospital-level use is wider than member-level use: 56.9% of hospitals had at least one Z code in at least one Medicare FFS patient per year, 2017-2021 (Chang 2024, PMID 38756404) — [Europe PMC][epmc-z].
- Capture may be rising in hospital settings: 1.1% of visits in 2016 to 11.3% in 2023 among adults with cancer in one regional HIE (Su 2026, PMID 42727029) — [Europe PMC][epmc-z].
- Policy has moved away from mandatory capture: the FY2026 IPPS final rule removed Screening for Social Drivers of Health and Screen Positive Rate from the Hospital IQR Program — [ACDIS, August 7, 2025](https://acdis.org/node/69730).
- Gravity Project is a national collaborative, begun in 2017, that develops consensus SDOH data standards — [Gravity Project](https://thegravityproject.net/). Its counters on the page look unpopulated, so I would not cite them.

### Inferences
- A low Z-code rate reflects low documentation, not low need. Removing the hospital measures reduces one incentive to screen, though this is my reading, not a finding.
- Housing, food and transport status can change within months, so any undated screening answer should be treated as possibly stale. This is reasoning and not a measured rate.

### Gaps
- No Medicare FFS Z-code figure after 2019 was found from CMS.
- No study measuring how quickly screening results go out of date. Sidebottom 2025 (PMID 41396605) had 15,139 repeat screens, but its abstract gives no persistence rates. The full text may help.
- USCDI's SDOH elements could not be confirmed, since the ASTP page refused access.

### Unverified
- "5% of covered patients in 2021": a search summary attributed this to the CMS April 2022 highlight. The highlight I read covers MA 2017 and 2019, and I did not confirm this figure. Do not use it.
- Z55-Z65 on 0.11% of FFS claims: search excerpt.
- CY2026 Physician Fee Schedule deletion of G0136: the [CMS fact sheet](https://www.cms.gov/newsroom/fact-sheets/calendar-year-cy-2026-medicare-physician-fee-schedule-final-rule-cms-1832-f) I opened does not mention it. Check the full rule.

---

## Other data types

### Takeaway
These sources are valuable but uneven. Regulation gives firm timing for prior authorization, MDS and OASIS. Provider directories have the strongest evidence of poor quality. Appointment and remote monitoring data have little published quality evidence, and national EMS data cannot be used at member level.

### Cited Findings
**Prior authorization**
- 2024 MA: 52.8 million determinations, 1.7 per enrollee; 7.7% fully or partly denied (4.1 million); 11.5% of denials appealed; 80.7% of appeals overturned at least in part — [KFF, January 28, 2026](https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/).
- Decisions are due in 72 hours (expedited) and 7 calendar days (standard), generally from January 1, 2026. Metrics are posted publicly by March 31, 2026. APIs generally follow January 1, 2027. Drugs are excluded — [CMS fact sheet](https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f).

**Provider directories**
- CMS review of 64 MAOs, Sept 2016-Aug 2017, 6,841 providers at 14,869 locations: 52.20% of locations had at least one inaccuracy (range 11.20% to 97.82% by MAO). 45.64% had inaccuracies most likely to prevent access — [CMS Round 2 report](https://www.cms.gov/medicare/health-plans/managedcaremarketing/downloads/provider_directory_review_industry_report_round_2_updated_1-31-18.pdf).
- 17.5% of listed PCPs in an average MA network were "general ghosts" unavailable to any Medicare beneficiary, plus 11.5% network-specific ghosts, 2019 (Xu and Polsky 2026, PMID 41644103) — [Europe PMC][epmc-ghost].
- Across five national insurers, 449,282 physicians: phone consistency 16.0-27.4%, address consistency 16.5-27.9%, specialty 64.2-68.0% (Butala 2024, PMID 39020337) — [Europe PMC][epmc-dir].
- Errors persist: 44.8% of 5,170 inaccurate Pennsylvania listings were still wrong 117-280 days later, 11.6% accurate, 19.0% removed (Haeder and Zhu 2024, PMID 38915809) — [Europe PMC][epmc-dir].
- ACA Pennsylvania simulated calls: inaccuracies affected 55.9% of evaluable calls, though only 48.8% of calls were evaluable (Haeder and Wapner 2026, PMID 42320687). California mammogram providers: 23-38% inaccurate (Burman and Haeder 2022, PMID 35659228) — [Europe PMC][epmc-dir].

**Appointment data**
- At one Philadelphia academic center, of 10,644 provider-booked post-hospital appointments, 49% were attended, 32% cancelled and 19% no-shows (presented 2016) — [SHM abstract](https://shmabstracts.org/abstract/attendance-rates-for-provider-booked-post-hospitalization-follow-up-appointments/). Scheduled does not mean kept.

**Remote monitoring**
- OIG report as described by trade press: about 43% of Medicare enrollees receiving RPM did not get all three components (28% lacked education or setup, 23% no recorded device, 12% no treatment management). Enrollees grew from about 55,000 (2019) to more than 570,000 (2022). Medicare often lacks the condition monitored, staff and ordering provider — [Healthcare Dive on OEI-02-23-00260](https://www.healthcaredive.com/news/remote-patient-monitoring-medicare-oversight-oig/728039/). The OIG site failed on a certificate error, so check the primary source.

**EMS**
- 2024 NEMSIS: 60,298,684 activations, 14,756 agencies, 54 states and territories, incidents from 99% of US counties. 180 of 640 v3.5 elements are national. The public dataset has no patient, agency or hospital identifiers — [NEMSIS 2024 report](https://nemsis.org/wp-content/uploads/2025/08/NEMSIS-End-of-Year-Report-2024.pdf). The headline counts come from an infographic page whose extracted text order was jumbled, so confirm them visually.

**Home health and SNF**
- MDS: comprehensive assessment within 14 days of admission and at least every 12 months; quarterly review; encode within 7 days and transmit within 14 days of completion — [42 CFR 483.20](https://www.law.cornell.edu/cfr/text/42/483.20).
- OASIS: transmit within 30 days of completing the assessment — [42 CFR 484.45](https://www.law.cornell.edu/cfr/text/42/484.45).
- Hospitals send summary-of-care records to most or all LTPAC providers at about 16-17%, and only 8% receive from them at that level — [ONC Data Brief 71](https://www.healthit.gov/wp-content/uploads/2024/05/Interoperable-Exchange-of-Patient-Health-Information-Among-U.S.-Hospitals-2023.pdf).

**Behavioral health and 42 CFR Part 2**
- The 2024 rule took effect April 16, 2024, with compliance by February 16, 2026. It permits a single consent for all future treatment, payment and operations; recipients may redisclose consistent with HIPAA except in proceedings against the patient; recipients need not segment records. Use in legal proceedings still needs consent or a court order — [Baker Donelson](https://www.bakerdonelson.com/hhs-compliance-deadline-approaching-for-updated-part-2-record-protections). The HHS fact sheet returned 403, so this is a law-firm summary.

**Death data**
- SSA Death Master File sensitivity for in-hospital death fell from 88.9% pre-2011 to 14.8% post-2011. Post-2011 one-year survival was 95.8% by DMF vs 86.1% by New York vital statistics. 97,069 patients, 2007-2016 (Levin 2019, HSR, PMID 30520023) — [Europe PMC][epmc-levin].
- NCHS: 61% of US deaths reported within 10 days. COVID-19 death data were about 65% complete at 2 weeks, 85% at 4 and 95% at 8 — [CDC technical notes, archived September 2023](https://www.cdc.gov/nchs/nvss/vsrr/covid19/tech_notes.htm). About 5% of death records initially have cause pending — [CDC VSRR](https://www.cdc.gov/nchs/nvss/vsrr/mortality.htm).

### Inferences
- MDS can legally reach CMS about 4 weeks after admission (14 days to complete, plus 14 to transmit), and OASIS up to 30 days after assessment. These are upper bounds to CMS, not to a plan. I did not verify how plans receive them.
- A missing SUD record is not evidence of no SUD. Part 2 consent is still required, and consent-based gaps will remain even after the 2026 compliance date.
- A plan should not use the DMF alone to close a case. Pair it with claims stop, enrollment and HIE signals.

### Gaps
- No verified evidence on how much appointment data plans hold. Most plans likely lack it, but this is my inference.
- No measured RPM data latency or accuracy for plan use.
- No verified hospital-outcome linkage rate for EMS, or plan-level EMS access figures.
- No verified obituary-based death capture figure.
- No figure on how much SUD data is withheld from payer feeds.

### Unverified
- Senate Finance secret shopper (May 2023): 33% of listed mental health providers inaccurate or no callback, and 18% appointments. The PDF and Becker's both returned 403, so these rest on search excerpts.
- HHS OIG OEI-05-24-00090: 33% of in-network Medicaid managed care providers had an inaccurate phone or address. The PDF failed on a certificate error.
- More than half of MA plans having directories with at least one-third inactive behavioral health providers (OIG, via Lown Institute): search excerpt.
- Heart failure patients with scheduled follow-up: 30% within 7 days and 44% within 14 days: search excerpt.
- RPM 16-day billing rule and CY2026 2-15 day codes: not confirmed in the CMS fact sheet.
- Wang 2026 (JMIR Med Inform), November 2011 change eliminated about 4.2 million records; WVU Medicine, 84-85% registry capture; New Jersey DMF sensitivity 62.6% to 10.8%: search excerpts. The last is in Levin but was not in the abstract text I confirmed.

[epmc-core]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:26741789%20OR%20EXT_ID:17327525%20OR%20EXT_ID:12911647%20OR%20EXT_ID:12558354&format=json&resultType=core
[epmc-coleman]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22medication%22%20AND%20TITLE:%22discrepancies%22%20AND%20(AUTH:%22Coleman%20EA%22%20OR%20AUTH:%22Kripalani%20S%22%20OR%20AUTH:%22Moore%20C%22))&format=json&resultType=core&pageSize=15
[epmc-pippins]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(AUTH:%22Tungol%22%20AND%20TITLE:%22levothyroxine%22)%20OR%20(TITLE:%22Effect%20of%20a%20pharmacist%20intervention%20on%20clinically%20important%20medication%20errors%20after%20hospital%20discharge%22)%20OR%20(TITLE:%22Classifying%20and%20predicting%20errors%20of%20inpatient%20medication%20reconciliation%22)%20OR%20(AUTH:%22Martin%20BC%22%20AND%20TITLE:%22claims%22%20AND%20TITLE:%22self%22)%20OR%20(TITLE:%22Foust%22%20)%20OR%20(TITLE:%22prevalence%20of%20medication%20samples%22%20)%20OR%20(TITLE:%22free%20drug%20samples%22)&format=json&resultType=core&pageSize=15
[epmc-notif]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22event%20notification%22%20OR%20TITLE:%22event%20notifications%22%20OR%20TITLE:%22encounter%20notification%22%20OR%20TITLE:%22encounter%20notifications%22%20OR%20TITLE:%22ADT%20alerts%22%20OR%20TITLE:%22ADT%20notifications%22%20OR%20TITLE:%22admission,%20discharge,%20transfer%22&format=json&resultType=core&pageSize=25
[epmc-ccda]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22C-CDA%22%20OR%20TITLE:%22Consolidated%20Clinical%20Document%22%20OR%20TITLE:%22continuity%20of%20care%20document%22%20OR%20(TITLE:%22patient%20matching%22%20AND%20ABSTRACT:%22health%20information%20exchange%22)%20OR%20(TITLE:%22FHIR%22%20AND%20TITLE:%22data%20quality%22))%20AND%20SRC:MED&format=json&resultType=core&pageSize=20
[epmc-tungol]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(AUTH:%22Tungol%22)%20OR%20(TITLE:%22social%20needs%22%20AND%20(ABSTRACT:%22changed%22%20OR%20ABSTRACT:%22resolved%22%20OR%20ABSTRACT:%22persist%22%20OR%20ABSTRACT:%22over%20time%22)%20AND%20(ABSTRACT:%22rescreen%22%20OR%20ABSTRACT:%22re-screen%22%20OR%20ABSTRACT:%22longitudinal%22%20OR%20ABSTRACT:%22follow-up%20screening%22)%20AND%20ABSTRACT:%22screening%22%20AND%20FIRST_PDATE:[2019-01-01%20TO%202026-12-31])&format=json&resultType=core&pageSize=15
[epmc-medlist]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22medication%22%20AND%20(TITLE:%22discrepancies%22%20OR%20TITLE:%22discrepancy%22%20OR%20TITLE:%22accuracy%22%20OR%20TITLE:%22reconciliation%22)%20AND%20(ABSTRACT:%22electronic%20health%20record%22%20OR%20ABSTRACT:%22pharmacy%22)%20AND%20ABSTRACT:%22outpatient%22%20AND%20FIRST_PDATE:[2012-01-01%20TO%202026-12-31]%20AND%20ABSTRACT:%22list%22)&format=json&resultType=core&pageSize=15
[epmc-medhx]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22medication%20list%22%20OR%20TITLE:%22medication%20lists%22%20OR%20TITLE:%22medication%20history%22%20OR%20TITLE:%22medication%20histories%22)%20AND%20(ABSTRACT:%22accuracy%22%20OR%20ABSTRACT:%22discrepanc%22%20OR%20ABSTRACT:%22agreement%22)%20AND%20(ABSTRACT:%22pharmacy%22%20OR%20ABSTRACT:%22fill%22)%20AND%20SRC:MED%20AND%20FIRST_PDATE:[2008-01-01%20TO%202026-12-31]&format=json&resultType=core&pageSize=15
[epmc-dc]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22discharge%20summary%22%20OR%20TITLE:%22discharge%20summaries%22)%20AND%20(ABSTRACT:%22timely%22%20OR%20ABSTRACT:%22timeliness%22%20OR%20ABSTRACT:%22availability%22%20OR%20ABSTRACT:%22available%22)%20AND%20(ABSTRACT:%22primary%20care%22%20OR%20ABSTRACT:%22follow-up%22)%20AND%20SRC:MED%20AND%20FIRST_PDATE:[2015-01-01%20TO%202026-12-31]&format=json&resultType=core&pageSize=15
[epmc-gutkind]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:42532448%20OR%20EXT_ID:24064443&format=json&resultType=core
[epmc-z]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22social%20determinants%22%20OR%20TITLE:%22Z%20codes%22%20OR%20TITLE:%22Z-codes%22%20OR%20TITLE:%22social%20needs%22)%20AND%20(ABSTRACT:%22Z%20code%22%20OR%20ABSTRACT:%22Z-code%22%20OR%20ABSTRACT:%22Z%20codes%22)%20AND%20(ABSTRACT:%22Medicare%22%20OR%20ABSTRACT:%22Medicaid%22%20OR%20ABSTRACT:%22national%22)%20AND%20FIRST_PDATE:[2023-01-01%20TO%202026-12-31]&format=json&resultType=core&pageSize=12
[epmc-ghost]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:41644103%20OR%20EXT_ID:38269762%20OR%20EXT_ID:41396605&format=json&resultType=core
[epmc-dir]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22provider%20directories%22%20OR%20TITLE:%22provider%20directory%22%20OR%20TITLE:%22physician%20directory%22%20OR%20TITLE:%22ghost%20network%22)%20AND%20SRC:MED%20AND%20FIRST_PDATE:[2017-01-01%20TO%202026-12-31]&format=json&resultType=core&pageSize=15
[epmc-levin]: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22Alive%20or%20dead%22%20AND%20TITLE:%22Death%20Master%20File%22)%20OR%20(TITLE:%22obituar%22%20AND%20ABSTRACT:%22death%22%20AND%20ABSTRACT:%22sensitivity%22)%20OR%20(TITLE:%22levothyroxine%22%20AND%20TITLE:%22claims%22)%20OR%20(AUTH:%22Pawlson%22%20AND%20TITLE:%22HEDIS%22)%20OR%20(TITLE:%22discount%20generic%22%20AND%20ABSTRACT:%22claims%22)%20OR%20(AUTH:%22Zhi%22%20AND%20TITLE:%22provider%20director%22)%20OR%20(TITLE:%22provider%20directory%22%20AND%20ABSTRACT:%22inaccura%22)&format=json&resultType=core&pageSize=15
