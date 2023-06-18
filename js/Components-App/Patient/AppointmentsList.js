import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardHeaderBig } from "../DashboardLittleComps";
import { temporaryAppointments } from "../../APICommunication/tempArrays";
import {
  AppointmentPureDate,
  AppointmentTime,
} from "../../Functions/convertTime";

export const AppointmentsList = () => {
  const [plannedAppos, setPlannedAppos] = useState([1]);
  const [completedAppos, setCompletedAppos] = useState([1]);

  useEffect(() => {
    setPlannedAppos(temporaryAppointments[0]);
    setCompletedAppos(temporaryAppointments[1]);
  }, []);

  return (
    <>
      <div className="appo-list dashboard__block-small container">
        <DashboardHeaderBig title={"My appointments"} link={"/portal/start"} />
        <AppointetsTable
          title={"Planned"}
          appos={plannedAppos}
          isCompleted={false}
        />
        <AppointetsTable
          title={"Completed"}
          appos={completedAppos}
          isCompleted={true}
        />
      </div>
    </>
  );
};

const AppointetsTable = ({ title, appos, isCompleted }) => {
  return (
    <>
      <div className="appo-list__table dashboard-table">
        <p className="table__title">{title}</p>
        <table className="table__content">
          <thead>
            <tr className="content__row-head">
              <th className=" head-date">Date</th>
              <th className=" head-time">Hour</th>
              <th className=" head-doctor">Doctor</th>
              <th className=" head-spec">Specialization</th>
              <th className=" head-address">Localization</th>
              <th className=" content__row-head--last head-set">Settings</th>
            </tr>
          </thead>
          <tbody>
            {appos[0] != 1 &&
              appos.map((appo) => {
                return (
                  <tr
                    key={appo.id}
                    className={
                      isCompleted == true
                        ? "appo-row appo-greyed-out"
                        : "appo-row"
                    }
                  >
                    <td>{AppointmentPureDate(appo.date)}</td>
                    <td>{AppointmentTime(appo.date)}</td>
                    <td>{appo.doctor}</td>
                    <td>{appo.specialization}</td>
                    <td>{appo.place}</td>
                    <td className="content__settings-column">
                      <Link
                        to="/portal/single-apointment"
                        state={{
                          chosenAppoID: appo.id,
                          from: "/portal/app-list",
                        }}
                      >
                        <span className="material-icons settings-column__icon">
                          more_horiz
                        </span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
