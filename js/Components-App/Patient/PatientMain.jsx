import React from "react";
import "../../../scss/main.scss";
import SearchAppointment from "./SearchAppointment";
import { DashboardPatient } from "./DashboardPatient";

export const PatientMain = ({ currentUserUID }) => {
  return (
    <>
      <SearchAppointment isPartOfSearch={false} />
      <DashboardPatient currentUserUID={currentUserUID} />
    </>
  );
};
