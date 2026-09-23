# Surawanee Dnyanmandir — Deployment & Database Architecture Guide

## 1. Database & Persistence Verification

Your data from yesterday was **never lost**. It is safely stored inside the persistent SQLite database file:
- **Database File:** `surawanee.sqlite` (located in the project root)
- **Verified Records in SQLite:**
  - **Courses (7 total):** includes your `'test'` course added yesterday at `2026-09-08 11:32:45`
  - **Categories (10 total):** includes your `'abc'` category added yesterday at `2026-09-08 11:20:15`
  - **Inquiries & Student Enrollments:** persisted in their respective SQLite tables.

### Why was it not showing in the browser today?
Previously, the project had two separate servers:
1. The **React Frontend** (Vite on port `5173`)
2. The **Django Backend with SQLite** (port `8000`)

When you ran `npm run dev`, it only started Vite. The Django database server was not running in the background. Because the frontend could not reach port 8000, it silently fell back to temporary sample/mock data in your browser.

---

## 2. What We Fixed (Zero Setup Required)

1. **Unified Dev Command (`npm run dev`):**
   - Running `npm run dev` now launches **both** the Django backend (`http://localhost:8000`) and the Vite frontend (`http://localhost:5173`) together.
   - You only need to run one command!
2. **Live Database Status Indicator:**
   - In the **Admin Dashboard** (`/admin`), a real-time status pill and overview card show:
     - 🟢 **SQLite Database: Connected (Live Sync)**
     - Current DB: `surawanee.sqlite`
     - Last Synced timestamp & "Sync Database" button.
3. **Robust Data Synchronization:**
   - The database is now treated as authoritative.
   - Any edits or additions are saved to both the database and browser cache with automatic fallback and recovery.
4. **Deploy-Ready Single Server:**
   - The Django backend is now configured to automatically serve the built React production frontend (`dist/`) and all static assets, making it deployable as a single service on any cloud provider!

---

## 3. Production Deployment Options

### Option A: 1-Click Single Service (Render.com / Railway / VPS / Heroku)
Because Django now serves both the REST API and the React SPA, you can deploy the entire site on a single host.

**Build Command:**
```bash
npm install && npm run build && pip install -r requirements.txt && python manage.py migrate
```

**Start Command:**
```bash
python manage.py runserver 0.0.0.0:$PORT
```
*(or using gunicorn: `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`)*

---

### Option B: Decoupled Deployment (Vercel Frontend + Render Backend)
- **Frontend (Vercel / Netlify):**
  - Framework: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Environment Variable: `VITE_API_BASE_URL=https://your-backend-api.com`
- **Backend (Render / Railway / VPS):**
  - Root directory with `manage.py` and `surawanee.sqlite`
  - Set `ALLOWED_HOSTS=*`
