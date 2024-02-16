import React, { useState, useEffect, useRef } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import useSize from "@react-hook/size";
import { useSpring, useInView, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import PlusSign from "../../../../images/icons/Plus-sign.svg";
import ExitSign from "../../../../images/icons/Exit.svg";

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

  const plusSprings = useSpring({
    opacity: isBig ? 0 : 1,
  });

  const exitSprings = useSpring({
    opacity: isBig ? 1 : 0,
  });

  const [springs, setSprings] = useSpring(() => {
    return {
      from: {
        zIndex: 0,
        transform: `scale(1)`,
        // Removed it for tests, perhaps not needed
        // width: `${originalWidth}px`,
        // height: `${originalHeight}px`,
        position: `static`,
        display: `block`,
        opacity: 1,
      },
    };
  }, [bigBox]);

  const calculateEntrySize = () => {
    if (parentWidth <= 704) {
      const calcSizes = {
        width: parentWidth,
        height: (parentHeight - 5 * 35) / 6,
      };
      console.log("ENTERING SMALL WORLD:", parentWidth);
      console.log("MY BOX START WIDTH:", calcSizes.width);
      return calcSizes;
    } else {
      const calcSizes = {
        width: (parentWidth - 70) / 3,
        height: (parentHeight - 35) / 2,
      };
      console.log("ENTERING BIG DESKTOP WORLD:", parentWidth);
      console.log("MY BOX START WIDTH:", calcSizes.width);
      return calcSizes;
    }
  };

  // 1. WHEN IT EXITS TO ORIGINAL IT TURNS TO BE 0
  // 2. WHEN SWITCHING WINDOW WIDTHS AFTER SOME ACTIONS,
  //    IT'S A MESS - STRESS TESTS FAIL FOR THE MOMENT
  //    -> Set proper width in useEffect when window width changes
  //    -> (when parentWidth changes)
  //    -> Can simply re-assign calculated with (using calcEntry() func?)

  const calculateExitSize = () => {
    if (parentWidth <= 704) {
      const calcSizes = {
        width: parentWidth,
        height: ((parentHeight - 5 * 35) / 6) * 5 + 70,
        // height: `auto`,
      };
      console.log("EXITING SMALL WORLD:", parentWidth);
      console.log("MY BOX EXIT WIDTH:", calcSizes.width);
      return calcSizes;
    } else {
      const calcSizes = {
        width: parentWidth,
        height: parentHeight,
      };
      console.log("EXITING BIG DESKTOP WORLD:", parentWidth);
      console.log("MY BOX EXIT WIDTH:", calcSizes.width);
      return calcSizes;
    }
  };

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

    setSavedHeight((parentHeight - 35) / 2);
    setSavedWidth((parentWidth - 70) / 3);
    hoverOut();
    setIsBig(true);
    setPlaceholderVisible(true);

    switch (boxIndex) {
      case 3: {
        setSprings.start({
          top: 0,
          right: 0,
        });
        break;
      }

      case 2: {
        setSprings.start({
          top: 0,
          left: 0,
          right: 0,
          marginLeft: `auto`,
          marginRight: `auto`,
        });
        break;
      }

      case 4: {
        setSprings.start({
          bottom: 0,
          left: 0,
        });
        break;
      }

      case 5: {
        setSprings.start({
          bottom: 0,
          left: 0,
          right: 0,
          marginLeft: `auto`,
          marginRight: `auto`,
        });
        break;
      }

      case 6: {
        setSprings.start({
          bottom: 0,
          right: 0,
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
      from: {
        // 1. here
        width: `${calculateEntrySize().width}px`,
        height: `${calculateEntrySize().height / 2}px`,
        // width: `${(parentWidth - 70) / 3}px`,
        // height: `${(parentHeight - 35) / 2}px`,
      },
      // 2. here
      to: {
        width: `${calculateExitSize().width}px`,
        height: `${calculateExitSize().height}px`,
      },
      // to: { width: `${parentWidth}px`, height: `${parentHeight}px` },
    });
  };

  // 0. use those functions to calculate box sizes....
  // 4. then not sure if changing anything in useEffect()
  //    is necessary.

  // 5. stress test it when opening and closing and changing
  //    window width at the same time / w/o refreshing
  //    -->SOLUTION:
  //    at the end of going back animation (gron and shrink)
  //    there can be a each if 1/3 == parent this.width
  //    or parent == this.width (based if desktop or mobile)
  //    if not, then push towards that

  const closeBigBox = async () => {
    boxPointerCallback(0);
    setIsBig(false);
    await setSprings.start({
      delay: 0,
      duration: 500,
      config: {},
      to: async (next, cancel) => {
        await next({
          // 3. and here
          width: `${calculateEntrySize().width}px`,
          height: `${calculateEntrySize().height}px`,
          // width: `${savedWidth}px`,
          // height: `${savedHeight}px`,
          zIndex: 0,
        }),
          await next({});
        await setSprings.start({
          position: `relative`,
        });

        setPlaceholderVisible(false);
        setAnimCompleted(true);
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
    // console.log(calculateEntryWidth());
    // console.log(calculateExitWidth());
    // mobile modification of variables needs to happen here,
    // so boxes have proper width
    // just update width based on parent once size.width changes
    // just as media queries

    // console.log("ORIGINAL:", originalWidth);
    // console.log("PARENT: ", parentWidth);

    // setOriginalWidth((parentWidth - 70) / 3);
    // setOriginalHeight((parentHeight - 35) / 2);

    if (parentWidth <= 704) {
      setIsMobile(true);
    } else if (parentWidth > 704) {
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

    console.log(isMobile);
  }, [size.width, bigBox, parentWidth]);

  return (
    <>
      <animated.div
        className="single-profession"
        style={{
          ...springs,
          display:
            isMobile == true && bigBox != 0 && bigBox != boxIndex
              ? `none`
              : `block`,
        }}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        onClick={clickContact}
        ref={measureRef}
      >
        <div className="single-profession__head">
          <p className="head__name" style={{ color: `${color}` }}>
            {name}
          </p>

          <animated.div
            className="head__plus-sign"
            style={{ background: `${color}`, ...plusSprings }}
          >
            <img src={PlusSign} alt="" className="plus-sign__plus-icon" />
          </animated.div>

          <animated.div className="head__exit-sign" style={{ ...exitSprings }}>
            <img src={ExitSign} alt="" className="exit-sign__exit-icon" />
          </animated.div>
        </div>
        <div className="single-profession__body">
          <p className="body__description">{description}</p>
          {detailsVisible ? (
            <animated.p
              className="additional-content__temp body__description"
              style={{ marginTop: 50, ...exitSprings }}
            >
              {children}
            </animated.p>
          ) : (
            <></>
          )}
        </div>
      </animated.div>
      <div
        className="single-profession"
        style={
          placeholderVisible
            ? { position: `relative`, opacity: 0, zIndex: 0 }
            : { position: `absolute`, opacity: 0, zIndex: 0 }
        }
      ></div>
    </>
  );
};
