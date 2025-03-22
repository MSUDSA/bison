from pydantic import BaseModel
from typing import Optional, Union
from lib.types.insights import Insight



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
    is_ai: bool
    dm_id: Optional[int] = None
    content: Union[str, Insight]
    timestamp: Optional[str] = None
    
