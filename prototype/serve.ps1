# Tiny static file server for local preview (Windows PowerShell 5.1, no installs).
# Usage:  powershell -ExecutionPolicy Bypass -File prototype\serve.ps1 [-Port 8765]
param([int]$Port=8765)
$root=Split-Path -Parent $MyInvocation.MyCommand.Path
$types=@{'.html'='text/html; charset=utf-8';'.css'='text/css; charset=utf-8';'.js'='application/javascript; charset=utf-8';'.json'='application/json';'.svg'='image/svg+xml';'.png'='image/png';'.md'='text/plain; charset=utf-8'}
$l=New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
$l.Start()
Write-Host "CareLens prototype on http://localhost:$Port/  (Ctrl+C to stop)"
while($l.IsListening){
  $c=$l.GetContext()
  try{
    $p=[Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart('/'))
    if($p -eq ''){$p='index.html'}
    $f=[IO.Path]::GetFullPath((Join-Path $root $p))
    if(-not $f.StartsWith($root) -or -not (Test-Path -LiteralPath $f -PathType Leaf)){ $c.Response.StatusCode=404; $b=[Text.Encoding]::UTF8.GetBytes('Not found') }
    else{ $b=[IO.File]::ReadAllBytes($f); $e=[IO.Path]::GetExtension($f).ToLower(); if($types[$e]){$c.Response.ContentType=$types[$e]}; $c.Response.Headers.Add('Cache-Control','no-store') }
    $c.Response.ContentLength64=$b.Length; $c.Response.OutputStream.Write($b,0,$b.Length)
  } catch { $c.Response.StatusCode=500 } finally { $c.Response.OutputStream.Close() }
}
