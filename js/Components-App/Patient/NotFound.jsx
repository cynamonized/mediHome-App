import React, { useState, useEffect } from "react";
import { MainButton } from "../../Utilities/Buttons";
import Image404 from "../../../images/404.svg";

export const NotFound = () => {
  // useLink hook?
  const homeLink = null;

  // callback action that links to homepage => appoList.jsx example
  const actionCallback = () => {
    return null;
  };

  return (
    <div className="not-found">
      <div className="not-found__container">
        <img src={Image404} alt="" className="container__not-found-image" />
        <h3 className="container__title">
          Woops! We couldn't find what you are looking for.
        </h3>
        <p className="container__subtitle">
          Please make sure your link is valid.
        </p>
        <MainButton wide={true}>Homepage</MainButton>
      </div>
    </div>
  );
};
