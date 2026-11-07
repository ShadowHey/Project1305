# Quality measures, regulations and outcomes evidence for US health-plan case management, plus member outreach performance

Research date: 6 November 2026. US only.

**Verification rule used in these notes.** A number appears under "Cited Findings" only if I opened the linked page or document and read it there. Numbers seen only in search-result excerpts, or on pages that refused my fetch, are under "Gaps", labelled **Unverified**, with the URL to check. Do not put Unverified items in the deck without opening them first.

**Access limits that shaped the notes.**
- hcup-us.ahrq.gov refused connections, and the browser pane also failed to load it.
- NCBI Bookshelf and some PMC pages returned a browser check. PubMed returned a cookie wall, so I read abstracts through the Europe PMC API. Those links are long, but they are what I actually opened.
- NCQA national averages sit behind a lead-capture form (name, email, company), which I did not submit.
- The CMS 2027 Technical Notes PDF (3.1 MB) was retrieved, but I had no tool to extract its text. Cut points are therefore not reported.
- The CCTP final evaluation PDF exceeded the fetch size limit.
- I did not download the CMS Star Ratings data-table ZIP. Downloading it needs your go-ahead, and it could fill the contract-level TRC and adherence gaps.

---

## Citable baselines for product success metrics (summary)

### Takeaway
Verified data is strong on Star weights, bonus dollars, measure average stars and regulatory clocks. It is thin on outreach connect rates. I found no peer-reviewed national benchmark for health-plan connect or engagement rates, so any such target should be presented as an internal baseline to be measured, not an industry norm.

### Cited Findings

