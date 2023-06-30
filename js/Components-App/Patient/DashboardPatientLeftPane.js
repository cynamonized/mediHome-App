import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../../scss/main.scss";
import {
  DashboardHeaderSmall,
  DashboardFooterSmall,
} from "./DashboardLittleComps";
import { PopUpTiny } from "../../Utilities/PopUp";
import { AppoDateFromSeconds } from "../../Functions/convertTime";
import { getUserAppointmentsMultiArray } from "../../APICommunication/getUserAppoinments";

export const DashboarPatientLeftPane = ({ currentUserUID }) => {
  const [patientAppointments, setPatientAppointments] = useState(null);

  useEffect(() => {
    getUserAppointmentsMultiArray(currentUserUID, setPatientAppointments);
  }, []);

  return (
    <div className="dashboard-patient__left-column">
      <DashboardHeaderSmall title={"Your appointments"} />
      <DashboardPatientLeftPaneBody
        patientAppointments={patientAppointments}
        currentUserUID={currentUserUID}
      />
      <DashboardFooterSmall link={"/app-list"} />
    </div>
  );
};

const DashboardPatientLeftPaneBody = ({ patientAppointments }) => {
  const [plannedAppos, setPlannedAppos] = useState(true);
  const [currentData, setCurrentData] = useState(() => {
    if (patientAppointments) {
      return patientAppointments[0];
    } else {
      return null;
    }
  });

  const initialRenderAppos = useRef(true);

  useEffect(() => {
    if (initialRenderAppos.current) {
      initialRenderAppos.current = false;
    } else {
      setCurrentData(patientAppointments[0]);
    }
  }, [patientAppointments]);

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
            <p
              className="top-menu__planned"
              onClick={() => {
                if (!plannedAppos) {
                  toggleTabs();
                }
              }}
            >
              Planned
            </p>
          </div>
          <div
            className={`top-menu__completed ${
              plannedAppos ? "top-menu__not-active" : "top-menu__active"
            }`}
          >
            <p
              className="top-menu__completed"
              onClick={() => {
                if (plannedAppos) {
                  toggleTabs();
                }
              }}
            >
              Completed
            </p>
          </div>
        </div>
        {patientAppointments != null ? (
          <ul className="appointments__appo-list">
            {currentData &&
              currentData.map((appo) => {
                if (!appo.specialization) {
                  return "";
                }

                return (
                  <li className="appo-list__single-appo" key={appo.id}>
                    <div className="single-appo__labels">
                      <p className="labels__date">
                        {AppoDateFromSeconds(appo.date.seconds)}
                      </p>
                      <p className="labels__spec">{appo.specialization}</p>
                      <p className="labels__doc">{appo.doctor}</p>
                      <p className="labels__adress">{appo.place}</p>
                    </div>

                    <Link
                      to="/single-apointment"
                      state={{
                        chosenAppoID: appo.id,
                        from: "/portal",
                        ifCompleted: appo.completed,
                      }}
                    >
                      <div className="single-appo__settings"></div>
                    </Link>
                  </li>
                );
              })}
          </ul>
        ) : (
          <PopUpTiny />
        )}
      </div>
    </>
  );
};
