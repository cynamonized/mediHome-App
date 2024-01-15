import React, { useState, useEffect } from "react";
import LogoA from "../../../images/Landing Page/mediSmallLogos/Logo A.svg";
import LogoB from "../../../images/Landing Page/mediSmallLogos/Logo B.svg";
import LogoC from "../../../images/Landing Page/mediSmallLogos/Logo C.svg";
import LogoD from "../../../images/Landing Page/mediSmallLogos/Logo D.svg";
import { Eyebrow } from "./LandingGenericComponents";

export const Services = () => {
  return (
    <div className="services container">
      <div className="services__left-column">
        <Eyebrow>{"SERVICES"}</Eyebrow>
        <h2 className="landing-section-title">
          Find service that suits you best
        </h2>
        <p className="left-column__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut
          turpis eleifend, vitae hendrerit velit venenatis.
        </p>
      </div>
      <div className="service__right-column">
        <div className="right-column__specialization-container spec-A">
          <img src={LogoA} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </div>

        <div className="right-column__specialization-container spec-B">
          <img src={LogoB} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </div>

        <div className="right-column__specialization-container spec-C">
          <img src={LogoC} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </div>

        <div className="right-column__specialization-container spec-D">
          <img src={LogoD} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </div>
      </div>
    </div>
  );
};
