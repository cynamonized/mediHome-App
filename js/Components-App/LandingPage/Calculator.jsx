import React, { useState, useEffect } from "react";
import { useInView, useSpring, animated } from "@react-spring/web";
import { SubscriptionOption } from "./Utilities/SubscriptionOption";
import { subscriptionCards } from "./Utilities/calculatorSubscriptionCards";
import { colorMainPink } from "../../Settings/cssVariables";

export const Calculator = () => {
  const [price, setPrice] = useState(subscriptionCards[0].price);
  const [ref, InView] = useInView();

  // const [props, setProps] = useSpring(() => {
  //   return { total: price };
  // }, []);

  const props = useSpring({ total: InView ? price : 0 });

  const addPrice = (value) => {
    setPrice((price) => {
      return price + value;
    });

    // setProps.start({ total: price });
  };
  console.log(props);
  return (
    <>
      <section className="calculator-container ">
        {/* obligue not yet sorted bc this sucks in RWD */}
        <div className="calculator__top-separator"></div>

        <div className="calculator__content-section container">
          <div className="content-section__section-title">
            <h2 className="landing-section-title section-title__main-title">
              Our best-selling subscription packages
            </h2>
            <p className="section-title__subtitle-description">
              Choose your options and check estimated price.
            </p>
          </div>

          <div className="content-section__subscription-options">
            {subscriptionCards.map((e, index) => {
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
            })}
          </div>

          <div className="content-section__result">
            <p className="result__title">Estimated price (per month)*</p>
            {/* <div className="result__result-box">${price}</div> */}
            <div className="result__result-box" ref={ref}>
              <span>$</span>
              <animated.span>
                {InView ? props.total.to((x) => x.toFixed(0)) : 0}
              </animated.span>
            </div>
          </div>

          <div className="content-section__footer">
            <p className="footer__note">
              *The announcement does not constitute an offer within the meaning
              of the Civil Code, please contact us to obtain a real offer
            </p>
          </div>
        </div>

        <div className="calculator__bottom-separator"></div>
      </section>
    </>
  );
};
