from datetime import datetime

class AccountInfo:
    def __init__(self):
        pass
    
    def set_email(self, email=None):
        self.email = email

    def set_hashed_password(self, hashed_password=None):
        self.hashed_password = hashed_password
    def set_id(self, id):
        self.id = id
    def set_dob(self, dob):
        self.dob = datetime.strptime(dob, "%Y-%m-%d").date()

    def set_user_id(self, id=None):
        self.user_id = id
    
    def get_email(self):
        return self.email
    
    def get_hashed_password(self):
        return self.hashed_password
    
    def get_dob(self):
        return self.dob
    
    def get_id(self):
        return self.id
    
    def get_user_id(self):
        return self.user_id
    
    def prepare_insert(self):
        return (self.get_email(), self.get_dob(), self.get_hashed_password(),self.get_user_id())