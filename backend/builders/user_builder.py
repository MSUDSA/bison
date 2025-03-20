from model import User


class UserBuilder:
    def __init__(self):
        self.user = User()

    def add_id(self, id):
        self.user.set_id(id)
        return self 
    
    def add_age(self, age):
        self.user.set_age(age)
        return self 
    
    def add_name(self, name):
        self.user.set_name(name)
        return self 
    
    def add_gender(self, gender):
        self.user.set_gender(gender)
        return self 
    
    def add_occupation(self, occupation):
        self.user.set_occupation(occupation)
        return self 
    
    def add_college(self, college):
        self.user.set_college(college)
        return self
    
    def add_account_info(self, account_info):
        self.user.set_account_info(account_info)
        return self
    def build(self):
        return self.user