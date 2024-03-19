import React, { useState, useEffect, useRef } from "react";
import RightIcon from "../../../images/icons/Arrow right.svg";
import { MainButton } from "../../Utilities/Buttons";
import Image1 from "../../../images/Landing Page/Main Hero_1.jpg";
import Image2 from "../../../images/Landing Page/Main Hero_2.jpg";
import Image3 from "../../../images/Landing Page/Main Hero_3.jpg";
import Image4 from "../../../images/Landing Page/Main Hero_4.jpg";
import {
  gapHeroOuter,
  gapHeroInner,
  singleHeroColumn,
  heroImgRadius,
} from "../../Settings/cssVariables";
import {
  useSpring,
  useInView,
  animated,
  config,
  easings,
} from "@react-spring/web";
import useMeasure from "react-use-measure";
import useSize from "@react-hook/size";

// not cropped iamges
import Medical1 from "../../../images/Landing Page/NotCropped/Medical 1.jpg";
import Medical2 from "../../../images/Landing Page/NotCropped/Medical 2.jpg";
import Medical3 from "../../../images/Landing Page/NotCropped/Medical 3.jpg";
import Medical4 from "../../../images/Landing Page/NotCropped/Medical 4.jpg";

export const HeroMain = () => {
  // Below 3 are grid sizes of hero image
  const gapOuter = parseFloat(gapHeroOuter);
  const gapInner = parseFloat(gapHeroInner);
  const singleColumn = parseFloat(singleHeroColumn);
  const heroRadius = parseFloat(heroImgRadius);

  // just to check (remove later), gives the same result as gapInner
  const tempInner = (gapOuter / (singleColumn * 2 + gapOuter)) * 100;

  const defaultDuration = 1000;

  const parentContainer = useRef();
  const outerContainer = useRef();
  const innerContainer = useRef();

  const [parentContainerWidth, parentContainerHeight] =
    useSize(parentContainer);
  const [outerContainerWidth, outerContainerHeight] = useSize(outerContainer);
  const [innerContainerWith, innerContainerHeight] = useSize(innerContainer);

  const [springsImage1, setSpringsImage1] = useSpring(() => {
    return {
      delay: 600,
      config: {},
      from: {
        width: `${singleColumn}%`,
        height: `100%`,
        borderTopRightRadius: `0px`,
        borderBottomRightRadius: `${heroRadius}px`,
      },
      to: {},
    };
  }, []);

  const [springsImage2, setSpringsImage2] = useSpring(() => {
    return {
      from: {
        width: `${(100 - gapInner) / 2}%`,
        height: `${(100 - gapInner) / 2}%`,
        objectPosition: `20% 35%`,
      },
      to: {},
    };
  }, []);

  const [springsImage3, setSpringsImage3] = useSpring(() => {
    return {
      delay: 400,
      config: {},
      from: {
        width: `100%`,
        height: `${(100 - gapInner) / 2}%`,
      },
      to: {},
    };
  }, []);

  const [springsImage4, setSpringsImage4] = useSpring(() => {
    return {
      delay: 500,
      config: {},
      from: {
        objectPosition: `50% 25%`,
        height: `${singleColumn}%`,
        width: `100%`,
        borderTopLeftRadius: `0px`,
        borderTopRightRadius: `${heroRadius}px`,
      },
      to: {},
    };
  }, []);

  const runAnimation = async () => {
    const innerImagesPromise = new Promise((resolve, reject) => {
      const innerTimeout = setTimeout(() => {
        setSpringsImage2.start({
          delay: 800,
          config: {
            easing: easings.easeOutCubic,
            duration: 1800,
          },
          loop: { reverse: true },
          to: {
            width: `100%`,
          },
        });

        setSpringsImage3.start({
          delay: 1600,
          config: {
            easing: easings.easeOutCubic,
            duration: 900,
          },
          loop: { reverse: true },
          to: {
            width: `${(100 - gapInner) / 2}%`,
          },
        });

        resolve("Animation carries on...");
      }, 100);
    })
      .then((value) => {
        console.log(value);
        const outerTimeout = setTimeout(() => {
          setSpringsImage1.start({
            delay: 1800,
            config: {
              easing: easings.easeOutCubic,
              duration: 1800,
            },
            loop: { reverse: true },
            to: {
              borderTopRightRadius: `${heroRadius}px`,
              borderBottomRightRadius: `0px`,
              height: `${(100 - gapInner) / 2}%`,
            },
          });
        }, 500);
        return value;
      })
      .then((value) => {
        const secondOuterTimeout = setTimeout(() => {
          console.log(value);
          setSpringsImage4.start({
            delay: 1500,
            config: {
              easing: easings.easeOutCubic,
              duration: 750,
            },
            to: async (next, cancel) => {
              await next({
                delay: 1500,
                borderTopLeftRadius: `${heroRadius}px`,
                borderTopRightRadius: `0px`,
                width: `${((100 - gapOuter * 2) / 3) * 2}%`,
              }),
                await next({
                  delay: 1500,
                  width: `${(100 - gapOuter * 2) / 3}%`,
                });
              await next({
                delay: 800,
                width: `100%`,
                borderTopLeftRadius: `0px`,
                borderTopRightRadius: `${heroRadius}px`,
              });
            },
            loop: true,
          });
        }, 350);
      });
  };

  useEffect(() => {
    runAnimation();
  }, []);

  return (
    <div className="hero-main container">
      <div className="hero-main__left-column">
        <h1 className="hero-main__left-column__title">
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
      <div className="hero-main__right-column" ref={parentContainer}>
        <div className="right-column__images-outer" ref={outerContainer}>
          <animated.img
            src={Medical2}
            className="right-column__image1"
            style={{ ...springsImage1 }}
          />
          <div className="right-column__images-inner" ref={innerContainer}>
            <animated.img
              src={Medical3}
              className="right-column__image2"
              style={{ ...springsImage2 }}
            />
            <animated.img
              src={Medical4}
              className="right-column__image3"
              style={{ ...springsImage3 }}
            />
          </div>
        </div>
        <animated.img
          src={Medical1}
          className="right-column__image4"
          style={{ ...springsImage4 }}
        />
      </div>
    </div>
  );
};
