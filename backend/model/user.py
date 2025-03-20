


class User:
    def __init__(self):
        pass
    
    def set_id(self, id):
        self.id = id
    
    def set_age(self, age):
        self.age = age

    def set_name(self, name):
        self.name = name
    
    def set_gender(self, gender):
        self.gender = gender
        
    def set_occupation(self, occupation):
        self.occupation = occupation
        
    def set_college(self, college):
        self.college = college
    
    def set_account_info(self, account_info):
        self.account_info = account_info
    
    def get_id(self):
        return self.id
        
    def get_age(self):
        return self.age
    
    def get_name(self):
        return self.name
    
    def get_gender(self):
        return self.gender.value
    
    def get_occupation(self):
        return self.occupation
    
    def get_college(self):
        return self.college
    
    def get_account_info(self):
        return self.account_info
    
    def prepare_insert(self):
        return (self.get_name(), self.get_age(), self.get_gender(), self.get_occupation(), self.get_college())