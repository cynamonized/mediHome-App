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
      {/* <Parallax pages={9} className="animation-parallax">
        <ParallaxLayer offset={0} speed={0.5}>
          <HeroMerged />
          <Companies />
          <ServicesLegacy />
        </ParallaxLayer>

        <ParallaxLayer speed={2} offset={1}>
          <Calculator />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5}>
          <Contact />
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.5}>
          <AboutUs />
        </ParallaxLayer>

        <ParallaxLayer offset={4} speed={0.5}>
          <Testimonials />
        </ParallaxLayer>

        <ParallaxLayer offset={5} speed={0.5}>
          <BestPeopleBanner imagePath={"/images/About-Us-Banner-Big.jpg"} />
        </ParallaxLayer>

        <ParallaxLayer offset={6} speed={0.5}>
          <Careers />
        </ParallaxLayer>

        <ParallaxLayer offset={7} speed={0.5}>
          <Quote />
        </ParallaxLayer>

        <ParallaxLayer offset={8} speed={0.5}>
          <Footer />
        </ParallaxLayer>
      </Parallax> */}

      {/* <HeroMerged />
      <Companies />
      <ServicesLegacy />
      <Calculator />
      <Contact />
      <AboutUs />
      <Testimonials />
      <BestPeopleBanner imagePath={"/images/About-Us-Banner-Big.jpg"} />
      <Careers />
      <Quote />
      <Footer /> */}
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
