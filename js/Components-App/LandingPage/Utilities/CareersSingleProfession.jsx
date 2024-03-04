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
    if (!isBig) {
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
    setIsAnimating(true);
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
    }
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
    if (animCompleted) {
      boxPointerCallback(boxIndex);
      setAnimCompleted(false);
    }

    if (isBig) {
      await closeBigBox();
    }

    // B task
    if (boxIndex != bigBox && bigBox && isMobile) {
      closeAnotherBigBox(boxIndex);
    }
  };

  useEffect(() => {
    // B task below

    // OFC there is a bug
    // When it I keep some box open after closing another one by opening this one
    // and change orientation to desktop -> height is crazy
    // track it down if what causes it

    // there is some logic missing that prevents secondary opened box from behaving just
    // as 1st opened box when switching to desktop, not sure if that one, or some insisible placeholders?

    if (closeThisBox == boxIndex) {
      // TUTAJ NIE DZIEJE SIE WSZYSTKO CO POWINNO SIE DZIAĆ PRZY TYM CLOSE BOXIE
      closeBigBox();
    }

    //

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

    if (!isBig && animCompleted) {
      setIsAnimating(false);
    }

    if (bigBox == boxIndex) {
      setDetailsVisible(true);
      growBox();
    } else if (bigBox == 0) {
      setDetailsVisible(false);
    }

    // added dependencies here (B task)
  }, [size.width, bigBox, parentWidth, closeThisBox]);

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
