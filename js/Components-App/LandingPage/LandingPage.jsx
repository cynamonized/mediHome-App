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
import { HeroMain } from "./HeroMain";
import { HeroMainOld } from "./HeroMainOLd";
import { HeartQuote } from "./Utilities/HeartQuote";
import { BestPeopleBanner } from "./BestPeopleBanner";
import { Quote } from "./Quote.";
import PeopleBanner from "../../../images/Landing Page/About-Us-Banner.jpg";

export const LandingPage = () => {
  return (
    <>
      <HeroMerged />
      <Companies />
      <ServicesLegacy />
      <AboutUs />
      <Testimonials />
      <Contact />
      <BestPeopleBanner imagePath={"/images/About-Us-Banner.jpg"} />
      <Careers />

      <Quote />
      <Footer />
    </>
  );
};
