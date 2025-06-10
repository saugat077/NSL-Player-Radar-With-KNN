import React, { useEffect, useState } from "react";
import PolarAreaChart from "./PolarAreaChart";
import PlayerSearch from "./PlayerSearch";

interface PlayerData {
  id: number;
  name: string;
  team: string;
  [key: string]: any;
}

const metrics = [
  "goals",
  "shots",
  "touches_in_box",
  "aerials_won",
  "possession_won",
  "defensive_actions",
  "touches",
  "dribbles_attempted",
  "chances_created"
];

const PlayerRadar: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
  const [similarPlayers, setSimilarPlayers] = useState<PlayerData[]>([]);

  const handleSelection = async (player: PlayerData) => {
    const res = await fetch(`http://localhost:8000/similar_players/${player.id}`);
    const data = await res.json();
    setSelectedPlayer(data.selected);
    setSimilarPlayers(data.similar);
  };

  useEffect(() => {
    const fetchDefaultPlayer = async () => {
      const res = await fetch(`http://localhost:8000/similar_players/30`);
      const data = await res.json();
      setSelectedPlayer(data.selected);
      setSimilarPlayers(data.similar);
    };

    fetchDefaultPlayer();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <PlayerSearch onSelect={handleSelection} />

      {selectedPlayer && similarPlayers.length > 0 && (
        <PolarAreaChart
          selectedPlayer={selectedPlayer}
          similarPlayers={similarPlayers}
          metrics={metrics}
        />
      )}
    </div>
  );
};

export default PlayerRadar;
