import React from "react";
import "../../scss/main.scss";

export const LoaderCircle = () => {
  return (
    <div className="loader-circle container ">
      <span className="material-icons popup-icon--big">hourglass_empty</span>
      <p className="loader-circle__text">We are processing your request</p>
    </div>
  );
};

export const BookingCompleted = () => {
  return (
    <div className="loader-circle container ">
      <span className="material-icons popup-icon--big">
        assignment_turned_in
      </span>
      <p className="loader-circle__text">
        Appointment has been successfully booked!
      </p>
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
