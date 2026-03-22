# Slot Machine Tracker

A full-stack application for tracking slot machine activity with a real-time heat map.

## Structure

- `frontend/` — Next.js frontend
- `backend/` — Python/FastAPI backend

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Supabase credentials
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
