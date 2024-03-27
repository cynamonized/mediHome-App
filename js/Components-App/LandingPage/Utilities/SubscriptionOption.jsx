import React, { useState, useEffect } from "react";
import { useInView, useSpring, animated } from "@react-spring/web";
import { colorGreysMid2 } from "../../../Settings/cssVariables";
import CheckedIcon from "../../../../images/icons/CheckMark.svg";

export const SubscriptionOption = ({
  name,
  description,
  color,
  mandatory,
  price,
  priceCallback,
}) => {
  const [optionChosen, setOptionChosen] = useState(false);

  const performChoice = () => {
    if (name != "Basic care") {
      if (!optionChosen) {
        priceCallback(price);
      } else {
        priceCallback(-price);
      }
    }
    setOptionChosen(!optionChosen);
  };
  return (
    <div
      className="subscription-options__single-option"
      onClick={performChoice}
    >
      <div className="single-option__name" style={{ color: `${color}` }}>
        {name}
      </div>
      <div className="single-option__description">{description}</div>
      <div className="single-option__tickmark-container">
        <TickMark
          initialChecked={mandatory}
          color={color}
          chosen={optionChosen}
        />
      </div>
    </div>
  );
};

const TickMark = ({ initialChecked, chosen, color }) => {
  return (
    <div
      className={initialChecked || chosen ? "tickmark--checked" : "tickmark"}
      style={{
        background: initialChecked || chosen ? `${color}` : "unset",
      }}
    >
      <img
        src={CheckedIcon}
        alt=""
        className="tickmark__image"
        style={{ display: initialChecked || chosen ? `block` : `none` }}
      />
    </div>
  );
};
