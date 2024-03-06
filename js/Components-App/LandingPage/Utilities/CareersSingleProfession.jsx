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
  // B task
  closeAnotherBigBox,
  closeThisBox,
}) => {
  const size = useWindowSize();
  const ref = useRef();
  // const [width, height] = useSize(compRef);
  const [isMobile, setIsMobile] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isBig, setIsBig] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(false);

  const [phantomBigWidth, setPhantomBigWidth] = useState();
  const [phantomBigHeight, setPhantomBigHeight] = useState();
  const [phantomOrgWidth, setPhantomOrgWidth] = useState();
  const [phantomOrgHeight, setPhantomOrgHeight] = useState();

  const [isAnimating, setIsAnimating] = useState(false);

  const mobilePixelBorder = 704;

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
    const desktopParentHeight = (parentHeight - 35) / 2;
    const desktopParentWidth = (parentWidth - 70) / 3;

    if (parentWidth <= mobilePixelBorder) {
      const calcSizes = {
        width: parentWidth,
        height: phantomOrgHeight,
      };
      return calcSizes;
    } else {
      const calcSizes = {
        width: desktopParentWidth,
        height: phantomOrgHeight,
      };
      return calcSizes;
    }
  };

  const calculateBigSize = () => {
    if (parentWidth <= mobilePixelBorder) {
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
    if (!isBig && !isMobile) {
      setIsAnimating(true);
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
    if (!isMobile) {
      setIsAnimating(true);
      setSprings.start({
        config: {
          tension: 1000,
          mass: 1,
          velocity: 0.05,
        },
        to: { transform: `scale(1)` },
      });
    }
  };

  const growBox = () => {
    setIsAnimating(true);

    setSprings.start({
      zIndex: 15,
      immediate: true,
    });

    hoverOut();

    switch (boxIndex) {
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

      case 3: {
        setSprings.start({
          top: 0,
          right: 0,
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

    setIsBig(true);
    setPlaceholderVisible(true);

    setSprings.start({
      immediate: true,
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
        width: `${calculateBigSize().width}px`,
        height: `${calculateBigSize().height}px`,
      },
    });
  };

  const closeBigBox = async () => {
    // B Task
    if (closeThisBox != boxIndex) {
      boxPointerCallback(0);
    } else {
    }

    // Below is before B Task
    // boxPointerCallback(0);
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
        await setPlaceholderVisible(false);
        setAnimCompleted(true);
      },
    });
  };

  const clickContact = async () => {
    // works only if none is opened
    if (animCompleted && bigBox == 0) {
      boxPointerCallback(boxIndex);
      setAnimCompleted(false);
    }

    // first IF works only this box is opened (and closes it)
    // second IF works only if another box is opened (occurs only on mobile)
    if (isBig && bigBox == boxIndex) {
      setAnimCompleted(false);
      await closeBigBox();
    } else if (boxIndex != bigBox && bigBox && isMobile) {
      setAnimCompleted(false);
      closeAnotherBigBox(boxIndex);
    }
  };

  useEffect(() => {
    // Normalizing boxes behavior for mobile ///////////////////////////////////////////////////
    if (parentWidth <= mobilePixelBorder) {
      setIsMobile(true);
    } else if (parentWidth >= mobilePixelBorder) {
      setIsMobile(false);
    }

    if (!isBig && parentWidth > mobilePixelBorder) {
      setSprings.start({
        width: `${calculateEntrySize().width}px`,
        height: `${
          calculateEntrySize().height
            ? calculateEntrySize().height
            : (phantomOrgHeight - 35) / 2
        }px`,
      });
    } else if (!isBig && parentWidth <= mobilePixelBorder) {
      setSprings.start({
        width: `${parentWidth}px`,
        height: `${
          phantomOrgHeight ? phantomOrgHeight : (parentHeight - 5 * 35) / 5
        }px`,
      });
    }
    // Normalizing ends here ////////////////////////////////////////////////////////////////////

    if (!isBig && animCompleted) {
      setIsAnimating(false);
    }

    // B task (3rd IF)
    if (bigBox == boxIndex) {
      setDetailsVisible(true);
      growBox();
    } else if (bigBox == 0) {
      setDetailsVisible(false);
    } else if (bigBox && closeThisBox == boxIndex) {
      setDetailsVisible(false);
      closeBigBox();
    }

    // Below prevents all animations on while on mobile view
    if (isMobile) {
      setSprings.start({
        immediate: true,
      });
    }
  }, [size.width, bigBox, parentWidth]);

  useEffect(() => {
    // TEN USE EFFECT ZADZIAŁA TYLKO RAZ JAK PRZEJDE Z MOBILE NA DEKSTOP
    // I MAM OTWARTE COŚ

    // TBD: zrobić szacher macher, żeby od razu wskakiwał na 100% | 100%
    if (!isMobile && isBig) {
      console.log("I changed to desktop");
      setSprings.start({
        // width: `${calculateBigSize().width}px`,
        // height: `${calculateBigSize().height}px`,
        immediate: true,
      });
    }
  }, [isMobile]);

  return (
    <>
      <animated.div
        className="single-profession"
        style={isAnimating ? { ...springs } : {}}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        onClick={clickContact}
        ref={ref}
      >
        <div className="single-profession__head">
          <p className="head__name" style={{ color: `${color}` }}>
            {name}
          </p>

          <animated.div
            className="head__plus-sign"
            style={{
              background: `${color}`,
              zIndex: 0,
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
      {/* Placeholder that keeps layout of boxes stable when big box comes in front  */}
      {!isMobile && (
        <div
          className="single-profession"
          style={
            placeholderVisible
              ? { position: `relative`, opacity: 0, zIndex: -2 }
              : { position: `absolute`, opacity: 0, zIndex: -2 }
          }
        ></div>
      )}

      {/* ///////////////////////////////////////////////// */}
      {/* 2 placeholders that measure desired size of box while interacting with it */}
      <PhantomBigBrother
        name={name}
        description={description}
        children={children}
        widthCallback={setPhantomBigWidth}
        heightCallback={setPhantomBigHeight}
        bigParentWidth={parentWidth}
      />

      <PhantomOriginalBrother
        name={name}
        description={description}
        children={children}
        widthCallback={setPhantomOrgWidth}
        heightCallback={setPhantomOrgHeight}
        bigParentWidth={parentWidth}
        isMobile={isMobile}
      />
    </>
  );
};

const PhantomBigBrother = ({
  name,
  description,
  children,
  widthCallback,
  heightCallback,
  bigParentWidth,
}) => {
  const [ref, { width, height }] = useMeasure();

  useEffect(() => {
    widthCallback(width);
    heightCallback(height);
  }, [width, height]);

  return (
    <div
      className="single-profession"
      style={{ position: `absolute`, opacity: 0, zIndex: -5 }}
      ref={ref}
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
  );
};

const PhantomOriginalBrother = ({
  name,
  description,
  children,
  widthCallback,
  heightCallback,
  bigParentWidth,
  isMobile,
}) => {
  const [ref, { width, height }] = useMeasure();

  useEffect(() => {
    widthCallback(width);
    heightCallback(height);
  }, [width, height]);

  return (
    <div
      className="single-profession"
      style={{
        position: `absolute`,
        opacity: 0,
        zIndex: -5,
        width: isMobile ? `100%` : `${(bigParentWidth - 70) / 3}px`,
        background: `green`,
      }}
      ref={ref}
    >
      <div className="single-profession__head">
        <p className="head__name">{name}</p>
      </div>
      <div className="single-profession__body">
        <p className="body__description">{description}</p>
      </div>
    </div>
  );
};
