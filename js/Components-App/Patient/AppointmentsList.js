import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardHeaderBig } from "../DashboardLittleComps";
import { temporaryAppointmentsUser } from "../../APICommunication/tempArrays";
import {
  AppointmentPureDate,
  AppointmentTime,
} from "../../Functions/convertTime";
import { getUserAppointments } from "../../APICommunication/GetAppointments";
import { userIDserver } from "../../APICommunication/user";

export const AppointmentsList = () => {
  const [appoMultiArray, setAppoMultiArray] = useState(null);

  useEffect(() => {
    // Here it needs to fetch when server is ready
    getUserAppointments(
      userIDserver,
      temporaryAppointmentsUser,
      setAppoMultiArray
    );
  }, []);

  return (
    <>
      <div className="appo-list dashboard__block-small container">
        <DashboardHeaderBig title={"My appointments"} link={"/portal/start"} />
        {appoMultiArray && (
          <>
            <AppointetsTable
              title={"Planned"}
              appos={appoMultiArray[0]}
              isCompleted={false}
            />
            <AppointetsTable
              title={"Completed"}
              appos={appoMultiArray[1]}
              isCompleted={true}
            />
          </>
        )}
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
            {appos &&
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
