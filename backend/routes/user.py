from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from lib.types import SignupCredential
from state import ApplicationState

user_router = APIRouter(prefix="/users")
api = ApplicationState()

@user_router.post("/")
async def create_user(user_info: SignupCredential):
    """
    Create a new user with their account information.
    
    Args:
        user_info (SignupCredential): User information
        cookies (Cookies): User authentication cookies
        
    Returns:
        JSONResponse: Success or error message
        
    Raises:
        HTTPException: If user creation fails
    """
    try:
        
        # Build and create user
        user = api.db.build_user(user_info)
        db_user = await api.db.get_account_info_by_email(user.account_info.email)
        if db_user:
            return JSONResponse(
                    content={
                        "message": "User already exists",
                        "user_id": user.id
                    },
                    status_code=201
            )
        
        await api.db.create_user(user)
        print(f"Successfully created user for email: {user.account_info.email}")
        
        return JSONResponse(
            content={
                "message": "User created successfully",
                "user_id": user.id
            },
            status_code=201
        )
    

        
    except Exception as e:
        print(f"Unexpected error during user creation: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "code": "INTERNAL_ERROR",
                "message": "An unexpected error occurred",
                "details": {"error": str(e)}
            }
        )

        
    