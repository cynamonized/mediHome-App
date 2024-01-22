import React, { useState, useEffect } from "react";
import ImageTall from "../../../images/Landing Page/About Us_1.jpg";
import ImageShort from "../../../images/Landing Page/About Us_2.jpg";
import { Eyebrow } from "./Utilities/LandingGenericComponents";

export const AboutUs = () => {
  return (
    <section id="about-us" className="about-us container">
      <div className="about-us__left-column">
        <img src={ImageTall} alt="" className="left-column__image-tall" />
        <img src={ImageShort} alt="" className="left-column__image-short" />
      </div>

      <div className="about-us__right-column">
        <Eyebrow>ABOUT US</Eyebrow>
        <h2 className="landing-section-title right-column__title">
          Why choose our clinic?
        </h2>
        <p className="right-column__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          sapien, volutpat sed leo ac, dictum placerat ante.
        </p>

        <div className="right-column__stats">
          <SingleStat number="214" text="Best doctors" />
          <SingleStat number="24" text="Clinic locations" />
          <SingleStat number="1500+" text="Monthly patients capacity" />
          <SingleStat number="12000+" text="Appointments yearly" />
        </div>
      </div>
    </section>
  );
};

const SingleStat = ({ number, text }) => {
  return (
    <div className="stats__single-stat">
      {/* ADD A RISING NUMBER COMP/HOOK */}
      {/* I FOUND IT ALREADY - OneTab/Trello/Notion? */}
      <p className="single-stat__number">{number}</p>
      <p className="single-stat__text">{text}</p>
    </div>
  );
};
