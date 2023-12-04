import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardHeaderBig } from "./DashboardLittleComps";
import {
  AppoPureDateFromSeconds,
  AppoTimeFromSeconds,
} from "../../Functions/convertTime";
import { getUserAppointmentsMultiArray } from "../../APICommunication/getUserAppoinments";
import { useWindowSize } from "@uidotdev/usehooks";

export const AppointmentsList = ({ currentUserUID }) => {
  const [appoMultiArray, setAppoMultiArray] = useState(null);

  useEffect(() => {
    getUserAppointmentsMultiArray(currentUserUID, setAppoMultiArray);
  }, []);

  return (
    <>
      <main className="appo-list dashboard__block container">
        <DashboardHeaderBig title={"My appointments"} link={"/portal"} />
        {appoMultiArray && (
          <div className="appo-list__body">
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
          </div>
        )}
      </main>
    </>
  );
};

const AppointetsTable = ({ title, appos, isCompleted }) => {
  const size = useWindowSize();

  return (
    <>
      <div className="body__table dashboard-table appo-list__table--my-appos">
        <p className="table__title">{title}</p>
        {size.width > 1005 ? (
          <table className="table__content">
            <thead>
              <tr className="content__row-head">
                <th className=" col-date">Date</th>
                <th className=" col-time">Hour</th>
                <th className=" col-doctor">Doctor</th>
                <th className=" col-spec">Specialization</th>
                <th className=" col-address">Localization</th>
                <th className=" col-set content__row-head--last">Settings</th>
              </tr>
            </thead>
            <tbody>
              {appos &&
                appos.map((appo) => {
                  if (!appo.specialization) {
                    return "";
                  }
                  return (
                    <tr
                      key={appo.id}
                      className={
                        isCompleted == true
                          ? "appo-row appo-greyed-out"
                          : "appo-row"
                      }
                    >
                      <td className=" col-date">
                        {AppoPureDateFromSeconds(appo.date.seconds)}
                      </td>
                      <td className=" col-time">
                        {AppoTimeFromSeconds(appo.date.seconds)}
                      </td>
                      <td className=" col-doctor">{appo.doctor}</td>
                      <td className=" col-spec">{appo.specialization}</td>
                      <td className=" col-address">{appo.place}</td>

                      <td
                        className=" col-set content__settings-column"
                        style={{
                          marginRight: appos.length < 4 ? "10px" : "0px",
                        }}
                      >
                        <Link
                          to="/single-apointment"
                          state={{
                            chosenAppoID: appo.id,
                            from: "/app-list",
                            ifCompleted: appo.completed,
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
        ) : (
          <div className="table__content--mobile">
            {appos &&
              appos.map((appo) => {
                return (
                  <div className="content__single-appo" key={appo.id}>
                    {/* ADD STYLING TO ALL OF THIS */}
                    {/* STYLING ON RHS FILE */}
                    <div className="single-appo__top-row">
                      <p className="top-row__spec">{appo.specialization}</p>
                      <div className="top-row__set">
                        <Link
                          to="/single-apointment"
                          state={{
                            chosenAppoID: appo.id,
                            from: "/app-list",
                            ifCompleted: appo.completed,
                          }}
                        >
                          <span className="material-icons settings-column__icon">
                            more_horiz
                          </span>
                        </Link>
                      </div>
                    </div>

                    <p className="single-appo__date">
                      {" "}
                      {AppoPureDateFromSeconds(appo.date.seconds)}
                    </p>
                    <p className="single-appo__time">
                      {AppoTimeFromSeconds(appo.date.seconds)}
                    </p>
                    <p className="single-appo__doctor">{appo.doctor}</p>
                    <p className="single-appo__address">{appo.place}</p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};
