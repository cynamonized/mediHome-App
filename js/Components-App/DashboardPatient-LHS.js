import React, { useEffect, useState } from "react";
import "../../scss/main.scss";
import {
  DashboardHeaderSmall,
  DashboardFooterSmall,
} from "./DashboardLittleComps";

export const DashboardPatientLHS = ({ patientAppointments }) => {
  const [appointments, setAppointments] = useState("");

  return (
    <div className="dashboard-patient__left-column">
      <DashboardHeaderSmall title={"Your appointments"} />
      <DashboardFooterSmall link={"#"} />
    </div>
  );
};
