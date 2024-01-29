import React, { useState, useEffect, useRef } from "react";
import LogoA from "../../../images/Landing Page/mediSmallLogos/Logo A.svg";
import LogoB from "../../../images/Landing Page/mediSmallLogos/Logo B.svg";
import LogoC from "../../../images/Landing Page/mediSmallLogos/Logo C.svg";
import LogoD from "../../../images/Landing Page/mediSmallLogos/Logo D.svg";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import {
  useSpring,
  useInView,
  animated,
  useChain,
  useSprings,
  useSpringRef,
} from "@react-spring/web";
import useSize from "@react-hook/size";
import { easings, config } from "@react-spring/web";
import { useWindowSize } from "@uidotdev/usehooks";

export const Services = () => {
  const [ref, InView] = useInView();
  const size = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);

  const [delayTime, setDelayTime] = useState(0);

  // const [propsA1, api] = useSpring(() => {
  //   if (InView) {
  //     return {

  //       delay: 1000,
  //       loop: true,
  //       from: { y: -60, x: 0 },
  //       to: async (next, cancel) => {
  //         await next({ y: 0 });
  //         await next({ x: 60 });
  //         await next({ y: -60 });
  //         await next({ x: 0 });
  //         setDelayTime(2000);
  //       },
  //       config: {
  //         duration: 400,
  //         easing: easings.easeInOutQuart,
  //       },
  //     };
  //   } else {
  //     return {};
  //   }
  // }, [InView, delayTime]);

  const propsA1 = useSpring(
    InView
      ? {
          delay: 100,
          loop: { reverse: true },
          from: { y: -60, x: 0 },
          to: async (next, cancel) => {
            await next({ y: 0 });
            await next({ x: 60 });
            await next({ y: -60 });
            await next({ x: 0 });
          },
          config: {
            duration: 500,
            easing: easings.easeInOutQuart,
          },
        }
      : {}
  );

  // const propsA = useSpring(
  //   InView
  //     ? {
  //         delay: 1000,
  //         loop: { reverse: true },
  //         from: { y: 0 },
  //         to: { y: -60 },
  //         config: {
  //           duration: 2000,
  //           easing: easings.easeInOutQuart,
  //         },
  //       }
  //     : {}
  // );

  // const propsB = useSpring(
  //   InView
  //     ? {
  //         delay: 1000,
  //         easing: easings.steps(5),
  //         loop: { reverse: true },
  //         from: { y: 0 },
  //         to: { y: 60 },
  //         config: {
  //           duration: 2000,
  //           easing: easings.easeInOutQuart,
  //         },
  //       }
  //     : {}
  // );

  useEffect(() => {
    if (size.width <= 670) {
      setIsMobile(true);
    } else if (size.width > 670) {
      setIsMobile(false);
    }
  }, [size]);

  const propsBasic = useSpring({ from: { y: 0 }, to: { y: 0 } });

  return (
    <section id="services" className="services container">
      <div className="services__left-column" ref={ref}>
        <Eyebrow>{"SERVICES"}</Eyebrow>
        <h2 className="landing-section-title">
          Find service that suits you best
        </h2>
        <p className="section-title__subtitle-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut
          turpis eleifend, vitae hendrerit velit venenatis.
        </p>
      </div>
      <div className="service__right-column">
        <animated.div
          // THIS ANIMATED DIV IS JUST FOR TESTING
          className="right-column__specialization-container spec-A"
          style={isMobile ? { ...propsBasic } : { ...propsA1 }}
        >
          <img src={LogoA} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </animated.div>

        {/* <animated.div
          style={isMobile ? { ...propsBasic } : { ...propsA }}
          className="right-column__specialization-container spec-A"
        >
          <img src={LogoA} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </animated.div> */}

        {/* <animated.div
          style={isMobile ? { ...propsBasic } : { ...propsB }}
          className="right-column__specialization-container spec-B"
        >
          <img src={LogoB} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </animated.div>

        <animated.div
          style={isMobile ? { ...propsBasic } : { ...propsA }}
          className="right-column__specialization-container spec-C"
        >
          <img src={LogoC} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </animated.div>

        <animated.div
          style={isMobile ? { ...propsBasic } : { ...propsB }}
          className="right-column__specialization-container spec-D"
        >
          <img src={LogoD} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </animated.div> */}
      </div>
    </section>
  );
};
