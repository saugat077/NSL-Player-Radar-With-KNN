import React from "react";
import { PolarArea } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, ChartDataLabels);

interface PlayerData {
  id: number;
  name: string;
  team: string;
  [key: string]: number | string;
}

interface Props {
  selectedPlayer: PlayerData;
  similarPlayers: PlayerData[];
  metrics: string[];
}

const metricColors: Record<string, string> = {
  goals: "rgba(255, 99, 132, 0.6)",
  assists: "rgba(54, 162, 235, 0.6)",
  shots_on_target: "rgba(255, 159, 64, 0.6)",
  touches_in_box: "rgba(75, 192, 192, 0.6)",
  aerials_won: "rgba(153, 102, 255, 0.6)",
  possession_won: "rgba(255, 206, 86, 0.6)",
  defensive_actions: "rgba(201, 203, 207, 0.6)",
  touches: "rgba(255, 99, 132, 0.4)",
  dribbles_attempted: "rgba(54, 162, 235, 0.4)",
  chances_created: "rgba(255, 159, 64, 0.4)",
};

const metricBorderColors: Record<string, string> = {
  goals: "rgba(255, 99, 132, 1)",
  assists: "rgba(54, 162, 235, 1)",
  shots_on_target: "rgba(255, 159, 64, 1)",
  touches_in_box: "rgba(75, 192, 192, 1)",
  aerials_won: "rgba(153, 102, 255, 1)",
  possession_won: "rgba(255, 206, 86, 1)",
  defensive_actions: "rgba(201, 203, 207, 1)",
  touches: "rgba(255, 99, 132, 0.8)",
  dribbles_attempted: "rgba(54, 162, 235, 0.8)",
  chances_created: "rgba(255, 159, 64, 0.8)",
};

const selectedChartOptions: ChartOptions<'polarArea'> = {
  responsive: true,
  scales: {
    r: {
      display: true,
      min: 0,
      ticks: {
        display: true,
      },
      grid: {
        display: true,
      },
      pointLabels: {
        display: true,
        font: {
          size: 10,
          weight: 'bold',
        },
        color: '#374151',
      },
    },
  },
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      display: true,
      color: "#000",
      font: {
        weight: 'bold',
      },
      formatter: (value: number) => value.toFixed(1),
      anchor: 'end',
      align: 'end',
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}`,
      },
    },
  },
};

const similarChartOptions: ChartOptions<'polarArea'> = {
  responsive: true,
  scales: {
    r: {
      display: true,
      min: 0,
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
      pointLabels: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: true,
      color: "#000",
      font: {
        weight: 'bold',
      },
      formatter: (value: number) => value.toFixed(1),
      anchor: 'end',
      align: 'end',
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}`,
      },
    },
  },
};

const PolarAreaChart: React.FC<Props> = ({ selectedPlayer, similarPlayers, metrics }) => {
  const generatePlayerData = (player: PlayerData) => ({
    labels: metrics.map((m) => m.replace(/_/g, " ")),
    datasets: [{
      label: player.name,
      data: metrics.map((metric) => {
        const value = player[metric];
        return typeof value === 'string' ? parseFloat(value) : value;
      }),
      backgroundColor: metrics.map((metric) => metricColors[metric] || "rgba(0,0,0,0.3)"),
      borderColor: metrics.map((metric) => metricBorderColors[metric] || "rgba(0,0,0,0.6)"),
      borderWidth: 1,
    }],
  });

  const selectedPlayerData = generatePlayerData(selectedPlayer);

  return (
    <div className="grid grid-cols-5 gap-4 mt-8">
      {/* Selected Player Chart */}
      <div className="col-span-2">
        <h2 className="text-lg font-bold mb-2 text-center">
          {selectedPlayer.name} ({selectedPlayer.team})
        </h2>
        <PolarArea data={selectedPlayerData} options={selectedChartOptions} />
      </div>

      {/* Similar Players Charts */}
      <div className="col-span-3 grid grid-cols-2 gap-4">
        {similarPlayers.map((player) => {
          const playerData = generatePlayerData(player);

          return (
            <div key={player.id} className="w-[180px] h-[200px] mx-auto">
              <h3 className="text-sm font-semibold text-center mb-1">
                {player.name} ({player.team})
              </h3>
              <PolarArea data={playerData} options={similarChartOptions} width={180} height={180} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolarAreaChart;
