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
import { Calculator } from "./Calculator";
import {
  useParallax,
  useParallaxController,
  ParallaxProvider,
  Parallax,
} from "react-scroll-parallax";

export const LandingPage = () => {
  return (
    <>
      <ParallaxProvider>
        <LandingComponents />
      </ParallaxProvider>
    </>
  );
};

const LandingComponents = () => {
  return (
    <>
      <ParallaxProvider />
      <HeroMerged />
      <Companies />
      <ServicesLegacy />
      <Parallax speed={150}>
        <Calculator />
      </Parallax>
      <Contact />
      <AboutUs />
      <Testimonials />
      <BestPeopleBanner imagePath={"/images/About-Us-Banner-Big.jpg"} />
      <Careers />
      <Quote />
      <Footer />
    </>
  );
};
