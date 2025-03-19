

class AccountInfo:
    def __init__(self):
        pass
    
    def set_email(self, email):
        self.email = email
        
    def set_id(self, id):
        self.id = id
        
    def set_user_id(self, id):
        self.user_id = id
    
    def get_email(self):
        return self.email
    
    def get_id(self):
        return self.id
    
    def get_user_id(self):
        return self.user_id
    
    def prepare_insert(self):
        return (self.get_email(), self.get_user_id())