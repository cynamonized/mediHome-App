import React, { useState, useEffect } from "react";
import CheckedIcon from "../../../../images/icons/CheckMark.svg";

export const SubscriptionOption = ({ name, description, color, mandatory }) => {
  return (
    <div className="subscription-options__single-option">
      <div className="single-option__name" style={{ color: `${color}` }}>
        {name}
      </div>
      <div className="single-option__description">{description}</div>
      <div className="single-option__tickmark-container">
        <TickMark initialChecked={mandatory} />
      </div>
    </div>
  );
};

const TickMark = (initialChecked, chosen) => {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <div className="tickmark">
      <img
        src={CheckedIcon}
        alt=""
        className="tickmark__image"
        style={{ display: initialChecked ? `block` : `none` }}
      />
    </div>
  );
};
