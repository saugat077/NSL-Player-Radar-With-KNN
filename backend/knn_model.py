import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler  # <--- import scaler
from models import OutfieldPlayer
from sqlalchemy.orm import Session

FEATURE_COLUMNS = [
    "goals","shots","touches_in_box","aerials_won","possession_won",
    "defensive_actions","touches","dribbles_attempted","chances_created"
]

def get_similar_players_knn(db: Session, player_id: int, n_neighbors: int = 5):
    players = db.query(OutfieldPlayer).all()

    if not players:
        return None

    player_ids = [p.id for p in players]
    X = np.array([[getattr(p, col) for col in FEATURE_COLUMNS] for p in players])

    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    knn = NearestNeighbors(n_neighbors=n_neighbors)
    knn.fit(X_scaled)

    try:
        idx = player_ids.index(player_id)
    except ValueError:
        return None

    distances, indices = knn.kneighbors([X_scaled[idx]])

    selected_player = players[idx]

    similar_players = []
    for dist, i in zip(distances[0], indices[0]):
        if players[i].id == player_id:
            continue
        similarity = 100 * np.exp(-dist)

        similar_players.append({
            "id": players[i].id,
            "name": players[i].name,
            "team": players[i].team,
            **{col: getattr(players[i], col) for col in FEATURE_COLUMNS},
            "similarity": round(similarity, 2)
        })

    return {
        "selected": {
            "id": selected_player.id,
            "name": selected_player.name,
            "team": selected_player.team,
            **{col: getattr(selected_player, col) for col in FEATURE_COLUMNS}
        },
        "similar": similar_players[:4]
    }

