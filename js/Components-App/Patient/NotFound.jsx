import React, { useState, useEffect } from "react";
import { MainButton } from "../../Utilities/Buttons";
import Image404 from "../../../images/404.svg";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/portal/");
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
        <MainButton wide={true} callbackAction={goHome}>
          Homepage
        </MainButton>
      </div>
    </div>
  );
};
