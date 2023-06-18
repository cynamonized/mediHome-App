import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashboardHeaderBig } from "../DashboardLittleComps";
import { MainButton } from "../Buttons";
import { PopUp } from "../PopUp";
import { temporaryAppointments } from "../../APICommunication/tempArrays";
import { AppointmentDate } from "../../Functions/convertTime";
import { findAppo } from "../../Functions/findAppo";

export const SingleAppointment = () => {
  const location = useLocation();
  const { chosenAppoID, from } = location.state;

  const [chosenAppo, setChosenAppo] = useState(null);
  const [appoFetchList, setAppoFetchList] = useState(temporaryAppointments);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAppoFetchList(temporaryAppointments);
    appoFetchList && setChosenAppo(findAppo(appoFetchList, chosenAppoID));
  }, [appoFetchList]);

  const cancelAppo = () => {
    setIsLoading(true);

    /////////////////////////////////// This is temporary !!
    console.log("Rozpoczynam procedure fetchowania");
    // ADD WHAT HAPPENS IF DELETE
    // DELETE FROM "appoFetchList"
    // FETCH DELETE AND POST TO AVAILABLE APPOS ON THE SERVER
    console.log(chosenAppoID);
    const indexToRemove = temporaryAppointments[0].findIndex(
      (appo) => appo.id == chosenAppoID
    );
    console.log(indexToRemove);
    temporaryAppointments[0].splice(indexToRemove, 1);

    // I delay it on purpose, above should be real fetch that allows
    // 'navigate' once it's succesfull

    // Q: Server will handle managing cancelled appo
    //  to move it to available appos (?)
    // [TEMP] do above here instead (for now)
    const tempDelay = setTimeout(() => {
      navigate("/portal/app-list");
    }, 2500);
    ////////////////////////////////////
  };

  if (isLoading) {
    return (
      <div
        className="appo-list dashboard__block-small container single-appo"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>This is placeholder for a loader</p>
      </div>
    );
  }

  return (
    <div className="appo-list dashboard__block-small container single-appo">
      <DashboardHeaderBig title={"Appointment details"} link={from} />
      <SingleAppoBody chosenAppo={chosenAppo} cancelAppo={cancelAppo} />
    </div>
  );
};

const SingleAppoBody = ({ chosenAppo, cancelAppo }) => {
  const [isPopUp, setIsPopUp] = useState(false);

  const togglePopUp = () => {
    setIsPopUp((prev) => !prev);
  };

  return (
    <div className="single-appo__body">
      {isPopUp && (
        <PopUp
          cancelAppo={cancelAppo}
          closePopUp={togglePopUp}
          chosenAppo={chosenAppo}
        />
      )}

      <div className="body__left-column">
        <p className="left-column__label">Date:</p>
        <p className="left-column__value">
          {chosenAppo != null ? `${AppointmentDate(chosenAppo.date)}` : ""}
        </p>
        <p className="left-column__label">Localization:</p>
        <p className="left-column__value">
          {chosenAppo != null ? `${chosenAppo.place}` : ""}
        </p>
        <p className="left-column__label">Specialization:</p>
        <p className="left-column__value">
          {chosenAppo != null ? `${chosenAppo.specialization}` : ""}
        </p>
        <p className="left-column__label">Doctor:</p>
        <p className="lef-column__value">
          {chosenAppo != null ? `${chosenAppo.doctor}` : ""}
        </p>
        {chosenAppo && !chosenAppo.completed && (
          <div className="left-column__button-container">
            <MainButton callbackAction={togglePopUp}>
              Cancel appointment
            </MainButton>
          </div>
        )}
      </div>
      <div className="body__right-column">
        <p className="right-column__how-to-prep">How to prepare?</p>
        <p className="right-column__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          velit nulla, condimentum eu metus ac, ultricies luctus neque. Aliquam
          erat volutpat. Etiam vel nisl maximus, fermentum turpis at, faucibus
          nisl. Ut ultrices finibus tortor, sit amet varius lectus suscipit in.
          Aliquam tellus metus, blandit quis velit eu, auctor sagittis dui.
          Proin purus quam, sagittis at lectus ac, consequat ultricies dolor.
          Cras tristique vehicula euismod. Integer pulvinar tellus in nulla
          porttitor efficitur.
        </p>

        <p className="right-column__doc-rec-label">Doctor recommendations:</p>

        <p className="right-column__description">
          {chosenAppo &&
            chosenAppo.completed &&
            `${chosenAppo.recommendations}`}
          {chosenAppo &&
            !chosenAppo.completed &&
            "Once the appointment is completed, you will see here doctors' recommendations for you to follow."}
        </p>
      </div>
    </div>
  );
};