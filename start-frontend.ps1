Set-ExecutionPolicy -Scope Process Bypass
Set-Location "$PSScriptRoot\frontend"

"VITE_API_BASE_URL=http://127.0.0.1:8000/api" | Set-Content .env

if (Test-Path "node_modules") {
  Remove-Item -Recurse -Force "node_modules"
}

npm install
npm run dev -- --host 0.0.0.0 --port 5173
