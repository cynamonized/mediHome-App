import React, { useState, useEffect, useRef } from "react";
import ImageTall from "../../../images/Landing Page/About Us_1.jpg";
import ImageShort from "../../../images/Landing Page/About Us_2.jpg";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import AnimatedNumbers from "react-animated-numbers";
import { useSpring, useInView, animated, useChain } from "@react-spring/web";
import useSize from "@react-hook/size";
import { easings, config } from "@react-spring/web";

export const AboutUs = () => {
  return (
    <section id="about-us" className="about-us container">
      <div className="about-us__left-column">
        <ImageTallImg />
        <ImageShortImg />
      </div>

      <div className="about-us__right-column">
        <Eyebrow>ABOUT US</Eyebrow>
        <h2 className="landing-section-title right-column__title">
          Why choose our clinic?
        </h2>
        <p className="section-title__subtitle-description right-column__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          sapien, volutpat sed leo ac, dictum placerat ante.
        </p>

        <div className="right-column__stats">
          <SingleStat number={214} text="Best doctors" />
          <SingleStat number={24} text="Clinic locations" />
          <SingleStat number={1500} text="Monthly patients capacity" />
          <SingleStat number={12000} text="Appointments yearly" />
        </div>
      </div>
    </section>
  );
};

const ImageTallImg = () => {
  const [ref, InView] = useInView();
  const [width, height] = useSize(ref);

  const props = useSpring(
    InView
      ? {
          delay: 1300,
          loop: { reverse: true },
          from: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: width / 2,
          },
          to: {
            borderTopRightRadius: width / 2,
            borderBottomRightRadius: 0,
          },
          config: {
            duration: 2000,
            easing: easings.easeOutCubic,
          },
        }
      : {}
  );

  const imageProps = useSpring(
    InView
      ? {
          delay: 1300,
          loop: { reverse: true },
          from: {
            scale: 1,
          },
          to: {
            scale: 1.2,
          },
          config: {
            duration: 2000,
            easing: easings.easeOutCubic,
          },
        }
      : {}
  );

  return (
    <>
      <animated.div
        className="left-column__container-image"
        style={{
          borderTopLeftRadius: width / 2,
          borderBottomLeftRadius: width / 2,
          ...props,
        }}
        ref={ref}
      >
        <animated.img
          src={ImageTall}
          alt=""
          className="left-column__image-tall"
          style={{ ...imageProps }}
        />
      </animated.div>
    </>
  );
};

const ImageShortImg = () => {
  const [ref, InView] = useInView();
  const [width, height] = useSize(ref);

  const props = useSpring(
    InView
      ? {
          delay: 3500,
          loop: { reverse: true },
          from: {
            borderBottomRightRadius: 0,
            borderTopLeftRadius: width / 2,
          },
          to: {
            borderBottomRightRadius: width / 2,
            borderTopLeftRadius: 0,
          },
          config: {
            duration: 2000,
            easing: easings.easeOutCubic,
          },
        }
      : {}
  );

  const imageProps = useSpring(
    InView
      ? {
          delay: 3500,
          loop: { reverse: true },
          from: {
            scale: 1.2,
          },
          to: {
            scale: 1,
          },
          config: {
            duration: 2000,
            easing: easings.easeOutCubic,
          },
        }
      : {}
  );

  return (
    <animated.div
      className="left-column__image-container--short"
      style={{
        borderTopRightRadius: width / 2,
        borderBottomLeftRadius: width / 2,
        ...props,
      }}
      ref={ref}
    >
      <animated.img
        src={ImageShort}
        alt=""
        className="left-column__image-short"
        style={{ ...imageProps }}
      />
    </animated.div>
  );
};

const SingleStat = ({ number, text }) => {
  const [num, setNum] = useState(number);

  const [ref, InView] = useInView();
  const props = useSpring({ total: InView ? num : 0 });

  return (
    <div className="stats__single-stat">
      <animated.p className="singlestat__number" ref={ref}>
        {InView ? props.total.to((x) => x.toFixed(0)) : 0}
      </animated.p>

      <p className="single-stat__text">{text}</p>
    </div>
  );
};
