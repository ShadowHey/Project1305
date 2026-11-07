$b="C:\Users\dhruv\Desktop\Hilabs_Deck\build"
$pdf="C:\Users\dhruv\Desktop\Hilabs_Deck\mCase_Workbench_HiLabs_APM_Case.pdf"
$p=Start-Process -FilePath "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList @("--headless=new","--disable-gpu","--no-pdf-header-footer","--virtual-time-budget=10000","--user-data-dir=$b\edgeprof","--print-to-pdf=$pdf","file:///C:/Users/dhruv/Desktop/Hilabs_Deck/build/deck.html") -PassThru -Wait
try { $o = & "C:\Users\dhruv\AppData\Local\Temp\claude\a2276b1a59ad48c0\2d976658-5e0d-4d85-8be4-0d6936cb962a\scratchpad\render_pdf.ps1" -Pdf $pdf -OutDir "$b\render" -Width 1600; $o[0]; "rendered lines: " + $o.Count } catch { "render err: $_" }
$t=[Text.Encoding]::GetEncoding(28591).GetString([IO.File]::ReadAllBytes($pdf))
"Type3: " + [regex]::Matches($t,'/Type3').Count
"Images: " + [regex]::Matches($t,'/Subtype\s*/Image').Count
[regex]::Matches($t,'/BaseFont\s*/[^\s/]+')|%{$_.Value}|Sort -Unique
exit 0
