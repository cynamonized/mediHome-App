import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainButton, SecondaryButton } from "./Buttons";
import { DashboardHeaderBig } from "../Components-App/Patient/DashboardLittleComps";
import { AppointmentDate } from "../Functions/convertTime";

export const PopUp = ({ actionProceed, closePopUp, chosenAppo, action }) => {
  return (
    <div className="pop-up fade-in-object">
      <div className="pop-up__window">
        <DashboardHeaderBig title={"Confirm action"} />
        <div className="window__body">
          {action == "cancel" ? (
            <>
              <p className="body__message">
                Are you sure you want to cancel appointment:
              </p>
            </>
          ) : (
            <p className="body__message">
              Please confirm booking this appointment:
            </p>
          )}

          <p className="body__appointment-name">
            {chosenAppo.specialization}
            {", "}
            {AppointmentDate(chosenAppo.date)}
          </p>
          <div className="body__buttons">
            <MainButton callbackAction={actionProceed} wide={true}>
              Confirm
            </MainButton>
            <SecondaryButton callbackAction={closePopUp} wide={true}>
              Cancel
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
