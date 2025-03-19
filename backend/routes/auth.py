from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse, HTMLResponse
from lib.types import Token, Cookies
from lib.functions import create_jwt_token, verify_jwt_token
from config import Config
from state import ApplicationState
from lib.functions import https_checker

api = ApplicationState()
auth_router = APIRouter(prefix='/auth')




@auth_router.post('/login')
async def login_via_email_password(user: LoginCredential):
    # check if user exists and if the password is correct
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

@auth_router.post('/signup')
async def signup(user: SignupCredential):
    # verify user does not exist
    # build user
    # return success messages
    pass


    
@auth_router.get('/protected')
async def get_protected_route(user=Depends(verify_jwt_token)):
    return JSONResponse(content=user)