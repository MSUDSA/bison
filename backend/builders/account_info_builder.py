from model import AccountInfo

class AccountInfoBuilder:
    def __init__(self):
        self.account_info = AccountInfo()
    def add_dob(self, dob):
        self.account_info.set_dob(dob)
        return self
    def add_email(self, email):
        self.account_info.set_email(email)
        return self
    def add_id(self, id):
        self.account_info.set_id(id)
        return self
    def add_user_id(self, user_id):
        self.account_info.set_user_id(user_id)
        return self
    def add_hashed_password(self, password):
        self.account_info.set_hashed_password(password)
        return self
    def build(self):
        return self.account_info