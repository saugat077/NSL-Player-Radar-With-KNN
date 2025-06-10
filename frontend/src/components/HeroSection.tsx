import React from 'react';
import heroImage from '../assets/hero.png';

const HeroSection = () => {
  return (
    <section className="w-full flex justify-center">
      <img
        src={heroImage}
        alt="NSL Player Radar Hero"
        className="w-[1196px] my-8 mx-8"
      />
    </section>
  );
};

export default HeroSection;
