from sqlalchemy import Column, Integer, String, Float
from database import Base

class OutfieldPlayer(Base):
    __tablename__ = "outfield_players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer)
    position = Column(String)
    team = Column(String)

    goals = Column(Integer)
    shots = Column(Integer)
    touches_in_box = Column(Integer)
    aerials_won = Column(Integer)
    possession_won = Column(Integer)
    defensive_actions = Column(Integer)
    touches = Column(Integer)
    dribbles_attempted = Column(Integer)
    chances_created = Column(Integer)


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
