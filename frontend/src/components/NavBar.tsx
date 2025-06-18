import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NavBarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({ isLoggedIn, setIsLoggedIn }: NavBarProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1️⃣  Pick up any token that was left in localStorage
  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  // 2️⃣  Hit FastAPI /login when the user clicks Login
  const handleLogin = async () => {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };
  

  return (
    <nav
      className="bg-white w-full relative z-[0] -mt-[40px]"
      style={{ fontFamily: 'Integral CF' }}
    >
      <div className="relative flex items-center">
        {/* Logo Section */}
        <div className="w-[150px] flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/4a/Nepal_Super_League_logo.png"
            alt="NSL Logo"
            className="w-[150px] h-auto object-contain"
          />
        </div>

        {/* Purple Navbar */}
        <div
          className="flex items-center relative w-full ml-2"
          style={{
            height: '48px',
            backgroundColor: '#4A125C',
          }}
        >
          {/* Nav Items */}
          <div className="pl-6 pr-20 flex items-center space-x-8 text-white font-medium">
            <a href="#" className="hover:text-purple-300">HOME</a>
            <a href="#" className="hover:text-purple-300">TEAMS</a>
            <a href="#" className="hover:text-purple-300">PLAYERS</a>
            <a href="#" className="hover:text-purple-300">NEWS</a>
          </div>

          {/* Right-aligned items container */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-4">
            {/* Login Button and Dialog */}
            <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-white text-purple-900 hover:bg-purple-100">
            {isLoggedIn ? "Logged In" : "Login"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-purple-900">Login to your account</DialogTitle>
          </DialogHeader>

          {/* email / password inputs (unchanged) */}

          <div className="flex justify-between">
            <Button variant="outline" className="text-purple-900 border-purple-900">
              Register Now
            </Button>
            <Button
              type="button"
              className="bg-purple-900 hover:bg-purple-800"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>

            {/* Search Input */}
            <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-md shadow-sm">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                className="w-[150px] h-[15px] border-none focus-visible:ring-0 text-sm"
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
