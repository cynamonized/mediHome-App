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

  const [animationTimer, setAnimationTimer] = useState(2000);

  // "Services Legacy working - ready to apply hover effects.
  // ServicesPoor working but HoverOut effect not working
  // (animation doesn't start again - it needs to apply useSpring body
  // to api.start() again but then it desynchronizes everything)."

  const [propsA, apiA] = useSpring(() => {
    if (InView) {
      return {
        delay: 0,
        loop: true,
        from: { y: 0 },
        to: async (next, cancel) => {
          await next({ y: -60 });
          await new Promise((resolve) => setTimeout(resolve, animationTimer));
          await next({ y: 0 });
          await new Promise((resolve) => setTimeout(resolve, animationTimer));
        },
        config: {
          duration: animationTimer,
          easing: easings.easeInOutQuart,
        },
      };
    } else {
      return {};
    }
  }, [InView]);

  const [propsB, apiB] = useSpring(() => {
    if (InView) {
      return {
        delay: 0,
        loop: true,
        from: { y: 0 },
        to: async (next, cancel) => {
          await next({ y: 60 });
          await new Promise((resolve) => setTimeout(resolve, animationTimer));
          await next({ y: 0 });
          await new Promise((resolve) => setTimeout(resolve, animationTimer));
        },
        config: {
          duration: animationTimer,
          easing: easings.easeInOutQuart,
        },
      };
    } else {
      return {};
    }
  }, [InView]);

  const stopAnimations = () => {
    apiA.stop();
    apiB.stop();
  };

  const startAnimations = () => {
    apiA.start({});
    apiB.start({});
  };

  useEffect(() => {
    if (size.width <= 670) {
      setIsMobile(true);
    } else if (size.width > 670) {
      setIsMobile(false);
    }

    if (InView) {
      startAnimations();
    }
  }, [size, InView]);

  const propsBasic = useSpring({ from: { y: 0 }, to: { y: 0 } });

  return (
    <section id="services" className="services container">
      <div className="services__left-column" ref={ref}>
        <Eyebrow>{"SERVICES"}</Eyebrow>
        <h2 className="landing-section-title">
          Find service that suits you best
        </h2>

        <button onClick={startAnimations}>CLIKC</button>
        <p className="section-title__subtitle-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero
          sapien, volutpat sed leo ac, dictum placerat ante. In porta risus ut
          turpis eleifend, vitae hendrerit velit venenatis.
        </p>
      </div>
      <div
        className="service__right-column"
        onMouseEnter={stopAnimations}
        onMouseLeave={startAnimations}
      >
        <animated.div
          style={isMobile ? { ...propsBasic } : { ...propsA }}
          className="right-column__specialization-container spec-A"
        >
          <img src={LogoA} alt="" className="specialization-container__logo" />
          <p className="specialization-container__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            libero sapien, volutpat sed leo ac, dictum placerat ante. In porta
            risus ut turpis eleifend.
          </p>
        </animated.div>

        <animated.div
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
        </animated.div>
      </div>
    </section>
  );
};
