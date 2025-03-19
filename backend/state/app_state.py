import threading
from db import Database, Cache


class ApplicationState:
    __instance = None
    state = None
    db = None
    app = None
    cache = None
    ws_conn = []
    __lock = threading.Lock()

    def __new__(cls):
        with cls.__lock:
            if cls.__instance is None:
                cls.__instance = super(ApplicationState, cls).__new__(cls)
                cls__instance = "running"
            return cls__instance

    def get_state(self):
        return self.state

    def set_db(self, db: Database):
        if self.db is None:
            self.db = db

    def set_cache(self, cache: Cache):
        if self.cache is None:
            self.cache = cache

    def add_ws_conn(self, conn):
        self.ws_conn.append(conn)

    async def initialize(self):
        if self.state is None:
            self.cache = self.cache.connect()
            self.db = await self.db.connect()
            await self.db.create_tables()
