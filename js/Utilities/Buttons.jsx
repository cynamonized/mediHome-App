import React from "react";
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

export const TertiaryButton = ({ children, callbackAction, wide }) => {
  return (
    <button
      className={`${
        wide == true
          ? "main-button tertiary-button wide-buttons"
          : "main-button tertiary-button"
      }`}
      onClick={callbackAction}
    >
      {children}
    </button>
  );
};

export const QuaternaryButton = ({ children, callbackAction, wide }) => {
  return (
    <button
      className={`${
        wide == true
          ? "main-button quaternary-button wide-buttons"
          : "main-button quaternary-button"
      }`}
      onClick={callbackAction}
    >
      {children}
    </button>
  );
};
