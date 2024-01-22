import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DashboardHeaderBig } from "./DashboardLittleComps";
import { MainButton } from "../../Utilities/Buttons";
import { PopUp, SimpleErrorPopUp } from "../../Utilities/PopUp";
import { LoaderCircle, ActionCompleted } from "../../Utilities/LoaderCircle";
import { AppoDateFromSeconds } from "../../Functions/convertTime";
import { getSingleUserAppointment } from "../../APICommunication/getSingleUserAppointment";
import { cancelThisAppointment } from "../../APICommunication/cancelAppointment";
import { useWindowSize } from "@uidotdev/usehooks";

export const SingleAppointment = ({ currentUserUID }) => {
  const location = useLocation();
  const { chosenAppoID, from, ifCompleted } = location.state;
  const navigate = useNavigate();

  const [chosenAppo, setChosenAppo] = useState(null);
  const [appoFetchList, setAppoFetchList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [denyPopUp, setDenyPopUp] = useState(false);
  const [cancelCompleted, setCancelCompleted] = useState(false);

  useEffect(() => {
    getSingleUserAppointment(
      currentUserUID,
      chosenAppoID,
      ifCompleted,
      setChosenAppo
    );
  }, []);

  const cancelAppo = async () => {
    setIsLoading(true);

    await cancelThisAppointment(
      currentUserUID,
      chosenAppoID,
      chosenAppo,
      setDenyPopUp
    );

    setIsLoading(false);
    setCancelCompleted(true);
    redirectToAppoList();
  };

  const redirectToAppoList = () => {
    const tempDelay = setTimeout(() => {
      navigate("/portal/app-list");
    }, 2000);
  };

  const closeDenyPopUp = () => {
    setDenyPopUp(false);
    navigate("/portal/app-list");
  };

  if (isLoading) {
    return <LoaderCircle />;
  }

  if (cancelCompleted) {
    return (
      <ActionCompleted>
        Appointment has been successfully cancelled!
      </ActionCompleted>
    );
  }

  return (
    <div className="appo-list dashboard__block container single-appo">
      {denyPopUp && (
        <SimpleErrorPopUp
          closePopUp={closeDenyPopUp}
          title={"This appointment is already gone!"}
        >
          Apologies, you are not assigned to this appointment anymore. Probably
          it was removed or changed by our administration. Contact us if you
          think this is an issue.{" "}
        </SimpleErrorPopUp>
      )}
      <DashboardHeaderBig title={"Appointment details"} link={from} />
      {chosenAppo && (
        <SingleAppoBody
          chosenAppo={chosenAppo}
          cancelAppo={cancelAppo}
          currentUserUID={currentUserUID}
        />
      )}
    </div>
  );
};

const SingleAppoBody = ({ chosenAppo, cancelAppo }) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const size = useWindowSize();

  const togglePopUp = () => {
    setIsPopUp((prev) => !prev);
  };

  return (
    <div className="single-appo__body">
      {isPopUp && (
        <PopUp
          actionProceed={cancelAppo}
          closePopUp={togglePopUp}
          chosenAppo={chosenAppo}
          action={"cancel"}
        />
      )}

      <div className="body__left-column">
        <p className="left-column__label">Date:</p>
        <p className="left-column__value">
          {chosenAppo != null
            ? `${AppoDateFromSeconds(chosenAppo.date.seconds)}`
            : ""}
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
        {chosenAppo && !chosenAppo.completed && size.width > 1005 && (
          <div className="single-appo__button-container">
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

        {chosenAppo && !chosenAppo.completed && size.width <= 1005 && (
          <div className="single-appo__button-container">
            <MainButton callbackAction={togglePopUp}>
              Cancel appointment
            </MainButton>
          </div>
        )}
      </div>
    </div>
  );
};
