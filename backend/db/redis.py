
from redis import Redis
import threading

class Cache:
    __instance = None
    state = None
    connected = None
    __lock = threading.Lock()

    def __new__(cls):
        with cls.__lock:
            if cls.__instance is None:
                cls.__instance = super(Cache, cls).__new__(cls)
                cls.__instance.state = "running"
            return cls.__instance

    def connect(self):
        if not self.connected:
            self.connection = Redis(host='redis', port=6379, decode_responses=True)
            self.connected = True
        return self

    def disconnect(self):
        if self.connected:
            self.connection.close()
