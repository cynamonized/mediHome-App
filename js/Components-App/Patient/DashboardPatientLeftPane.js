import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../../scss/main.scss";
import {
  DashboardHeaderSmall,
  DashboardFooterSmall,
} from "./DashboardLittleComps";
import { AppointmentDate } from "../../Functions/convertTime";
import { getUserAppointmentsF } from "../../APICommunication/getUserAppoinments";

export const DashboarPatientLeftPane = ({ patientAppointments }) => {
  return (
    <div className="dashboard-patient__left-column">
      <DashboardHeaderSmall title={"Your appointments"} />
      <DashboardPatientLeftPaneBody patientAppointments={patientAppointments} />
      <DashboardFooterSmall link={"/app-list"} />
    </div>
  );
};

const DashboardPatientLeftPaneBody = ({ patientAppointments }) => {
  const [allUserAppointments, setAllUserAppointments] = useState("");
  const [appointments, setAppointments] = useState("");
  const [bookedAppos, setBookedAppos] = useState("");
  const [currentAppos, setCurrentAppos] = useState("");

  const [plannedAppos, setPlannedAppos] = useState(true);
  const [currentData, setCurrentData] = useState(() => {
    if (patientAppointments) {
      return patientAppointments[0];
    } else {
      return null;
    }
  });

  // to read from the user once session can be maintained
  const userUID = "3eyqbBF2h8M27OVISJfsae0xDM42";

  const initialRenderAppos = useRef(true);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if (initialRenderAppos.current) {
  //     initialRenderAppos.current = false;
  //   } else {
  //     setCurrentData(patientAppointments[0]);
  //   }
  // }, [patientAppointments]);

  useEffect(() => {
    // get and assign to proper states (arrays)
    getUserAppointmentsF(userUID);
  }, []);

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
          {currentData &&
            currentData.map((appo) => {
              return (
                <li className="appo-list__single-appo" key={appo.id}>
                  <div className="single-appo__labels">
                    <p className="labels__date">{AppointmentDate(appo.date)}</p>
                    <p className="labels__spec">{appo.specialization}</p>
                    <p className="labels__doc">{appo.doctor}</p>
                    <p className="labels__adress">{appo.place}</p>
                  </div>

                  <Link
                    to="/single-apointment"
                    state={{
                      chosenAppoID: appo.id,
                      from: "/portal",
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
