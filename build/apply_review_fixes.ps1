$ErrorActionPreference='Stop'
$p='C:\Users\dhruv\Desktop\Hilabs_Deck\build\deck.html'
$enc=New-Object Text.UTF8Encoding($false)
$t=[IO.File]::ReadAllText($p,$enc)
function Rep([string]$a,[string]$b){ $c=([regex]::Matches($script:t,[regex]::Escape($a))).Count; if($c -ne 1){ throw "Expected 1 match, found $c : $a" }; $script:t=$script:t.Replace($a,$b) }

# Accuracy fixes
Rep 'clocks due &lt;24h' 'clocks due by Tue'
Rep '<b class="nv">Clock column in hours,</b> sorted to nearest regulatory or clinical deadline.' '<b class="nv">Clock column names the deadline</b> (regulatory or clinical). It carries the most weight in the sort.'
Rep '<span>| Case day 2</span>' '<span>| Day 2 after discharge</span>'
Rep '<b>2 Nov</b> BNP 1,240 pg/mL (HIE)<br><span class="c c-f">Fresh</span>' '<b>2 Nov</b> BNP 1,240 pg/mL (HIE), admission value<br><span class="c c-a">Aging</span>'
Rep '<b>Shelter/CHW Ms. Ortiz</b>' '<b>CHW Ms. Ortiz</b>'
Rep '<span class="btn g2">Reached, declined</span><span class="btn">Reached, engaged</span>' '<span class="btn g2">Reached, declined</span><span class="btn g2">Reached, engaged</span>'
Rep '<b class="nv">Automated flag and different-time logic</b> from 42 CFR 422.101(f).' '<b class="nv">Automated flag and different-time logic</b> from 42 CFR 422.101(f), read conservatively.'
Rep '30 min each morning-equivalent' '30 min across the day'
Rep 'these six measures ~17% of MA-PD weight' 'TRC, FMC, PCR and 3 adherence measures are ~17% of MA-PD weight'
Rep 'verified national HEDIS % rates. Pilot generates the first four.' 'verified national HEDIS % rates. The pilot baseline gives this plan its own time and connect numbers; the rest stay open.'

# Stop rule that the slide title promises
Rep '<div class="num">&lt;2%</div><div>major omission</div>' '<div class="num">&lt;2%</div><div>major omission per audited draft</div>'
Rep 'Sell compliance and audit layer, or data layer inside incumbents.</div></div>' 'Sell compliance and audit layer, or data layer inside incumbents.</div><div style="font-size:15px;line-height:1.3;margin-top:6px"><b class="rd">Stop rule:</b> pause AI drafts at once if major omissions reach 5% of audited drafts.</div></div>'

# Coverage matrix, aligned with annex Imperfection_Log (primary + also stresses)
Rep '<div class="cv">Burden</div><div class="cd"><span class="x"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="x"></span></div><div class="cd"><span class="y"></span></div>' '<div class="cv">Burden</div><div class="cd"><span class="x"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="x"></span></div><div class="cd"><span class="y"></span></div>'
Rep '<div class="cv">Messy</div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="x"></span></div><div class="cd"><span class="y"></span></div>' '<div class="cv">Messy</div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div>'
Rep '<div class="cv">Documentation</div><div class="cd"><span class="y"></span></div><div class="cd"><span class="x"></span></div><div class="cd"><span class="x"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div>' '<div class="cv">Documentation</div><div class="cd"><span class="y"></span></div><div class="cd"><span class="x"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div>'
Rep '<div class="cv">Outreach</div><div class="cd"><span class="x"></span></div><div class="cd"><span class="x"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="x"></span></div>' '<div class="cv">Outreach</div><div class="cd"><span class="x"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div><div class="cd"><span class="y"></span></div>'

# Depth: persona cards answer "what changes for her"
Rep '<i>"Tell me who, tell me why, and let me trust it."</i></div>' '<i>"Tell me who, tell me why, and let me trust it."</i></div><div style="margin-top:3px"><span class="blu">With mCase:</span> sees the med conflict at 8:06, before the first call.</div>'
Rep 'never to miss a discharge because an alert said only "admitted".</div>' 'never to miss a discharge because an alert said only "admitted".</div><div style="margin-top:3px"><span class="blu">With mCase:</span> a discharge list sorted by clock; "not received" becomes a task.</div>'
Rep 'to see social context that is current, not 8 months old.</div>' 'to see social context that is current, not 8 months old.</div><div style="margin-top:3px"><span class="blu">With mCase:</span> dated social fields, routed cases and a consent banner that reveals no content.</div>'

