from fastapi import APIRouter, WebSocket

msg_router = APIRouter(prefix='/messages')



@msg_router.websocket('/ws')
async def message_websocket_enpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        print(data)
        print(type(data))
        await websocket.send_json({"data": "i received it, thanks"})