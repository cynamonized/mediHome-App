import React, { useEffect, useState } from "react";
import SearchAppointment from "../SearchAppointment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashboardHeaderBig } from "../DashboardLittleComps";
import { TertiaryButton } from "../Buttons";
import { PopUp } from "../PopUp";
import { searchForAppointment } from "../../APICommunication/GetAppointments";
import {
  temporaryAppointmentsUser,
  AllAppos,
} from "../../APICommunication/tempArrays";
import { userIDserver } from "../../APICommunication/user";
import { bookThisAppoFetch } from "../../APICommunication/GetAppointments";
import {
  AppointmentPureDate,
  AppointmentTime,
} from "../../Functions/convertTime";
import { LoaderCircle, BookingCompleted } from "../LoaderCircle";

export const SearchDashboard = () => {
  const location = useLocation();
  const { city, specialization, appointmentDate } = location.state;
  const navigate = useNavigate();

  const [foundAppos, setFoundAppos] = useState([]);

  const [appoUserPicked, setAppoUserPicked] = useState("");
  const [fetchIsLoading, setFetchIsLoading] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [confirmPopUp, setConfirmPopUp] = useState(false);

  useEffect(() => {
    searchingMain(city, specialization, appointmentDate, AllAppos);
  }, []);

  const searchingMain = (city, specialization, appointmentDate, apposArray) => {
    searchForAppointment(
      city,
      specialization,
      appointmentDate,
      apposArray,
      setFoundAppos
    );
  };

  const showPopUp = (appo) => {
    setAppoUserPicked(appo);
    setConfirmPopUp(true);
  };

  const bookAppo = () => {
    setConfirmPopUp(false);
    setFetchIsLoading(true);

    // fetching here FIREBASE
    const tempDelayFetch = setTimeout(() => {
      bookThisAppoFetch(
        appoUserPicked,
        userIDserver,
        temporaryAppointmentsUser,
        AllAppos,
        redirectToStart
      );
    }, 1000);
  };

  const redirectToStart = () => {
    setBookingCompleted(true);
    setFetchIsLoading(false);

    const tempDelay = setTimeout(() => {
      navigate("/portal/start");
    }, 2000);
  };

  const closePopUp = () => {
    setConfirmPopUp(false);
  };

  if (bookingCompleted) {
    return <BookingCompleted />;
  }

  if (fetchIsLoading) {
    return <LoaderCircle />;
  }

  return (
    <main className="search-dashboard">
      {confirmPopUp && (
        <PopUp
          actionProceed={bookAppo}
          closePopUp={closePopUp}
          chosenAppo={appoUserPicked}
          action={"Book"}
        />
      )}

      <SearchAppointment
        isPartOfSearch={true}
        desiredCity={city}
        desiredSpecialization={specialization}
        desiredAppointmentDate={appointmentDate}
        searchCallback={searchingMain}
        saveApposCallback={setFoundAppos}
      />
      <SearchResults appos={foundAppos} callbackBookAppo={showPopUp} />
    </main>
  );
};

const SearchResults = ({ appos, callbackBookAppo }) => {
  const buttonBook = (appo) => {
    callbackBookAppo(appo);
  };

  return (
    <div className="search-results dashboard__block-small container  ">
      <DashboardHeaderBig title={"Search results"} link={"/portal/start"} />
      <div className="appo-list__table dashboard-table search-results__table-container">
        <p className="table__title">Available appointments:</p>
        <table className="table__content  search-table">
          <thead>
            <tr className="content__row-head">
              <th className=" col-date">Date</th>
              <th className=" col-time">Hour</th>
              <th className=" col-doctor">Doctor</th>
              <th className=" col-spec">Specialization</th>
              <th className=" col-address">Localization</th>
              <th className=" col-set content__row-head--last head-set">
                Book
              </th>
            </tr>
          </thead>
          <tbody>
            {appos &&
              appos.map((appo) => {
                return (
                  <tr key={appo.id} className="appo-row">
                    <td className=" col-date">
                      {AppointmentPureDate(appo.date)}
                    </td>
                    <td className=" col-time">{AppointmentTime(appo.date)}</td>
                    <td className=" col-doctor">{appo.doctor}</td>
                    <td className=" col-spec">{appo.specialization}</td>
                    <td className=" col-address">{appo.place}</td>
                    <td className="col-set content__settings-column">
                      <TertiaryButton
                        callbackAction={(e) => {
                          e.preventDefault();
                          buttonBook(appo);
                        }}
                        wide={false}
                      >
                        Book
                      </TertiaryButton>
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