# Depth: stat tiles say what the number changes
$so='<div style="margin:3px 0"><b class="nv">So:</b> '
Rep 'after 4 months (Medicare FFS, Jul 2023)</div><span class="t t-m">Measured</span>' ('after 4 months (Medicare FFS, Jul 2023)</div><span class="t t-m">Measured</span>'+$so+'claims never show current status.</div>')
Rep 'probably overstates today)</div><span class="t t-m">Measured, dated</span>' ('probably overstates today)</div><span class="t t-m">Measured, dated</span>'+$so+'a missing summary becomes a task with a clock.</div>')
Rep 'hospitals routinely interoperable, 2023</div><span class="t t-m">Measured</span>' ('hospitals routinely interoperable, 2023</div><span class="t t-m">Measured</span>'+$so+'sources and conflicts stay side by side, with their origin shown.</div>')
Rep 'with a Z code, 2019</div><span class="t t-m">Measured</span>' ('with a Z code, 2019</div><span class="t t-m">Measured</span>'+$so+'a blank social field never means "no need"; Maria asks.</div>')
Rep 'plans not named as recipients</div><span class="t t-r">Rule</span>' ('plans not named as recipients</div><span class="t t-r">Rule</span>'+$so+'an ADT alert starts a clock and a call. It is never clinical content, and a plan must confirm its own feed coverage.</div>')

# Depth: the evidence behind "observed, not promised"
Rep '<div>Star context: TRC 3.4' '<div style="margin-bottom:5px">The model matters: in-person nurse transitional care cut 24-week readmission from 37.1% to 20.3% in Naylor 1999 <span class="t t-m">Measured</span>; software does not turn a phone program into that model.</div><div>Star context: TRC 3.4'
Rep '<a href="https://www.rti.org/publication/results-medicare-health-support-disease-management-pilot-program">MHS RTI</a> 3. <a href="https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-part-d-star-ratings">CMS Stars 2027</a>' '<a href="https://www.rti.org/publication/results-medicare-health-support-disease-management-pilot-program">MHS RTI</a> <a href="https://pubmed.ncbi.nlm.nih.gov/10029122/">Naylor 1999</a> 3. <a href="https://www.cms.gov/newsroom/fact-sheets/2027-medicare-advantage-part-d-star-ratings">CMS Stars 2027</a>'

[IO.File]::WriteAllText($p,$t,$enc)
'deck.html edits applied'

# ---- Annex ----
$a='C:\Users\dhruv\Desktop\Hilabs_Deck\build\build_annex.ps1'
$x=[IO.File]::ReadAllText($a)
function RA([string]$o,[string]$n){ $c=([regex]::Matches($script:x,[regex]::Escape($o))).Count; if($c -ne 1){ throw "Annex: expected 1, found $c : $o" }; $script:x=$script:x.Replace($o,$n) }
RA '<24 hours left: 95. 24-48 hours: 90. 3 days: 70. 7-10 days: 55. No regulatory clock: 20.' 'Must be completed by tomorrow and depends on a third party: 95. Under 48 hours: 90. 3 days: 70. 7-10 days: 55. No regulatory clock: 20.'
RA 'FUH lapses within 24 hours; recent psych stay;' 'FUH lapses tomorrow and needs a completed visit, not only a call; recent psych stay;'
RA 'Clock under 36 hours;' 'Clock in 33 hours;'
# Also-stresses column so the log matches the coverage matrix on slide 6
RA "'Brief''s obstacle','How the product handles it','Screen'" "'Brief''s obstacle','How the product handles it','Screen','Also stresses'"
RA 'foreach($i in $imp){ [void]$rows.Add($i) }' '$also=@{''IMP-04''=''Documentation'';''IMP-07''=''Burden'';''IMP-13''=''Burden'';''IMP-20''=''Documentation'';''IMP-22''=''Documentation''}; foreach($i in $imp){ [void]$rows.Add(@($i)+@([string]$also[$i[0]])) }'
RA "@(9,12,20,46,14,46,14) 1 'A1:G26'" "@(9,12,20,46,14,46,14,14) 1 'A1:H26'"
[IO.File]::WriteAllText($a,$x,(New-Object Text.UTF8Encoding($true)))
'annex script edits applied'
