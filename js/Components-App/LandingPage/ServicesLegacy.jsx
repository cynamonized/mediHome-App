import React, { useState, useEffect, useRef } from "react";
import { Eyebrow } from "./Utilities/LandingGenericComponents";
import { useSpring, useInView, useSpringRef } from "@react-spring/web";
import useSize from "@react-hook/size";
import { easings, config } from "@react-spring/web";
import { useWindowSize } from "@uidotdev/usehooks";
import { cardsArray } from "./Utilities/cardsArray";
import { SingleCard } from "./Utilities/ServicesSingleCard";

export const ServicesLegacy = () => {
  const [ref, InView] = useInView();
  const size = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);
  const apiA = useSpringRef();
  const apiB = useSpringRef();
  const [animationTimer, setAnimationTimer] = useState(2000);

  const propsA = useSpring(
    InView
      ? {
          ref: apiA,
          loop: { reverse: true },
          from: { y: 0 },
          config: {
            duration: animationTimer,
            easing: easings.easeInOutQuart,
          },
        }
      : {}
  );

  const propsB = useSpring(
    InView
      ? {
          ref: apiB,
          loop: { reverse: true },
          from: { y: 0 },
          config: {
            duration: animationTimer,
            easing: easings.easeInOutQuart,
          },
        }
      : {}
  );

  const startAnimations = async () => {
    // First animation when user sees the compoent
    // (without delay)
    apiA.start({
      delay: 0,
      config: {
        duration: animationTimer,
        easing: easings.easeInOutQuart,
      },
      to: async (next, cancel) => {
        await next({ y: propsA.y.get() === 0 ? -60 : 0 });
        await new Promise((resolve) => setTimeout(resolve, animationTimer));
        await next({ y: propsA.y.get() === 0 ? -60 : 0 });
        await cancel();
      },
    });

    apiB.start({
      delay: 0,
      config: {
        duration: animationTimer,
        easing: easings.easeInOutQuart,
      },
      to: async (next, cancel) => {
        await next({ y: propsB.y.get() === 0 ? 60 : 0 });
        await new Promise((resolve) => setTimeout(resolve, animationTimer));
        await next({ y: propsB.y.get() === 0 ? 60 : 0 });
        await cancel();
      },
    });

    // Wait untill first animation ends
    // (counts from first animation starts)
    await new Promise((resolve) => setTimeout(resolve, animationTimer * 3));

    // Rest of the infinite animation
    // (delay included)
    apiA.start({
      delay: animationTimer,
      loop: { reverse: true },
      config: {
        duration: animationTimer,
        easing: easings.easeInOutQuart,
      },
      to: async (next, cancel) => {
        await next({ y: -60 });
        await new Promise((resolve) => setTimeout(resolve, animationTimer));
        await next({ y: 0 });
      },
    });

    apiB.start({
      delay: animationTimer,
      loop: { reverse: true },
      config: {
        duration: animationTimer,
        easing: easings.easeInOutQuart,
      },
      to: async (next, cancel) => {
        await next({ y: 60 });
        await new Promise((resolve) => setTimeout(resolve, animationTimer));
        await next({ y: 0 });
      },
    });
  };

  const stopAnimations = () => {
    apiA.stop();
    apiB.stop();
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
        {cardsArray.map((element, index) => {
          return (
            <SingleCard
              key={index}
              isMobile={isMobile}
              propsBasic={propsBasic}
              propsMain={index % 2 == 0 || index == 0 ? propsB : propsA}
              boxNameCSS={element.boxNameCSS}
              logo={element.logo}
              description={element.description}
            />
          );
        })}
      </div>
    </section>
  );
};
