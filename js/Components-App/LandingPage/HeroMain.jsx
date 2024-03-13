import React, { useState, useEffect, useRef } from "react";
import RightIcon from "../../../images/icons/Arrow right.svg";
import { MainButton } from "../../Utilities/Buttons";
import Image1 from "../../../images/Landing Page/Main Hero_1.jpg";
import Image2 from "../../../images/Landing Page/Main Hero_2.jpg";
import Image3 from "../../../images/Landing Page/Main Hero_3.jpg";
import Image4 from "../../../images/Landing Page/Main Hero_4.jpg";
import { heroMainImageGap } from "../../Settings/cssVariables";
import { useSpring, useInView, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import useSize from "@react-hook/size";

// not cropped iamges
import Medical1 from "../../../images/Landing Page/NotCropped/Medical 1.jpg";
import Medical2 from "../../../images/Landing Page/NotCropped/Medical 2.jpg";
import Medical3 from "../../../images/Landing Page/NotCropped/Medical 3.jpg";
import Medical4 from "../../../images/Landing Page/NotCropped/Medical 4.jpg";

export const HeroMain = () => {
  const imageGap = parseInt(heroMainImageGap);
  const [ref, { width, height }] = useMeasure();

  const parentContainer = useRef();
  const outerContainer = useRef();
  const innerContainer = useRef();

  const [parentContainerWidth, parentContainerHeight] =
    useSize(parentContainer);
  const [outerContainerWidth, outerContainerHeight] = useSize(outerContainer);
  const [innerContainerWith, innerContainerHeight] = useSize(innerContainer);

  const [springsImage1, setSpringsImage1] = useSpring(() => {
    return {
      from: {
        // Somehow it needs to be applied before mounting...
        // but size is given when mounting is done..

        // try any work around, when Ctrl+S again, it works

        // some basic examples with '?:' contitions work
        // look for examples, maybe useSpring as an object, not as function?
        width: parentContainerWidth
          ? `${(parentContainerWidth - imageGap * 2) / 3}px`
          : `initial`,
      },
    };
  }, []);

  const [springsImage2, setSpringsImage2] = useSpring(() => {
    return {
      from: {
        zIndex: 0,
      },
    };
  }, []);

  const [springsImage3, setSpringsImage3] = useSpring(() => {
    return {
      from: {
        zIndex: 0,
      },
    };
  }, []);

  const [springsImage4, setSpringsImage4] = useSpring(() => {
    return {
      from: {
        zIndex: 0,
      },
    };
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
      {/* {console.log(`${(parentContainerWidth - imageGap * 2) / 3}px`)} */}
      <div className="hero-main__right-column" ref={parentContainer}>
        <div className="right-column__images-outer" ref={outerContainer}>
          <animated.img
            src={Medical2}
            className="right-column__image1"
            style={{ ...springsImage1 }}
          />
          <div className="right-column__images-inner" ref={innerContainer}>
            <img src={Medical3} className="right-column__image2" />
            <img src={Medical4} className="right-column__image3" />
          </div>
        </div>
        <img src={Medical1} className="right-column__image4" />
      </div>
    </div>
  );
};
