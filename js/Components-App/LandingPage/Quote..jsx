import React, { useState, useEffect } from "react";
import { HeartQuote } from "./Utilities/HeartQuote";

export const Quote = () => {
  return (
    <section className="quote-container container">
      <div className="quote__left-column">
        <HeartQuote />
      </div>

      <div className="quote__right-column">
        <p className="right-column__quote-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut
          turpis eleifend.
        </p>
        <p className="right-column__quote-name">Laura Smith</p>
        <p className="right-column__quote-title">
          Nurse at mediHome for over 5 years
        </p>
      </div>
    </section>
  );
};
