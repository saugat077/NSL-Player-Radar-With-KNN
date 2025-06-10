import React from 'react';
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
} from 'lucide-react';

const ContentSection = () => {
  return (
    <section className="w-full px-4 py-12">
      <div className="max-w-5xl mx-auto text-center font-Mosvitta">
        <h2 className="text-4xl font-semibold text-gray-900 mb-6">
          NSL Player Radar: Player Comparison Tool
        </h2>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Instagram className="w-6 h-6 text-gray-600 hover:text-purple-600 cursor-pointer" />
          <Twitter className="w-6 h-6 text-gray-600 hover:text-purple-600 cursor-pointer" />
          <Facebook className="w-6 h-6 text-gray-600 hover:text-purple-600 cursor-pointer" />
          <Youtube className="w-6 h-6 text-gray-600 hover:text-purple-600 cursor-pointer" />
          <Linkedin className="w-6 h-6 text-gray-600 hover:text-purple-600 cursor-pointer" />
        </div>

        {/* Description Text */}
        <div className="max-w-3xl mx-auto text-gray-600 text-base space-y-4 mb-8">
          <p>Find similar players in seconds with the NSL Player Radar.</p>
          <p>
            From offensive contributions like shots, dribbles, and chance creation, to defensive
            prowess such as aerial duels and defensive actions — compare different players'
            rankings across various aspects of the game.
          </p>
          <p>With our comparison tool, you can answer questions like:</p>

          <ul className="text-left list-disc list-inside space-y-2 mt-4">
            <li>Who's the most similar player to Lallana FC's Ananta Tamang?</li>
            <li>New Dhangadi FC have lost Saugat KC to Lallana FC. Who are the best forwards to replace him?</li>
            <li>What sort of player are Kathmandu Razors gaining with the signings of Saul Goodman and Jesse Pinkman?</li>
          </ul>

          <p className="mt-4">Pick a player to get started below.</p>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
