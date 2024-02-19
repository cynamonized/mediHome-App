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
  // const [width, height] = useSize(compRef);
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

  const phantomOriginalBrother = useRef();
  const phantomBigBrother = useRef();

  const [ref1, { width, height }] = useMeasure();

  // Dwie sprawy:
  // 1. Jak wyjąć drugie width and height, skoro nie moge ich inaczej nazwać?
  // 2. Wykombinować jak zniknąć phantom brothers jeśli nie w mobile...

  const [phantomOrgWidth, phantomOrgHeight] = useSize(phantomOriginalBrother);
  const [phantomBigWidth, phantomBigHeight] = useSize(phantomBigBrother);

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
        position: `static`,
        display: `block`,
        opacity: 1,
      },
    };
  }, [bigBox]);

  const calculateEntrySize = () => {
    if (parentWidth < 704) {
      const calcSizes = {
        width: phantomOrgWidth,
        height: phantomOrgHeight,
      };
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
    if (parentWidth < 704) {
      const calcSizes = {
        width: parentWidth,
        height: phantomBigHeight,
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
    if (parentWidth < 704) {
      setIsMobile(true);
    } else if (parentWidth >= 704) {
      setIsMobile(false);
    }
    console.log(width, height);
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
    }
  }, [size.width, bigBox, parentWidth, phantomOrgHeight, phantomOrgWidth]);

  return (
    <>
      <animated.div
        className="single-profession"
        style={{
          ...springs,
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
            style={{
              background: `${color}`,
              ...plusSprings,
            }}
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

      {/* ///////////////////////////////////////////////// */}

      {!isMobile && (
        <div
          className="single-profession"
          style={
            // placeholderVisible && !isMobile ?
            placeholderVisible
              ? { position: `relative`, opacity: 0, zIndex: 0 }
              : { position: `absolute`, opacity: 0, zIndex: 0 }
          }
        ></div>
      )}

      {/* ///////////////////////////////////////////////// */}

      <>
        <div
          className="single-profession"
          style={{ position: `absolute`, opacity: 0, zIndex: -5 }}
          ref={phantomBigBrother}
        >
          <div className="single-profession__head">
            <p className="head__name">{name}</p>
          </div>
          <div className="single-profession__body">
            <p className="body__description">{description}</p>
            <p
              className="additional-content__temp body__description"
              style={{ marginTop: 50 }}
            >
              {children}
            </p>
          </div>
        </div>

        <div
          className="single-profession"
          style={{
            position: `absolute`,
            opacity: 1,
            zIndex: 50,
            background: `red`,
          }}
          ref={ref1}
        >
          <div className="single-profession__head">
            <p className="head__name">{name}</p>
          </div>
          <div className="single-profession__body">
            <p className="body__description">{description}</p>
          </div>
        </div>
      </>
    </>
  );
};
