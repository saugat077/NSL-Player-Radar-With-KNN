import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PlayerSearch from "./PlayerSearch";

export default function PlayerRadar() {
  return (
    <div className="container mx-auto px-4">
      {/* Top Filters */}
      <PlayerSearch />

      {/* Player Comparison Section */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">FLORIAN WIRTZ</h3>
              <p className="text-gray-600">
                Midfielder (Attacking). Percentile rank vs midfielders with at least 500 minutes played.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-2">Opta Analyst</div>
            </div>
          </div>

          {/* Radar Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Large Chart */}
            <div className="md:col-span-1">
              <div className="relative w-64 h-64 mx-auto">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  <circle cx="100" cy="100" r="20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                  <path
                    d="M100,20 L150,50 L170,100 L150,150 L100,180 L50,150 L30,100 L50,50 Z"
                    fill="rgba(147, 51, 234, 0.3)"
                    stroke="#9333ea"
                    strokeWidth="2"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">77</div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <div className="text-sm text-gray-600">CHANCES CREATED</div>
                <div className="text-xs text-gray-500 mt-2">
                  GOALS • ASSISTS • SHOTS • DRIBBLES • DEFENSIVE ACTIONS • POSSESSION WON • AERIAL WON
                </div>
              </div>
            </div>

            {/* Similar Players Grid */}
            <div className="md:col-span-2">
              <div className="text-center mb-4">
                <h4 className="font-bold text-gray-900">PLAYERS MOST SIMILAR TO FLORIAN WIRTZ</h4>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[{
                  name: "Michael Olise (86.8%)",
                  team: "Crystal Palace 2023-24",
                  score: "77"
                }, {
                  name: "Tino (86.8%)",
                  team: "Real Betis 2023-24",
                  score: "63"
                }, {
                  name: "Xavi Simons (86.8%)",
                  team: "RB Leipzig 2023-24",
                  score: "77"
                }, {
                  name: "Kevin De Bruyne (86.8%)",
                  team: "Manchester City 2023-24",
                  score: "63"
                }].map((player, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                        <circle cx="50" cy="50" r="20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                        <circle cx="50" cy="50" r="10" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                        <path
                          d="M50,10 L70,25 L85,50 L70,75 L50,90 L30,75 L15,50 L30,25 Z"
                          fill="rgba(147, 51, 234, 0.3)"
                          stroke="#9333ea"
                          strokeWidth="1"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-lg font-bold text-purple-600">{player.score}</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{player.name}</div>
                    <div className="text-xs text-gray-500">{player.team}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
