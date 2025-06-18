import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginDialog from "@/components/LoginDialog";

interface NavBarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({ isLoggedIn, setIsLoggedIn }: NavBarProps) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <nav className="bg-white w-full relative z-[0] -mt-[40px]" style={{ fontFamily: "Integral CF" }}>
      <div className="relative flex items-center">
        <div className="w-[150px] flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/4a/Nepal_Super_League_logo.png"
            alt="NSL Logo"
            className="w-[150px] h-auto object-contain"
          />
        </div>

        <div className="flex items-center relative w-full ml-2" style={{ height: "48px", backgroundColor: "#4A125C" }}>
          <div className="pl-6 pr-20 flex items-center space-x-8 text-white font-medium">
            <a href="#" className="hover:text-purple-300">HOME</a>
            <a href="#" className="hover:text-purple-300">TEAMS</a>
            <a href="#" className="hover:text-purple-300">PLAYERS</a>
            <a href="#" className="hover:text-purple-300">NEWS</a>
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-4">
            <LoginDialog
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              username={username}
              setUsername={setUsername}
            />
            {isLoggedIn && (
              <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
                Logout
              </Button>
            )}
            {/* <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-md shadow-sm">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                className="w-[150px] h-[15px] border-none focus-visible:ring-0 text-sm"
                type="text"
                placeholder="Search..."
              />
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
