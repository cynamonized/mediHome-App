import React, { useState, useEffect } from "react";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import MainImage from "../../../images/Landing Page/Careers_1.jpg";
import { QuaternaryButton } from "../../Utilities/Buttons";
import { useSpring, useInView, animated } from "@react-spring/web";
import useSize from "@react-hook/size";
import { easings, config } from "@react-spring/web";
import { SingleProfession } from "./Utilities/CareersSingleProfession";
import { useWindowSize } from "@uidotdev/usehooks";
import { careerCards } from "./Utilities/careerCards";

export const Careers = () => {
  const [ref, InView] = useInView();
  const [width, height] = useSize(ref);
  const [boxChosen, setBoxChosen] = useState(0);

  // 2. USE useSize to get parent width/height
  // 3. Left columsn needs to be separate comp?
  // or I can ref Left column by using useRef
  // YES!!

  const props = useSpring(
    InView
      ? {
          delay: 500,
          loop: { reverse: true },
          from: {
            borderTopLeftRadius: 0,
            borderBottomRightRadius: width / 2,
          },
          to: {
            borderTopLeftRadius: width / 2,
            borderBottomRightRadius: 0,
          },
          config: {
            duration: 2000,
          },
        }
      : {}
  );

  const performContact = (boxIndex) => {
    console.log("Parent says, you clicked on:", boxIndex);
    setBoxChosen(boxIndex);
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
      <div className="careers__columns">
        <div className="columns__left-column">
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
              />
            );
          })}
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

          <animated.img
            src={MainImage}
            alt=""
            className="right-column__main-image"
            ref={ref}
            style={{
              borderTopRightRadius: width / 2,
              borderBottomLeftRadius: width / 2,
              ...props,
            }}
          />
        </div>
      </div>
    </section>
  );
};
