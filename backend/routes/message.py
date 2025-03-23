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
    if not dms:
        dms = []
    return dms

@msg_router.get('/message/{dm_id}')
async def get_dm_messages(cookies= Depends(verify_jwt_token_request), dm_id: int= -1):
    if dm_id == -1:
        return []
    messages = await api.db.get_dms_messages(dm_id)
    return messages


@msg_router.post('/')
async def create_new_chat(direct_message: DirectMessageType,cookies=Depends(verify_jwt_token_request)):
    cookies = Cookies(**cookies)
    direct_message.user_id = cookies.user_id
    print(direct_message.model_dump())
    try:
        dm = api.db.build_direct_message(direct_message)
        await api.db.create_direct_message(dm)
        return {"message": "created chat successfully"}
    except Exception as e:
        print('e: ',e)
        return {"error": True}


@msg_router.websocket('/ws')
async def message_websocket_enpoint(websocket: WebSocket, token: str):
    is_valid = verify_jwt_token(token)
    if not is_valid:
        websocket.close()
    cookies = Cookies(**is_valid)
    chat_bot = Chatbot()
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        
        msg = MessageType(dm_id=data['dm_id'], content=data['content'], is_ai=False)

        message = api.db.build_message(msg)

        await api.db.create_message(message)

        chat_bot.add_input(msg)

        ai_content = chat_bot.send_chat()

        ai_msg = MessageType(dm_id=data['dm_id'], content=ai_content['data'], is_ai=True)

        # ai_message = api.db.build_message(ai_msg)

        # ai_message = await api.db.create_message(ai_message)

        if ai_msg:
            # format_ai_message = ai_message.model_dump()
            await websocket.send_json(ai_msg.model_dump())
            chat_bot.add_input(ai_msg)