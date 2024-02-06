import React, { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useSpring, useInView, animated } from "@react-spring/web";

export const SingleProfession = ({ color, name, description }) => {
  const size = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);

  // it should reference to which box is chosen
  // it should be given to the props

  // each box should get separate props that is his index
  // if the index matches the "boxChosen"  props, it behaves like
  // master -- 100% size of parent (+ boxChosen is != 0 ofc)

  // if not and boxChosen is != 0, then it dissapears
  // (how ,so I can animate?)

  // additionally it reveals more content (X etc.)
  // Add UI to indicate it's clickable

  const [boxChosen, setBoxChosen] = useState(0);

  const [hoverSprings, sethoverSprings] = useSpring(
    () => ({
      from: { transform: `scale(1)`, zIndex: 0 },
      config: {
        tension: 1000,
        mass: 1,
        velocity: 0.2,
      },
    }),
    []
  );

  useEffect(() => {
    if (size.width <= 670) {
      setIsMobile(true);
    } else if (size.width > 670) {
      setIsMobile(false);
    }
  }, [size.width]);

  const hoverIn = () => {
    sethoverSprings.start({
      delay: 0,
      config: {
        duration: 50,
      },
      to: { zIndex: 1 },
    });

    sethoverSprings.start({
      delay: 0,
      to: { transform: `scale(1.1)` },
    });
  };

  const hoverOut = () => {
    sethoverSprings.start({
      config: {
        duration: 50,
      },
      delay: 0,
      to: { zIndex: 0 },
    });

    sethoverSprings.start({
      delay: 0,
      to: { transform: `scale(1)` },
    });
  };

  return (
    <animated.div
      className="single-profession"
      style={isMobile ? {} : { ...hoverSprings }}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      <div className="single-profession__head">
        <p className="head__name" style={{ color: `${color}` }}>
          {name}
        </p>
      </div>

      <div className="single-profession__body">
        <p className="body__description">{description}</p>
      </div>
    </animated.div>
  );
};
