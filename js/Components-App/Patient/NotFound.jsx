import React, { useState, useEffect } from "react";
import { MainButton } from "../../Utilities/Buttons";

export const NotFound = () => {
  // useLink hook?
  const homeLink = null;

  // callback action that links to homepage => appoList.jsx example
  const actionCallback = () => {
    return null;
  };

  return (
    <div className="not-found__container">
      <img src="" alt="" className="container__not-found-image" />
      <h3 className="container__title">
        We couldn't find what you are looking for.
      </h3>
      <p className="container__subtitle">Make sure your link is valid.</p>
      <MainButton wide={true}>Homepage</MainButton>
    </div>
  );
};
