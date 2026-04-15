param(
  [int]$Port = 8080
)

$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

Write-Host "Serving at http://localhost:$Port"

$python = Get-Command python -ErrorAction SilentlyContinue
if ($python -and $python.Source -notlike "*WindowsApps*") {
  python -m http.server $Port
  exit 0
}

npx --yes http-server . -p $Port -a 127.0.0.1
