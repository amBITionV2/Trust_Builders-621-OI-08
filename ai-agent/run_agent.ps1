$base = "C:\Users\HP\Downloads\peak-hours"
$venv = Join-Path $base ".venv\Scripts\Activate.ps1"
. $venv
cd $base\agent
$log = ".\outputs\agent_" + (Get-Date -Format "yyyyMMdd_HHmm") + ".log"
py .\run_agent.py *>> $log
