from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from datetime import datetime

from . import models, schemas


# スレッド情報を取得 (thread_id) for
def get_thread(db: Session, thread_id: int):
    thread = (
        db.query(models.Thread).filter(models.Thread.id == thread_id).first()
    )

    return thread


def get_thread_by_title(db: Session, title: str):
    return db.query(models.Thread).filter(models.Thread.title == title).first()


# スレッド一覧を取得
def get_threads(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Thread)
        .order_by(desc(models.Thread.updated_at))
        .offset(skip)
        .limit(limit)
        .all()
    )
    # return db.query(models.Thread).offset(skip).limit(limit).all()


# スレッドを作成
def create_thread(db: Session, thread: schemas.ThreadCreate):
    # new_thread = models.Thread(**thread.dict(exclude_unset=True))
    # dict_thread = thread.dict()
    # {k: v for k, v in thread.dict().items() if k != "post"}

    new_thread = models.Thread(
        **{k: v for k, v in thread.dict().items() if k != "post"}
    )
    db.add(new_thread)
    db.commit()
    db.refresh(new_thread)

    new_post = models.Post(
        **{k: v for k, v in thread.post.dict().items() if k != "thread_id"},
        thread_id=new_thread.id,
        post_id=1,
        # 後で変更
        user_id="testID"
    )
    print(new_post)

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_thread

def update_thread(db: Session, thread_id: int):
    print("go")
    db_thread = db.query(models.Thread).filter(models.Thread.id == thread_id).first()
    if db_thread is None:
        raise HTTPException(status_code=404, detail="Thread not found")
    db_thread.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_thread)
    return db_thread

# 投稿情報を取得 (post_id)
def get_post(db: Session, post_id: int):
    return db.query(models.Post).filter(models.Post.id == post_id).first()


# 投稿一覧を取得 (thread_id)
def get_posts(db: Session, thread_id: int, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Post)
        .filter(models.Post.thread_id == thread_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_count_posts(db: Session, thread_id: int):
    return (
        # pylint: disable=E1102
        db.query(func.max(models.Post.post_id))
        .filter(models.Post.thread_id == thread_id)
        .scalar()
    )


# 投稿を作成 (thread_id)
def create_thread_post(db: Session, post: schemas.PostCreate):
    # 同じthread_id内での最大のpost_idを取得する
    # max_post_id = (
    #     # pylint: disable=E1102
    #     db.query(func.max(models.Post.post_id))
    #     .filter_by(thread_id=post.thread_id)
    #     .scalar()
    # )
    max_post_id = get_count_posts(db, post.thread_id)

    if max_post_id is 1000:
        return None

    new_post_id = max_post_id + 1

    new_post = models.Post(
        **post.dict(), post_id=new_post_id, user_id="testID"
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post




# def get_user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()


# def get_user_by_name(db: Session, name: str):
#     return db.query(models.User).filter(models.User.name == name).first()


# def get_users(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.User).offset(skip).limit(limit).all()


# def create_user(db: Session, user: schemas.UserCreate):
#     new_user = models.User(**user.dict())
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return new_user
