from dotenv import load_dotenv
import threading
import asyncpg
from config import Config
from builders import UserBuilder, AccountInfoBuilder, DirectMessageBuilder, MessageBuilder
import asyncio
from lib.types import SignupCredential, LoginCredential, DirectMessageType, MessageType

from lib.functions import hash_password

load_dotenv()

class Database:
    __instance = None
    connected = False
    connection = None
    __lock = threading.Lock()

    def __new__(cls):
        with cls.__lock:
            if cls.__instance is None:
                cls.__instance = super(Database, cls).__new__(cls)
                cls.__instance.state = None
        return cls.__instance

    async def connect(self):
        if not self.connected:
            await asyncio.sleep(3)
            self.url = Config.DB_URL
            con : asyncpg.connection.Connection = await asyncpg.connect(self.url)
            self.connection = con
            self.connected = True
        return self

    async def disconnect(self):
        if self.connected:
            await self.connection.close()
            self.connected = False

    async def create_tables(self):
        try:
            await self.connection.execute(
                """
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'concern') THEN
                        CREATE TYPE concern AS ENUM ('anxiety', 'depression', 'stress/burnout', 'ptsd', 'adhd', 'bipolar disorder', 'ocd', 'eating disorder', 'sleep issues', 'other');
                    END IF;

                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender') THEN
                        CREATE TYPE gender AS ENUM ('male', 'female', 'non-binary', 'prefer not to say', 'other');
                    END IF;
                    
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'diet') THEN
                        CREATE TYPE diet AS ENUM ('balanced & healthy', 'somewhat healthy', 'mostly unhealthy');
                    END IF;
                    
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lifestyle_factor') THEN
                        CREATE TYPE lifestyle_factor AS ENUM ('yes daily', 'few times a week', 'rarely', 'never');
                    END IF;

                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'feeling') THEN
                        CREATE TYPE feeling AS ENUM ('very happy', 'happy', 'neutral', 'sad', 'very sad');
                    END IF;

                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'experience') THEN
                        CREATE TYPE experience AS ENUM ('rarely', 'sometimes', 'often', 'all the time');
                    END IF;
                END $$ LANGUAGE plpgsql;

                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR NOT NULL,
                    age INT,
                    gender gender,
                    occupation VARCHAR,
                    college VARCHAR,
                    created_at TIMESTAMP DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS account_info (
                    id SERIAL PRIMARY KEY,
                    dob DATE,
                    email VARCHAR NOT NULL UNIQUE,
                    hashed_password VARCHAR(250),
                    created_at TIMESTAMP DEFAULT NOW(),
                    user_id INT REFERENCES users(id) ON DELETE CASCADE
                );

                CREATE TABLE IF NOT EXISTS direct_message (
                    id SERIAL PRIMARY KEY,
                    user_id INT REFERENCES users(id) ON DELETE CASCADE,
                    created_at TIMESTAMP DEFAULT NOW(),
                    title VARCHAR NOT NULL
                );

                CREATE TABLE IF NOT EXISTS message (
                    id SERIAL PRIMARY KEY,
                    dm_id INT REFERENCES direct_message(id) ON DELETE CASCADE,
                    timestamp TIMESTAMP DEFAULT NOW(),
                    is_ai BOOLEAN,
                    content TEXT NOT NULL
                    );
                """
            )
        except Exception as e:
            print(e)

    def build_user(self, user: SignupCredential, signup=True):
        user_builder = UserBuilder()
        account_info = self.build_account_info(user, signup)
        if user.age:
            user_builder = user_builder.add_age(user.age)
        if user.college:
            user_builder = user_builder.add_college(user.college)
        if user.name:
            user_builder = user_builder.add_name(user.name)
        if user.gender:
            user_builder = user_builder.add_gender(user.gender)
        if user.occupation:
            user_builder = user_builder.add_occupation(user.occupation)
        if account_info:
            user_builder = user_builder.add_account_info(account_info)
        return user_builder.build()
    
    def build_account_info(self, account_info: SignupCredential, signup=True):
        account_info_builder = AccountInfoBuilder()
        if account_info.dob:
            account_info_builder.add_dob(account_info.dob)
        if account_info.email:
            account_info_builder.add_email(account_info.email)
        if signup:
            # validate password
            
            account_info_builder.add_hashed_password(hash_password(account_info.password).decode('utf-8'))

        return account_info_builder.build()
    
    def build_direct_message(self, direct_message: DirectMessageType):
        dm = DirectMessageBuilder()
        if direct_message.id:
            dm = dm.add_id(direct_message.id)
        if direct_message.title:
            dm = dm.add_title(direct_message.title)
        if direct_message.user_id:
            dm = dm.add_user_id(direct_message.user_id)
        if direct_message.created_at:
            dm = dm.add_created_at(direct_message.created_at)
        return dm.build()
    
    def build_message(self, message: MessageType):
        msg = MessageBuilder()
        if message.id:
            msg = msg.add_id(message.id)
        if message.dm_id:
            msg = msg.add_dm_id(message.dm_id)
        if message.content:
            msg = msg.add_content(message.content)
        if message.is_ai:
            msg = msg.add_is_ai(message.is_ai)
        if message.timestamp:
            msg = msg.add_timestamp(message.timestamp)
        return msg.build()
    
    async def create_user(self, user):

            try:
                async with self.connection.transaction():
                    # Insert user
                    id_ = await self.connection.fetchval(
                        """
                        INSERT INTO users (name, age, gender, occupation, college)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING id;
                        """,
                        *user.prepare_insert()
                    )
                    
                    # Update IDs
                    user.set_id(id_)
                    user.account_info.set_user_id(id_)
                    
                    # Insert account info and preferences
                    await self.connection.execute(
                        """
                        -- Insert account info for the user
                        INSERT INTO account_info (email, dob, hashed_password, user_id)
                        VALUES ($1, $2, $3, $4);

                        """,
                        *user.account_info.prepare_insert()
                    )
                    
                    print(f"Successfully created user with ID: {id_}")
                    return id_
            except Exception as e:
                print("Failed to create user", {"error": str(e)})

    async def create_direct_message(self, direct_message):
        try:
            await self.connection.execute(
                """
                INSERT INTO direct_message (title, user_id)
                VALUES ($1, $2);
                """,
                *direct_message.prepare_insert()
            )
        except Exception as e:
            print(f"{e}")
            
    async def create_message(self, message):
        try:
            msg = await self.connection.fetchrow(
                """
                INSERT INTO message (dm_id, content, is_ai)
                VALUES ($1, $2, $3);
                """,
                *message.prepare_insert()
            )
            if msg:
                return MessageType(id=msg['id'], dm_id=msg['dm_id'], content=msg['content'], timestamp=msg['timestamp'], is_ai=msg['is_ai'])
        
        except Exception as e:
            print(f"error {e}")


    async def get_user_sorted_dms(self, user_id):
        try:
            dms = await self.connection.fetch(
                """
                SELECT
                    dm.id AS dm_id,
                    dm.user_id,
                    dm.title,
                    dm.created_at
                    (SELECT MAX(m.created_at)
                     FROM messages m
                     WHERE m.dm_id = dm.id) AS updated_at
                FROM direct_message dm
                WHERE dm.user_id = $1
                ORDER BY updated_at DESC; 
                """,
                user_id
            )
            direct_messages = []
            for dm in dms:
                direct_messages.append(DirectMessageType(id=dm['dm_id'],created_at=dm['created_at'], user_id=dm['user_id'], title=dm['title'], updated_at=dm['updated_at']))
            return direct_messages

        except Exception as e:
            print(f"{e}")

    async def get_account_info_by_email(self, email):
        if email:
            try:
                user_account_info = await self.connection.fetchrow(
                """
                    SELECT email, hashed_password FROM account_info WHERE email = $1;
                """,
                email
                    )
                if user_account_info is not None:
                    return LoginCredential(email=user_account_info['email'], password=user_account_info['hashed_password'])
            except Exception as e:
                print("Failed to get user account info", {"error": str(e)})
        return None
    
    async def get_user_token(self, email):
        if not email:
            return None
        token = await self.connection.fetchrow(
            """
            SELECT
                    u.id AS user_id,
                    u.name,
                    ai.id AS account_info_id,
                    ai.email
                FROM account_info ai
                JOIN users u ON ai.user_id = u.id
                WHERE ai.email = $1;
            """, email
        )
        if token:
            return {
                'name': token['name'],
                'email': token['email'],
                'user_id': token['user_id'],
                'account_info_id': token['account_info_id']
            }
        return None