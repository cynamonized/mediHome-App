import React, { useEffect, useState } from "react";
import "../../scss/main.scss";
import {
  DashboardHeaderSmall,
  DashboardFooterSmall,
} from "./DashboardLittleComps";
import { DateTime } from "luxon";
import { AppointmentDate } from "../Functions/convertTime";

const dateSpec = { month: "long", day: "numeric" };

export const DashboardPatientLHS = ({ patientAppointments }) => {
  const [appointments, setAppointments] = useState("");

  useEffect(() => {}, []);

  return (
    <div className="dashboard-patient__left-column">
      <DashboardHeaderSmall title={"Your appointments"} />
      <DashboardPatientLHSBody patientAppointments={patientAppointments} />
      <DashboardFooterSmall link={"#"} />
    </div>
  );
};

const DashboardPatientLHSBody = ({ patientAppointments }) => {
  const [plannedAppos, setPlannedAppos] = useState(true);
  const [currentData, setCurrentData] = useState(patientAppointments[0]);

  useEffect(() => {
    console.log(currentData);
    console.log(currentData[0].toLocaleString(DateTime.TIME_SIMPLE));
  }, []);

  // run script that changes [0] to [1] if plannedAppo is true
  // go back to [0] if plannedAppo is false

  const toggleTabs = () => {
    setPlannedAppo((prev) => !prev);
  };

  return (
    <>
      <div className="appointments">
        <div className="appointments__top-menu">
          <p className="top-menu__planned">Planned</p>
          <p className="top-menu__completed">Completed</p>
        </div>

        <ul className="appointments__appo-list">
          {currentData.map((appo) => {
            return (
              <li className="appo-list__single-appo" key={appo.date.ts}>
                <div className="single-appo__labels">
                  <p className="labels__date">{AppointmentDate(appo.date)}</p>
                  <p className="labels__spec">{appo.doctor}</p>
                  <p className="labels__adress">{appo.place}</p>
                </div>
                <div className="single-appo__settings"></div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
