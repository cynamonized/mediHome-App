import React, { useEffect, useState } from "react";
import SearchAppointment from "./SearchAppointment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashboardHeaderBig } from "./DashboardLittleComps";
import { TertiaryButton } from "../../Utilities/Buttons";
import { PopUp, PopUpDeny, PopUpLoading } from "../../Utilities/PopUp";
import {
  AppoPureDateFromSeconds,
  AppoTimeFromSeconds,
} from "../../Functions/convertTime";
import {
  LoaderCircle,
  LoaderCircleSmall,
  ActionCompleted,
} from "../../Utilities/LoaderCircle";
import { searchForAppo } from "../../APICommunication/searchForAppo";
import { bookThisAppointment } from "../../APICommunication/bookAppointment";
import { useWindowSize } from "@uidotdev/usehooks";

export const SearchDashboard = ({ currentUserUID }) => {
  const location = useLocation();
  const { city, specialization, appointmentDate } = location.state;
  const navigate = useNavigate();

  const [foundAppos, setFoundAppos] = useState(null);

  const [appoUserPicked, setAppoUserPicked] = useState("");
  const [chosenSpecForValid, setChosenSpecForValid] = useState("");
  const [searchValuesBackup, setSearchValuesBackup] = useState("");
  const [fetchIsLoading, setFetchIsLoading] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [denyPopUp, setDenyPopUp] = useState(false);
  const [appoGone, setAppoGone] = useState(false);

  useEffect(() => {
    searchingMain(city, specialization, appointmentDate);
  }, []);

  const searchingMain = (city, specialization, appointmentDate) => {
    // Saving spec type to check if user already have this kind of appo
    setChosenSpecForValid(specialization.label);

    // allowing loader animation to jump back in
    setFoundAppos(null);

    //Saving searching parameters in case page needs to be refreshed
    setSearchValuesBackup({
      city: city.label,
      specialization: specialization.label,
      ppointmentDate: appointmentDate,
    });

    searchForAppo(
      city.label,
      specialization.label,
      appointmentDate,
      setFoundAppos
    );
  };

  const refreshSearch = () => {
    searchForAppo(
      searchValuesBackup.city,
      searchValuesBackup.specialization,
      searchValuesBackup.appointmentDate,
      setFoundAppos
    );
  };

  const showPopUp = (appo) => {
    setAppoUserPicked(appo);
    setConfirmPopUp(true);
  };

  const bookAppo = async () => {
    setConfirmPopUp(false);
    setFetchIsLoading(true);

    await bookThisAppointment(
      currentUserUID,
      chosenSpecForValid,
      setDenyPopUp,
      setFetchIsLoading,
      appoUserPicked,
      setAppoGone,
      refreshSearch,
      redirectToStart
    );
  };

  const redirectToStart = () => {
    setFetchIsLoading(false);
    setBookingCompleted(true);

    const tempDelay = setTimeout(() => {
      navigate("/portal");
    }, 2000);
  };

  const closePopUp = () => {
    setConfirmPopUp(false);
  };

  const closeDenyPopUp = (secondaryAction) => {
    setDenyPopUp(false);
    setAppoGone(false);

    if (secondaryAction) {
      refreshSearch();
    }
  };

  if (bookingCompleted) {
    return (
      <ActionCompleted>
        Appointment has been successfully booked!
      </ActionCompleted>
    );
  }

  return (
    <main className="search-dashboard">
      {denyPopUp && (
        <PopUpDeny
          refresh={closeDenyPopUp}
          specialization={chosenSpecForValid}
          action={""}
          reason={"UserAlreadyHaveAppo"}
        />
      )}

      {appoGone && (
        <PopUpDeny
          refresh={closeDenyPopUp}
          specialization={chosenSpecForValid}
          reason={"AppoIsGone"}
          secondaryAction={true}
        />
      )}

      {confirmPopUp && (
        <PopUp
          actionProceed={bookAppo}
          closePopUp={closePopUp}
          chosenAppo={appoUserPicked}
          action={"Book"}
        />
      )}

      {fetchIsLoading && <PopUpLoading />}

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
  const size = useWindowSize();

  const buttonBook = (appo) => {
    callbackBookAppo(appo);
  };

  return (
    <div className="search-results dashboard__block container  ">
      <DashboardHeaderBig title={"Search results"} link={"/portal"} />
      <div className="appo-list__table dashboard-table search-results__table-container">
        <p className="table__title">Available appointments:</p>

        {size.width > 1005 ? (
          <table className="table__content  search-table">
            <thead>
              <tr className="content__row-head">
                <th className=" col-date">Date</th>
                <th className=" col-time">Hour</th>
                <th className=" col-doctor">Doctor</th>
                <th className=" col-spec">Specialization</th>
                <th className=" col-address col-address--search">
                  Localization
                </th>
                <th className=" col-set col-set--search content__row-head--last head-set"></th>
              </tr>
            </thead>
            <tbody>
              {appos ? (
                appos.map((appo) => {
                  return (
                    <tr key={appo.id} className="appo-row">
                      <td className=" col-date">
                        {AppoPureDateFromSeconds(appo.date.seconds)}
                      </td>
                      <td className=" col-time">
                        {AppoTimeFromSeconds(appo.date.seconds)}
                      </td>
                      <td className=" col-doctor">{appo.doctor}</td>
                      <td className=" col-spec">{appo.specialization}</td>
                      <td className=" col-address col-address--search">
                        {appo.place}
                      </td>
                      <td className="col-set col-set--search content__settings-column">
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
                })
              ) : (
                <tr className="loader">
                  <td>
                    <LoaderCircleSmall />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="table__content--mobile">
            {appos &&
              appos.map((appo) => {
                return (
                  <div className="content__single-appo" key={appo.id}>
                    <div className="single-appo__top-row ">
                      <p className="top-row__spec">{appo.specialization}</p>
                      <div className="top-row__set">
                        <TertiaryButton
                          callbackAction={(e) => {
                            e.preventDefault();
                            buttonBook(appo);
                          }}
                          wide={false}
                        >
                          Book
                        </TertiaryButton>
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
    </div>
  );
};
