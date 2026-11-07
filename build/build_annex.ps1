$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$outFile='C:\Users\dhruv\Desktop\Hilabs_Deck\mCase_Synthetic_Patients_Annex.xlsx'

# ---- style ids ----
$S=@{def=0;hdr=1;title=2;date=3;bad=4;bold=5;input=6;pct=7;num2=8;note=9;good=10;sub=11;int=12;dt=13;total=14;totalpct=15}
function Serial([string]$d){ ([datetime]$d - [datetime]'1899-12-30').Days }
function ColName([int]$i){ $n='';$i++; while($i -gt 0){ $m=($i-1)%26; $n=[char](65+$m)+$n; $i=[math]::Floor(($i-$m)/26) }; $n }
function C($v,$s=0){ @{v=$v;s=$s} }
function D([string]$d){ @{v=(Serial $d);s=$S.date} }
function F([string]$f,$v,$s=0){ @{f=$f;v=$v;s=$s} }

function SheetXml($rows,$widths,$freezeRow,$autoFilterCols){
  $sb=New-Object Text.StringBuilder
  [void]$sb.Append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0" showGridLines="0">')
  if($freezeRow -gt 0){ [void]$sb.Append("<pane ySplit=`"$freezeRow`" topLeftCell=`"A$($freezeRow+1)`" activePane=`"bottomLeft`" state=`"frozen`"/>") }
  [void]$sb.Append('</sheetView></sheetViews><sheetFormatPr defaultRowHeight="15"/><cols>')
  for($i=0;$i -lt $widths.Count;$i++){ [void]$sb.Append("<col min=`"$($i+1)`" max=`"$($i+1)`" width=`"$($widths[$i])`" customWidth=`"1`"/>") }
  [void]$sb.Append('</cols><sheetData>')
  $r=0
  foreach($row in $rows){ $r++
    # estimate row height from wrapped text so that it opens readable
    $maxLines=1
    for($c=0;$c -lt $row.Count;$c++){ $cell=$row[$c]; if($null -eq $cell){continue}
      $val= if($cell -is [hashtable]){$cell.v}else{$cell}
      if($val -is [string] -and $c -lt $widths.Count){ $w=[math]::Max(4,[double]$widths[$c]-1); $l=[math]::Ceiling($val.Length/$w*1.08); if($l -gt $maxLines){$maxLines=$l} } }
    $ht=[math]::Min(300,[math]::Max(16,15*$maxLines+2))
    [void]$sb.Append("<row r=`"$r`" ht=`"$ht`" customHeight=`"1`">")
    for($c=0;$c -lt $row.Count;$c++){ $cell=$row[$c]; if($null -eq $cell){continue}
      if($cell -isnot [hashtable]){ $cell=@{v=$cell;s=0} }
      $ref=(ColName $c)+$r; $st=[int]$cell.s
      if($cell.ContainsKey('f')){
        $fx=[Security.SecurityElement]::Escape($cell.f)
        if($cell.v -is [string]){ [void]$sb.Append("<c r=`"$ref`" s=`"$st`" t=`"str`"><f>$fx</f><v>$([Security.SecurityElement]::Escape($cell.v))</v></c>") }
        else { $nv=([double]$cell.v).ToString([Globalization.CultureInfo]::InvariantCulture); [void]$sb.Append("<c r=`"$ref`" s=`"$st`"><f>$fx</f><v>$nv</v></c>") }
      } elseif($cell.v -is [string]){
        [void]$sb.Append("<c r=`"$ref`" s=`"$st`" t=`"inlineStr`"><is><t xml:space=`"preserve`">$([Security.SecurityElement]::Escape($cell.v))</t></is></c>")
      } else {
        $nv=([double]$cell.v).ToString([Globalization.CultureInfo]::InvariantCulture); [void]$sb.Append("<c r=`"$ref`" s=`"$st`"><v>$nv</v></c>")
      }
    }
    [void]$sb.Append('</row>')
  }
  [void]$sb.Append('</sheetData>')
  if($autoFilterCols){ [void]$sb.Append("<autoFilter ref=`"$autoFilterCols`"/>") }
  [void]$sb.Append('<pageMargins left="0.5" right="0.5" top="0.5" bottom="0.5" header="0.3" footer="0.3"/><pageSetup orientation="landscape" fitToHeight="0"/></worksheet>')
  $sb.ToString()
}

$sheets=New-Object System.Collections.ArrayList
function AddSheet($name,$rows,$widths,$freeze=0,$af=$null){ [void]$sheets.Add(@{name=$name;xml=(SheetXml $rows $widths $freeze $af)}) }
function Hd($arr){ ,@($arr | ForEach-Object { C $_ $S.hdr }) }

# ======================= README =======================
$rows=@(
 ,@((C 'mCase Workbench: Synthetic Patient Annex' $S.title))
 ,@('HiLabs Product Caselet, APM, Campus Hiring 2026-27. Companion to the deck mCase_Workbench_HiLabs_APM_Case.pdf.')
 ,@((C 'ALL DATA HERE IS FICTIONAL. NO REAL PHI. Member IDs start with SYN-. Phone numbers use the reserved 555-01xx range. Facilities and clinicians are invented.' $S.bad))
 ,@('')
 ,@((C 'Case clock' $S.sub))
 ,@('"Now" in this file is Monday 9 Nov 2026, 08:00. All ages, lags and deadlines are computed against this date.')
 ,@('')
 ,@((C 'How to read this workbook' $S.sub))
 ,@('Patient_Summary: the five members, what each stresses, and the one-line answer to "what should the case manager see and do at 8 am Monday?"')
 ,@('P1_Walter to P5_Ana: sample records across 10-11 datasets per member (the brief asks for at least 6), with data date, received date, computed lag, planted imperfection, how the product shows it, and what Maria does differently.')
 ,@('Imperfection_Log: all 25 planted imperfections, tagged to the brief''s five obstacles and to the screen that catches them.')
 ,@('Queue_Score: the priority score behind the Work Queue with live formulas. Change the blue weights or inputs and the ranks recompute.')
 ,@('Dataset_Inventory: all 20 datasets with source, decision, freshness, quality problem, handling and priority.')
 ,@('Time_Model: the estimate of where the day goes, with live formulas and base and stretch scenarios. Blue cells are assumptions.')
 ,@('Sources: public sources behind the non-synthetic numbers, with evidence grades.')
 ,@('')
 ,@((C 'Conventions' $S.sub))
 ,@('Blue font = editable assumption. Red fill = planted imperfection. Green fill = what the product does about it.')
 ,@('Priority weights, scenario minutes, pricing and targets are the author''s estimates, stated as such. Clinical content is illustrative for a product exercise and is not clinical guidance.')
)
AddSheet 'README' $rows @(135)

# ======================= Patient_Summary =======================
$rows=@(
 (Hd @('ID','Patient','Age','Line of business','Scenario','Conditions','What it stresses in the product','Nearest clock','Clock date','Best window','Queue rank','Assigned to','"What should the case manager see and do at 8 am Monday?"')),
 @('SYN-1001','Walter Brooks',(C 71 $S.int),'MA-PPO','Fresh heart-failure discharge','HF (HFrEF), hypertension','Clock urgency; medication conflict; not-received states','Contact within 2 business days of discharge',(D '2026-11-10'),'09:00-11:00',(C 1 $S.int),'Maria (RN)','Discharged Saturday; new sacubitril/valsartan not picked up and lisinopril may still be active, a contraindicated pair. Call this morning before Tuesday''s clock, confirm what he takes, alert cardiology same day, book the 7-day visit.'),
 @('SYN-1004','Tanya Reed',(C 34 $S.int),'Medicaid MCO','Depression plus housing instability','Major depressive disorder','Routing to the right clinician; privacy and consent; AI restraint','FUH 7-day follow-up',(D '2026-11-10'),'10:00-12:00',(C 2 $S.int),'Sam (LCSW)','Psych discharge 3 Nov: 7-day follow-up lapses tomorrow. Route to Sam (LCSW). Reach her via the shelter caseworker, ask about housing first, book the visit. AI gives no risk statement here.'),
 @('SYN-1005','Ana Reyes',(C 82 $S.int),'D-SNP','Dual-eligible senior with caregiver strain','Dementia (mild), CKD, falls risk','Free text extraction; language conflict; expiring authorization','Home-health authorization ends',(D '2026-11-12'),'After 17:00',(C 3 $S.int),'Maria (RN)','Home health ends Thursday and her daughter sounded exhausted last call. Extend the auth today, then call the daughter after 5 pm with a Tagalog interpreter available; ask about respite.'),
 @('SYN-1003','Marcus Bell',(C 52 $S.int),'D-SNP','Unreachable frequent ED user','Asthma, uncontrolled; COPD risk','Outreach; attempt compliance; duplicate events','Initial HRA due (90 days from 20 Aug 2026)',(D '2026-11-18'),'16:00-18:00',(C 4 $S.int),'Maria (RN) + CHW','5 ED visits in 90 days and no connect. Log shows 3 attempts, only 1 counts. HRA due 18 Nov. Do not redial the dead number: call the pharmacy-record mobile at 4 pm and send a CHW referral.'),
 @('SYN-1002','Denise Carter',(C 66 $S.int),'MA-HMO','Rising-risk diabetic who stopped refills','Type 2 diabetes, hypertension','False-positive gap; stale risk score; unmapped lab','None today; adherence gap open','', '12:00-13:00',(C 5 $S.int),'Maria (RN)','No emergency. A1c rose 7.8 to 9.6 and fills stopped. Call at lunch, ask without judgment about cost or cash fills, then book PCP and a repeat A1c.')
)
AddSheet 'Patient_Summary' $rows @(10,16,6,10,26,24,32,28,11,12,7,14,70) 1 'A1:M6'

# ======================= per patient sheets =======================
$hdrP=@('Dataset','Source system','Sample record','Data date','Received','Lag (days)','Planted imperfection','How mCase shows it','What Maria does differently')
function PatientSheet($name,$title,$meta,$line,$recs){
  $rows=New-Object System.Collections.ArrayList
  [void]$rows.Add(@((C $title $S.title)))
  [void]$rows.Add(@($meta))
  [void]$rows.Add(@((C ('8 am Monday: '+$line) $S.good)))
  [void]$rows.Add(@(''))
  [void]$rows.Add((Hd $hdrP))
  $r=5
  foreach($x in $recs){ $r++
    $hasDates=($x[3] -ne '' -and $x[4] -ne '')
    $a=if($x[3] -ne ''){D $x[3]}else{''}
    $b=if($x[4] -ne ''){D $x[4]}else{C 'Not received' $S.bad}
    $lag=if($hasDates){ F "E$r-D$r" ((Serial $x[4])-(Serial $x[3])) $S.int }else{ '' }
    $imp=if($x[5] -ne ''){C $x[5] $S.bad}else{'None'}
    [void]$rows.Add(@($x[0],$x[1],$x[2],$a,$b,$lag,$imp,(C $x[6] $S.good),$x[7]))
  }
  AddSheet $name $rows.ToArray() @(20,22,52,11,11,7,40,40,40) 5 ("A5:I$r")
}

PatientSheet 'P1_Walter' 'P1 Walter Brooks, 71, MA-PPO, SYN-1001: fresh heart-failure discharge' 'PCP Dr. Lin; cardiology Dr. Osei; caregiver: spouse Helen; language English; primary contact 555-0123 (mobile).' 'Discharged Saturday; new sacubitril/valsartan not picked up and lisinopril may still be active, a contraindicated pair. Call this morning before Tuesday''s clock, confirm what he takes, alert cardiology same day, book the 7-day visit.' @(
 ,@('Member & eligibility','Plan core admin','ID SYN-1001; MA-PPO; PCP Dr. Lin; language English; effective 1 Jan 2026','2026-11-08','2026-11-09','','Header with line of business; TCM and TRC clocks selected automatically','Knows which rules apply before opening the chart')
 ,@('Contact & preferences','Enrollment + CM log','555-0123 mobile, verified on 2 Sep call; prefers mornings; spouse Helen on consent form','2026-09-02','2026-09-02','','Number confidence: High; best window 09:00-11:00','Calls Walter''s mobile at 09:00 first, not the home line')
 ,@('ADT event notices','Regional HIE','Admit 2 Nov 06:12, Lakeview General; Discharge 7 Nov 14:05; disposition home','2026-11-07','2026-11-07','IMP-01 Alert carries no diagnosis; "admitted" but not why','Trigger chip; "reason not stated by ADT"; clock starts','Treats it as a call trigger and looks for the reason elsewhere')
 ,@('Discharge summary / CCD','HIE query + fax queue','Queried 8 Nov; no document returned; ED note from 2 Nov present: "acute decompensated HF, BNP 1,240"','2026-11-07','','IMP-03 Summary not received 2 days after discharge; pending tests unknown','"Not received": auto-task with clock; diagnosis labelled inferred from ED note','Requests summary and asks Walter what he was told')
 ,@('Claims, medical','Core claims','Latest claim: cardiology office visit 25 Sep; no claim yet for 2-7 Nov stay','2026-09-25','2026-11-09','IMP-02 Latest claim is 45 days old and hides the admission','Stale chip; "claims lag, admission not yet billed"','Ignores claims for current status')
 ,@('Pharmacy fills','PBM','Lisinopril 20 mg, 30 days, filled 21 Oct; furosemide 40 mg filled 21 Oct; metoprolol succinate 50 mg filled 21 Oct; sacubitril/valsartan: no fill','2026-11-08','2026-11-09','IMP-05 New sacubitril/valsartan on the discharge list has no fill','"Dispensed" label; gap flag since discharge','Asks about pickup and cost on the call')
 ,@('Medication lists','Discharge list (ED/inpatient), HIE/PCP list 12 Oct','Discharge list: sacubitril/valsartan 49/51, furosemide 80 mg, metoprolol. PCP list: lisinopril 20 mg, furosemide 40 mg, metoprolol','2026-11-07','2026-11-08','IMP-04 Two lists disagree; lisinopril + sacubitril/valsartan is contraindicated if both taken','Side-by-side conflict table; no silent winner; red flag; clinician confirms each item','Reconciles item by item; escalates to cardiology same day')
 ,@('Labs','HIE','BNP 1,240 pg/mL (2 Nov); creatinine 1.4 mg/dL (5 Nov); K 5.1 mmol/L (5 Nov)','2026-11-05','2026-11-08','','Fresh chip; trend vs prior','Mentions potassium when escalating')
 ,@('Case history & care plan','CM system of record','Opened 18 Jun; goal: daily weights; note 2 Sep: "Helen manages pillbox"','2026-09-02','2026-09-02','','AI summary with source links','Asks for Helen; knows who runs the pillbox')
 ,@('SDOH screen','HRA vendor','Lives with spouse; drives; no food concerns; self-report 12 Jun','2026-06-12','2026-06-12','','Aging chip (5 months)','Re-checks transport after discharge')
 ,@('Quality gaps & clocks','Rules engine','TRC open; patient engagement by 7 Dec; med reconciliation by 7 Dec; 7-day visit by 14 Nov','2026-11-09','2026-11-09','','Clock column with hours left','Books the visit on this call')
)
PatientSheet 'P2_Denise' 'P2 Denise Carter, 66, MA-HMO, SYN-1002: rising-risk diabetic who stopped refills' 'PCP Dr. Shah; no acute event; language English; primary contact 555-0131.' 'No emergency. A1c rose 7.8 to 9.6 and fills stopped. Call at lunch, ask without judgment about cost or cash fills, then book PCP and a repeat A1c.' @(
 ,@('Member & eligibility','Plan core admin','ID SYN-1002; MA-HMO; PCP Dr. Shah; language English','2026-11-08','2026-11-09','','Header','Knows adherence measures apply')
 ,@('Contact & preferences','Enrollment','555-0131 typed "home"; carrier lookup says mobile','2024-03-11','2024-03-11','IMP-10 Phone type wrong: labelled home, actually mobile','Type conflict note; SMS blocked until consent on file','Calls at lunch; asks for text consent')
 ,@('Labs','Regional lab via HIE','A1c 7.8% (14 Apr 2026); A1c 9.6% (19 Oct 2026) under local code GLYC-A, no LOINC','2026-10-19','2026-10-21','IMP-06 Newest A1c sits under an unmapped local code and is missing from the structured panel','"Unmapped result" surfaced with source; clinician confirms','Sees the rise that no alert raised')
 ,@('Pharmacy fills','PBM','Metformin 1000 mg, 30 days, last fill 8 Sep; supply ended 8 Oct; 32-day gap on 9 Nov. Lisinopril on time','2026-11-08','2026-11-09','IMP-08 Gap may be false: $4 generic or cash fills never reach the PBM','"No fill seen" wording, not "non-adherent"','Asks about cost and cash pharmacy before judging')
 ,@('Risk score','Plan model','Moderate (0.42), computed 9 Aug from claims through June','2026-08-09','2026-08-09','IMP-07 Score 3 months stale; predates A1c rise and gap','Aging chip; score secondary to reason','Doesn''t let "moderate" lower her guard')
 ,@('Clinical note','HIE/CCD','PCP note 9 Jun: "doing well on metformin, A1c goal <7.5"','2026-06-09','2026-06-12','IMP-09 Latest PCP note 5 months old and contradicts current trend','Dated quote with source','Asks when she last saw Dr. Shah')
 ,@('Claims, medical','Core claims','PCP visit 9 Jun; no visits since','2026-06-09','2026-07-15','','History only','Books visit')
 ,@('Case history & care plan','CM system of record','No open case; identified by rising-risk rule today','2026-11-09','2026-11-09','','Queue row, "new, rising risk"','Opens a short-term case only if the call confirms')
 ,@('Outreach log','CM system','No outreach this year','2026-11-09','2026-11-09','','"First contact" script hint','Introduces herself first')
 ,@('SDOH screen','HRA vendor','"Sometimes worries about bills" self-report 20 Feb','2026-02-20','2026-02-20','','Aging chip; surfaces with the refill gap','Opens with money, gently')
 ,@('Quality gaps & clocks','Rules engine','Diabetes adherence measure at risk; A1c control gap open; no regulatory clock today','2026-11-09','2026-11-09','','Low clock score keeps her lower in the queue but visible','Works her at 12:00 rather than first')
)
PatientSheet 'P3_Marcus' 'P3 Marcus Bell, 52, D-SNP, SYN-1003: unreachable frequent ED user' 'PCP on record Dr. Grant, no visit in 14 months; plan enrollment effective 20 Aug 2026; CHW Ms. Ortiz.' '5 ED visits in 90 days and no connect. Log shows 3 attempts, only 1 counts. HRA due 18 Nov. Do not redial the dead number: call the pharmacy-record mobile at 4 pm and send a CHW referral.' @(
 ,@('Member & eligibility','Plan + state file','ID SYN-1003; D-SNP; effective 20 Aug 2026; language English','2026-11-08','2026-11-09','','SNP rule set applied: 3 non-automated attempts, HRA in 90 days','Knows which attempts count')
 ,@('Contact & preferences','Enrollment 2024','555-0117 home, disconnected on 27 Oct call','2024-05-02','2024-05-02','IMP-11 Number on file is disconnected','"Disconnected, do not dial"','Stops wasting dials')
 ,@('Pharmacy profile','PBM / pharmacy','Albuterol fill 28 Oct; pickup 16:40; mobile 555-0142 on pharmacy record','2026-10-28','2026-10-29','IMP-12 Newest number sits in pharmacy data, not in enrollment','Number suggestion: High confidence; best window from pickup times','Calls 555-0142 at 16:00')
 ,@('ADT event notices','HIE + hospital direct','ED: 19 Aug, 14 Sep, 3 Oct, 21 Oct, 5 Nov. 3 Oct appears twice with different facility codes','2026-11-05','2026-11-05','IMP-13 One ED visit counted twice across two feeds (6 raw, 5 true)','De-duplicated timeline; merge shown','Trusts count; sees asthma pattern')
 ,@('Outreach log','Dialer + CM system','27 Oct 10:15 human, no answer; 29 Oct 18:00 automated IVR; 4 Nov 10:30 human, no answer','2026-11-04','2026-11-04','IMP-14 Robocall logged as attempt 2. IMP-15 Second human attempt in same morning band','Attempt tracker: 1 of 3 valid under the plan''s conservative rule','Next attempt today after 12:00, then letter')
 ,@('Claims, medical','Core claims','ED 19 Aug and 14 Sep paid; no PCP claim for 14 months','2026-09-14','2026-10-30','','Utilization history; recent ED not yet in claims','Focuses on PCP link')
 ,@('Pharmacy fills','PBM','Albuterol rescue 3 fills in 90 days; inhaled steroid last filled 2 Jun','2026-10-28','2026-10-29','','Rescue/controller pattern flagged for clinician review','Raises controller inhaler on the call')
 ,@('HRA','HRA vendor','Not completed; due 18 Nov 2026','','','','"Not received"; HRA clock 9 days','Prepares short HRA for the first connect')
 ,@('SDOH screen','ED social work note via HIE','"Prepaid phone, runs out late in month" 21 Oct','2026-10-21','2026-10-23','','Extracted with link; best-time hint','Calls earlier in the month next time')
 ,@('Community health worker','CM note','CHW Ms. Ortiz covers his ZIP; last contact none','2026-11-09','2026-11-09','','One-click referral draft','Sends the CHW a referral')
)
PatientSheet 'P4_Tanya' 'P4 Tanya Reed, 34, Medicaid MCO, SYN-1004: depression plus housing instability' 'Assigned LCSW Sam Whitaker; language English; shelter caseworker Ms. Dean 555-0163.' 'Psych discharge 3 Nov: 7-day follow-up lapses tomorrow. Route to Sam (LCSW). Reach her via the shelter caseworker, ask about housing first, book the visit. AI gives no risk statement here.' @(
 ,@('Member & eligibility','State file + plan','ID SYN-1004; Medicaid MCO; address: 41 Elm Ct (on file); language English','2026-11-01','2026-11-02','','Routing: BH program, LCSW','Case goes to Sam, visible to the team')
 ,@('ADT event notices','HIE','Inpatient psych, Riverbend Hospital, 28 Oct to 3 Nov; patient address: Harbor Street Shelter','2026-11-03','2026-11-03','IMP-17 Address on ADT conflicts with eligibility and SDOH','Conflict: address','Asks where she is staying')
 ,@('Discharge summary / CCD','HIE','Page 1 only: sertraline 100 mg; follow-up "with outpatient BH"; page 2 missing','2026-11-03','2026-11-06','IMP-20 Discharge med list incomplete: second page missing','"Partial document" chip; request task','Requests page 2 from Riverbend')
 ,@('Pharmacy fills','PBM','Sertraline 50 mg filled 11 Aug, 30 days; no fill since discharge','2026-11-08','2026-11-09','','"Dose differs from discharge" flag','Asks if she has medication now')
 ,@('SDOH screen','HRA vendor','"Stable housing" self-report 9 Mar','2026-03-09','2026-03-09','IMP-16 Screen is 8 months old and now contradicted','Stale chip; re-screen task','Asks about housing first')
 ,@('Contact & mail','Mailroom + CM log','Letter returned 20 Oct; 555-0155 no answer','2026-10-20','2026-10-22','IMP-18 Returned mail; address no longer valid','Contact confidence low; alternative contact from ADT note','Calls caseworker Ms. Dean')
 ,@('Behavioral health records','Consent-gated','No consent on file; system shows "additional records may be restricted; request consent"','','','IMP-19 Part 2 protected records may exist and are not shown without consent','Consent banner that does not reveal content','Asks consent in conversation')
 ,@('Quality gaps & clocks','Rules engine','FUH 7-day follow-up by 10 Nov; 30-day by 3 Dec','2026-11-09','2026-11-09','','Clock column','Books visit today')
 ,@('Case history & care plan','CM system of record','Prior case closed Feb; goal: continue therapy','2026-02-14','2026-02-14','','AI summary; no risk statement: clinician only','Sam makes her own safety assessment')
 ,@('Claims, medical','Core claims','Therapy visits ended May; none for psych stay yet','2026-05-20','2026-06-30','','History only','Links back to therapist')
)
PatientSheet 'P5_Ana' 'P5 Ana Reyes, 82, D-SNP, SYN-1005: dual-eligible senior with caregiver strain' 'Daughter and caregiver Grace, 555-0178; PCP Dr. Mendoza; home-health agency BrightPath.' 'Home health ends Thursday and her daughter sounded exhausted last call. Extend the auth today, then call the daughter after 5 pm with a Tagalog interpreter available; ask about respite.' @(
 ,@('Member & eligibility','Plan + state file','ID SYN-1005; D-SNP; language English (on file)','2026-11-08','2026-11-09','IMP-21 Eligibility says English; last call needed a Tagalog interpreter','Conflict: language shown before dial','Books interpreter; fixes field after confirming')
 ,@('Case notes','CM system of record, free text','14 Oct: "Interpreter used. Daughter sounded exhausted, says she has not slept. Mom wandered at night twice."','2026-10-14','2026-10-14','IMP-22 Caregiver strain exists only in free text','AI extraction with source link; clinician confirms','Opens with Grace, asks about respite')
 ,@('Prior authorization','UM system','Home health auth 14 Sep to 12 Nov, 2x weekly; renewal not requested','2026-09-14','2026-09-14','IMP-23 Auth ends in 3 days with no renewal task','Expiry on clock column','Requests extension today')
 ,@('Claims, medical','Core claims','SNF stay 20 Aug to 10 Sep; claim received today','2026-09-10','2026-11-09','IMP-24 SNF claim delayed 60 days; earlier risk review missed the stay','Late-arrival flag; timeline updated','Reviews whether care plan reflects the SNF stay')
 ,@('Clinical / diagnoses','PCP via HIE vs claims','PCP: CKD stage 3b; claim code: N18.4 stage 4 (2025); eGFR 38 on 5 Oct','2026-10-05','2026-10-08','IMP-25 CKD stage conflict across sources','Side by side with eGFR; clinician confirms','Asks PCP to confirm; checks renally dosed meds')
 ,@('Pharmacy fills','PBM','Donepezil on time; amlodipine on time; no NSAID fills','2026-11-08','2026-11-09','','"Dispensed", caregiver manages meds','Asks Grace about OTC pain relievers')
 ,@('Labs','HIE','eGFR 38 (5 Oct); Hgb 10.9 (5 Oct)','2026-10-05','2026-10-08','','Fresh enough for now','Shares with PCP')
 ,@('Contact & preferences','CM log','Grace 555-0178; reachable after 17:00; member not primary contact','2026-10-14','2026-10-14','','Evening slot in queue','Doesn''t call during the day')
 ,@('Home health','Agency portal','Visit note 3 Nov: "bruise on left arm, daughter unsure how"','2026-11-03','2026-11-05','','Surfaced; AI makes no abuse or safety conclusion: clinician only','Asks gently; applies judgment')
 ,@('SDOH screen','HRA vendor','Food: OK; caregiver: lives with daughter, 22 Apr','2026-04-22','2026-04-22','','Aging chip; 6 months+','Re-screens caregiver capacity')
 ,@('Quality gaps & clocks','Rules engine','SNP annual HRA due 22 Apr 2027; auth expiry 12 Nov','2026-11-09','2026-11-09','','Clock column','Works auth first, call after 17:00')
)

# ======================= Imperfection_Log =======================
$imp=@(
 @('IMP-01','P1 Walter','ADT','Alert has no diagnosis','Untimely','Trigger chip, "reason not stated"','Member 360'),
 @('IMP-02','P1 Walter','Claims','Latest claim 45 days old hides admission','Untimely','Stale chip; claims never used for current status','Member 360'),
 @('IMP-03','P1 Walter','Discharge summary','Not received two days post discharge','Untimely','Not-received task with clock','Member 360'),
 @('IMP-04','P1 Walter','Medication lists','Lists conflict; contraindicated pair possible','Messy','Conflict table; item-by-item confirmation','Member 360'),
 @('IMP-05','P1 Walter','Pharmacy','New drug has no fill','Messy','Gap flag; "dispensed" wording','Member 360'),
 @('IMP-06','P2 Denise','Labs','A1c under unmapped local code','Messy','Unmapped result surfaced','Member 360'),
 @('IMP-07','P2 Denise','Risk score','Score 3 months stale','Untimely','Aging chip; score secondary to reason','Work Queue'),
 @('IMP-08','P2 Denise','Pharmacy','Gap may be false: cash fills','Messy','"No fill seen" wording; neutral script','Outreach'),
 @('IMP-09','P2 Denise','Clinical note','PCP note 5 months old','Untimely','Dated quote with source','Member 360'),
 @('IMP-10','P2 Denise','Contact','Phone type wrong','Outreach','Type conflict; SMS blocked until consent','Outreach'),
 @('IMP-11','P3 Marcus','Contact','Disconnected number','Outreach','Do-not-dial state','Outreach'),
 @('IMP-12','P3 Marcus','Pharmacy profile','Newer number only in pharmacy','Outreach','Number suggestion with source','Outreach'),
 @('IMP-13','P3 Marcus','ADT','Duplicate ED event across feeds','Messy','De-duplication with visible merge','Member 360'),
 @('IMP-14','P3 Marcus','Outreach log','Robocall logged as attempt','Documentation','Automated flag; does not count','Outreach'),
 @('IMP-15','P3 Marcus','Outreach log','Second human attempt in same time band','Documentation','Different-time check','Outreach'),
 @('IMP-16','P4 Tanya','SDOH','Screen 8 months old, contradicted','Untimely','Stale chip; re-screen task','Member 360'),
 @('IMP-17','P4 Tanya','ADT','Address conflict: shelter','Messy','Conflict shown','Member 360'),
 @('IMP-18','P4 Tanya','Mail','Returned mail','Outreach','Low contact confidence','Outreach'),
 @('IMP-19','P4 Tanya','BH records','Consent-gated records may exist','Messy','Consent banner, no content leak','Member 360'),
 @('IMP-20','P4 Tanya','Discharge summary','Page 2 missing; med list incomplete','Untimely','Partial document chip; request task','Member 360'),
 @('IMP-21','P5 Ana','Eligibility','Language wrong','Outreach','Conflict shown before dial','Outreach'),
 @('IMP-22','P5 Ana','Case notes','Caregiver strain in free text only','Burden','AI extraction with source link','Member 360'),
 @('IMP-23','P5 Ana','Prior auth','Expires in 3 days, no renewal task','Burden','Expiry on clock column','Work Queue'),
 @('IMP-24','P5 Ana','Claims','SNF claim 60 days late','Untimely','Late-arrival flag','Member 360'),
 @('IMP-25','P5 Ana','Diagnoses','CKD stage conflict','Messy','Side-by-side with eGFR','Member 360')
)
$rows=New-Object System.Collections.ArrayList
[void]$rows.Add((Hd @('ID','Patient','Dataset','Planted imperfection','Brief''s obstacle','How the product handles it','Screen','Also stresses')))
$also=@{'IMP-04'='Documentation';'IMP-07'='Burden';'IMP-13'='Burden';'IMP-20'='Documentation';'IMP-22'='Documentation'}; foreach($i in $imp){ [void]$rows.Add(@($i)+@([string]$also[$i[0]])) }
AddSheet 'Imperfection_Log' $rows.ToArray() @(9,12,20,46,14,46,14,14) 1 'A1:H26'

# ======================= Queue_Score =======================
$rows=New-Object System.Collections.ArrayList
[void]$rows.Add(@((C 'Queue priority score: live formulas' $S.title)))
[void]$rows.Add(@('Score = weighted sum of four 0-100 inputs. Weights are the author''s assumption, to be tuned with clinicians during the pilot. Blue cells are editable.'))
[void]$rows.Add(@(''))
[void]$rows.Add(@((C 'Weights' $S.sub),(C 'Clock urgency' $S.bold),(C 'Clinical signal' $S.bold),(C 'Actionable today' $S.bold),(C 'Complexity' $S.bold),(C 'Check' $S.bold)))
[void]$rows.Add(@('',(C 0.40 $S.input),(C 0.35 $S.input),(C 0.15 $S.input),(C 0.10 $S.input),(F 'SUM(B5:E5)' 1.0 $S.num2)))
[void]$rows.Add(@(''))
[void]$rows.Add((Hd @('Patient','Clock urgency','Clinical signal','Actionable today','Complexity','Score','Rank','Why these inputs')))
$q=@(
 @('Walter Brooks',90,95,90,60,'Clock in 33 hours; contraindicated pair possible; reachable mornings; caregiver and cardiology involved'),
 @('Tanya Reed',95,85,60,80,'FUH lapses tomorrow and needs a completed visit, not only a call; recent psych stay; reachable only via caseworker; privacy and routing'),
 @('Ana Reyes',70,60,50,75,'Auth ends in 3 days; caregiver strain; daughter reachable only after 17:00; language conflict'),
 @('Marcus Bell',55,65,55,70,'HRA in 9 days; 5 ED visits; new number untested; duplicate data'),
 @('Denise Carter',20,60,70,40,'No regulatory clock; A1c rising; reachable at lunch; single condition focus')
)
$scores=@(); foreach($x in $q){ $scores += (0.4*$x[1]+0.35*$x[2]+0.15*$x[3]+0.1*$x[4]) }
$r=7;$k=0
foreach($x in $q){ $r++
  $sc=$scores[$k]; $rank=1+(@($scores|Where-Object{$_ -gt $sc}).Count)
  [void]$rows.Add(@($x[0],(C $x[1] $S.input),(C $x[2] $S.input),(C $x[3] $S.input),(C $x[4] $S.input),(F "`$B`$5*B$r+`$C`$5*C$r+`$D`$5*D$r+`$E`$5*E$r" $sc $S.num2),(F "RANK(F$r,`$F`$8:`$F`$12)" $rank $S.int),$x[5]))
  $k++
}
[void]$rows.Add(@(''))
[void]$rows.Add(@((C 'Clock urgency rubric (assumption)' $S.sub)))
[void]$rows.Add(@('Must be completed by tomorrow and depends on a third party: 95. Under 48 hours: 90. 3 days: 70. 7-10 days: 55. No regulatory clock: 20.'))
[void]$rows.Add(@((C 'Why this and not a risk score' $S.sub)))
[void]$rows.Add(@('Risk says who is sick. The queue must say who Maria can help today, and why. Rules are auditable and explainable; ML ranking can follow once the pilot has a baseline.'))
AddSheet 'Queue_Score' $rows.ToArray() @(20,13,13,13,13,10,7,80)

# ======================= Dataset_Inventory =======================
$rows=New-Object System.Collections.ArrayList
[void]$rows.Add((Hd @('#','Dataset','Source','What it tells the clinician','What Maria does differently','Freshness','Expected quality problem','How we handle it','Priority','Used by patients')))
$inv=@(
 @(1,'Member & eligibility','Plan core admin','LOB, language, state, PCP','Routes and applies the right rule set','Daily','Language and LOB can go stale','As-of label; update from each call','Must-have','P1-P5'),
 @(2,'Member contact & preferences','Enrollment, pharmacy, provider, CM log','Numbers, best time, channel, consent','Dials the number most likely to work at the best hour','Static until updated','About half confirmable in one state (J-PAL)','Score each number; log wrong numbers','Must-have','P1-P5'),
 @(3,'ADT event notices','Hospitals, HIE','Admit, discharge, transfer events','Knows who to call first; a clock started','Near real time; latency not measured publicly','Rule minimum: patient, practitioner, institution; no diagnosis or disposition','Trigger only, never clinical content','Must-have','P1,P3,P4'),
 @(4,'Discharge summary / CCD','HIE, TEFCA, fax','Reason for stay, meds, follow-ups','Reads what changed; prepares the right questions','12-34% at first follow-up (older review)','Pending tests missing in 65%','"Not received" is a task with a clock','Must-have','P1,P4'),
 @(5,'Claims, medical','Core claims','History, utilization','Sees patterns, never today','44-46% in service month, about 95% final at 4 months (Medicare FFS); use plan lag','Late; can change','Service and received dates; "may change"','Must-have','P1,P2,P3,P5'),
 @(6,'Pharmacy fills','PBM, Part D','What was dispensed and when','Spots refill gaps; asks why','Part D first record 99.44% by next month; 80.34% final','Cash fills invisible','"Dispensed", never "taking"','Must-have','P1-P5'),
 @(7,'Labs','Lab vendors, HIE','A1c, eGFR, BNP trend','Decides on escalation','Varies; no verified latency','LOINC mis-mapping 4.6% of results','"Result not received" vs "not done"; surface unmapped','Must-have','P1,P2,P5'),
 @(8,'Case history & care plan','CM system of record','Goals, barriers, last promise','Doesn''t restart the relationship','Live','Free text','AI extraction with link; clinician confirms','Must-have','P1-P5'),
 @(9,'Outreach log','Dialer, CM system','Attempts, channel, result','Knows what counts and what failed','Live','Automated calls logged as attempts','Channel and automated flag per attempt','Must-have','P2,P3,P4,P5'),
 @(10,'Prior authorization','UM system; APIs from 1 Jan 2027','Status, end dates','Extends services before they lapse','Daily; 72-hour and 7-day decisions','Drugs excluded from rule','Status with last-updated time','Must-have','P5'),
 @(11,'HRA & SDOH screen','HRA vendor, Z codes','Food, housing, transport needs','Asks about the real barrier first','Staleness not measured','Z codes on 1.59% FFS, 1.07% MA, 1.66% Medicaid','Date every answer; blank is not "no need"','Must-have','P1-P5'),
 @(12,'Quality gaps & clocks','HEDIS engine, rules','Deadlines and gaps','Works to the deadline in hours','Daily','Measure set changes yearly','Rules config, not code','Must-have','P1-P5'),
 @(13,'Risk scores','Plan models','Who is rising','Adds context only','Monthly or quarterly','Stale, opaque','Later; MVP uses transparent rules','Later','P2'),
 @(14,'Appointments & referrals','Scheduling, HIE','Is a visit booked','Avoids duplicate booking','Varies','No public coverage figure','Later; manual confirmation in MVP','Later','P1'),
 @(15,'Provider directory','Plan directory','Who to refer to','Refers to a real provider','Periodic','52.20% of MA locations inaccurate (2016-17)','Later; never the sole basis','Later',''),
 @(16,'Home health & SNF','OASIS, MDS, agency portals','Who is in the home','Coordinates with the agency','Varies','Feed varies','Later; auth and claims proxy','Later','P5'),
 @(17,'Behavioral health / Part 2','Consent-gated sources','Safe BH coordination','Coordinates with consent','Varies','Consent status required','Later; single TPO consent since Feb 2026; consent tags first','Later','P4'),
 @(18,'Remote monitoring','Devices','Weight gain alerts','Acts earlier on HF','Daily','Few enrolled; alert risk','Later','Later','P1'),
 @(19,'Community resources','211-type directories','Food, housing, transport','Closes a social need','Varies','Quality varies','Later; link out first','Later','P4'),
 @(20,'Death data','DMF, state','Stops outreach to deceased','Avoids a painful call','61% of deaths within 10 days (NCHS)','DMF in-hospital sensitivity fell 88.9% to 14.8% after 2011','Later; never close a case on DMF alone','Later','')
)
foreach($i in $inv){ $row=@(); for($c=0;$c -lt 10;$c++){ if($c -eq 0){$row+=(C $i[0] $S.int)}else{$row+=$i[$c]} }; [void]$rows.Add($row) }
AddSheet 'Dataset_Inventory' $rows.ToArray() @(4,24,24,28,34,30,34,34,11,12) 1 'A1:J21'

# ======================= Time_Model =======================
$rows=New-Object System.Collections.ArrayList
[void]$rows.Add(@((C 'Where Maria''s day goes: bottom-up estimate (confidence medium-low)' $S.title)))
[void]$rows.Add(@('No time-motion study of payer case managers was found. This model is an estimate to be replaced by a 2-4 week pilot baseline. Blue cells are assumptions.'))
[void]$rows.Add(@(''))
[void]$rows.Add(@((C 'Inputs' $S.sub)))
$inp=@(
 @('Workday (min)',480,'Standard 8 hours'),
 @('Members worked per day',10,'6 discharge alerts on a Monday plus scheduled follow-ups; assumption'),
 @('Screens per member',7,'Brief: six or seven screens'),
 @('Minutes per screen',1.5,'Assumption; sensitivity 1-2 min'),
 @('Reconciling per member (min)',2,'Assumption'),
 @('Dials per day',16,'1.6 per member; assumption'),
 @('Minutes per dial',3,'Dial, wait, voicemail, log; assumption'),
 @('Number hunts per day',4,'Assumption; 25% of dials'),
 @('Minutes per number hunt',5,'Assumption'),
 @('Real conversations per day',3,'Brief: 2 by 3 pm; a third by end of day; assumption'),
 @('Minutes per conversation',20,'Assumption'),
 @('Documentation per contact (min)',30,'40-field assessment about 20 min + note about 10 min; assumption'),
 @('Failed attempt logging (min)',1.5,'Assumption'),
 @('Coordination tasks per day',5,'Auths, appointments, pharmacy, PCP; assumption'),
 @('Minutes per coordination task',10,'Assumption'),
 @('Queue triage and spreadsheet (min)',30,'Assumption')
)
foreach($i in $inp){ [void]$rows.Add(@($i[0],(C $i[1] $S.input),$i[2])) }   # rows 5-20
[void]$rows.Add(@(''))
[void]$rows.Add((Hd @('Activity','Minutes','% of day','Base case minutes','Stretch minutes','Category')))  # row 22
# computed
$chart=10*(7*1.5+2);$docs=[math]::Round(3*30+(16-3)*1.5,0,[MidpointRounding]::AwayFromZero);$out=16*3+4*5;$conv=3*20;$coord=5*10;$tri=30;$resid=480-($chart+$docs+$out+$conv+$coord+$tri)
$act=@(
 @('Chart assembly','B6*(B7*B8+B9)',$chart,60,40,'Lost'),
 @('Documentation','ROUND(B14*B16+(B10-B14)*B17,0)',$docs,90,80,'Lost'),
 @('Outreach logistics','B10*B11+B12*B13',$out,58,48,'Lost'),
 @('Real conversations','B14*B15',$conv,$null,$null,'Judgment'),
 @('Clinical coordination','B18*B19',$coord,$null,$null,'Judgment'),
 @('Team, admin, interruptions','B5-(B23+B24+B25+B26+B27+B29)',$resid,$null,$null,'Neutral'),
 @('Queue triage and spreadsheet','B20',$tri,15,10,'Lost')
)
$r=22
foreach($a in $act){ $r++
  $bc=if($null -ne $a[3]){C $a[3] $S.input}else{F "B$r" $a[2] $S.int}
  $st=if($null -ne $a[4]){C $a[4] $S.input}else{F "B$r" $a[2] $S.int}
  [void]$rows.Add(@($a[0],(F $a[1] $a[2] $S.int),(F "B$r/`$B`$5" ($a[2]/480) $S.pct),$bc,$st,$a[5]))
}
$baseTot=60+90+58+$conv+$coord+$resid+15; $strTot=40+80+48+$conv+$coord+$resid+10
[void]$rows.Add(@((C 'Total' $S.total),(F 'SUM(B23:B29)' 480 $S.total),(F 'SUM(C23:C29)' 1 $S.totalpct),(F 'SUM(D23:D29)' $baseTot $S.total),(F 'SUM(E23:E29)' $strTot $S.total),(C '' $S.total)))  # row 30
[void]$rows.Add(@(''))
[void]$rows.Add(@((C 'Read-outs' $S.sub)))
$r33=@(
 @('Chart + documentation (min)','B23+B24',($chart+$docs),$S.int,''),
 @('Chart + documentation (% of day)','B33/B5',(($chart+$docs)/480),$S.pct,''),
 @('All lost categories (min)','B23+B24+B25+B29',($chart+$docs+$out+$tri),$S.int,''),
 @('All lost categories (% of day)','B35/B5',(($chart+$docs+$out+$tri)/480),$S.pct,''),
 @('Judgment time (min)','B26+B27',($conv+$coord),$S.int,''),
 @('Judgment time (% of day)','B37/B5',(($conv+$coord)/480),$S.pct,'North-star baseline'),
 @('Time freed, base case (min/day)','B30-D30',(480-$baseTot),$S.int,''),
 @('Time freed, stretch (min/day)','B30-E30',(480-$strTot),$S.int,''),
 @('Scribe only: 10% of documentation (min/day)','0.1*B24',(0.1*$docs),$S.int,'Rotenstein JAMA 2026: about 10% of documentation time, proxy from clinicians')
)
foreach($x in $r33){ [void]$rows.Add(@($x[0],(F $x[1] $x[2] $x[3]),$x[4])) }  # rows 33-41
[void]$rows.Add(@('Extra conversations per day (base)',(F 'B39/B43' ((480-$baseTot)/50) $S.num2),'About 2 more: 3 to 5 a day'))  # 42
[void]$rows.Add(@('All-in minutes per extra conversation',(C 50 $S.input),'20 talk + about 6 prep + about 24 documentation; assumption'))  # 43
[void]$rows.Add(@(''))
[void]$rows.Add(@((C 'Capacity value (not cash savings)' $S.sub)))  # 45
[void]$rows.Add(@('Working days per year',(C 240 $S.input),'Assumption'))  # 46
[void]$rows.Add(@('Loaded hourly cost, low ($)',(C 53 $S.input),'BLS May 2023 RN at insurance carriers mean $43.30/hr, plus NC 29% benefit load; author calculation'))  # 47
[void]$rows.Add(@('Loaded hourly cost, high ($)',(C 56 $S.input),'Author calculation'))  # 48
$vl=(480-$baseTot)/60*240*53;$vh=(480-$baseTot)/60*240*56
[void]$rows.Add(@('Value per CM per year, low ($)',(F 'B39/60*B46*B47' $vl $S.int),''))
[void]$rows.Add(@('Value per CM per year, high ($)',(F 'B39/60*B46*B48' $vh $S.int),''))
[void]$rows.Add(@(''))
[void]$rows.Add(@((C 'Sensitivity on minutes per screen' $S.sub)))
[void]$rows.Add(@('Chart assembly at 1 min per screen',(F 'B6*(B7*1+B9)' 90 $S.int),''))
[void]$rows.Add(@('Chart assembly at 2 min per screen',(F 'B6*(B7*2+B9)' 160 $S.int),''))
AddSheet 'Time_Model' $rows.ToArray() @(44,12,16,16,14,12)
"check chart=$chart docs=$docs out=$out resid=$resid base=$baseTot stretch=$strTot val=$vl-$vh"

# ======================= Sources =======================
$rows=New-Object System.Collections.ArrayList
[void]$rows.Add((Hd @('Topic','Figure or fact used','Applies to','Evidence grade','URL')))
$src=@(
 @('Caseload','Median 144 members','Virginia Medicaid MCO care coordinators, 2022; SUD study, 24% response','Measured','https://www.ajmc.com/view/challenges-faced-by-medicaid-managed-care-coordinators-working-with-members-with-substance-use-disorder'),
 @('Caseload','Plan-level caseload table','Non-profit community plans, 2011','Measured, dated','https://achp.org/wp-content/uploads/ACHP-Care-Management-Handbook.pdf'),
 @('Caseload','Cap 45 average, 50 maximum','Iowa community-based case management, 2025','Rule','https://hhs.iowa.gov/media/15084/download?inline='),
 @('Time use','36% member contact, 36% prep/doc/travel; 1 hr prep/doc per hr contact; 29:1, 46:1, 87:1, 142:1','NC Medicaid Tailored Care Mgmt rate model, 2022','Assumption','https://medicaid.ncdhhs.gov/updated-tailored-care-management-rate-guidance-jan-24-2022/download'),
 @('Transitions','24-28 concurrent, about 300 a year','Care Transitions coach, home-visit model','Proxy','https://psnet.ahrq.gov/innovation/transition-coachesr-reduce-readmissions-medicare-patients-complex-postdischarge-needs'),
 @('Systems','68% multi-system inefficiency major barrier; obstacles 2-4% variance of burnout','One plan, n=80, 2012-13','Measured','https://pmc.ncbi.nlm.nih.gov/articles/PMC6557451/'),
 @('Perception','3 in 4 leaders: information gatherers','Vendor-commissioned survey','Vendor','https://pointclickcare.com/blog/our-markets/health-plans/what-care-managers-could-be-doing-instead-of-chasing-charts/'),
 @('Pay','RN at insurance carriers mean $90,070, $43.30/hr','BLS May 2023','Measured','https://www.bls.gov/oes/2023/may/naics4_524100.htm'),
 @('Time use','35.3% documentation','Hospital nurses, 36 units, 2005-06','Proxy','https://pmc.ncbi.nlm.nih.gov/articles/PMC3037121/'),
 @('Time use','About 25% documentation','Med-surg, 2018','Proxy','https://pmc.ncbi.nlm.nih.gov/articles/PMC6371290/'),
 @('Time use','157-162 min per 12-hr shift by logs vs 43% self-report','One system','Proxy','https://pmc.ncbi.nlm.nih.gov/articles/PMC9300261'),
 @('AI','About 16 min/day (10%), no change after-hours','5 hospitals, clinicians','Proxy','https://news.massgeneralbrigham.org/en/ai-scribes-linked-to-modest-reductions-in-ehr-documentation-time'),
 @('AI','RCT time-in-note effects','UCLA clinicians','Proxy','https://www.uclahealth.org/news/release/ucla-study-finds-ai-scribes-may-reduce-documentation-time'),
 @('AI','Omissions 76.3% of note errors','5 scribes, simulated visits','Proxy','https://pmc.ncbi.nlm.nih.gov/articles/PMC12605248/'),
 @('AI','F1 94.0% vs 72.7% with status','GPT-4o, preprint','Proxy','https://arxiv.org/abs/2506.11137v2'),
 @('Alerts','49-96% overridden','Drug safety alerts, 2006 review','Proxy','https://pmc.ncbi.nlm.nih.gov/articles/PMC1447540'),
 @('Alerts','Epic Sepsis Model PPV 12%','Hospital','Proxy','https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2781313'),
 @('Contact','About half of phones/addresses confirmable','80,016 Wisconsin FFS Medicaid households','Measured','https://www.povertyactionlab.org/evaluation/impact-outreach-and-assistance-navigators-medicaid-renewals-united-states'),
 @('Contact','38% of plans call state contact data accurate most of the time','Safety-net plans','Measured','https://www.kff.org/medicaid/understanding-the-role-of-medicaid-managed-care-plans-in-unwinding-pandemic-era-continuous-enrollment-perspectives-from-safety-net-plans/'),
 @('ADT','Minimum content; plans not named','42 CFR 482.24(d)','Rule','https://www.law.cornell.edu/cfr/text/42/482.24'),
 @('Claims','Received and final curves','Medicare FFS, Jul 2023 services','Measured','https://resdac.org/sites/default/files/2026-04/ccw-original-medicare-claims-part-d-events-maturity.pdf'),
 @('Discharge','12-34% available at first visit','2007 review, probably overstates today','Measured, dated','https://pubmed.ncbi.nlm.nih.gov/17327525/'),
 @('Interop','43% routinely interoperable','US hospitals, 2023','Measured','https://healthit.gov/data/data-briefs/interoperable-exchange-patient-health-information-among-us-hospitals-2023/'),
 @('Rules','SNP 3 non-automated attempts; HRA 90 days','42 CFR 422.101(f)','Rule','https://www.law.cornell.edu/cfr/text/42/422.101'),
 @('Rules','TRC clocks','NCQA','Rule','https://www.ncqa.org/report-cards/health-plans/state-of-health-care-quality-report/measures-list/transitions-of-care-trc/'),
 @('Rules','FMC 7 days','NCQA','Rule','https://www.ncqa.org/report-cards/health-plans/state-of-health-care-quality-report/follow-up-after-emergency-department-visit-for-people-with-high-risk-multiple-chronic-conditions-fmc/'),
 @('Rules','FUH 7 and 30 days','NCQA','Rule','https://www.ncqa.org/report-cards/health-plans/state-of-health-care-quality-report/measures-list/follow-up-after-hospitalization-for-mental-illness-fuh/'),
 @('Rules','TCM 2 business days, 7/14 day visits','AAFP summary of CPT 99495/6','Rule','https://www.aafp.org/family-physician/practice-and-career/getting-paid/coding/transitional-care-management/faq.html'),
 @('Rules','Part 2 consent','42 CFR 2.33','Rule','https://www.law.cornell.edu/cfr/text/42/2.33'),
 @('Rules','Tools that guide care','45 CFR 92.210','Rule','https://www.law.cornell.edu/cfr/text/45/92.210'),
 @('Rules','Prior auth and API dates','CMS-0057-F','Rule','https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f'),
 @('Rules','Revoke-all delayed to 31 Jan 2027','FCC DA 26-12','Rule','https://docs.fcc.gov/public/attachments/DA-26-12A1.pdf'),
 @('Outcomes','62.3% vs 61.7%; naive 38-point fall','Camden RCT','Measured','https://pubmed.ncbi.nlm.nih.gov/31914240/'),
 @('Outcomes','N=242,417, no reduction','Medicare Health Support','Measured','https://www.rti.org/publication/results-medicare-health-support-disease-management-pilot-program'),
 @('Stars','188 of 508 contracts at 4+; average stars','2027 Star Ratings','Measured','https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-part-d-star-ratings'),
 @('Stars','Measure weights; about 17% is author calculation','2027 Star Ratings measures','Measured + estimate','https://www.cms.gov/files/document/2027-star-ratings-measures.pdf'),
 @('Market','At least $13.4B, 2.3%','2026 MA bonus','Measured','https://www.kff.org/medicare/medicare-advantage-quality-bonus-payments/'),
 @('Market','35.2M of 64.2M','MA 2026','Measured','https://www.kff.org/medicare/medicare-advantage-in-2026-enrollment-update-and-key-trends/'),
 @('Market','Over 66M','Medicaid MCO, Jul 2024','Measured','https://www.kff.org/medicaid/10-things-to-know-about-medicaid-managed-care/'),
 @('Competition','KLAS table','2025','Measured (survey)','https://klasresearch.com/best-in-klas-ranking/care-management-solutions-payer/2025/306'),
 @('Competition','Cognizant 83.7','KLAS 2026','Measured (survey)','https://klasresearch.com/best-in-klas-ranking/care-management-solutions-payer/2026/306'),
 @('Pricing','$350-$725 per user per month','Salesforce Health Cloud list','Measured','https://www.salesforce.com/healthcare-life-sciences/health-cloud/pricing/'),
 @('Trust','75% want human review, audit trails','Black Book poll','Vendor','https://www.newswire.com/news/black-book-polls-find-health-plans-moving-from-digital-transformation-22789286'),
 @('HiLabs','Solutions page; six of top ten plans (company reported)','HiLabs','Vendor','https://www.hilabs.com/our-solutions')
)
foreach($i in $src){ [void]$rows.Add($i) }
[void]$rows.Add(@(''))
[void]$rows.Add(@((C 'Not found, so not asserted: payer CM time-motion study; national connect benchmark; payer CM turnover; public care management PMPM; verified national HEDIS percentage rates; national ADT adoption rate; MA claims lag curve; PBM latency.' $S.note)))
AddSheet 'Sources' $rows.ToArray() @(13,48,40,16,90) 1

# ======================= styles & package =======================
$styles=@'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="2"><numFmt numFmtId="164" formatCode="ddd\ d\ mmm\ yyyy"/><numFmt numFmtId="165" formatCode="0.0%"/></numFmts>
<fonts count="7">
<font><sz val="10"/><color rgb="FF1F2937"/><name val="Calibri"/></font>
<font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>
<font><b/><sz val="15"/><color rgb="FF0A2A73"/><name val="Calibri"/></font>
<font><b/><sz val="10"/><color rgb="FF1F2937"/><name val="Calibri"/></font>
<font><sz val="10"/><color rgb="FF2B6CF0"/><name val="Calibri"/></font>
<font><i/><sz val="10"/><color rgb="FF4B5563"/><name val="Calibri"/></font>
<font><b/><sz val="11"/><color rgb="FF0A2A73"/><name val="Calibri"/></font>
</fonts>
<fills count="6">
<fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF0A2A73"/><bgColor indexed="64"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFFDE8E8"/><bgColor indexed="64"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFE8F6EE"/><bgColor indexed="64"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFE8EEFB"/><bgColor indexed="64"/></patternFill></fill>
</fills>
<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border>
<border><left style="thin"><color rgb="FFD1D5DB"/></left><right style="thin"><color rgb="FFD1D5DB"/></right><top style="thin"><color rgb="FFD1D5DB"/></top><bottom style="thin"><color rgb="FFD1D5DB"/></bottom><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="16">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment vertical="top" horizontal="left" wrapText="1"/></xf>
<xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="0" fontId="4" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top" horizontal="right"/></xf>
<xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment vertical="top" horizontal="right"/></xf>
<xf numFmtId="2" fontId="3" fillId="5" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top" horizontal="right"/></xf>
<xf numFmtId="0" fontId="5" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="0" fontId="0" fillId="4" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="0" fontId="6" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="3" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment vertical="top" horizontal="right"/></xf>
<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
<xf numFmtId="3" fontId="3" fillId="5" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top" horizontal="right"/></xf>
<xf numFmtId="165" fontId="3" fillId="5" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top" horizontal="right"/></xf>
</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>
'@

$ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
$wbSheets='';$wbRels=''
for($i=0;$i -lt $sheets.Count;$i++){ $n=$i+1
  $ct+="<Override PartName=`"/xl/worksheets/sheet$n.xml`" ContentType=`"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml`"/>"
  $wbSheets+="<sheet name=`"$($sheets[$i].name)`" sheetId=`"$n`" r:id=`"rId$n`"/>"
  $wbRels+="<Relationship Id=`"rId$n`" Type=`"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet`" Target=`"worksheets/sheet$n.xml`"/>"
}
$ct+='</Types>'
$wbRels+="<Relationship Id=`"rId$($sheets.Count+1)`" Type=`"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles`" Target=`"styles.xml`"/>"
$wb="<?xml version=`"1.0`" encoding=`"UTF-8`" standalone=`"yes`"?><workbook xmlns=`"http://schemas.openxmlformats.org/spreadsheetml/2006/main`" xmlns:r=`"http://schemas.openxmlformats.org/officeDocument/2006/relationships`"><sheets>$wbSheets</sheets><calcPr calcId=`"191029`" fullCalcOnLoad=`"1`"/></workbook>"
$rootRels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'
$wbRelsXml="<?xml version=`"1.0`" encoding=`"UTF-8`" standalone=`"yes`"?><Relationships xmlns=`"http://schemas.openxmlformats.org/package/2006/relationships`">$wbRels</Relationships>"

if(Test-Path $outFile){ Remove-Item $outFile -Force -Confirm:$false }
$enc=New-Object Text.UTF8Encoding($false)
$fs=[IO.File]::Open($outFile,'Create')
$zip=New-Object IO.Compression.ZipArchive($fs,[IO.Compression.ZipArchiveMode]::Create)
function AddEntry($p,$c){ $e=$zip.CreateEntry($p); $st=$e.Open(); $b=$enc.GetBytes($c); $st.Write($b,0,$b.Length); $st.Close() }
AddEntry '[Content_Types].xml' $ct
AddEntry '_rels/.rels' $rootRels
AddEntry 'xl/workbook.xml' $wb
AddEntry 'xl/_rels/workbook.xml.rels' $wbRelsXml
AddEntry 'xl/styles.xml' ($styles.Trim())
for($i=0;$i -lt $sheets.Count;$i++){ AddEntry "xl/worksheets/sheet$($i+1).xml" $sheets[$i].xml }
$zip.Dispose();$fs.Close()

# validate: every part parses as XML
$z=[IO.Compression.ZipFile]::OpenRead($outFile)
foreach($e in $z.Entries){ $sr=New-Object IO.StreamReader($e.Open()); $txt=$sr.ReadToEnd(); $sr.Close(); [xml]$x=$txt; "$($e.FullName) ok $($txt.Length)" }
$z.Dispose()
"Sheets: " + (($sheets | ForEach-Object { $_.name }) -join ', ')
