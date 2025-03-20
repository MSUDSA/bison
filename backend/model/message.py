

class Message:
    def __init__(self):
        pass

    def set_id(self, id):
        self.id = id

    def set_dm_id(self, dm_id):
        self.dm_id = dm_id

    def set_timestamp(self, timestamp):
        self.timestamp = timestamp

    def set_content(self, content):
        self.content = content

    def set_is_ai(self, is_ai):
        self.is_ai = is_ai

    def get_id(self):
        return self.id
    
    def get_dm_id(self):
        return self.dm_id
    
    def get_timestamp(self):
        return self.timestamp
    
    def get_content(self):
        return self.content
    
    def get_is_ai(self):
        return self.is_ai
    

    def prepare_insert(self):
        return (self.get_dm_id(), self.get_content(), self.get_is_ai())