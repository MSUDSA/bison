from model import Message

class MessageBuilder:
    def __init__(self):
        self.message = Message()


    def add_id(self, id):
        self.message.set_id(id)
        return self
    
    def add_dm_id(self, dm_id):
        self.message.set_dm_id(dm_id)
        return self
    
    def add_content(self, content):
        self.message.set_content(content)
        return self
    
    def add_timestamp(self, timestamp):
        self.message.set_timestamp(timestamp)
        return self
    
    def add_is_ai(self, is_ai):
        self.message.set_is_ai(is_ai)
        return self
    
    def build(self):
        return self.message