import React, { useState, useEffect, useRef } from "react";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import MainImage from "../../../images/Landing Page/Careers_Updated.jpg";
import { QuaternaryButton } from "../../Utilities/Buttons";
import { useSpring, useInView, animated } from "@react-spring/web";
import useSize from "@react-hook/size";
import { SingleProfession } from "./Utilities/CareersSingleProfession";
import { careerCards } from "./Utilities/careerCards";
import { isRef } from "react-date-picker/dist/cjs/shared/propTypes";
import useMeasure from "react-use-measure";
import { easings, config } from "@react-spring/web";

export const Careers = () => {
  const [imageAnimationRef, InView] = useInView();
  const leftColumn = useRef();
  const imageRef = useRef();
  const [leftColumnWidth, leftColumnHeight] = useSize(leftColumn);
  const [imageWidth, imageHeight] = useSize(imageRef);
  const [boxChosen, setBoxChosen] = useState(0);

  // B task
  const [closeThisBox, setCloseThisBox] = useState(0);

  const [animationCompleted, setAnimationCompleted] = useState(true);

  const [ref, { width, height }] = useMeasure();

  const imageProps = useSpring(
    InView
      ? {
          delay: 1000,
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

  const containerProps = useSpring(
    InView
      ? {
          delay: 1000,
          loop: { reverse: true },
          from: {
            borderTopLeftRadius: 0,
            borderBottomRightRadius: imageWidth / 2,
          },
          to: {
            borderTopLeftRadius: imageWidth / 2,
            borderBottomRightRadius: 0,
          },
          config: {
            duration: 2000,
            easing: easings.easeOutCubic,
          },
        }
      : {}
  );

  const contactButton = () => {
    console.log("Placeholder for contact action");
  };

  // Works only if none of the boxes is opened
  const performContact = (boxIndex) => {
    setBoxChosen(boxIndex);
  };

  // B task
  // Works only if one of the boxes is opened already
  const closeAnotherBigBox = (requestedBoxIndex) => {
    if (boxChosen) {
      setCloseThisBox(boxChosen);
      setBoxChosen(requestedBoxIndex);
    }
  };

  return (
    <section id="careers" className="careers container">
      <div className="careers__title-section">
        <Eyebrow>CAREERS</Eyebrow>
        <h2 className="landing-section-title">
          We are looking for passionate professionals to join our team
        </h2>
      </div>
      <div className="careers__columns" ref={imageAnimationRef}>
        <div className="columns__left-column" ref={ref}>
          {careerCards.map((element) => {
            return (
              <SingleProfession
                key={element.index}
                color={element.color}
                name={element.name}
                description={element.description}
                boxIndex={element.index}
                boxPointerCallback={performContact}
                bigBox={boxChosen}
                parentWidth={width}
                parentHeight={height}
                animCompleted={animationCompleted}
                setAnimCompleted={setAnimationCompleted}
                // B task
                closeAnotherBigBox={closeAnotherBigBox}
                closeThisBox={closeThisBox}
              >
                {element.details}
              </SingleProfession>
            );
          })}
        </div>
        <div className="columns__right-column">
          <div className="right-column__button-container">
            <p className="button-container__decription">
              Tell us a little bit more about yourself and share your CV with
              us, we will be happy to talk to you!
            </p>
            <QuaternaryButton callbackAction={contactButton} wide={true}>
              CONTACT US
            </QuaternaryButton>
          </div>
          <animated.div
            className="right-column__image-container"
            style={{
              borderTopRightRadius: imageWidth / 2,
              borderBottomLeftRadius: imageWidth / 2,
              borderBottomRightRadius: imageWidth / 2,
              ...containerProps,
            }}
          >
            <animated.img
              src={MainImage}
              alt=""
              className="right-column__main-image"
              ref={imageRef}
              style={{
                ...imageProps,
              }}
            />
          </animated.div>
        </div>
      </div>
    </section>
  );
};
