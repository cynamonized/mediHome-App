import React from "react";
import "../../scss/main.scss";

export const LoaderCircle = () => {
  return (
    <div className="loader-circle container ">
      <span className="material-icons popup-icon--big hourglass-animating">
        hourglass_empty
      </span>
      <p className="loader-circle__text">We are processing your request</p>
    </div>
  );
};

export const ActionCompleted = ({ children }) => {
  return (
    <div className="loader-circle container ">
      <span className="material-icons popup-icon--big">
        assignment_turned_in
      </span>
      <p className="loader-circle__text">{children}</p>
    </div>
  );
};

export const ActionCompletedSmall = ({ children }) => {
  return (
    <div className="loader-circle loader-circle--small ">
      <span className="material-icons popup-icon--big">
        assignment_turned_in
      </span>
      <p className="loader-circle__text">{children}</p>
    </div>
  );
};

export const LoaderCircleEmpty = () => {
  return (
    <div className="loader-circle--empty ">
      <span className="material-icons popup-icon--big hourglass-animating">
        hourglass_empty
      </span>
    </div>
  );
};

export const LoaderCircleSmall = () => {
  return (
    <div className=" loader-circle--small">
      <span className="material-icons popup-icon--big hourglass-animating">
        hourglass_empty
      </span>
    </div>
  );
};
