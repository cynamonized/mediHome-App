import React, { useState, useEffect } from "react";
import LogoA from "../../../images/Landing Page/mediSmallLogos/Logo A.svg";
import LogoB from "../../../images/Landing Page/mediSmallLogos/Logo B.svg";
import LogoC from "../../../images/Landing Page/mediSmallLogos/Logo C.svg";
import LogoD from "../../../images/Landing Page/mediSmallLogos/Logo D.svg";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import { useSpring, useInView, animated } from "@react-spring/web";
import useSize from "@react-hook/size";
import { easings, config } from "@react-spring/web";
import { useWindowSize } from "@uidotdev/usehooks";

export const Services = () => {
  const [ref, InView] = useInView();
  const size = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);

  const propsA = useSpring(
    InView
      ? {
          delay: 1000,

          loop: { reverse: true },
          from: { y: 0 },
          to: { y: -60 },
          config: {
            duration: 2000,
            easing: easings.easeInOutQuart,
          },
        }
      : {}
  );

  const propsB = useSpring(
    InView
      ? {
          delay: 1000,
          easing: easings.steps(5),
          loop: { reverse: true },
          from: { y: 0 },
          to: { y: 60 },
          config: {
            duration: 2000,
            easing: easings.easeInOutQuart,
          },
        }
      : {}
  );

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
