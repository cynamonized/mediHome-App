import React, { useState, useEffect } from "react";
import { LandingNav } from "./LandingNav";
import { HeroMain } from "./HeroMain";
import { ParallaxProvider } from "react-scroll-parallax";

export const HeroMerged = () => {
  return (
    <>
      <LandingNav />
      <HeroMain />
    </>
  );
};
