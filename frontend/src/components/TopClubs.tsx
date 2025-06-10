import React from "react";

export default function TopClubs() {
  const clubs = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/en/2/25/Lalitpur_City_FC.png",
      website: "https://www.instagram.com/lalitpurcityfootballclub/?hl=en",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/en/f/f0/Kathmandu_RayZRs_Football_Club_Logo.png",
      website: "https://www.instagram.com/kathmandu_rayzrs/?hl=en",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/en/8/81/Butwal_Lumbini_F.C._logo.png",
      website: "https://www.instagram.com/butwallumbinifc/?hl=en",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/en/c/c4/Dhangadhi_FC_logo.png",
      website: "https://www.instagram.com/dhangadhifc/?hl=en",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/en/a/ad/FC_Chitwan_logo.png",
      website: "https://www.instagram.com/fc.chitwan/?hl=en",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/en/b/ba/Pokhara_Thunders_logo.png",
      website: "https://www.instagram.com/pokharathunders/?hl=en",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/en/8/89/Jhapa_FC_logo_File.png",
      website: "https://www.instagram.com/jhapafc/?hl=en",
    },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex justify-center items-center relative z-[1] flex-wrap gap-6">
          {clubs.map((club, i) => (
            <a
              key={i}
              href={club.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20 flex items-center justify-center hover:scale-150 transition-transform"
            >
              <img
                src={club.logo}
                alt={`Club ${i + 1}`}
                className="w-10 h-10 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
