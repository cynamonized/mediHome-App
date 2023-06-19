import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../scss/main.scss";
import {
  DashboardHeaderSmall,
  DashboardFooterSmall,
} from "./DashboardLittleComps";
import { AppointmentDate } from "../Functions/convertTime";

export const DashboardPatientLHS = ({ patientAppointments }) => {
  const [appointments, setAppointments] = useState("");

  return (
    <div className="dashboard-patient__left-column">
      <DashboardHeaderSmall title={"Your appointments"} />
      <DashboardPatientLHSBody patientAppointments={patientAppointments} />
      <DashboardFooterSmall link={"/portal/app-list"} />
    </div>
  );
};

const DashboardPatientLHSBody = ({ patientAppointments }) => {
  const [plannedAppos, setPlannedAppos] = useState(true);
  const [currentData, setCurrentData] = useState(patientAppointments[0]);

  const toggleTabs = () => {
    setPlannedAppos((prev) => !prev);

    patientAppointments.indexOf(currentData) == 0 &&
      setCurrentData(patientAppointments[1]);
    patientAppointments.indexOf(currentData) == 1 &&
      setCurrentData(patientAppointments[0]);
  };

  return (
    <>
      <div className="appointments">
        <div className="appointments__top-menu">
          <div
            className={`top-menu__planned ${
              plannedAppos ? "top-menu__active" : "top-menu__not-active"
            }`}
          >
            <p className="top-menu__planned" onClick={toggleTabs}>
              Planned
            </p>
          </div>
          <div
            className={`top-menu__completed ${
              plannedAppos ? "top-menu__not-active" : "top-menu__active"
            }`}
          >
            <p className="top-menu__completed" onClick={toggleTabs}>
              Completed
            </p>
          </div>
        </div>

        <ul className="appointments__appo-list">
          {currentData.map((appo) => {
            return (
              <li className="appo-list__single-appo" key={appo.id}>
                <div className="single-appo__labels">
                  <p className="labels__date">{AppointmentDate(appo.date)}</p>
                  <p className="labels__spec">{appo.doctor}</p>
                  <p className="labels__adress">{appo.place}</p>
                </div>

                <Link
                  to="/portal/single-apointment"
                  state={{
                    chosenAppoID: appo.id,
                    from: "/portal/start",
                  }}
                >
                  <div className="single-appo__settings"></div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
