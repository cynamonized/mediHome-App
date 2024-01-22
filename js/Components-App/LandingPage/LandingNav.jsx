import React, { useState, useEffect } from "react";
import LogoTop from "../../../images/logo-mediHome-small.svg";
import "../../../scss/landing-page/landing-main.scss";
import { TertiaryButton } from "../../Utilities/Buttons";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

export const LandingNav = () => {
  const navigate = useNavigate();

  const goToPortal = () => {
    navigate("/portal");
  };

  return (
    <section className="landing-nav__container">
      <div className="landing-nav container">
        <img src={LogoTop} className="landing-nav__logo-top"></img>

        <div className="landing-nav__right-column">
          <ul className="right-column__menu">
            <li className="menu__single-option">
              <HashLink to="#services">SERVICES</HashLink>
            </li>
            <li className="menu__single-option">
              <HashLink to="#about-us">ABOUT US</HashLink>
            </li>
            <li className="menu__single-option">
              <HashLink to="#contact">CONTACT</HashLink>
            </li>
            <li className="menu__single-option">
              <HashLink to="#careers">CAREERS</HashLink>
            </li>
          </ul>
          <div className="right-column__button-container">
            <TertiaryButton callbackAction={goToPortal}>
              PATIENT PORTAL
            </TertiaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};
