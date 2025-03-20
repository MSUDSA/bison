

class DirectMessage:
    def __init__(self):
        pass

    def set_user_id(self, user_id):
        self.user_id = user_id

    def set_title(self, title):
        self.title = title
    
    def set_created_at(self, created_at):
        self.created_at = created_at
    
    def set_id(self, id):
        self.id = id

    def get_user_id(self):
        return self.user_id
    
    def get_title(self):
        return self.title
    
    def get_id(self):
        return self.id
    
    def get_created_at(self):
        return self.created_at
    
    def prepare_insert(self):
        return (self.get_title(), self.get_user_id())