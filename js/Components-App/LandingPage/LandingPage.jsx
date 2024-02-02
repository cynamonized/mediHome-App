import React, { useState, useEffect } from "react";
import { Footer } from "../Footer";
import { HeroMerged } from "./HeroMerged";
import { Companies } from "./Companies";
import { Services } from "./ServicesPoor";
import { AboutUs } from "./AboutUs";
import { Contact } from "./Contact";
import { Testimonials } from "./Testomonials";
import { Careers } from "./Careers";
import { ServicesLegacy } from "./ServicesLegacy";
import { HeroMainPuzzles } from "./HeroMaainPuzzles";
import { HeroMain } from "./HeroMain";
import { HeroMainOld } from "./HeroMainOLd";

export const LandingPage = () => {
  return (
    <>
      <HeroMain />
      {/* <HeroMainBackup /> */}
      <HeroMainOld />
      {/* <HeroMainPuzzles /> */}
      {/* <ServicesLegacy /> */}
      {/* <Services /> */}
      {/* <HeroMerged />
      <Companies />
      <Services />
      <AboutUs />
      <Testimonials />
      <Contact />
      <Careers />
      <Footer /> */}
      {/* <HeroMerged /> */}
    </>
  );
};
