import React, { useState, useEffect } from "react";
import LogoTop from "../../../images/logo-mediHome-small.svg";
import "../../../scss/landing-page/landing-main.scss";
import { TertiaryButton } from "../../Utilities/Buttons";

export const LandingNav = () => {
  const goToPortal = () => {
    // go to page hook (go to app)
  };

  return (
    <section className="landing-nav__container">
      <div className="landing-nav container">
        <img src={LogoTop} className="landing-nav__logo-top"></img>

        <div className="landing-nav__right-column">
          <ul className="right-column__menu">
            <li className="menu__single-option">SERVICES</li>
            <li className="menu__single-option">ABOUT US</li>
            <li className="menu__single-option">CONTACT</li>
            <li className="menu__single-option">CAREERS</li>
          </ul>
          <TertiaryButton callbackAction={goToPortal}>
            PATIENT PORTAL
          </TertiaryButton>
        </div>
      </div>
    </section>
  );
};
