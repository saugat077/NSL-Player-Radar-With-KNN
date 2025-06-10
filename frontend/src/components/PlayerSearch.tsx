"use client";

import React, { useState, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Player = {
  id: number;
  name: string;
  team: string;
};

export default function PlayerSearch() {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teams
        const teamsRes = await fetch("http://127.0.0.1:8000/teams");
        const teamsData = await teamsRes.json();
        setTeams(teamsData);

        // Fetch all players (sorted alphabetically)
        const playersRes = await fetch("http://127.0.0.1:8000/players/all");
        const playersData: Player[] = await playersRes.json();
        const sortedPlayers = playersData.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setPlayers(sortedPlayers);
      } catch (err) {
        console.error("Initial data fetch failed", err);
      }
    };
    
    fetchData();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSearchResults = async () => {
      try {
        let url = "";
        
        if (searchTerm.length === 0) {
          // Reset to all players when search is cleared
          const res = await fetch("http://127.0.0.1:8000/players/all", { signal });
          const data: Player[] = await res.json();
          setPlayers(data.sort((a, b) => a.name.localeCompare(b.name)));
          return;
        }
        
        // Check for exact team match
        const teamMatch = teams.find(
          team => team.toLowerCase() === searchTerm.toLowerCase()
        );
        
        if (teamMatch) {
          url = `http://127.0.0.1:8000/players/by_team/${encodeURIComponent(teamMatch)}`;
          setSelectedTeam(teamMatch);
        } else {
          url = `http://127.0.0.1:8000/players/search?q=${encodeURIComponent(searchTerm)}`;
          setSelectedTeam(null);
        }
        
        const res = await fetch(url, { signal });
        const data: Player[] = await res.json();
        setPlayers(data);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            console.error("Fetch players error:", error);
            setPlayers([]);
          }
        } else {
          console.error("Search fetch failed with unknown error", error);
        }
      }
    }

    // Add debounce for better performance
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 2 || searchTerm.length === 0) {
        fetchSearchResults();
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [searchTerm, teams]);

  const handleTeamSelect = (team: string) => {
    setSearchTerm(team);
    setSelectedTeam(team);
    setSelectedPlayer(null);
  };

  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
    setSelectedTeam(null);
    setOpen(false);
  };

  useEffect(() => {
    if (!selectedPlayer) return;
  
    const fetchSimilarPlayers = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/similar_players/${selectedPlayer.id}`);
        const data = await res.json();
        console.log("Similar players:", data); // 🔁 Replace with prop/state later
      } catch (err) {
        console.error("Failed to fetch similar players:", err);
      }
    };
  
    fetchSimilarPlayers();
  }, [selectedPlayer]);
  

  return (
    <div className="flex justify-center items-center space-x-4 mb-12">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-80 justify-start">
            {selectedPlayer 
              ? `${selectedPlayer.name} (${selectedPlayer.team})`
              : selectedTeam
                ? `Players from ${selectedTeam}`
                : "Search players or teams"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Type player name or team..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              autoFocus
            />
            <CommandList>
              {searchTerm.length === 0 && (
                <CommandGroup heading="Teams">
                  {teams.map((team) => (
                    <CommandItem
                      key={team}
                      value={team}
                      onSelect={() => handleTeamSelect(team)}
                      className="cursor-pointer"
                    >
                      {team}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              <CommandGroup 
                heading={selectedTeam 
                  ? `Players from ${selectedTeam}` 
                  : "Players"}
              >
                {players.length > 0 ? (
                  players.map((player) => (
                    <CommandItem
                      key={player.id}
                      value={player.name}
                      onSelect={() => handlePlayerSelect(player)}
                      className="cursor-pointer"
                    >
                      <div className="flex justify-between w-full">
                        <span>{player.name}</span>
                        <span className="text-muted-foreground">
                          {player.team}
                        </span>
                      </div>
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>No players found</CommandEmpty>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button className="bg-purple-800 hover:bg-purple-900">Save Image</Button>
    </div>
  );
}