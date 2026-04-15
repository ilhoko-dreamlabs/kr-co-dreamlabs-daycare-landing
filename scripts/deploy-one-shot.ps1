param(
  [string]$GitRemoteUrl = "",
  [switch]$CreateCommit,
  [switch]$Push
)

$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

Write-Host "[1/5] Validate required files"
$required = @(
  "index.html",
  "styles.css",
  "app.js",
  "robots.txt",
  "sitemap.xml",
  "CNAME",
  "images/hero-main.webp"
)

foreach ($item in $required) {
  if (-not (Test-Path $item)) {
    throw "Missing required file: $item"
  }
}

Write-Host "[2/5] Ensure git repository"
if (-not (Test-Path ".git")) {
  git init -b main | Out-Null
}

Write-Host "[3/5] Ensure main branch"
git branch --show-current | Out-Null
if ($LASTEXITCODE -ne 0) {
  throw "git branch check failed."
}
git branch -M main | Out-Null

if ($CreateCommit) {
  Write-Host "[4/5] Create commit (if there are changes)"
  git add .
  git diff --cached --quiet
  if ($LASTEXITCODE -eq 1) {
    git commit -m "chore: update daycare landing package"
  } else {
    Write-Host "No staged changes. Commit skipped."
  }
} else {
  Write-Host "[4/5] Commit skipped (use -CreateCommit to enable)"
}

Write-Host "[5/5] Optional remote/push"
if ($GitRemoteUrl -ne "") {
  $hasOrigin = (git remote) -contains "origin"
  if (-not $hasOrigin) {
    git remote add origin $GitRemoteUrl
  }
}

if ($Push) {
  $hasOrigin = (git remote) -contains "origin"
  if (-not $hasOrigin) {
    throw "Push requested but origin remote is missing. Provide -GitRemoteUrl first."
  }
  git push -u origin main
} else {
  Write-Host "Push skipped (use -Push to enable)."
}

Write-Host "Done."
