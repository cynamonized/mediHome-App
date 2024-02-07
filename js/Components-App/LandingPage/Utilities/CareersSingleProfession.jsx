import React, { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useSpring, useInView, animated } from "@react-spring/web";

export const SingleProfession = ({
  color,
  name,
  description,
  boxIndex,
  boxPointerCallback,
  bigBox,
}) => {
  const size = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState(false);

  // it should reference to which box is chosen
  // it should be given to the props

  // each box should get separate props that is his index
  // if the index matches the "boxChosen"  props, it behaves like
  // master -- 100% size of parent (+ boxChosen is != 0 ofc)

  // if not and boxChosen is != 0, then it dissapears
  // (how ,so I can animate?)

  // additionally it reveals more content (X etc.)
  // Add UI to indicate it's clickable

  const [springs, setSprings] = useSpring(
    () => ({
      from: {
        transform: `scale(1)`,
        zIndex: 0,
        width: `inherit`,
        display: `block`,
      },
      config: {
        tension: 1000,
        mass: 1,
        velocity: 0.2,
      },
    }),
    []
  );

  const hoverIn = () => {
    setSprings.start({
      delay: 0,
      config: {
        duration: 50,
      },
      to: { zIndex: 1 },
    });

    setSprings.start({
      delay: 0,
      to: { transform: `scale(1.1)` },
    });
  };

  const hoverOut = () => {
    setSprings.start({
      config: {
        duration: 50,
      },
      delay: 0,
      to: { zIndex: 0 },
    });

    setSprings.start({
      delay: 0,
      to: { transform: `scale(1)` },
    });
  };

  const growBox = () => {
    setSprings.start({
      delay: 0,
      config: {
        duration: 50,
      },
      to: { zIndex: 5 },
    });

    setSprings.start({
      delay: 0,
      config: {
        duration: 500,
      },
      to: { width: `500%` },
      // 1. NEED TO ADD PARENT SIZE IN PX
      // GIVE IT TO THIS COMPONENT AS PROP (ABOVE)
    });
  };

  const hideBox = () => {
    setSprings.start({
      delay: 0,
      to: { display: `none` },
    });
  };

  const closeBox = () => {
    // 0. change box back to normal
  };

  useEffect(() => {
    if (size.width <= 670) {
      setIsMobile(true);
    } else if (size.width > 670) {
      setIsMobile(false);
    }

    //0.
    // Box behaviour logic -> if user chooses something
    if (bigBox == boxIndex) {
      console.log("I AM ABOUT TO GROW:", boxIndex);
      setDetailsVisible(true);
      growBox();

      // add useTransition -> useChain to show details inside?
      // seems to be the right way
    } else if (bigBox == 0) {
      console.log("Nothing chosen yet...");
    } else {
      console.log("I am not a chosen one :( ", boxIndex);
    }
  }, [size.width, bigBox]);

  const clickContact = () => {
    boxPointerCallback(boxIndex);
  };

  return (
    <animated.div
      className="single-profession"
      style={isMobile ? {} : { ...springs }}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      onClick={clickContact}
    >
      <div className="single-profession__head">
        <p className="head__name" style={{ color: `${color}` }}>
          {name}
        </p>
      </div>

      <div className="single-profession__body">
        <p className="body__description">{description}</p>
        {detailsVisible ? (
          <p
            className="additional-content__temp"
            style={{ color: "red", margin: 50 }}
          >
            THIS APPEARS AS TEMP
          </p>
        ) : (
          <></>
        )}
      </div>
    </animated.div>
  );
};
