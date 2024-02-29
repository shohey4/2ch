from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict
from pydantic.alias_generators import to_camel


class PostBase(BaseModel):
    thread_id: int = Field(..., alias="threadId")
    email: str
    user_name: str = Field(..., alias="userName")
    content: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    post_id: int = Field(..., alias="postId")
    created_at: datetime = Field(..., alias="createdAt")
    user_id: str = Field(..., alias="userId")

    model_config = ConfigDict(
        from_attributes = True,
        alias_generator = to_camel,
        populate_by_name = True
    )


class ThreadBase(BaseModel):
    title: str


class ThreadCreate(ThreadBase):
    post: PostCreate


class Thread(ThreadBase):
    id: int
    created_at: datetime = Field(..., alias="createdAt")
    updated_at: datetime = Field(..., alias="updatedAt")

    count_posts: int = Field(..., alias="countPosts")

    model_config = ConfigDict(
        from_attributes = True,
        alias_generator = to_camel,
        populate_by_name = True
    )


# class TaskBase(BaseModel):
#     title: str
#     done: bool = False


# class TaskCreate(TaskBase):
#     pass


# class Task(TaskBase):
#     id: int
#     created_at: datetime
#     updated_at: datetime
#     user_id: int

#     class Config:
#         orm_mode = True


# class UserBase(BaseModel):
#     name: str


# class UserCreate(UserBase):
#     pass


# class User(UserBase):
#     id: int
#     created_at: datetime
#     tasks: list[Task] = []

#     class Config:
#         orm_mode = True
