from enum import Enum


class Gender(Enum):
    MALE = "male"
    FEMALE = "female"
    NON_BINARY = "non binary"
    PREFER_NOT_TO_SAY = "prefer not to say"
    OTHER = "other"