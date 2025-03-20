from pydantic import BaseModel
from typing import Optional



class DirectMessageType(BaseModel):
    id: Optional[int] = None
    user_id: Optional[int] = None
    title: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        allow_mutation = True


class MessageType(BaseModel):
    id: Optional[int] = None
    dm_id: int
    content: str
    timestamp: str
    is_ai: bool
