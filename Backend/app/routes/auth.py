from fastapi import APIRouter, HTTPException
from app.database import db
from app.models import UserRegister, UserLogin
from app.auth import hash_password, verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
async def register(user: UserRegister):
    if await db.users.find_one({"username": user.username}):
        raise HTTPException(400, "User already exists")

    await db.users.insert_one({
        "username": user.username,
        "password": hash_password(user.password)
    })
    return {"message": "User registered"}


@router.post("/login")
async def login(user: UserLogin):
    db_user = await db.users.find_one({"username": user.username})
    print(db_user)
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({"user_id": str(db_user["_id"])})
    return {"access_token": token, "token_type": "bearer"}
