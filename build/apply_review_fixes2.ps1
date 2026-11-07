$ErrorActionPreference='Stop'
$p='C:\Users\dhruv\Desktop\Hilabs_Deck\build\deck.html'
$enc=New-Object Text.UTF8Encoding($false)
$t=[IO.File]::ReadAllText($p,$enc)
function Rep([string]$a,[string]$b){ $c=([regex]::Matches($script:t,[regex]::Escape($a))).Count; if($c -ne 1){ throw "Expected 1 match, found $c : $a" }; $script:t=$script:t.Replace($a,$b) }
# slide 5: shorter "So" lines so the gap note stays on the slide
Rep 'claims never show current status.' 'never current status.'
Rep 'a missing summary becomes a task with a clock.' 'missing = task + clock.'
Rep 'sources and conflicts stay side by side, with their origin shown.' 'show source and conflicts.'
Rep 'a blank social field never means "no need"; Maria asks.' 'blank is not "no need".'
Rep 'an ADT alert starts a clock and a call. It is never clinical content, and a plan must confirm its own feed coverage.' 'a trigger, never clinical content; confirm feed coverage per plan.'
# slide 11: tighter evidence box
Rep 'The model matters: in-person nurse transitional care cut 24-week readmission from 37.1% to 20.3% in Naylor 1999 <span class="t t-m">Measured</span>; software does not turn a phone program into that model.' 'In-person nurse care did cut 24-week readmission, 37.1% to 20.3% (Naylor 1999) <span class="t t-m">Measured</span>; software does not make a phone program that model.'
Rep 'Star context: TRC 3.4, FMC 2.5, PCR 3.4 avg stars 2027; TRC, FMC, PCR and 3 adherence measures are ~17% of MA-PD weight' 'Avg stars 2027: TRC 3.4, FMC 2.5, PCR 3.4. With 3 adherence measures, ~17% of MA-PD weight'
# slide 11: proper source numbering
$m=[regex]::Match($t,'<div class="src">Sources: 1\. <a href="https://pubmed\.ncbi\.nlm\.nih\.gov/31914240/">Camden</a>.*?</div>')
if(-not $m.Success){ throw 'slide 11 sources not found' }
$new=$m.Value
$new=$new.Replace('MHS RTI</a> <a href="https://pubmed.ncbi.nlm.nih.gov/10029122/">Naylor 1999</a> 3. ','MHS RTI</a> 3. <a href="https://pubmed.ncbi.nlm.nih.gov/10029122/">Naylor 1999</a> @4@ ')
foreach($pair in @(@(' 8. ',' 9. '),@(' 7. ',' 8. '),@(' 6. ',' 7. '),@(' 5. ',' 6. '),@(' 4. ',' 5. '))){ $new=$new.Replace($pair[0],$pair[1]) }
$new=$new.Replace('@4@','4.')
$t=$t.Replace($m.Value,$new)
[IO.File]::WriteAllText($p,$t,$enc)
'applied'
