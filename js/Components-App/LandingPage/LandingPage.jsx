import React, { useState, useEffect } from "react";
import { Footer } from "../Footer";
import { HeroMerged } from "./HeroMerged";
import { Companies } from "./Companies";
import { Services } from "./Services";
import { AboutUs } from "./AboutUs";
import { Contact } from "./Contact";
import { Testimonials } from "./Testomonials";
import { Careers } from "./Careers";

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
