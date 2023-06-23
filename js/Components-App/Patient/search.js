import React, { useEffect, useState } from "react";
import SearchAppointment from "../SearchAppointment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashboardHeaderBig } from "../DashboardLittleComps";
import { searchForAppointment } from "../../APICommunication/GetAppointments";
import { temporaryAppointmentsUser } from "../../APICommunication/tempArrays";
import { userIDserver } from "../../APICommunication/user";
import { AllAppos } from "../../APICommunication/tempArrays";
import {
  AppointmentPureDate,
  AppointmentTime,
} from "../../Functions/convertTime";

export const SearchDashboard = () => {
  const location = useLocation();
  const { city, specialization, appointmentDate } = location.state;

  const [foundAppos, setFoundAppos] = useState([]);

  useEffect(() => {
    searchingMain(city, specialization, appointmentDate, AllAppos);
  }, []);

  const searchingMain = (city, specialization, appointmentDate, apposArray) => {
    console.log(city, specialization, appointmentDate);
    searchForAppointment(
      city,
      specialization,
      appointmentDate,
      apposArray,
      setFoundAppos
    );
  };

  return (
    <>
      <SearchAppointment
        isPartOfSearch={true}
        desiredCity={city}
        desiredSpecialization={specialization}
        desiredAppointmentDate={appointmentDate}
        searchCallback={searchingMain}
        saveApposCallback={setFoundAppos}
      />
      <SearchResults appos={foundAppos} />
    </>
  );
};

const SearchResults = ({ appos }) => {
  return (
    <div className="search-results dashboard__block-small container">
      <DashboardHeaderBig title={"Search results"} link={"/portal/start"} />
      {/* <div className="search-results__body">ccc</div> */}
      <div className="appo-list__table dashboard-table">
        <p className="table__title">Available appointments:</p>
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
                  <tr key={appo.id} className="appo-row">
                    <td>{AppointmentPureDate(appo.date)}</td>
                    <td>{AppointmentTime(appo.date)}</td>
                    <td>{appo.doctor}</td>
                    <td>{appo.specialization}</td>
                    <td>{appo.place}</td>
                    <td className="content__settings-column">
                      {/* <Link
                        to="/portal/single-apointment"
                        state={{
                          chosenAppoID: appo.id,
                          from: "/portal/app-list",
                        }}
                      >
                        <span className="material-icons settings-column__icon">
                          more_horiz
                        </span>
                      </Link> */}
                      BOOK!
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
