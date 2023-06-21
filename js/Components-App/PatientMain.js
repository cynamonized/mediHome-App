import React from "react";
import "../../scss/main.scss";
import SearchAppointment from "./SearchAppointment";
import { DashboardPatient } from "./DashboardPatient";

export const PatientMain = () => {
  return (
    <>
      <SearchAppointment
        isPartOfSearch={false}
        // desiredCity={null}
        // desiredSpecialization={null}
        // desiredAppointmentDate={null}
      />
      <DashboardPatient />
    </>
  );
};
