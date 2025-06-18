// components/LoginDialog.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface LoginDialogProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginDialog({
  isLoggedIn,
  setIsLoggedIn,
  username,
  setUsername,
}: LoginDialogProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password validation rules
  const passwordRules = [
    {
      id: "length",
      label: "Length of 8-10 characters",
      test: (pw: string) => pw.length >= 8 && pw.length <= 10,
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter",
      test: (pw: string) => /[a-z]/.test(pw),
    },
    {
      id: "number",
      label: "At least one numeral",
      test: (pw: string) => /\d/.test(pw),
    },
    {
      id: "no-spaces",
      label: "No spaces",
      test: (pw: string) => !/\s/.test(pw),
    },
    {
        id: "at-least-one-special",
        label: "At least one special character ! ? @ # $ % ^ & ;",
        test: (pw: string) => /[!?@#$%^&;]/.test(pw), // no tilde
      }
      ,
  ];

  const allValid = passwordRules.every((rule) => rule.test(password));

  const validateEmail = (email: string) => {
    // Simple RFC 5322 email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    if (!newUsername.trim()) {
      toast.error("Username is required.");
      return;
    }
    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (!password) {
      toast.error("Password is required.");
      return;
    }
    if (!allValid) {
      toast.error("Password does not meet all requirements.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username: newUsername }),
      });

      if (res.ok) {
        toast.success("Registration successful. Please log in.");
        setIsLoginMode(true);
        setEmail("");
        setPassword("");
        setNewUsername("");
      } else {
        const error = await res.json();
        toast.error(`Registration failed: ${error.detail || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("Network error during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (!password) {
      toast.error("Password is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const { token, username } = await res.json();
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setIsLoggedIn(true);
        setUsername(username);
        toast.success("Login successful");
        setDialogOpen(false);
        setEmail("");
        setPassword("");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Network error during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white text-purple-900 hover:bg-purple-100">
          {isLoggedIn ? username : "Login"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-purple-900">
            {isLoginMode ? "Login to your account" : "Register a new account"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {!isLoginMode && (
            <Input
              placeholder="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              disabled={loading}
            />
          )}
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <div className="relative">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete={isLoginMode ? "current-password" : "new-password"}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-purple-900"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.326.327-2.577.9-3.7m1.9-1.87A9.97 9.97 0 0112 5c5.523 0 10 4.477 10 10a9.97 9.97 0 01-3.232 7.492M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c1.315 0 2.57.327 3.7.9m1.87 1.9a9.97 9.97 0 014.67 7.202c0 1.315-.327 2.57-.9 3.7M15 12a9.97 9.97 0 01-3 3"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {!isLoginMode && (
          <div
            className="mt-4 p-3 border rounded bg-gray-50 text-sm"
            style={{ fontFamily: "monospace" }}
          >
            <strong>Password requirements:</strong>
            <ul className="mt-2 space-y-1">
              {passwordRules.map(({ id, label, test }) => {
                const valid = test(password);
                return (
                  <li key={id} className="flex items-center gap-2">
                    <svg
                      className={`w-4 h-4 flex-shrink-0 ${
                        valid ? "text-green-500" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={valid ? "text-green-600" : "text-gray-600"}>{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            className="text-purple-900 border-purple-900"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setPassword("");
              setShowPassword(false);
              setEmail("");
              setNewUsername("");
            }}
            disabled={loading}
          >
            {isLoginMode ? "Register Now" : "Back to Login"}
          </Button>
          <Button
            type="button"
            className="bg-purple-900 hover:bg-purple-800"
            onClick={isLoginMode ? handleLogin : handleRegister}
            disabled={loading}
          >
            {loading ? (isLoginMode ? "Logging in..." : "Registering...") : isLoginMode ? "Login" : "Register"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
