import React, { useState, useEffect } from "react";
import { Footer } from "../Footer";
import { HeroMerged } from "./HeroMerged";
import { Companies } from "./Companies";

// links in hooks in patient portal are now broken (/single-appointment/  --> /portal/)

export const LandingPage = () => {
  return (
    <>
      <HeroMerged />
      <Companies />
      <Footer />
    </>
  );
};
