from dotenv import load_dotenv
import threading
import asyncpg
from config import Config
from builders import UserBuilder, AccountInfoBuilder
import asyncio
load_dotenv()

class Database:
    __instance = None
    connected = False
    __lock = threading.Lock()

    def __new__(cls):
        with cls.__lock:
            if cls.__instance is None:
                cls__instance = super(Database, cls).__new__(cls)
                cls.__instance.state = None
        return cls.__instance

    async def connect(self):
        if not self.connected:
            await asyncio.sleep(3)
            self.url = Config.DB_URL
            con : asyncpg.connection.Connection = await asyncpg.connect(self.url)
            self.connection = con
            self.connected = True
        return self

    async def disconnect(self):
        if self.connected:
            await self.connection.close()
            self.connected = False

    
