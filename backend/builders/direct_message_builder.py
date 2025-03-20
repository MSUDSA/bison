from model import DirectMessage


class DirectMessageBuilder:
    def __init__(self):
        self.direct_message = DirectMessage()


    def add_id(self, id):
        self.direct_message.set_id(id)
        return self
    
    def add_created_at(self, created_at):
        self.direct_message.set_created_at(created_at)
        return self

    def add_user_id(self, user_id):
        self.direct_message.set_user_id(user_id)
        return self
    
    def add_title(self, title):
        self.direct_message.set_title(title)
        return self
    
    def build(self):
        return self.direct_message
