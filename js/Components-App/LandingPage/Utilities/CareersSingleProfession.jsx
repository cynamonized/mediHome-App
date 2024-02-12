import React, { useState, useEffect, useRef } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import useSize from "@react-hook/size";
import { useSpring, useInView, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";

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
  animCompleted,
  setAnimCompleted,
}) => {
  const size = useWindowSize();
  const compRef = useRef();
  const [width, height] = useSize(compRef);
  const [isMobile, setIsMobile] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isBig, setIsBig] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(false);

  const [savedWidth, setSavedWidth] = useState(0);
  const [savedHeight, setSavedHeight] = useState(0);

  const [originalWidth, setOriginalWidth] = useState((parentWidth - 70) / 3);
  const [originalHeight, setOriginalHeight] = useState((parentHeight - 35) / 2);

  const [measureRef, { widthMeasure, heigthMeasure }] = useMeasure();

  // 1. (DONE) THIS YET TO BE FIXED - WIDTH AND HEIGHT at the start
  // Component needs to know his original width and height
  // when desclaring springs below

  // 0. (DONE) ---> BUT IT FLASHES QUICKLY AT THE BEGINING WITH RE-RENDER !!!!!!!!!!!!!!!!!!!!!!! (Do I care?) -> WHAT IT CAUSES IT? I CAREEEEEEEE
  // --> Flash can be fixed with changing .start to useSpring declaration -> width: isBig ? parentWidth : width
  // --> const [ref, {width}] = useMeasure(); https://codesandbox.io/

  // 2. (DONE) HERE WE GO AGAIN....
  // OLD WAY AS IN VANILLA JSnp
  // Making clicked box position: absolute
  // and creating invisible clone below it

  // 2A. (DONE) IMAGE AND BOXES FLASHING WHEN BOX CLOSING
  // BC DOM is changed (empty div is removed or changes position)
  // --> BC pos: relative is set to bigBox at first
  // and then pos:abs to invisible helper... single thread problem

  // 0. (DONE) BUG REPORT: HOVER DURATION CHANGES AFTER FIRST CLICK & CLOSE

  // 0. (DONE) zIndex when boxGrow() is 0 bc of hoverOut() -> Added contidion in useSpring definition but it only works once...

  // 0. (WIP-MID-SLOVED) [switch in growBox()] BUF REPORT: POSITION: IT NEEDS TO TRAVEL TO HIM ORG POSITION, NOT TOP LHS AS IT"S NOW

  // 0. (DONE) originalWidth and savedWidth are too similar - it's reduntant

  // 0. (P1) When it comes back to orinal width, animation not working if it's <0

  // 3. HOW BEHAVES WHEN ON MOBILE? IT HAS TO BE DIFFERENT
  // ---> useEffect()

  // 4. STILL NEED TO ADD Entry UI (+) and Exit UI (x)

  const [springs, setSprings] = useSpring(() => {
    return {
      from: {
        zIndex: 0,
        transform: `scale(1)`,
        // zIndex: bigBox == boxIndex ? { zIndex: 1 } : { zIndex: -1 },
        width: `${originalWidth}px`,
        height: `${originalHeight}px`,
        // width: isBig ? parentWidth : width,
        position: `static`,
        display: `block`,
        opacity: 1,
      },
      // config: width
      //   ? {
      //       tension: 1000,
      //       mass: 1,
      //       velocity: 0.2,
      //     }
      //   : {},

      // immediate: (key) => key === `zIndex`,
    };
  }, [bigBox]);

  const hoverIn = () => {
    if (!isBig) {
      setSprings.start({
        config: {
          tension: 1000,
          mass: 1,
          velocity: 0.05,
        },
        to: { transform: `scale(1.1)` },
      });
    }
  };

  const hoverOut = () => {
    // if (isBig) {
    //   setSprings.start({
    //     to: { zIndex: 0 },
    //   });
    // }

    setSprings.start({
      config: {
        tension: 1000,
        mass: 1,
        velocity: 0.05,
      },
      to: { transform: `scale(1)` },
    });
  };

  const growBox = () => {
    setSprings.start({
      zIndex: 15,
      immediate: (key) => key === `zIndex`,
    });

    // setSavedHeight(height);
    // setSavedWidth(width);

    setSavedHeight((parentHeight - 35) / 2);
    setSavedWidth((parentWidth - 70) / 3);

    hoverOut();
    setIsBig(true);

    setPlaceholderVisible(true);

    // THIS IS AWESOME, reply with others (except 1)
    // for 2 and 5, there needs to be some calculation including parentWidth and parentHeight (and width and height of this component)

    switch (boxIndex) {
      case 4: {
        setSprings.start({
          bottom: 0,
          left: 0,
        });
        break;
      }
    }

    setSprings.start({
      delay: 0,
      to: { position: `absolute` },
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
    setIsBig(false);
    await setSprings.start({
      delay: 0,
      duration: 500,
      config: {},
      to: async (next, cancel) => {
        await next({
          width: `${savedWidth}px`,
          height: `${savedHeight}px`,
          zIndex: 0,
        }),
          await next({});
        await setSprings.start({
          position: `relative`,
        });

        setPlaceholderVisible(false);
        setAnimCompleted(true);

        // setSprings.start({
        //   config: {
        //     tension: 1000,
        //     mass: 1,
        //     velocity: 0.2,
        //   },
        // });
      },
    });
  };

  const clickContact = async () => {
    if (animCompleted) {
      boxPointerCallback(boxIndex);
      setAnimCompleted(false);
    }
    if (isBig) {
      await closeBigBox();
    }
  };

  useEffect(() => {
    if (size.width <= 670) {
      setIsMobile(true);
    } else if (size.width > 670) {
      setIsMobile(false);
    }

    //mobile fixes here TBD
    // if isBig == false, then animate width to current width
    // if isBig == true, then animate width to full width (parentWidth)

    if (bigBox == boxIndex) {
      setDetailsVisible(true);
      growBox();
    } else if (bigBox == 0) {
      setDetailsVisible(false);
    } else {
    }

    // if (!isBig) {
    //   setSprings.start({
    //     config: {
    //       tension: 1000,
    //       mass: 1,
    //       velocity: 0.2,
    //     },
    //   });
    // }
  }, [size.width, bigBox]);

  return (
    <>
      <animated.div
        className="single-profession"
        // style={isMobile ? {} : { ...springs }}
        // style={bigBox == boxIndex ? { ...springs } : { zIndex: -1, ...springs }}
        style={{ ...springs }}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        onClick={clickContact}
        ref={measureRef}
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
          placeholderVisible
            ? { position: `relative`, opacity: 0, zIndex: -2 }
            : { position: `absolute`, opacity: 0, zIndex: -2 }
        }
      ></div>
    </>
  );
};
