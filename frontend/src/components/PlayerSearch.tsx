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

interface PlayerSearchProps {
  onSelect: (player: Player) => void;
}

type Player = {
  id: number;
  name: string;
  team: string;
};

type TeamResponse = string[];
type PlayersResponse = Player[];

const PlayerSearch: React.FC<PlayerSearchProps> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [teamsRes, playersRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/teams"),
          fetch("http://127.0.0.1:8000/players/all")
        ]);

        const teamsData = await teamsRes.json() as TeamResponse;
        const playersData = await playersRes.json() as PlayersResponse;

        setTeams(teamsData);
        setPlayers(playersData.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        console.error("Initial data fetch failed", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSearchResults = async () => {
      if (searchTerm.length < 2 && searchTerm.length !== 0) return;
      
      setIsLoading(true);
      try {
        let url = "";
        
        if (searchTerm.length === 0) {
          const res = await fetch("http://127.0.0.1:8000/players/all", { signal });
          const data = await res.json() as PlayersResponse;
          setPlayers(data.sort((a, b) => a.name.localeCompare(b.name)));
          return;
        }
        
        const teamMatch = teams.find(team => 
          team.toLowerCase() === searchTerm.toLowerCase()
        );
        
        url = teamMatch
          ? `http://127.0.0.1:8000/players/by_team/${encodeURIComponent(teamMatch)}`
          : `http://127.0.0.1:8000/players/search?q=${encodeURIComponent(searchTerm)}`;
        
        setSelectedTeam(teamMatch || null);
        
        const res = await fetch(url, { signal });
        const data = await res.json() as PlayersResponse;
        setPlayers(data);
      } catch (error) {
        if (!(error instanceof Error && error.name === "AbortError")) {
          console.error("Search failed:", error);
          setPlayers([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    const timeoutId = setTimeout(fetchSearchResults, 300);

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
    onSelect(player);
  };

  return (
    <div className="flex justify-center items-center space-x-4 mb-12">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-80 justify-start"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : 
              selectedPlayer 
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
              {isLoading ? (
                <CommandEmpty>Loading...</CommandEmpty>
              ) : (
                <>
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

                  <CommandGroup heading={selectedTeam ? `Players from ${selectedTeam}` : "Players"}>
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
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button 
        className="bg-purple-800 hover:bg-purple-900"
        disabled={!selectedPlayer}
      >
        Save Image
      </Button>
    </div>
  );
};

export default PlayerSearch;
