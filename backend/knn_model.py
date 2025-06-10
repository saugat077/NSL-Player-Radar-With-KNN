import numpy as np
from sklearn.neighbors import NearestNeighbors
from models import OutfieldPlayer  # Changed from relative import
from sqlalchemy.orm import Session
# List of features used for similarity
FEATURE_COLUMNS = [
    "goals","shots","touches_in_box","aerials_won","possession_won",
    "defensive_actions","touches","dribbles_attempted","chances_created"
]

def get_similar_players_knn(db: Session, player_id: int, n_neighbors: int = 5):
    players = db.query(OutfieldPlayer).all()

    if not players:
        return []

    # Extract player data into feature matrix
    player_ids = [p.id for p in players]
    X = np.array([[getattr(p, col) for col in FEATURE_COLUMNS] for p in players])

    # Fit KNN
    knn = NearestNeighbors(n_neighbors=n_neighbors)
    knn.fit(X)

    # Find the selected player's index
    try:
        idx = player_ids.index(player_id)
    except ValueError:
        return []

    distances, indices = knn.kneighbors([X[idx]])

    similar_players = [players[i] for i in indices[0] if players[i].id != player_id]
    selected_player = players[idx]

    return {
        "selected": selected_player,
        "similar": similar_players[:4]  # Only 4 similar
    }
