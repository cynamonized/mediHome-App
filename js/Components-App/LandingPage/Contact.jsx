import React, { useState, useEffect } from "react";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import MainImage from "../../../images/Landing Page/Contact_1.jpg";
import { QuaternaryButton } from "../../Utilities/Buttons";

export const Contact = () => {
  const performSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="contact container">
      <div className="contact__title-section">
        <div className="title-section__eyebrow-centered">
          <Eyebrow>CONTACT</Eyebrow>
        </div>

        <h2 className="landing-section-title contact-title">
          We will help you choose the best option
        </h2>
      </div>

      <div className="contact__columns">
        <div className="columns__left-column">
          <p className="left-column__description subtitle-description">
            Our consultants will help you choose the best subscription type.
            Share your email with us and our team will contact you with an
            offer.
          </p>

          <form
            action="submit"
            className="left-column__form"
            onSubmit={(e) => performSubmit(e)}
          >
            <textarea
              name=""
              id=""
              cols="30"
              rows="7"
              placeholder="Type your message here"
              className="form-write form__custom-area"
            ></textarea>

            <input
              type="email"
              placeholder="Enter email here"
              className="form-write form__custom-area"
            />
            <div className="form__button-area">
              <QuaternaryButton
                callbackAction={(e) => performSubmit(e)}
                wide={true}
              >
                SEND
              </QuaternaryButton>
            </div>
          </form>
        </div>

        <div className="columns__right-column">
          <img src={MainImage} alt="" className="right-column__image" />
        </div>
      </div>
    </section>
  );
};
