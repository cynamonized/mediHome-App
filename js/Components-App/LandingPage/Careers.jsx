import React, { useState, useEffect } from "react";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import MainImage from "../../../images/Landing Page/Careers_1.jpg";
import { QuaternaryButton } from "../../Utilities/Buttons";

export const Careers = () => {
  const performContact = () => {
    console.log("This is a placeholder");
  };

  return (
    <section id="careers" className="careers container">
      <div className="careers__title-section">
        <Eyebrow>CAREERS</Eyebrow>
        <h2 className="landing-section-title">
          We are looking for passionate professionals to join our team
        </h2>
      </div>
      <div className="careers__columns">
        <div className="columns__left-column">
          <SingleProfession
            color={"#1CA7EC"}
            name={"Internists"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut turpis eleifend."
            }
          />

          <SingleProfession
            color={"#4ADEDE"}
            name={"Administrative workers"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut turpis eleifend."
            }
          />

          <SingleProfession
            color={"#438BD3"}
            name={"Nurses"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut turpis eleifend."
            }
          />

          <SingleProfession
            color={"#787FF6"}
            name={"Dentists"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut turpis eleifend."
            }
          />

          <SingleProfession
            color={"#787FF6"}
            name={"Orthodontists"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut turpis eleifend."
            }
          />

          <SingleProfession
            color={"#1F2F98"}
            name={"Managers"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut turpis eleifend."
            }
          />
        </div>
        <div className="columns__right-column">
          <p className="right-column__decription">
            Tell us a little bit more about yourself and share your CV with us,
            we will be happy to talk to you!
          </p>
          <div className="right-column__button-container">
            <QuaternaryButton callbackAction={performContact} wide={true}>
              CONTACT US
            </QuaternaryButton>
          </div>

          <img src={MainImage} alt="" className="right-column__main-image" />
        </div>
      </div>
    </section>
  );
};

const SingleProfession = ({ color, name, description }) => {
  return (
    <div className="single-profession">
      <div className="single-profession__head">
        <p className="head__name" style={{ color: `${color}` }}>
          {name}
        </p>
      </div>

      <div className="single-profession__body">
        <p className="body__description">{description}</p>
      </div>
    </div>
  );
};
