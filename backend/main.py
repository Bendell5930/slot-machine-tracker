from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


@app.get("/")
def read_root():
    return {"message": "Slot Machine Tracker API"}


@app.get("/machines")
def get_machines():
    response = supabase.table("machines").select("*").execute()
    return response.data


@app.post("/machines/{machine_id}/activity")
def log_activity(machine_id: int, active: bool):
    response = (
        supabase.table("activity")
        .insert({"machine_id": machine_id, "active": active})
        .execute()
    )
    return response.data


@app.get("/machines/heatmap")
def get_heatmap():
    response = (
        supabase.table("activity")
        .select("machine_id, active")
        .execute()
    )
    heat = {}
    for row in response.data:
        mid = row["machine_id"]
        heat[mid] = heat.get(mid, 0) + (1 if row["active"] else 0)
    return heat
