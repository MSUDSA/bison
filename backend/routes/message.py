from fastapi import APIRouter, WebSocket, Depends
from lib.functions import verify_jwt_token, verify_jwt_token_request, Chatbot
from lib.types import Cookies, MessageType, DirectMessageType

from state import ApplicationState
api = ApplicationState()

msg_router = APIRouter(prefix='/messages')

@msg_router.get('/')
async def get_all_messages(cookies = Depends(verify_jwt_token_request)):
    cookies = Cookies(**cookies)
    dms = await api.db.get_user_sorted_dms(cookies.user_id)
    return dms

@msg_router.post('/')
async def create_new_chat(direct_message= DirectMessageType,cookies=Depends(verify_jwt_token_request)):
    cookies = Cookies(**cookies)
    direct_message.user_id = cookies.user_id
    dm = api.db.build_direct_message(direct_message)
    await api.db.create_direct_message(dm)
    return {"message": "created chat successfully"}


@msg_router.websocket('/ws')
async def message_websocket_enpoint(websocket: WebSocket, token: str, dm_id: int):
    is_valid = verify_jwt_token(token)
    cookies = Cookies(**is_valid)
    chat_bot = Chatbot()
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        msg = MessageType(dm_id=dm_id, content=data['content'], is_ai=False)
        
        message = await api.db.build_message(msg)
        message = await api.db.create_message(message)
        await websocket.send_json(message.model_dump())
        chat_bot.add_input(msg)
        ai_content = chat_bot.send_chat()
        ai_msg = MessageType(dm_id=dm_id, content=ai_content, is_ai=True)
        ai_message = await api.db.build_message(ai_msg)
        ai_message = await api.db.create_message(ai_message)
        await websocket.send_json(ai_message.model_dump())
        chat_bot.add_input(ai_msg)
        

