import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface PlayerData {
  id: number;
  name: string;
  team: string;
  [key: string]: any;
}

interface Props {
  selectedPlayer: PlayerData;
  similarPlayers: PlayerData[];
  metrics: string[];
}

const PolarAreaChart: React.FC<Props> = ({ selectedPlayer, similarPlayers, metrics }) => {
  // Chart data for selected player
  const selectedPlayerData = {
    labels: metrics.map((metric) => metric.replace(/_/g, " ")),
    datasets: [
      {
        label: selectedPlayer.name,
        data: metrics.map((metric) => selectedPlayer[metric]),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {/* Left: Selected Player Chart */}
      <div className="col-span-1">
        <h2 className="text-lg font-bold mb-2 text-center">{selectedPlayer.name}</h2>
        <PolarArea data={selectedPlayerData} />
      </div>

      {/* Right: Similar Player Charts */}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {similarPlayers.map((player) => {
          const data = {
            labels: metrics.map((metric) => metric.replace(/_/g, " ")),
            datasets: [
              {
                label: player.name,
                data: metrics.map((metric) => player[metric]),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          };

          return (
            <div key={player.id}>
              <h3 className="text-sm font-semibold text-center">{player.name}</h3>
              <PolarArea data={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolarAreaChart;
