import React, { useState, useEffect, useRef } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import useSize from "@react-hook/size";
import { useSpring, useInView, animated } from "@react-spring/web";

export const SingleProfession = ({
  color,
  name,
  description,
  boxIndex,
  boxPointerCallback,
  bigBox,
  parentWidth,
  parentHeight,
  children,
}) => {
  const size = useWindowSize();
  const compRef = useRef();
  const [width, height] = useSize(compRef);
  const [isMobile, setIsMobile] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isBig, setIsBig] = useState(false);

  const [savedWidth, setSavedWidth] = useState(0);
  const [savedHeight, setSavedHeight] = useState(0);

  // 1. (P0) THIS YET TO BE FIXED - WIDTH AND HEIGHT at the start
  // Component needs to know his original width and height
  // when desclaring springs below

  // 2. (P1) HERE WE GO AGAIN....
  // OLD WAY AS IN VANILLA JS
  // Making clicked box position: absolute
  // and creating invisible clone below it

  // 2A. (P1) IMAGE AND BOXES FLASHING WHEN BOX CLOSING
  // BC DOM is changed (empty div is removed or changes position)

  // --> BC pos: relative is set to bigBox at first
  // and then pos:abs to invisible helper... single thread problem

  // BUG REPORT: HOVER DURATION CHANGES AFTER FIRST CLICK & CLOSE

  // 3. HOW BEHAVES WHEN ON MOBILE? IT HAS TO BE DIFFERENT

  // 4. STILL NEED TO ADD Entry UI (+) and Exit UI (x)

  const [springs, setSprings] = useSpring(() => {
    return {
      from: {
        transform: `scale(1)`,
        zIndex: 0,
        // width: `${savedWidth}px`,
        // width: `250px`,
        // height: `450px`,
        // height: `${savedHeight}px`,
        position: `relative`,
        display: `block`,
        opacity: 1,
      },
      config: {
        tension: 1000,
        mass: 1,
        velocity: 0.2,
      },
    };
  }, []);

  const hoverIn = () => {
    if (!isBig) {
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
    }
  };

  const hoverOut = () => {
    if (!isBig) {
      setSprings.start({
        config: {
          duration: 50,
        },
        delay: 0,
        to: { zIndex: 0 },
      });
    }

    setSprings.start({
      delay: 0,
      to: { transform: `scale(1)` },
    });
  };

  const growBox = () => {
    hoverOut();
    setIsBig(true);

    setSavedHeight(height);
    setSavedWidth(width);

    setSprings.start({
      delay: 0,
      config: {
        duration: 50,
      },
      to: { zIndex: 5, position: `absolute` },
    });

    setSprings.start({
      delay: 0,
      config: {
        duration: 500,
        precision: 1,
      },
      to: { width: `${parentWidth}px`, height: `${parentHeight}px` },
    });
  };

  const closeBigBox = async () => {
    boxPointerCallback(0);

    setDetailsVisible(false);

    // 2A - ISSUE IS HERE
    await setSprings.start({
      delay: 0,
      config: {
        duration: 500,
        precision: 1,
      },
      to: async (next, cancel) => {
        await next({
          width: `${savedWidth}px`,
          height: `${savedHeight}px`,
          zIndex: 0,
        }),
          /////////////////////////////////////////
          await next({ position: `relative` });
        setIsBig(false);
        /////////////////////////////////////////
      },
    });
  };

  useEffect(() => {
    // If mobile it stops hover animations
    if (size.width <= 670) {
      setIsMobile(true);
    } else if (size.width > 670) {
      setIsMobile(false);
    }

    // If received signal that it's clicked
    if (bigBox == boxIndex) {
      setDetailsVisible(true);
      growBox();
    } else if (bigBox == 0) {
      setDetailsVisible(false);
      // bringBackBox();
    } else {
      // hideBox();
    }
  }, [size.width, bigBox]);

  const clickContact = () => {
    boxPointerCallback(boxIndex);

    if (isBig) {
      closeBigBox();
    }
  };

  return (
    <>
      <animated.div
        className="single-profession"
        style={isMobile ? {} : { ...springs }}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        onClick={clickContact}
        ref={compRef}
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
              style={{ color: "red", marginTop: 50 }}
            >
              {children}
            </p>
          ) : (
            <></>
          )}
        </div>
      </animated.div>

      <div
        className="single-profession"
        style={
          isBig
            ? { position: `relative`, opacity: 1, zIndex: 2 }
            : { position: `absolute`, opacity: 1, zIndex: 2 }
        }
      ></div>
    </>
  );
};

// setSprings.start({
//   to: { position: `relative` },
// });
// setIsBig(false);
