# Estate Dashboard

Professional executive estate dashboard with:

- FastAPI backend
- React + TypeScript frontend
- Tailwind CSS
- Apache ECharts
- Excel upload
- Month / Todate mode
- Red / Orange / Green estate status logic
- Summary view
- Estate detail view

## Project structure

- `backend` - FastAPI API
- `frontend` - React + Vite dashboard

## Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

On Windows PowerShell:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend setup

Important: do not rely on the bundled `node_modules` folder from a zip file. Remove it and reinstall so the correct binaries are installed for your machine.

```bash
cd frontend
rm -rf node_modules
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell:

```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
copy .env.example .env
npm run dev
```

The frontend expects the backend API at `http://127.0.0.1:8000/api` by default.
You can change it through `VITE_API_BASE_URL` in `frontend/.env`.

## How to use

1. Start the backend on port `8000`.
2. Start the frontend on port `5173`.
3. Open the frontend in the browser.
4. Upload the monthly workbook.
5. Optionally upload the history workbook and previous-year workbook for richer analysis.

## Verified fixes included

- Summary dashboard now renders properly
- Clear empty/error state is shown before upload
- API base URL is configurable from environment
- Backend status logic now correctly marks below-budget / negative-variance estates as orange
- Parser no longer drops all rows in single-row test scenarios
- Vite scripts work even when executable permissions are missing after zip extraction

## Backend test command

```bash
cd backend
python -m pytest -q
```
