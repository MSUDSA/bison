from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from lib.types import Token, Cookies, LoginCredential
from lib.functions import create_jwt_token, verify_jwt_token_request, verify_password, hash_password
from config import Config
from state import ApplicationState

api = ApplicationState()
auth_router = APIRouter(prefix='/auth')




@auth_router.post('/login')
async def login_via_email_password(user: LoginCredential):
    # check if user exists and if the password is correct
    db_user = await api.db.get_account_info_by_email(user.email)
    if not db_user:
        return JSONResponse(content="create an account")
    
    is_correct_password = verify_password(user.password, db_user.password)
    if not is_correct_password:
        return JSONResponse(content="incorrect password")
    token = await api.db.get_user_token(user.email)
    # get user's credential and convert it to a cookie
    cookies = Cookies(
                    name= token['name'], 
                    email=token['email'], 
                    user_id= token['user_id'], 
                    account_info_id=token['account_info_id'], 
                    metadata = {}
                    )
    access_token = create_jwt_token(cookies.model_dump())
    token = Token(access_token=access_token, expires_in = 24)
    return token.model_dump()


    
@auth_router.get('/protected')
async def get_protected_route(user =Depends(verify_jwt_token_request)):
    cookies = Cookies(**user)
    return JSONResponse(content= cookies.model_dump())