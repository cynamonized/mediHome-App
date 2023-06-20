import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainButton, SecondaryButton } from "./Buttons";
import { DashboardHeaderBig } from "./DashboardLittleComps";
import { AppointmentDate } from "../Functions/convertTime";

export const PopUp = ({ cancelAppo, closePopUp, chosenAppo }) => {
  const actionConfirmed = () => {
    console.log("=====ACTION CONFIRMED======");
  };

  const actionDenied = () => {
    console.log("=====ACTION DENIED=========");
  };

  return (
    <div className="pop-up fade-in-object">
      <div className="pop-up__window">
        <DashboardHeaderBig title={"Confirm action"} />
        <div className="window__body">
          <p className="body__message">
            Are you sure you want to cancel appointment:
          </p>
          <p className="body__appointment-name">
            {chosenAppo.specialization}
            {AppointmentDate(chosenAppo.date)}
          </p>
          <div className="body__buttons">
            <MainButton callbackAction={cancelAppo} wide={true}>
              Yes
            </MainButton>
            <SecondaryButton callbackAction={closePopUp} wide={true}>
              No
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ToolTip = () => {
  return (
    <div className="tooltip">
      <span className="material-icons">info</span>
    </div>
  );
};
