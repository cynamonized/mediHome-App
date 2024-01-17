import React, { useState, useEffect } from "react";
import { Footer } from "../Footer";
import { HeroMerged } from "./HeroMerged";
import { Companies } from "./Companies";
import { Services } from "./Services";
import { AboutUs } from "./AboutUs";
import { Contact } from "./Contact";
import { Testimonials } from "./Testomonials";
import { Careers } from "./Careers";

// links in hooks in patient portal are now broken (/single-appointment/  --> /portal/)

export const LandingPage = () => {
  return (
    <>
      <HeroMerged />
      <Companies />
      <Services />
      <AboutUs />
      <Contact />
      <Testimonials />
      <Careers />
      <Footer />
    </>
  );
};
