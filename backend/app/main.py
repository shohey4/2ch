from fastapi import Depends, FastAPI, HTTPException

# from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, schemas
from .database import SessionLocal

# from pydantic import ValidationError

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "2ch app API"}


@app.post("/threads/", response_model=schemas.Thread)
async def create_thread(
    thread: schemas.ThreadCreate,
    db: Session = Depends(get_db),
):
    db_thread = crud.get_thread_by_title(db, title=thread.title)
    if db_thread:
        raise HTTPException(
            status_code=400,
            detail=f"Thread title: {thread.title} already exists.",
        )
    thread = crud.create_thread(db=db, thread=thread)
    thread.count_posts = crud.get_count_posts(db, thread_id=thread.id)
    return thread


@app.get("/threads/", response_model=list[schemas.Thread])
def get_threads(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    threads = crud.get_threads(db, skip=skip, limit=limit)
    for thread in threads:
        thread.count_posts = crud.get_count_posts(db, thread_id=thread.id)
        # ロジック的に起こらないはずだが､count_postsがNoneの場合は0を代入
        if thread.count_posts == None:
            thread.count_posts = 0
    return threads


@app.get("/threads/{thread_id}", response_model=schemas.Thread)
def get_thread(thread_id: int, db: Session = Depends(get_db)):
    thread = crud.get_thread(db, thread_id=thread_id)
    thread.count_posts = crud.get_count_posts(db, thread_id=thread_id)
    # if thread:
    #     raise HTTPException(
    #         status_code=404, detail=f"Thread ID: {thread_id} not found"
    #     )
    return thread


@app.post("/threads/{thread_id}/posts/", response_model=schemas.Post)
def create_post_for_thread(
    thread_id: int, post: schemas.PostCreate, db: Session = Depends(get_db)
):
    post.thread_id = thread_id
    post = crud.create_thread_post(db=db, post=post)
    crud.update_thread(db=db, thread_id=thread_id)
    # 同じuser_idとcontentを持つ投稿があれば､400を返す
    # db_post = crud.get_post_by_user_id_and_content(
    #     db, user_id=post.user_id, content=post.content, thread_id=post.thread_id
    # )
    # if db_post:
    #     raise HTTPException(
    #         status_code=400,
    #         detail=f"User ID: {post.user_id} and content: {post.content} already exists.",
    #     )
    return post


@app.get("/threads/{thread_id}/posts/", response_model=list[schemas.Post])
def get_posts_for_thread(
    thread_id: int,
    skip: int = 0,
    limit: int = 1000,
    db: Session = Depends(get_db),
):
    posts = crud.get_posts(db=db, thread_id=thread_id, skip=skip, limit=limit)
    return posts


# @app.exception_handler(ValidationError)
# async def validation_exception_handler(request, exc):
#     return JSONResponse(
#         content={"detail": exc.errors()}, status_code=422, by_alias=True
#     )
