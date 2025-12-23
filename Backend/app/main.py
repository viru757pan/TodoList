from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routes import auth, todo

app = FastAPI(title="Todo List")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(todo.router)


@app.get("/")
def root():
    return {"message": "Todo API running"}
