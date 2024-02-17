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
  const [isMobile, setIsMobile] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isBig, setIsBig] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(false);
  const [parentWidthChange, setParentWidthChange] = useState(0);

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
      setSavedHeight(calcSizes.height);
      return calcSizes;
    } else {
      const calcSizes = {
        width: (parentWidth - 70) / 3,
        height: (parentHeight - 35) / 2,
      };
      return calcSizes;
    }
  };

  const calculateExitSize = () => {
    if (parentWidth <= 704) {
      const calcSizes = {
        width: parentWidth,
        // 1. this value is bad
        height: ((parentHeight - 5 * 35) / 6) * 4 + 70,
      };
      return calcSizes;
    } else {
      const calcSizes = {
        width: parentWidth,
        height: parentHeight,
      };
      return calcSizes;
    }
  };

  const calculateReturnSizeMobile = () => {
    if (parentWidth <= 704) {
      const calcSizes = {
        width: parentWidth,
        // 2. this value is bad
        // height: (parentHeight - 5 * 35) / 6,
        height: `auto`,
      };
      return calcSizes;
    }
  };

  // 3. isMobile condition on the very bottom is bad
  // (flashing out)

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
      to: { position: !isMobile ? `absolute` : `static` },
    });

    setSprings.start({
      delay: 0,
      config: {
        duration: 500,
        precision: 1,
      },
      from: {
        width: `${calculateEntrySize().width}px`,
        height: `${calculateEntrySize().height / 2}px`,
      },
      to: {
        width: `${calculateExitSize().width}px`,
        height: `${calculateExitSize().height}px`,
      },
    });
  };

  const closeBigBox = async () => {
    boxPointerCallback(0);
    setIsBig(false);
    await setSprings.start({
      delay: 0,

      config: {
        duration: 500,
      },
      to: async (next, cancel) => {
        await next({
          config: {
            duration: 500,
            precision: 1,
          },
          width: `${calculateEntrySize().width}px`,
          // height: `${savedHeight}px`, // NO!!!!! WHEN CHANGES WINDOW
          height: `${calculateEntrySize().height}px`,
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
    if (parentWidth <= 704) {
      setIsMobile(true);
    } else if (parentWidth > 704) {
      setIsMobile(false);
    }

    if (!isBig && animCompleted) {
      setSprings.start({
        config: {
          duration: 0,
        },
        width: `${calculateEntrySize().width}px`,
        height: `${calculateEntrySize().height}px`,
      });
    }

    if (bigBox == boxIndex) {
      setDetailsVisible(true);
      growBox();
    } else if (bigBox == 0) {
      setDetailsVisible(false);
    } else {
    }
  }, [size.width, bigBox, parentWidth]);

  return (
    <>
      <animated.div
        className="single-profession"
        style={{
          ...springs,
          // display:
          //   isMobile == true && bigBox != 0 && bigBox != boxIndex
          //     ? `none`
          //     : `block`,
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

          <animated.div
            className="head__exit-sign"
            style={{
              aspectRatio: `1/1`,
              height: isMobile ? `25px` : `auto`,
              margin: isMobile ? `25px` : `45px`,
              ...exitSprings,
            }}
          >
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
          // placeholderVisible && !isMobile ?
          placeholderVisible
            ? { position: `relative`, opacity: 0, zIndex: 0 }
            : { position: `absolute`, opacity: 0, zIndex: 0 }
        }
      ></div>
    </>
  );
};
