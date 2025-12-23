from fastapi import HTTPException
from fastapi import APIRouter, Depends
from app.database import db
from app.models import TodoCreate
from app.auth import get_current_user
from bson import ObjectId

router = APIRouter(prefix="/todos", tags=["Todos"])


@router.post("/")
async def create(todo: TodoCreate, user_id=Depends(get_current_user)):
    doc = {
        "title": todo.title,
        "completed": todo.completed,
        "user_id": user_id
    }
    result = await db.todos.insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return doc


@router.get("/")
async def get_all(user_id=Depends(get_current_user)):
    todos = []
    async for t in db.todos.find({"user_id": user_id}):
        t["_id"] = str(t["_id"])
        todos.append(t)
    return todos


@router.put("/{todo_id}")
async def update(todo_id: str, payload: dict, user_id=Depends(get_current_user)):
    result = await db.todos.find_one_and_update(
        {"_id": ObjectId(todo_id), "user_id": user_id},
        {"$set": {"completed": payload["completed"]}},
        return_document=True
    )

    if not result:
        raise HTTPException(status_code=404, detail="Todo not found")

    result["_id"] = str(result["_id"])
    return result


@router.delete("/{todo_id}")
async def delete(todo_id: str, user_id=Depends(get_current_user)):
    await db.todos.delete_one({
        "_id": ObjectId(todo_id),
        "user_id": user_id
    })
    return {"message": "Deleted"}
