from datetime import datetime

from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Thread(Base):
    __tablename__ = "threads"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
        index=True,
    )

    posts = relationship("Post", back_populates="thread")


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    thread_id = Column(Integer, ForeignKey("threads.id"), index=True)
    post_id = Column(Integer, index=True)
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )
    user_name = Column(String)
    user_id = Column(String, nullable=False)
    email = Column(String)
    content = Column(String, nullable=False)

    thread = relationship("Thread", back_populates="posts")


# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, unique=True, index=True)
#     created_at = Column(DateTime, default=datetime.now(), nullable=False)

#     tasks = relationship("Task", back_populates="user")


# class Task(Base):
#     __tablename__ = "tasks"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String, index=True)
#     done = Column(Boolean, default=False, index=True)
#     created_at = Column(DateTime, default=datetime.now(), nullable=False)
#     updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
#     user_id = Column(Integer, ForeignKey("users.id"))

#     user = relationship("User", back_populates="tasks")
