import React, { useEffect, useState } from "react";
import SearchAppointment from "../SearchAppointment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashboardHeaderBig } from "../DashboardLittleComps";

export const SearchDashboard = () => {
  // ADD here the useLoc states from /start that are picked by user
  //   const location = useLocation();
  //   const { appoCity, appoSpecialization, appoDate } = location.state;
  const location = useLocation();
  const { city, specialization, appointmentDate } = location.state;

  const [onSearchPage, setOnSearchPage] = useState(true);

  return (
    <>
      {console.log(city, specialization, appointmentDate)}
      <SearchAppointment />
      <SearchResults />
    </>
  );
};

const SearchResults = () => {
  return (
    <div className="search-results dashboard__block-small container">
      <DashboardHeaderBig title={"Search results"} link={"/portal/start"} />
      {/* <SingleAppoBody chosenAppo={chosenAppo} cancelAppo={cancelAppo} /> */}
    </div>
  );
};
