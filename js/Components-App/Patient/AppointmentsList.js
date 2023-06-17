import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardHeaderBig } from "../DashboardLittleComps";
import { temporaryAppointments } from "../../APICommunication/tempArrays";
import {
  AppointmentDate,
  AppointmentPureDate,
  AppointmentTime,
} from "../../Functions/convertTime";

console.log(temporaryAppointments[0]);

export const AppointmentsList = () => {
  const [plannedAppos, setPlannedAppos] = useState(null);
  const [completedAppos, setCompletedAppos] = useState(null);

  useEffect(() => {
    setPlannedAppos(temporaryAppointments[0]);
    setCompletedAppos(temporaryAppointments[1]);
    console.log(plannedAppos);
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
            <tr>
              <th className="content__row-head">Date</th>
              <th className="content__row-head">Hour</th>
              <th className="content__row-head">Doctor</th>
              <th className="content__row-head">Specialization</th>
              <th className="content__row-head">Localization</th>
              <th className="content__row-head content__row-head--last">
                Settings
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td>12</td>
              <td className="content__settings-column">
                <Link to="/portal/start">
                  <span className="material-icons settings-column__icon">
                    more_horiz
                  </span>
                </Link>
              </td>
            </tr>

            {/* {appos.map((appo) => {
              return <>aaaa</>;
            })} */}
          </tbody>
        </table>
      </div>
    </>
  );
};
