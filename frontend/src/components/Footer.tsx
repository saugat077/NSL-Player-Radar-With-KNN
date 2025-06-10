import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react"; // Adjust your icon imports accordingly

export default function Footer() {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h3
              className="font-bold text-gray-900"
              style={{
                fontFamily: 'Integral CF',
                fontSize: '48.62px',
                margin: 0,
                lineHeight: 1,
              }}
            >
              ABA KHELCHA
            </h3>
            <h4
              className="font-bold"
              style={{
                fontFamily: 'Integral CF',
                fontSize: '110.36px',
                margin: 0,
                lineHeight: 1,
                background: 'linear-gradient(90deg, #5D7DDC, #AD7FB3, #FD8289)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NEPAL
            </h4>
          </div>

          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/4/4a/Nepal_Super_League_logo.png"
              alt="Nepal Super League Logo"
              style={{ width: 260, height: 'auto' }}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <Instagram className="w-5 h-5 text-gray-600" />
          <Twitter className="w-5 h-5 text-gray-600" />
          <Facebook className="w-5 h-5 text-gray-600" />
          <Youtube className="w-5 h-5 text-gray-600" />
          <Linkedin className="w-5 h-5 text-gray-600" />
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          © 2024 Nepal Super League All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
