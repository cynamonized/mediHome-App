import React, { useState, useEffect } from "react";
import { SubscriptionOption } from "./Utilities/SubscriptionOption";
import { SubscriptionCards } from "./Utilities/calculatorSubscriptionCards";
import { colorMainPink } from "../../Settings/cssVariables";

export const Calculator = () => {
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
            <SubscriptionOption
              name={"test"}
              description={"test"}
              color={colorMainPink}
            />
          </div>

          <div className="content-section__result">
            <p className="result__title">Estimated price (per month)*</p>
            <div className="result__result-box">$450</div>
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
