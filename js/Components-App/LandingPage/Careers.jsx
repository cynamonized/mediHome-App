import React, { useState, useEffect, useRef } from "react";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import MainImage from "../../../images/Landing Page/Careers_1.jpg";
import { QuaternaryButton } from "../../Utilities/Buttons";
import { useSpring, useInView, animated } from "@react-spring/web";
import useSize from "@react-hook/size";
import { SingleProfession } from "./Utilities/CareersSingleProfession";
import { careerCards } from "./Utilities/careerCards";

export const Careers = () => {
  const [imageAnimationRef, InView] = useInView();
  const leftColumn = useRef();
  const imageRef = useRef();
  const [leftColumnWidth, leftColumnHeight] = useSize(leftColumn);
  const [imageWidth, imageHeight] = useSize(imageRef);
  const [boxChosen, setBoxChosen] = useState(0);

  const [animationCompleted, setAnimationCompleted] = useState(true);

  const imageProps = useSpring(
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
          },
        }
      : {}
  );

  const performContact = (boxIndex) => {
    setBoxChosen(boxIndex);

    console.log("Current box chosen:", boxIndex);
  };

  useEffect(() => {
    switch (boxChosen) {
      case 0:
        break;
      case 1:
        console.log("I am 1");
        break;
      case 2:
        console.log("I am 2");
        break;
      case 3:
        console.log("I am 3");
        break;
      case 4:
        console.log("I am 4");
        break;
      case 5:
        console.log("I am 5");
        break;
      case 6:
        console.log("I am 6");
        break;
    }
  }, [boxChosen]);

  return (
    <section id="careers" className="careers container">
      <div className="careers__title-section">
        <Eyebrow>CAREERS</Eyebrow>
        <h2 className="landing-section-title">
          We are looking for passionate professionals to join our team
        </h2>
      </div>
      <div className="careers__columns" ref={imageAnimationRef}>
        <div className="columns__left-column" ref={leftColumn}>
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
                parentWidth={leftColumnWidth}
                parentHeight={leftColumnHeight}
                animCompleted={animationCompleted}
                setAnimCompleted={setAnimationCompleted}
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
            <QuaternaryButton callbackAction={performContact} wide={true}>
              CONTACT US
            </QuaternaryButton>
          </div>
          <animated.img
            src={MainImage}
            alt=""
            className="right-column__main-image"
            ref={imageRef}
            style={{
              borderTopRightRadius: imageWidth / 2,
              borderBottomLeftRadius: imageWidth / 2,
              borderBottomRightRadius: imageWidth / 2,
              ...imageProps,
            }}
          />
        </div>
      </div>
    </section>
  );
};
