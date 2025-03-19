from fastapi import Request, HTTPExecption
import jwt
import datetime
from config import Config

def create_jwt_token(data: dict):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    data.update({"exp": expiration})
    return jwt.encode(data, Config.SECRET_KEY, algorithm="HS256")

def verify_jwt_token(request: Request):
    token = request.cookies.get("auth_token")

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
