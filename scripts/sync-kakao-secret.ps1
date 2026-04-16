param(
  [string]$SecretsPath = '',
  [string]$OutputPath = ''
)

$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
if (-not $OutputPath) {
  $OutputPath = Join-Path $repoRoot 'assets\js\site-config.js'
}

$candidatePaths = @()
if ($SecretsPath) {
  $candidatePaths += $SecretsPath
} else {
  $candidatePaths += (Join-Path $repoRoot 'secret.env')
  $candidatePaths += 'C:\dreamlabs\vscodex\config\secrets.env'
}

$resolvedSecretsPath = $candidatePaths | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $resolvedSecretsPath) {
  throw "Secrets file not found. Checked: $($candidatePaths -join ', ')"
}

$line = Get-Content $resolvedSecretsPath | Where-Object { $_ -match '^KAKAO_JAVASCRIPT_KEY=' } | Select-Object -First 1
if (-not $line) {
  throw 'KAKAO_JAVASCRIPT_KEY not found in secrets file.'
}

$key = ($line -split '=', 2)[1].Trim()
if ([string]::IsNullOrWhiteSpace($key)) {
  throw 'KAKAO_JAVASCRIPT_KEY is empty.'
}

$targetDir = Split-Path $OutputPath -Parent
New-Item -ItemType Directory -Path $targetDir -Force | Out-Null

@"
window.__DAYCARE_SITE_CONFIG__ = {
  kakaoMapAppKey: '$key'
};
"@ | Set-Content -Path $OutputPath -Encoding UTF8

Write-Host "Kakao config synced: $OutputPath"
