from fastapi import FastAPI, Depends, HTTPException, Response, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from models import OutfieldPlayer
from models import User
from database import get_db, engine, Base
from sqlalchemy import func
from starlette.responses import JSONResponse
from auth import hash_password, verify_password
from schemas import UserCreate

import uuid
from knn_model import get_similar_players_knn, FEATURE_COLUMNS  # Changed import

Base.metadata.create_all(bind=engine)
app = FastAPI()

# CORS origins: यहाँ frontend को URL राख
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


# CORS middleware जोड्ने
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # अनुमति दिने frontend हरु
    allow_credentials=True,
    allow_methods=["*"],         # GET, POST, PUT, DELETE सबै method हरु अनुमति
    allow_headers=["*"],         # सबै headers अनुमति
)

sessions = {}

@app.get("/")
def root():
    return {"message": "NSL Player Radar API is running!"}

@app.get("/teams")
def get_teams():
    return [
        "Lalitpur FC",
        "Kathmandu Razers",
        "Butwal Lumbini FC",
        "Dhangadi FC",
        "FC Chitwan",
        "Pokhara Thunders",
        "Jhapa FC"
    ]
@app.get("/players/all")
def get_all_players(db: Session = Depends(get_db)):
    players = db.query(OutfieldPlayer).order_by(OutfieldPlayer.name.asc()).all()
    return [{"id": p.id, "name": p.name, "team": p.team} for p in players]


@app.get("/players/search")
def search_players(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    players = db.query(OutfieldPlayer).filter(OutfieldPlayer.name.ilike(f"%{q}%")).all()
    return [{"id": p.id, "name": p.name, "team": p.team} for p in players]

@app.get("/players/by_team/{team_name}")
def players_by_team(team_name: str, db: Session = Depends(get_db)):
    players = db.query(OutfieldPlayer).filter(
        func.lower(OutfieldPlayer.team) == team_name.lower()
    ).all()
    return [{"id": p.id, "name": p.name} for p in players]

@app.get("/players/details/{player_id}")
def get_player_details(player_id: int, db: Session = Depends(get_db)):
    player = db.query(OutfieldPlayer).filter(OutfieldPlayer.id == player_id).first()
    if not player:
        return {"error": "Player not found"}

    return {
        "id": player.id,
        "name": player.name,
        "age": player.age,
        "position": player.position,
        "team": player.team,
        "metrics": {
            "goals": player.goals,
            "shots": player.shots,
            "touches_in_box": player.touches_in_box,
            "aerials_won": player.aerials_won,
            "possession_won": player.possession_won,
            "defensive_actions": player.defensive_actions,
            "touches": player.touches,
            "dribbles_attempted": player.dribbles_attempted,
            "chances_created": player.chances_created,
        }
    }

@app.get("/similar_players/{player_id}")
def similar_players(player_id: int, db: Session = Depends(get_db)):
    result = get_similar_players_knn(db, player_id)

    if not result:
        return {"error": "Player not found or insufficient data"}

    return result  # Already JSON-serializable



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dummy check, replace with actual DB check
fake_user = {"email": "user@example.com", "hashed_password": pwd_context.hash("password123")}

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/register")
def register(data: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        username=data.username,   # ✅ add username here
        email=data.email,
        password=hash_password(data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)  # optional: to get the generated ID, etc.

    return {"message": "User registered", "user_id": new_user.id}


@app.post("/login")
def login(data: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    session_token = str(uuid.uuid4())
    sessions[session_token] = user.id
    response.set_cookie(key="session", value=session_token, httponly=True)

    return {
        "message": "Login successful",
        "token": session_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }
