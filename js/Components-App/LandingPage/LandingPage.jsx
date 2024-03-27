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
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export const LandingPage = () => {
  return (
    <>
      <Parallax
        pages={11}
        // style={{ top: "0", left: "0" }}
        className="animation-parallax"
      >
        <ParallaxLayer speed={0.5} offset={0}>
          <HeroMerged />
          <Companies />
          <ServicesLegacy />
        </ParallaxLayer>

        <ParallaxLayer speed={3} offset={1}>
          <Calculator />
        </ParallaxLayer>

        {/* NA TROPIE YAY */}

        {/* <ParallaxLayer speed={0.5}>
          
        </ParallaxLayer>

        <ParallaxLayer speed={5}>
          <Calculator />
        </ParallaxLayer>

        <ParallaxLayer speed={0.5}>
          <Contact />
        </ParallaxLayer>

        <ParallaxLayer speed={0.5}>
          <AboutUs />
        </ParallaxLayer>

        <ParallaxLayer speed={0.5}>
          <Testimonials />
        </ParallaxLayer>

        <ParallaxLayer speed={0.5}>
          <BestPeopleBanner imagePath={"/images/About-Us-Banner-Big.jpg"} />
        </ParallaxLayer>

        <ParallaxLayer speed={0.5}>
          <Careers />
        </ParallaxLayer>

        <ParallaxLayer speed={0.5}>
          <Quote />
        </ParallaxLayer>

        <ParallaxLayer speed={0.5}>
          <Footer />
        </ParallaxLayer> */}
      </Parallax>
    </>
  );
};
