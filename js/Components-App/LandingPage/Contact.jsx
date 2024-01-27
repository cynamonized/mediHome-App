import React, { useState, useEffect } from "react";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import MainImage from "../../../images/Landing Page/Contact_1.jpg";
import { QuaternaryButton } from "../../Utilities/Buttons";
import { useSpring, useInView, animated } from "@react-spring/web";
import useSize from "@react-hook/size";
import { easings, config } from "@react-spring/web";

export const Contact = () => {
  const [ref, InView] = useInView();
  const [width, height] = useSize(ref);

  const props = useSpring(
    InView
      ? {
          delay: 2000,
          loop: { reverse: true },
          from: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: height / 2,
          },
          to: {
            borderTopLeftRadius: height / 2,
            borderTopRightRadius: 0,
          },
          config: {
            duration: 1500,
          },
        }
      : {}
  );

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
          <animated.img
            src={MainImage}
            alt=""
            className="right-column__image"
            style={{
              borderBottomRightRadius: height / 2,
              borderBottomLeftRadius: height / 2,
              ...props,
            }}
            ref={ref}
          />
        </div>
      </div>
    </section>
  );
};
