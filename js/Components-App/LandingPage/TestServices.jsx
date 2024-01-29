import React, { useState, useEffect, useRef } from "react";
import LogoA from "../../../images/Landing Page/mediSmallLogos/Logo A.svg";
import {
  useSpring,
  useInView,
  animated,
  useChain,
  useSprings,
  useSpringRef,
} from "@react-spring/web";
import { easings, config } from "@react-spring/web";
import { useWindowSize } from "@uidotdev/usehooks";

export const TestServices = () => {
  const [ref, InView] = useInView();
  const size = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);
  const [delayTime, setDelayTime] = useState(0);
  const api = useSpringRef();

  useEffect(() => {
    if (size.width <= 670) {
      setIsMobile(true);
    } else if (size.width > 670) {
      setIsMobile(false);
    }
  }, [size]);

  // const api = useSpringRef();
  const propsA1 = useSpring(
    InView
      ? {
          ref: api,
          from: { y: -60, x: 0 },
          // to: async (next, cancel) => {
          //   await next({ y: 0 });
          //   await next({ x: 60 });
          //   await next({ y: -60 });
          //   await next({ x: 0 });
          // },
          config: {
            duration: 500,
            easing: easings.easeInOutQuart,
          },
        }
      : {}
  );

  const performClick = async () => {
    api.start({
      delay: 0,
      to: async (next, cancel) => {
        await next({ x: propsA1.x.get() === 0 ? 100 : 0 });
        await next({ x: propsA1.x.get() === 0 ? 100 : 0 });
        await cancel();
      },
    });

    // HOW TO MAKE A STOP HERE TOO?
    console.log("start timer");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("after 2 seconds");

    api.start({
      delay: 1000,
      loop: { reverse: true },
      to: async (next, cancel) => {
        console.log("IMMEDIATELY HERE?");
        await next({ y: 0 });
        await next({ x: 60 });
        await next({ y: -60 });
        await next({ x: 0 });
      },
    });
  };

  const propsBasic = useSpring({ from: { y: 0 }, to: { y: 0 } });

  return (
    <section id="services" className="services container" ref={ref}>
      <button onClick={performClick}>CLICK TEST</button>
      <div className="service__right-column" style={{ marginTop: "200px" }}>
        <animated.div
          className="right-column__specialization-container spec-A"
          style={isMobile ? { ...propsBasic } : { ...propsA1 }}
          onClick={performClick}
        >
          <img src={LogoA} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </animated.div>
      </div>
    </section>
  );
};
