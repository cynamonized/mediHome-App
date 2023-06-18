import React, { useEffect, useState } from "react";
import "../../scss/main.scss";

export const MainButton = ({ children, callbackAction, wide }) => {
  return (
    <button
      className={`${wide == true ? "main-button wide-buttons" : "main-button"}`}
      onClick={callbackAction}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, callbackAction, wide }) => {
  return (
    <button
      className={`${
        wide == true
          ? "main-button secondary-button wide-buttons"
          : "main-button secondary-button"
      }`}
      onClick={callbackAction}
    >
      {children}
    </button>
  );
};