| Metric | Best verified baseline | Population, year | Publisher | Strength |
|---|---|---|---|---|
| Outreach connect rate | 22.52% baseline, rising to 65.78% after 3 months with branded caller ID and call authentication | MA members, HEDIS outreach, one national insurer; dates not given | [Carenet case study](https://carenethealthcare.com/?p=49991) | Vendor marketing, uncontrolled |
| Connect rate, post-discharge calls | 61.5% full script (486/790); 29.0% voicemail only (229/790); 9.5% missed (75/790) | Adults with a PCP discharged from medicine service, one academic system; published 2014 | [Tang et al., J Gen Intern Med, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22post-discharge%22%20OR%20TITLE:postdischarge)%20AND%20(TITLE:telephone%20OR%20TITLE:phone%20OR%20TITLE:calls)%20AND%20(readmission*)%20AND%20PUB_YEAR:[2011%20TO%202026]&resultType=core&format=json&pageSize=12&sort=CITED%20desc) | Peer reviewed, provider setting not plan |
| Enrollment in telephonic transition program | 62% enrolled (396/638) | Medicare FFS, one rural Maryland hospital, Feb 2013 to May 2015 | [Kranker et al., AJMC 2018](https://ajmc.s3.amazonaws.com/_media/_pdf/AJMC_05_2018_Kranker%20final.pdf) | Peer reviewed, single site |
| Attempts needed, hard-to-reach Medicaid | "often required 10–20 calls to reach a member" | Colorado Medicaid blind/disabled beneficiaries; published 2013 | [Health Services Research RCT](https://pmc.ncbi.nlm.nih.gov/articles/PMC3796111) | Peer reviewed, descriptive remark |
| Follow-up within 14 days | 73.5% (treatment) vs 67.8% (comparison), unadjusted; adjusted difference not significant | Medicare FFS, same study | [Kranker et al.](https://ajmc.s3.amazonaws.com/_media/_pdf/AJMC_05_2018_Kranker%20final.pdf) | Peer reviewed, single site |
| Medicare 30-day readmission | 15.7% MA vs 15.4% FFS unadjusted; 15.5% vs 15.3% risk-standardized | 11,029,470 admissions, 4,077,633 (37.0%) MA, July 2018 to June 2019 | [JAMA Netw Open 2024, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:10029122%20OR%20EXT_ID:22047559%20OR%20EXT_ID:38829614%20OR%20EXT_ID:19211470%20OR%20EXT_ID:19188628&resultType=core&format=json) | Strong, but data are old |
| TRC, FMC, PCR, adherence | MA-PD average stars for 2027: TRC 3.4; FMC 2.5; PCR 3.4; adherence diabetes 2.7, RAS 3.4, statins 3.3 | MA-PD contracts, 2027 Star Ratings | [CMS fact sheet, Oct 2026](https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-part-d-star-ratings) | Primary; stars, not percentage rates |
| TCM uptake | 7.0% of eligible discharges in 2015 (5.2% pooled 2013 to 2015) | Medicare FFS, 18,756,707 discharges | [Bindman & Cox, JAMA Intern Med 2018](https://pmc.ncbi.nlm.nih.gov/articles/PMC6583218) | Strong, but old |

### Inferences
- Use "measure your own baseline in the first 90 days" for connect and engagement rates, with the figures above as context only.
- Average stars show relative pain. FMC (2.5) and diabetes adherence (2.7) are the weakest of the workbench-relevant measures for 2027.

### Gaps
- National percentage rates for TRC, FMC, PCR and PDC could not be verified. See the relevant sections.

---

## HEDIS TRC, FMC, PCR, MRP, FUH/FUM: definitions and national rates

### Takeaway
All definitions are verified from NCQA. National percentage rates are gated by NCQA and are **not** verified. The biggest news is that MRP left the Stars set as a standalone measure in 2027, while it survives as one of the four TRC indicators.

### Cited Findings
- **TRC definition:** percentage of discharges for persons 18 and older with each of four indicators. These are Notification of Inpatient Admission (day of admission through 2 days after, 3 total days); Receipt of Discharge Information (day of discharge through 2 days after, 3 total days); Patient Engagement After Inpatient Discharge (within 30 days, including office visits, home visits, telehealth); and Medication Reconciliation Post-Discharge (discharge date through 30 days after, 31 total days). — [NCQA TRC page](https://www.ncqa.org/report-cards/health-plans/state-of-health-care-quality-report/measures-list/transitions-of-care-trc/)
- **FMC definition:** percentage of ED visits by persons 18 and older with multiple high-risk chronic conditions followed by a follow-up service within 7 days. — [NCQA FMC page](https://www.ncqa.org/report-cards/health-plans/state-of-health-care-quality-report/follow-up-after-emergency-department-visit-for-people-with-high-risk-multiple-chronic-conditions-fmc/)
- **PCR definition:** for members 18 and older, risk-adjusted ratio of observed-to-expected unplanned acute readmissions (inpatient and observation stays) for any diagnosis within 30 days of an acute hospitalization. It also reports a separate rate for Medicare beneficiaries needing skilled nursing care after a stay. The page says results for this measure are currently unavailable and directs readers to Quality Compass. — [NCQA PCR page](https://www.ncqa.org/report-cards/health-plans/state-of-health-care-quality-report/measures-list/plan-all-cause-readmissions-pcr/)
- **FUH definition:** discharges of persons 6 and older hospitalized for a principal diagnosis of mental illness or any diagnosis of intentional self-harm, with mental health follow-up within 7 and within 30 days. — [NCQA FUH page](https://www.ncqa.org/report-cards/health-plans/state-of-health-care-quality-report/measures-list/follow-up-after-hospitalization-for-mental-illness-fuh/)
- **MRP in Stars:** Medication Reconciliation Post-Discharge is removed beginning with the 2027 Star Ratings. — [CMS 2027 Star Ratings Measures and Weights](https://www.cms.gov/files/document/2027-star-ratings-measures.pdf)
- **Average star movement, MA-PD, 2026 to 2027:** TRC 3.1 to 3.4; FMC 2.8 to 2.5; PCR 2.9 to 3.4; Care Coordination 3.5 to 3.5; SNP Care Management 3.5 to 3.4. — [CMS fact sheet](https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-part-d-star-ratings)

### Inferences
- The workbench should still track MRP as a task and clock, because it feeds TRC even though it no longer scores separately.
- Two TRC indicators run on a 3-day clock and depend on data flow (ADT and discharge information), not on nurse effort alone. This is where event feeds matter most.

### Gaps
- **National TRC, FMC, PCR, FUH and FUM rates for MA:** NCQA pages hide historical averages behind a form or point to Quality Compass. I found no public source that I could open. Route to close: submit the NCQA form yourself, license Quality Compass, or approve the CMS data-table ZIP download for contract-level rates.
- **Unverified:** FUM NCQA national average for calendar 2022 of 41.5 (7-day) and 55.2 (30-day), seen only in a search excerpt of a [Trillium tip sheet](https://www.trilliumhealthresources.org/sites/default/files/docs/HEDIS/Trillium-FUM-Tip-Sheet-2024.pdf), which returned 403.
- **Unverified:** FUH 7-day 2022 values (Commercial HMO 48.4%, Medicaid HMO 36.6%, Medicare HMO 29.2%, Medicare PPO 27%) seen only in an excerpt of a [Magellan document](https://www.magellanprovider.com/media/115121/hedis_fuh.pdf). It is unclear whether they are national.
- **FUM definition** was not read on an NCQA page.

---

## Star Ratings: measures, weights, 2026/2027 changes and bonus money

### Takeaway
The 2027 ratings (published 8 Oct 2026) hold up to 43 measures for MA-PDs. PCR and the three adherence measures carry weight 3; TRC and FMC carry weight 1. KFF puts 2026 bonus spending at no less than $13.4B. Measure removals through 2029 are projected to cut MA-PD payments about 1.2%.

### Cited Findings
- **Measure counts, 2027:** MA-PD up to 43; MA-only up to 32; PDP up to 13. — [CMS fact sheet](https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-part-d-star-ratings)
- **Part C weights, 2027:** Plan All-Cause Readmissions 3 (outcome); Controlling Blood Pressure 3; Diabetes Blood Sugar Controlled 3; Improving or Maintaining Physical Health 3; Improving or Maintaining Mental Health 3; Transitions of Care 1; FMC 1; SNP Care Management 1; Care Coordination 2; Health Plan Quality Improvement 5; Call Center Interpreter and TTY Availability 2. — [CMS measures PDF](https://www.cms.gov/files/document/2027-star-ratings-measures.pdf)
- **Part D weights, 2027:** three Medication Adherence measures 3 each; SUPD 1; COB 1; Poly-ACH 1; Drug Plan Quality Improvement 5. — [CMS measures PDF](https://www.cms.gov/files/document/2027-star-ratings-measures.pdf)
- **Added in 2027:** Care for Older Adults Functional Status Assessment, COB, and Poly-ACH, each weight 1. **Removed in 2027:** COA Pain Assessment, MRP, and MTM CMR Completion Rate, which returns as a new measure in 2029 Stars (measurement year 2027). — [CMS measures PDF](https://www.cms.gov/files/document/2027-star-ratings-measures.pdf)
- **Results, 2027:** MA-PD enrollment-weighted average 3.99, against 4.01 in 2026, 3.95 in 2025 and 4.07 in 2024. 188 of 508 rated MA-PD contracts (about 37%) earned 4+ stars, covering about 71% of enrollees. 15 contracts hold the high-performing icon and 4 the low-performing icon. The 2027 ratings affect 2028 quality bonus payments. — [CMS fact sheet](https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-part-d-star-ratings)
- **CY2027 final rule (April 2026):** CMS is not implementing the Excellent Health Outcomes for All reward and keeps the historical reward factor. It removes 11 measures and adds Depression Screening and Follow-Up starting with measurement year 2027 and 2029 Stars. — [CMS CY2027 final rule fact sheet](https://www.cms.gov/newsroom/fact-sheets/contract-year-2027-medicare-advantage-part-d-final-rule)
- **Which measures go, and when (actuarial summary, April 2026):**
  - 2028 Stars: Call Center Interpreter/TTY (Parts C and D) and Statin Therapy for Patients with CVD.
  - 2029 Stars: both appeals measures, SNP Care Management, Complaints, MPF Accuracy, Members Choosing to Leave, Customer Service, and Rating of Health Care Quality. — [Wakely white paper](https://www.wakely.com/wp-content/uploads/2026/04/Wakely-Summary-2027-Final-Rule-Stars-Changes_Updated_2026-04-20.pdf)
- **Modeled market effect:** enrollment-weighted average falls from 4.02 (2026 Stars) to 3.94, 3.92, then 3.78 (2029 Stars). That is -$17.31 PMPM, or -1.2% of MA-PD payments, by payment year 2030. Estimated revenue effect ranges from -0.1% (CVS) to -1.9% (Humana) among the ten largest. These are modeled estimates using 2026 Stars data. — [Wakely white paper](https://www.wakely.com/wp-content/uploads/2026/04/Wakely-Summary-2027-Final-Rule-Stars-Changes_Updated_2026-04-20.pdf)
- **Possible structural change:** the proposed rule's RFI raised the possibility of partly or fully separating Stars from bonus payments. CMS has implemented no such change so far. — [Wakely white paper](https://www.wakely.com/wp-content/uploads/2026/04/Wakely-Summary-2027-Final-Rule-Stars-Changes_Updated_2026-04-20.pdf)
- **Bonus money:**
  - Spending: at least $13.4B in 2026, which is 2.3% of projected $574B MA payments. That compares with $12.7B in 2025 and $3.0B in 2015.
  - Enrollees in bonus-status plans: 68% in 2026 (nearly 24M), down from 75% in 2025 (26M).
  - Contracts at 4+ stars used in the analysis: 209 in 2026, down from 261.
  - Per-enrollee bonus, 2026: employer/union $466; individual $381; SNP $318.
  - By insurer: UnitedHealth $3.9B (29% of spend); Humana $1.5B (11%).
  - KFF estimates the recalculated 2026 ratings add about $600M to 2027 payments, and CMS has appealed that recalculation.
  - The dollar figures are lower bounds because they assume an average risk score of 1. MedPAC's separate estimate is about $16B for 2026. — [KFF, updated 12 Aug 2026](https://www.kff.org/medicare/medicare-advantage-quality-bonus-payments/)
- **Mechanics:** 4 stars or higher earns a 5% benchmark bonus. Rebate share is 70% at 4.5+, 65% at 3.5 to 4.0, and 50% at 3.0 or lower. — [Wakely Table A1](https://www.wakely.com/wp-content/uploads/2026/04/Wakely-Summary-2027-Final-Rule-Stars-Changes_Updated_2026-04-20.pdf); [KFF](https://www.kff.org/medicare/medicare-advantage-quality-bonus-payments/)

### Inferences
- **My arithmetic, not a CMS figure.** Summing the published weights gives Part C 57 and Part D 28. If the two duplicated measures are Call Center and Members Choosing to Leave (my assumption, based on 32 + 13 = 45 versus 43 unique), MA-PD total weight is about 81. On that basis, TRC + FMC + PCR + three adherence measures = 14 of 81, or about 17%. Applicability varies by contract, so treat this as approximate.
- 4.0 stars is the revenue cliff: the 5% bonus switches on at 4.0 (Wakely Table A1). Small measure gains matter most to contracts near a rounding threshold.
- CMS's actual 2027 average (3.99) came in above Wakely's modeled 3.94. Forecasts in this area have real error.
- Removing the SNP Care Management measure in 2029 does not remove the underlying SNP assessment regulation (see Regulation).

### Gaps
- **Measure-level cut points for 2027:** not extracted (see access limits). The [2027 Technical Notes](https://www.cms.gov/files/document/2027-star-ratings-technical-notes.pdf) hold them.
- **Unverified:** CAHPS weight falling from 4 to 2 and the reported "about 42% of MA plans at 4+" figure, both seen only in search excerpts. The CMS fact sheet page I read gives 37% of MA-PD contracts. The 2027 weight of 2 for those measures is verified; the prior weight of 4 is not.
- **Conflict note:** KFF's "209 contracts" for 2026 and CMS's "188 of 508" for 2027 are different rating years and should not be compared as a single trend without care.

---

## Medication adherence: PDC ≥80% Star measures, national rates and weights

### Takeaway
Three adherence measures carry weight 3 each in 2027, 9 of about 81 total weight by my arithmetic. Wakely reports the weight drops to 1 in 2028 Stars and returns to 3 in 2029. National PDC percentages are not verified.

### Cited Findings
- **Weights, 2027:** Diabetes, Hypertension (RAS antagonists), Cholesterol (Statins): intermediate outcome, weight 3 each. — [CMS measures PDF](https://www.cms.gov/files/document/2027-star-ratings-measures.pdf)
- **Average stars, MA-PD, 2026 to 2027:** Diabetes 3.1 to 2.7; RAS 3.3 to 3.4; Statins 3.2 to 3.3. — [CMS fact sheet](https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-part-d-star-ratings)
- **Weight schedule:** each measure decreases from 3 to 1 in 2028 Stars, then increases back to 3 in 2029 Stars. — [Wakely white paper](https://www.wakely.com/wp-content/uploads/2026/04/Wakely-Summary-2027-Final-Rule-Stars-Changes_Updated_2026-04-20.pdf)
- **Definition:** members with PDC of 80% or more count as adherent; results are reported as a share of members with two or more fills on unique dates in the year. A secondary vendor source, dated 10 Dec 2024. — [Arine blog](https://blog.arine.io/achieving-4-plus-stars-part-d-measures)
- **Tight bands:** a 3% difference separated 3-star from 5-star on 2025 RAS adherence, and 2-star from 4-star on 2025 diabetes adherence (vendor source, not checked against CMS). — [Arine blog](https://blog.arine.io/achieving-4-plus-stars-part-d-measures)

### Inferences
- The one-year weight dip in 2028 Stars matters for ROI claims. A product business case should not assume steady 3x value across all years.
- PDC is a member-level running calculation, so a workbench can flag members before they fall below 80% for the year, rather than reporting after the fact.

### Gaps
- **National PDC rates (% adherent by class):** I found no source I could open. Contract-level values are in the CMS data tables.
- **Unverified:** the reason for the 2028 weight dip. A search excerpt from [Anew Health](https://anewhealthrx.com/insights/navigating-the-future-pharmacys-impact-on-cms-star-ratings) attributes it to replacement with risk-adjusted versions. The Anew page I did open did not state this, and the [PQA Rate Announcement summary](https://www.pqa.org/assets/docs/PQA-Summary-CMS-Rate-Announcement-CY2027.pdf) returned empty.
- **Primary source for PDC definition:** not read, as the Technical Notes text could not be extracted.

---

## TCM CPT 99495/99496 rules and evidence of follow-up impact; 30-day readmissions and cost

### Takeaway
TCM rules are clear and map directly to workbench clocks. Observational evidence links TCM to lower 31-to-60-day mortality and cost, with only a 0.2-point readmission difference, and uptake was low. **Verified cost per readmission and HCUP rates are the largest unmet items in this research.**

### Cited Findings
- **99495:** moderate MDM, interactive contact within 2 business days, face-to-face within 14 days. **99496:** high MDM, interactive contact within 2 business days, face-to-face within 7 days. — [AAFP TCM FAQ](https://www.aafp.org/family-physician/practice-and-career/getting-paid/coding/transitional-care-management/faq.html)
- **Clock details:** business days are Monday to Friday excluding holidays. Medication reconciliation must be completed no later than the face-to-face visit. Clinical staff under direction may make the contact. The service is billed on day 30. Only one practitioner may bill per 30-day period. — [AAFP TCM FAQ](https://www.aafp.org/family-physician/practice-and-career/getting-paid/coding/transitional-care-management/faq.html)
- **Two-attempt rule:** the service may be reported if two or more separate, timely attempts are documented but unsuccessful and other criteria are met, although Medicare expects attempts to continue until successful. — [AAFP TCM FAQ](https://www.aafp.org/family-physician/practice-and-career/getting-paid/coding/transitional-care-management/faq.html)
- **TCM outcomes (observational):** Medicare FFS, 2013 to 2015, 18,756,707 eligible discharges, 975,169 (5.2%) with TCM billing (3.1%, 5.5%, 7.0% by year). Adjusted, days 31 to 60 after discharge, TCM vs none: mortality 1.0% vs 1.6%; cost $3,033 vs $3,358; readmissions 9.4% vs 9.6%. All P<.001. — [Bindman & Cox, JAMA Intern Med 2018](https://pmc.ncbi.nlm.nih.gov/articles/PMC6583218)
- **Medicare 30-day readmission:** 15.7% MA vs 15.4% FFS unadjusted; 15.5% vs 15.3% risk-standardized; 11,029,470 admissions; July 2018 to June 2019. — [JAMA Netw Open 2024, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:10029122%20OR%20EXT_ID:22047559%20OR%20EXT_ID:38829614%20OR%20EXT_ID:19211470%20OR%20EXT_ID:19188628&resultType=core&format=json)
- **Increased follow-up did not clearly cut readmissions in one telephonic program:** 14-day follow-up 73.5%, adjusted +5.9 points (90% CI -1.6 to 13.4); 30-day readmission 11.6%, adjusted +1.9 points (90% CI -3.6 to 7.3). Both not significant, with modest power. — [Kranker et al., AJMC 2018](https://ajmc.s3.amazonaws.com/_media/_pdf/AJMC_05_2018_Kranker%20final.pdf)
- **Camden RCT:** ambulatory visits rose 15 percentage points at 14 days post-discharge among the Medicaid-linked sample (561 of 800), while the parent trial found no 180-day readmission effect. — [Health Affairs 2024 and NEJM 2020, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22Comprehensive%20discharge%20planning%20and%20home%20follow-up%20of%20hospitalized%20elders%22)%20OR%20(TITLE:%22Effects%20of%20care%20coordination%20on%20hospitalization,%20quality%20of%20care,%20and%20health%20care%20expenditures%22)%20OR%20(TITLE:%22Health%20Care%20Hotspotting%22%20AND%20TITLE:%22Randomized%22)%20OR%20(TITLE:%22Medicare%20Health%20Support%22%20AND%20TITLE:%22pilot%22)&resultType=core&format=json&pageSize=8)

### Inferences
- Bindman & Cox is observational and measures outcomes starting at day 31, so selection effects are likely. It should not be presented as causal.
- Faster follow-up is a good process metric, but evidence does not support promising a readmission reduction from follow-up alone.
- TCM is a provider-billed service. A plan workbench can support the clocks and share data, but the plan does not itself bill TCM.

### Gaps
- **Unverified (HCUP, the requested source; hcup-us.ahrq.gov refused connection and Bookshelf returned a browser check; figures seen only in search excerpts):**
  - 2018, adults: 3.8M 30-day readmissions, 14% rate, $15,200 average cost; Medicare 2,290,100 readmissions, 16.9 per 100 index admissions, $15,500 average cost. [HCUP SB #278 on Bookshelf](https://www.ncbi.nlm.nih.gov/books/NBK573265/)
  - 2016 to 2020: all-payer rate flat at 13.9 per 100 index admissions. [HCUP SB #304](https://hcup-us.ahrq.gov/reports/statbriefs/sb304-readmissions-2016-2020.jsp)
  - 2022: 3.6M readmissions, $20,329 average cost, Medicare about 16% vs 13.3% national, attributed to a secondary paper; the excerpt was not tied clearly to one URL among [these results](https://pmc.ncbi.nlm.nih.gov/articles/PMC13224878/), so check it before use.
- **Primary CMS TCM text:** the [MLN908628 booklet](https://www.hhs.gov/guidance/sites/default/files/hhs-guidance-documents/CMS/mln908628_08_2025_transitional_care_management_final.pdf) returned 403, so the rules above rest on AAFP.
- **Unverified:** TCM services growing from 298,000 (2013) to 1.3M (2018), search excerpt only. [JAMA Netw Open](https://pmc.ncbi.nlm.nih.gov/articles/PMC6991271)
- **No newer Medicare rate verified:** I did not verify any MedPAC or CMS 2023 to 2025 Medicare readmission rate.
- **No opened study** directly estimates the causal effect of a 7-day vs 14-day visit on readmission.

---

## Case-management effectiveness: Coleman, Naylor, CCTP, other trials and null results

### Takeaway
Intensive, multi-component, in-person transitional models show real effects in older trials. Large telephonic and population-scale programs are repeatedly null. A deck should not claim that case management reliably reduces readmissions without saying which model and which population.

### Cited Findings

**Positive**
- **Coleman CTI (RCT, Colorado, ≥65, N=750, 2002 to 2003):** rehospitalization intervention vs control at 30 days 8.3 vs 11.9 (P=.048), at 90 days 16.7 vs 22.5 (P=.04); mean hospital costs at 180 days $2,058 vs $2,546. The retrieved summary did not state units for the rates. — [Arch Intern Med 2006, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:17000937%20OR%20EXT_ID:10029645%20OR%20EXT_ID:15107058%20OR%20EXT_ID:30422213&resultType=core&format=json)
- **Naylor 1999 (RCT, ≥65, 2 urban hospitals, N=363):** readmission at 24 weeks 20.3% vs 37.1% (P<.001); about $0.6M vs $1.2M Medicare costs. — [JAMA 1999, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:10029122%20OR%20EXT_ID:22047559%20OR%20EXT_ID:38829614%20OR%20EXT_ID:19211470%20OR%20EXT_ID:19188628&resultType=core&format=json)
- **Naylor 2004 (RCT, heart failure, ≥65, 6 hospitals, N=239):** readmissions at 52 weeks 104 vs 162 (P=.047); mean total costs $7,636 vs $12,481 (P=.002). — [J Am Geriatr Soc 2004, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:9989946%20OR%20EXT_ID:15086645%20OR%20EXT_ID:19211469%20OR%20EXT_ID:31914240%20OR%20EXT_ID:19189907%20OR%20EXT_ID:24820131&resultType=core&format=json)
- **Project RED (RCT, 749 adults, mean age 49.9):** hospital utilization 0.314 vs 0.451 visits per person per month within 30 days; IRR 0.695 (95% CI 0.515 to 0.937). — [Ann Intern Med 2009, same query](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:9989946%20OR%20EXT_ID:15086645%20OR%20EXT_ID:19211469%20OR%20EXT_ID:31914240%20OR%20EXT_ID:19189907%20OR%20EXT_ID:24820131&resultType=core&format=json)
- **Meta-analysis (42 RCTs):** pooled RR for 30-day readmission 0.82 (95% CI 0.73 to 0.91). Pre-2002 trials were 1.6 times more effective; multi-component interventions 1.4 times; those supporting self-care capacity 1.3 times. — [Leppin et al., JAMA Intern Med 2014, same query](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:9989946%20OR%20EXT_ID:15086645%20OR%20EXT_ID:19211469%20OR%20EXT_ID:31914240%20OR%20EXT_ID:19189907%20OR%20EXT_ID:24820131&resultType=core&format=json)

**Null or mixed**
- **Medicare Health Support (RCT, nurse call centers, 8 commercial programs, N=242,417):** no reduction in hospital admissions or ED visits; 14 of 40 process comparisons improved; about $400M in fees with no demonstrable savings. — [RTI summary of NEJM 2011](https://www.rti.org/publication/results-medicare-health-support-disease-management-pilot-program)
- **Medicare care coordination (15 RCTs, N=18,309):** 13 of 15 programs showed no significant hospitalization difference; none generated net savings. — [Peikes et al., JAMA 2009, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:(%22care%20coordination%22%20AND%20Medicare%20AND%20hospitalization%20AND%20%22quality%20of%20care%22)%20AND%20AUTH:%22Peikes%22&resultType=core&format=json&pageSize=3)
- **Camden Hotspotting (RCT, N=800):** 180-day readmission 62.3% vs 61.7%; adjusted difference 0.82 points (95% CI -5.97 to 7.61). A naive pre/post comparison showed a misleading 38-point decline. — [NEJM 2020, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22Comprehensive%20discharge%20planning%20and%20home%20follow-up%20of%20hospitalized%20elders%22)%20OR%20(TITLE:%22Effects%20of%20care%20coordination%20on%20hospitalization,%20quality%20of%20care,%20and%20health%20care%20expenditures%22)%20OR%20(TITLE:%22Health%20Care%20Hotspotting%22%20AND%20TITLE:%22Randomized%22)%20OR%20(TITLE:%22Medicare%20Health%20Support%22%20AND%20TITLE:%22pilot%22)&resultType=core&format=json&pageSize=8)
- **Camden secondary analysis:** the highest-participation subgroup had an aIRR of 0.74 (95% CI 0.56 to 0.99). This is a secondary analysis of engagement variation, so selection is a concern. — [JAMA Netw Open 2023, same query](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22Comprehensive%20discharge%20planning%20and%20home%20follow-up%20of%20hospitalized%20elders%22)%20OR%20(TITLE:%22Effects%20of%20care%20coordination%20on%20hospitalization,%20quality%20of%20care,%20and%20health%20care%20expenditures%22)%20OR%20(TITLE:%22Health%20Care%20Hotspotting%22%20AND%20TITLE:%22Randomized%22)%20OR%20(TITLE:%22Medicare%20Health%20Support%22%20AND%20TITLE:%22pilot%22)&resultType=core&format=json&pageSize=8)
- **Colorado Medicaid telephone care management (RCT, N=5,064, blind/disabled):** no significant differences in primary care or specialist visits, admissions or ED visits over two years. — [Health Services Research 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3796111)
- **Post-discharge nurse calls, UCSF (N=5,507 eligible):** AOR 0.71 (0.55 to 0.91) covariate-adjusted, but 0.91 (0.69 to 1.20) with propensity score. **Primary-care calls (790 discharges):** readmission 12.8% vs 14.8% vs 14.7%, p=0.72. — [J Gen Intern Med 2014, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22post-discharge%22%20OR%20TITLE:postdischarge)%20AND%20(TITLE:telephone%20OR%20TITLE:phone%20OR%20TITLE:calls)%20AND%20(readmission*)%20AND%20PUB_YEAR:[2011%20TO%202026]&resultType=core&format=json&pageSize=12&sort=CITED%20desc)
- **Atlantic General (quasi-experimental, Medicare FFS, n=638):** spending -$1,333 per beneficiary per month (-30.8%; 90% CI -$2,078 to -$589), with no significant change in 30-day readmission or follow-up. Authors note modest power. — [Kranker et al., AJMC 2018](https://ajmc.s3.amazonaws.com/_media/_pdf/AJMC_05_2018_Kranker%20final.pdf)
- **Integrated care management after hospitalization (JGIM 2026):** 90-day readmission 16.5% vs 16.3%; 90-day ED 32.4% vs 25.5% (integrated vs usual). The stated N=886 per arm does not match the listed sub-arm counts (365 + 335 + 149 = 849), so check the full text. — [Europe PMC, PMID 42045738](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:(%22care%20management%22%20OR%20%22case%20management%22%20OR%20%22disease%20management%22)%20AND%20ABSTRACT:(%22health%20plan%22%20AND%20(telephon*)%20AND%20(%22enrollment%20rate%22%20OR%20%22engagement%22%20OR%20%22reached%22%20OR%20%22unable%20to%20reach%22))&resultType=core&format=json&pageSize=15&sort=P_PDATE_D%20desc)
- **CCTP design only:** $500M over five years, more than 100 CBOs and hospital partners, target of a 20% reduction in 30-day readmissions among FFS discharges. — [Mathematica project page](https://mathematica.org/projects/community-based-care-transitions)

### Inferences
- A consistent pattern: nurse-led, in-person, multi-component models with a defined post-discharge window (Coleman, Naylor) show effects. Remote, call-center and population-wide programs mostly do not, and effect sizes have shrunk over time (Leppin).
- Camden's 38-point naive decline is the strongest argument against pre/post ROI claims. The product should support matched or randomized evaluation.
- Regression to the mean and selection are the main threats to any vendor claim, including ours.

### Gaps
- **CCTP final results:** the [CMS final evaluation PDF](https://downloads.cms.gov/files/cmmi/cctp-final-eval-rpt.pdf) exceeded the fetch limit, and a [commentary](https://dev.altarum.org/news/through-glass-darkly-community-based-care-transitions-program-evaluation) returned 503. **Unverified:** "4 of 48 sites saw significant reduction," from an early-evaluation search excerpt of [Becker's](https://www.beckershospitalreview.com/finance/early-evaluation-shows-lack-of-success-in-government-lab-experiment-to-reduce-readmissions). That is not the final result.
- **To read:** the 2026 AJMC trial "Integrated care for chronic conditions" (PMID 41838981, n=1,387) gave no figures relevant here in the abstract.
- **MA plan-run RCTs:** I found few that report readmissions.

---

## Reach and engagement: connect rates, attempts, timing, SMS, language, Medicaid vs MA, attempt rules

### Takeaway
No rigorous national benchmark for plan care-management connect rates was found. The verified three-attempt rule is **CMS's SNP rule (42 CFR 422.101(f))**, not an NCQA rule I could confirm. Timing advice is qualitative. SMS evidence is mixed and comes mostly from other settings.

### Cited Findings

**Rates and attempts**
- **MA vendor case:** 22.52% baseline (ten-month average), then 34.62%, 54.45% and 65.78% at months 1 to 3 after adding call authentication and branded caller ID, with staffing and dial volume unchanged. Outbound only. — [Carenet](https://carenethealthcare.com/?p=49991)
- **Post-discharge calls:** 61.5% full script, 29.0% voicemail only, 9.5% missed, among 790 discharges. — [Tang et al. 2014, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(TITLE:%22post-discharge%22%20OR%20TITLE:postdischarge)%20AND%20(TITLE:telephone%20OR%20TITLE:phone%20OR%20TITLE:calls)%20AND%20(readmission*)%20AND%20PUB_YEAR:[2011%20TO%202026]&resultType=core&format=json&pageSize=12&sort=CITED%20desc)
- **Rural Medicare FFS:** 62% of the intent-to-treat group enrolled (396/638). 10% of patients opted out or could not be reached after 3 tries, per the authors' program description. These two figures use different denominators, as the treatment group also includes people the program did not intend to treat. — [Kranker et al., AJMC 2018](https://ajmc.s3.amazonaws.com/_media/_pdf/AJMC_05_2018_Kranker%20final.pdf)
- **Medicaid, high need:** care managers "often required 10–20 calls to reach a member." Of 3,540 assigned to intervention, 864 opted out to FFS (24%, my arithmetic), and people with greater expected need were more likely to opt out. — [Health Services Research 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3796111)

**Timing**
- **Duals plans (focus group, 7 plans):** calling early in the month, when prepaid phones have more minutes, and in late morning or early evening "may increase the chances" of connecting. Qualitative only. — [CMS Resources for Integrated Care brief, Nov 2022](https://cms.gov/files/document/ricresource-locatingandengagingmembers-brief.pdf)
- **PRIDE plans:** target calls in the first week to 10 days of the month. Also recommends claims and prior-auth data to find current providers, flags on hard-to-locate members, and non-licensed outreach staff. No rates reported. — [CHCS, Dec 2014](https://www.chcs.org/media/PRIDE-Tips-for-Contacting-Hard-to-Locate-Members_121014_2.pdf)

**SMS and digital**
- **Safety-net ED hypertension (N=488):** weekly prompts: high engagers 21.6%, mean response 86%; low engagers 78.4%, mean 20%. Daily prompts: high engagers 10.5%, mean 67%; low engagers 89.5%, mean 9%. — [JMIR mHealth 2024, via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=ABSTRACT:(Medicaid%20AND%20(%22text%20message%22%20OR%20SMS%20OR%20%22texting%22)%20AND%20(outreach%20OR%20%22response%20rate%22%20OR%20engagement)%20AND%20(randomized%20OR%20randomised))&resultType=core&format=json&pageSize=12&sort=P_PDATE_D%20desc)
- **Medicaid ED smokers (pilot RCT, N=80):** opt-in 63.8%; replied at least once 71.3%. — [Nicotine Tob Res 2021, same query](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=ABSTRACT:(Medicaid%20AND%20(%22text%20message%22%20OR%20SMS%20OR%20%22texting%22)%20AND%20(outreach%20OR%20%22response%20rate%22%20OR%20engagement)%20AND%20(randomized%20OR%20randomised))&resultType=core&format=json&pageSize=12&sort=P_PDATE_D%20desc)
- **Philadelphia adults unresponsive to prior outreach (RCT, N=16,045):** text content and call arms produced vaccination of about 3%, with no significant differences. — [JAMA Netw Open 2022, same query](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=ABSTRACT:(Medicaid%20AND%20(%22text%20message%22%20OR%20SMS%20OR%20%22texting%22)%20AND%20(outreach%20OR%20%22response%20rate%22%20OR%20engagement)%20AND%20(randomized%20OR%20randomised))&resultType=core&format=json&pageSize=12&sort=P_PDATE_D%20desc)

**Language**
- **LEP (N=13,860, one urban academic hospital, 2018 to 2019, 11% LEP):** a multilingual automated call was less likely to reach LEP patients (average marginal effect 3.3%; 95% CI 1.4% to 5.1%), and LEP patients reported more post-discharge issues, such as discharge-instruction questions (4.8%; 2.7% to 6.9%). Preprint record linked to Jt Comm J Qual Patient Saf 2021. — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=ABSTRACT:(%22post-discharge%22%20AND%20(%22text%20message%22%20OR%20SMS%20OR%20%22automated%22)%20AND%20(%22phone%20call%22%20OR%20%22telephone%22)%20AND%20(reach%20OR%20response%20OR%20contacted)%20AND%20(language%20OR%20Spanish%20OR%20English))%20AND%20PUB_YEAR:[2018%20TO%202026]&resultType=core&format=json&pageSize=10&sort=P_PDATE_D%20desc)

**Attempt rules**
- **D-SNP/SNP HRA, federal:** initial HRA within 90 days of the enrollment effective date, and annually. At least three attempts, not counting automated calls, on different days and at different times of day, unless the enrollee agrees or declines first. Follow-up letter if no response. Attempts and refusals must be documented. Care plan within 90 days of the initial HRA or of enrollment, whichever is later. — [42 CFR 422.101(f)](https://www.law.cornell.edu/cfr/text/42/422.101)
- **Medicaid managed care, federal:** "best effort" initial screening within 90 days of enrollment, with follow-up attempts if the first contact fails. No fixed attempt count in what I read. — [42 CFR 438.208(b)(3)](https://www.law.cornell.edu/cfr/text/42/438.208)
- **MMP Core Measure 2.1 (2016 CMS FAQ, useful counting logic):** three documented outbound attempts within 90 days, any mix of channels. Inbound calls, calls to providers or pharmacies, and members with no phone on file do not count toward "unable to locate." A hang-up is not a refusal. — [CMS FAQ, Aug 2016](https://www.cms.gov/medicare-medicaid-coordination/medicare-and-medicaid-coordination/medicare-medicaid-coordination-office/financialalignmentinitiative/downloads/corereportingmeasure21faq_082516.pdf)
- **TCM:** two or more separate, timely attempts within 2 business days. — [AAFP](https://www.aafp.org/family-physician/practice-and-career/getting-paid/coding/transitional-care-management/faq.html)

### Inferences
- The workbench should encode attempt policy as configurable rules by line of business: SNP 3 non-automated attempts on different days and at different times; TCM 2 business days; state-specific Medicaid rules on top.
- Under the SNP rule, automated calls or texts should not increment the regulatory attempt counter. Log channel and whether it was automated for each attempt.
- The Carenet result suggests caller identity and spam labeling are a cheap lever worth testing with a holdout, but its uncontrolled design and commercial source make it a hypothesis, not a benchmark.
- Connect-rate reports should separate "not reachable" (bad data) from "reached, declined," as CMS's own counting logic does.
- The LEP gap suggests reporting connect and engagement by preferred language as a standard equity cut.

### Gaps
- **User's premise on NCQA:** I could not verify any NCQA "3 attempts within X days" rule. NCQA's standards are sold in its store and the public FAQ does not mention unable-to-reach rules. Treat it as unverified until checked against purchased NCQA standards.
- **Unverified (state and plan rules; search excerpts only; pages returned 403):** Louisiana LHCC policy of three telephonic attempts on non-consecutive days at different times, within 30 days ([LDH](https://www.ldh.la.gov/assets/medicaid/MCPP/3.18.21/916_LHCC_LACM0101_CM_Assessment_Process.pdf)); New Mexico three attempts on three different calendar days at different hours ([NM HSD](https://www.hsd.state.nm.us/wp-content/uploads/LOD-66-HRA-for-Transitioning-Members.pdf)).
- **Unverified:** Medicaid reach "sometimes less than 20%," with Medicare enrollees often easier to reach, from a [UMass document](https://core.ac.uk/download/56528928.pdf) (403). Also "at least one in five Medicaid phone numbers likely invalid," from a [vendor blog](https://datadecisionsgroup.com/data-quality-is-a-financial-imperative-for-medicaid-redetermination/) not opened.
- **Medicaid vs MA head-to-head reach:** no published comparison found.
- **Quantified best time of day or optimal attempt count:** no study found with health-plan care management data.
- **Enrollment-to-engagement rates in plan CM (MA or Medicaid):** no peer-reviewed figures found despite several targeted searches.

---

## Regulation: NCQA and URAC, CMS-0057-F, HIPAA, 42 CFR Part 2, TCPA, Section 1557, AI rules

### Takeaway
Near-term deadlines: **TCPA revoke-all on 31 Jan 2027** and **CMS-0057-F APIs on 1 Jan 2027**. Part 2 compliance has been in force since 16 Feb 2026. AI rules converge on one principle: tools can assist, but adverse decisions need individual circumstances and a qualified human. Section 1557's tool rule reaches care and disease management, which plausibly includes risk stratification in a workbench.

### Cited Findings

**Accreditation**
- **NCQA CM:** assesses identification and assessment, care planning, care monitoring, care transitions, and measurement and quality improvement. Eligibility requires at least six months of CM services, a broad range of services to complex or high-risk populations, and a valid sample for file review. Typical timeline 12 months. Standards are sold through the NCQA store. — [NCQA FAQ](https://www.ncqa.org/programs/health-plans/case-management-cm/faqs/)
- **URAC CM:** member consent documented in every case file; support staff do not evaluate or interpret clinical data; standardized tools for screening, assessment, medication assessment, planning, monitoring and closure; personalized plans addressing social determinants; credentialing checked before hire and at least every 3 years; supervisors certified within 3 years; annual program evaluation. — [URAC readiness sheet](https://www.urac.org/wp-content/uploads/2022/10/Case-Management.pdf)

**CMS-0057-F**
- **Who:** MA organizations, state Medicaid and CHIP FFS, Medicaid managed care plans, CHIP managed care entities, QHP issuers on FFEs.
- **When:** decision timeframes effective 1 Jan 2026: 72 hours expedited, 7 calendar days standard (standard timeframe excludes QHP issuers on FFEs). Specific denial reason from 2026 (excludes drugs). First public PA metrics by 31 Mar 2026. Patient Access, Provider Access, Payer-to-Payer and Prior Authorization APIs by 1 Jan 2027, with dates varying by payer type. — [CMS fact sheet](https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-prior-authorization-final-rule-cms-0057-f)

**HIPAA minimum necessary**
- Covered entities and business associates must make reasonable efforts to limit PHI to the minimum necessary. It does not apply to disclosures to or requests by a provider for treatment, uses or disclosures to the individual, or those under an authorization, among other exceptions. — [45 CFR 164.502(b)](https://www.law.cornell.edu/cfr/text/45/164.502)

**42 CFR Part 2**
- **Consent and redisclosure:** a single consent for all future TPO is allowed until revoked in writing. Covered entities and business associates that receive records for TPO may redisclose under HIPAA, except for proceedings against the patient. — [42 CFR 2.33](https://www.law.cornell.edu/cfr/text/42/2.33)
- **Compliance:** date was 16 Feb 2026, when OCR began accepting complaints and breach notifications. HIPAA enforcement framework applies. NPP updates apply to all HIPAA covered entities holding Part 2 records. — [Quarles](https://www.quarles.com/newsroom/publications/go-for-gold-42-cfr-part-2-compliance-deadline-and-hhs-enforcement-is-here)

**TCPA**
- **Revocation:** by any reasonable method; must be honored within a reasonable time not to exceed 10 business days; caller may not designate an exclusive means. — [47 CFR 64.1200(a)(10)](https://www.law.cornell.edu/cfr/text/47/64.1200)
- **Revoke-all delay:** the requirement to apply a revocation to all future robocalls and robotexts on unrelated matters is delayed to 31 Jan 2027. The FCC is reviewing whether to modify it, and the waiver does not alter other revocation rules. — [FCC DA 26-12, 6 Jan 2026](https://docs.fcc.gov/public/attachments/DA-26-12A1.pdf)
- **Healthcare exemption:** one message per day and up to three per week per patient; voice generally one minute or less and text 160 characters or less; easy opt-out honored immediately; no telemarketing, solicitation, advertising, accounting, billing or debt-collection content; only to the number provided by the patient. The text refers to a "healthcare provider." — [47 CFR 64.1200(a)(9)(iv)](https://www.law.cornell.edu/cfr/text/47/64.1200)
- **Unread amendment:** that page links an amendment at 91 FR 67219, dated 26 Oct 2026. I could not determine what it changes. Legal should check it. — [47 CFR 64.1200](https://www.law.cornell.edu/cfr/text/47/64.1200)

**Section 1557**
- **Language access:** meaningful access for LEP individuals; free, accurate, timely assistance; qualified interpreter; a qualified human translator must review machine translation when text is critical to rights, benefits or access, when accuracy is essential, or when material is complex. Restricts reliance on untrained adults and minors. — [45 CFR 92.201](https://www.law.cornell.edu/cfr/text/45/92.201)
- **Decision tools:** covered entities must not discriminate through patient care decision support tools, must make reasonable efforts to identify tools using protected-trait inputs, and must mitigate risk. — [45 CFR 92.210](https://www.law.cornell.edu/cfr/text/45/92.210)
- **Scope and timing:** tools include AI, clinical algorithms and non-automated tools used to assess health status, analyze medical necessity, or guide care and disease management. Administrative, billing and scheduling tools fall outside. Rule effective 5 July 2024, with 300 days to implement. — [Crowell, May 2024](https://www.crowell.com/en/insights/client-alerts/hhs-applies-discrimination-prohibitions-to-use-of-automated-and-non-automated-patient-care-decision-support-tools)

**AI and algorithms**
- **CMS FAQ, 6 Feb 2024:** MA organizations may use AI in coverage determinations if compliant. Decisions must consider the individual's history, physician recommendations and clinical notes; AI predictions alone cannot justify a decision; tools cannot drift from static public criteria; and tools must not perpetuate bias. — [Reed Smith summary](https://www.reedsmith.com/articles/cms-confirms-medicare-advantage-organizations-may-use-ai-in-making-coverage/)
- **Regulation:** medical necessity decisions must consider the enrollee's medical history, physician recommendations and clinical notes; plans may not deny basic benefits on unspecified criteria. — [42 CFR 422.101(c)(1)(i)](https://www.law.cornell.edu/cfr/text/42/422.101)
- **CY2027 final rule fact sheet** contains no AI provision. — [CMS](https://www.cms.gov/newsroom/fact-sheets/contract-year-2027-medicare-advantage-part-d-final-rule)
- **California SB 1120 (effective 1 Jan 2025):** a medical-necessity denial, delay or change must be reviewed and decided by a licensed physician or qualified provider. — [Author's press release](https://sd13.senate.ca.gov/news/press-release/december-9-2024/landmark-law-prohibits-health-insurance-companies-using-ai-to)
- **2026 state laws:**
  - Washington SB 5395 (11 Jun 2026): only licensed professionals may deny, with annual reporting on AI-aided denials.
  - Iowa HF 2635 (1 Jul 2026): AI cannot be the sole basis to deny, delay or downgrade.
  - Alabama SB 63 (1 Oct 2026).
  - Colorado HB 1139, Georgia SB 444, Utah SB 319 (all 1 Jan 2027).
  - Illinois SB 3114 (1 Jan 2028), on downcoding.
  - Indiana HB 1271 (1 Jul 2026), on downcoding.
  - Maryland HB 1563 (1 Jun 2026), on quarterly adverse-decision reporting. — [Rise Health, 12 Aug 2026](https://www.risehealth.org/insights-articles/ai-health-insurance-state-laws-2026/); [Sheppard Mullin via NatLawReview, 2 Jul 2026](https://natlawreview.com/article/additional-states-continue-legislative-trend-new-laws-limiting-use-artificial)

### Inferences
- **Design implications (not legal advice):**
  - Role-based views scoped to task for minimum necessary, with care-management and operations uses treated differently from provider treatment disclosures.
  - Tag SUD-sourced data with consent status, revocation and an audit trail, and block use in proceedings against the patient.
  - A global opt-out model across programs would be safest ahead of 31 Jan 2027.
  - Whether plan-initiated outreach qualifies under an exemption written for a "healthcare provider" needs counsel review. Do not assume it does.
  - Machine-translated clinical outreach needs a human review step.
- **AI:** keep AI to prioritizing and drafting. Log the human reviewer and rationale. Inventory models for 92.210, since outreach prioritization that guides care management is plausibly in scope, while pure scheduling may not be.
- The planned 2028 removal of the Call Center Interpreter/TTY Star measure does not lift Section 1557 duties.
- These AI laws target utilization review and coverage. A CM workbench is outside them only if its outputs do not feed adverse determinations, so the boundary should be enforced technically.

### Gaps
- **NCQA CM assessment elements:** the specific list of required assessment factors and any timeframes could not be verified because standards are paid. **Unverified:** PHM 5 Element D "Initial Assessment" naming and a 30-day initial assessment; neither was confirmed. A [2020 CM Policy Updates PDF](https://wpcdn.ncqa.org/www-prod/2020-CM-Policy-Updates_7-28-25.pdf) was retrieved but not read.
- **Unverified:** Eleventh Circuit vacatur of the FCC one-to-one consent rule (24 Jan 2025) and *McLaughlin Chiropractic v. McKesson* (2025). The search excerpt for the former was not opened, and the [Justia page](https://supreme.justia.com/cases/federal/us/606/23-1226/) for the latter returned 403.
- **Exemption purposes:** which purposes (exam confirmations, post-discharge follow-up) are listed in (a)(9)(iv) were not extracted, nor was the status of the 91 FR 67219 amendment.
- **Date conflict on 92.210:** 300 days from 5 July 2024 is 1 May 2025 by my arithmetic. A search excerpt said "May 1, 2026," likely an error. The current [regulation](https://www.law.cornell.edu/cfr/text/45/92.210) page showed no dates. Federal enforcement posture for 1557 in 2025 and 2026 was not verified.
- **Primary CMS FAQ text:** read through law-firm summary only. SB 1120 was read through the author's release, as [leginfo](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1120) returned 403. **Unverified:** the Arizona, Nebraska and Texas statutes, and the claim about Maryland HB 820.
- **Part 2:** primary HHS fact sheet not opened. **Unverified:** the exact penalty tiers.
