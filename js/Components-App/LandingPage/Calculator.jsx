import React, { useState, useEffect } from "react";
import {
  useInView,
  useSpring,
  animated,
  useTransition,
  useSpringRef,
} from "@react-spring/web";
import { SubscriptionOption } from "./Utilities/SubscriptionOption";
import { subscriptionCards } from "./Utilities/calculatorSubscriptionCards";
import { colorMainPink } from "../../Settings/cssVariables";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export const Calculator = () => {
  const [price, setPrice] = useState(subscriptionCards[0].price);
  const [ref, InView] = useInView();
  const transRef = useSpringRef();

  const props = useSpring({ total: InView ? price : 0 });

  const [transitions, setTransitions] = useTransition(subscriptionCards, () => {
    return {
      ref: transRef,
      trail: 200 / subscriptionCards.length,
      from: { opacity: 0, scale: 0 },
      enter: { opacity: 1, scale: 1 },
      leave: { opacity: 0, scale: 0 },
    };
  });

  const addPrice = (value) => {
    setPrice((price) => {
      return price + value;
    });
  };

  const updateAngle = () => {
    let deg = (3 * Math.PI) / 180;
    let adjacent = document.getElementById("main-wrapper").offsetWidth;
    let opposite = adjacent * Math.tan(deg);
    document.documentElement.style.setProperty("--len-at-3", opposite + "px");
  };

  useEffect(() => {
    if (InView) {
      transRef.start();
    }
  }, [InView]);

  return (
    <>
      <section className="calculator-container ">
        <div className="calculator__top-separator"></div>

        <div className="calculator__big-container">
          <div className="calculator__content-section container">
            <div className="content-section__section-title">
              <h2 className="landing-section-title section-title__main-title">
                Our best-selling subscription packages
              </h2>
              <p className="section-title__subtitle-description">
                Choose your options and check estimated price.
              </p>
            </div>

            <div className="content-section__cards-and-price">
              <div className="cards-and-price__subscription-options">
                {/* {subscriptionCards.map((e, index) => {
                  return (
                    <SubscriptionOption
                      name={e.name}
                      description={e.description}
                      color={e.color}
                      price={e.price}
                      mandatory={e.mandatory}
                      key={index}
                      priceCallback={addPrice}
                    />
                  );
                })} */}
                {transitions((style, e, index) => (
                  <animated.div
                    className="subscription-options__animated-container"
                    style={style}
                  >
                    <SubscriptionOption
                      name={e.name}
                      description={e.description}
                      color={e.color}
                      price={e.price}
                      mandatory={e.mandatory}
                      key={index}
                      priceCallback={addPrice}
                    />
                  </animated.div>
                ))}
              </div>

              <div className="cards-and-price__result">
                <p className="result__title">Estimated price (per month)*</p>
                <div className="result__result-box" ref={ref}>
                  <span>$</span>
                  <animated.span>
                    {InView ? props.total.to((x) => x.toFixed(0)) : 0}
                  </animated.span>
                </div>
              </div>
            </div>

            <div className="content-section__footer">
              <p className="footer__note">
                *The announcement does not constitute an offer within the
                meaning of the Civil Code, please contact us to obtain a real
                offer
              </p>
            </div>
          </div>
        </div>

        <div className="calculator__bottom-separator"></div>
      </section>
    </>
  );
};
