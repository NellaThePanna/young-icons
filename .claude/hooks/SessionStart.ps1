$status = git status --porcelain 2>$null
if ($status) {
    $fileCount = ($status | Measure-Object).Count
    $dirs = $status | ForEach-Object { ($_ -replace '^...', '') -split '/' | Select-Object -First 1 } | Sort-Object -Unique
    Write-Host ""
    Write-Host "WORKTREE CHECK: $fileCount uncommitted file(s) across: $($dirs -join ', ')" -ForegroundColor Yellow
    Write-Host "If today's task is UNRELATED to that uncommitted work: git worktree add ../young-icons-<task> -b fix/<task>" -ForegroundColor Yellow
    Write-Host "If today's task CONTINUES that work: ignore this, carry on." -ForegroundColor Gray
    Write-Host ""
}
