import React, { useState, useEffect } from "react";
import RightIcon from "../../../images/icons/Arrow right.svg";
import { MainButton } from "../../Utilities/Buttons";
import Image1 from "../../../images/Landing Page/Main Hero_1.jpg";
import Image2 from "../../../images/Landing Page/Main Hero_2.jpg";
import Image3 from "../../../images/Landing Page/Main Hero_3.jpg";
import Image4 from "../../../images/Landing Page/Main Hero_4.jpg";

export const HeroMain = () => {
  return (
    <div className="hero-main container">
      <div className="hero-main__left-column">
        <h1 className="left-column__title">
          Medical care that you always wanted
        </h1>
        <div className="left-column__subtitle">The best on the market</div>
        <MainButton>
          <div className="left-column__button-icon">
            <p>The best on the market</p>{" "}
            <img src={RightIcon} className="button-icon__icon" />
          </div>
        </MainButton>
      </div>

      <div className="hero-main__right-column">
        <div className="right-column__images-outer">
          <img src={Image1} className="right-column__image1" />
          <div className="right-column__images-inner">
            <img src={Image2} className="right-column__image2" />
            <img src={Image3} className="right-column__image3" />
          </div>
        </div>
        <img src={Image4} className="right-column__image4" />
      </div>
    </div>
  );
};
