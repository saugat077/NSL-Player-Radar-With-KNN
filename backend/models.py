from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

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

class Goalkeeper(Base):
    __tablename__ = "goalkeepers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer)
    team = Column(String)

    saves = Column(Integer)
    shots_faced = Column(Integer)
    save_percentage = Column(Float)
    shot_stop_percentage = Column(Float)
    penalty_saves = Column(Integer)
    punches = Column(Integer)
    catches = Column(Integer)
    clean_sheets = Column(Integer)
    pass_completion = Column(Float)  # percentage
