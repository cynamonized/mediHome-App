import React, { useEffect, useState } from "react";
import "../../scss/main.scss";
import {
  doingSomething,
  searchForAppointment,
} from "../APICommunication/GetAppointments";
import { MainButton } from "./Buttons";
import { getTodaysDate } from "../dates";
// -----------------------------------------

import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";

//------------------------------------------

//placeholder for cities & specs - to delete once API is here
const cities = [
  { value: "krakow", label: "Krakow" },
  { value: "poznan", label: "Poznan" },
  { value: "warsaw", label: "Warsaw" },
];
const specs = [
  { value: "internist", label: "Internist" },
  { value: "orthopaedist", label: "Orthopaedist" },
  { value: "orthodontist", label: "Orthodontist" },
];

const SearchAppointment = () => {
  const [city, setCity] = useState({
    value: "default",
    label: "Select a city",
  });
  const [cityValues, setCityValues] = useState([]);

  const [specialization, setSpecialization] = useState({
    value: "default",
    label: "Select a specialization",
  });
  const [specValues, setSpecValues] = useState([]);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [calendarMinValue, setCalendarMinValue] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    value: "default",
    label: "test",
  });

  useEffect(() => {
    setAppointmentDate(getTodaysDate());
    setCalendarMinValue(getTodaysDate());
    loadCitiesSpecs(cities, specs);
  }, []);

  const loadCitiesSpecs = (citiesObjectArray, specsObjectArray) => {
    // Communication with API to appear here - reading available cities
    setCityValues(citiesObjectArray);
    setSpecValues(specsObjectArray);
  };

  const updateCity = ({ target }) => {
    setCity(target.value);
  };
  const updateSpecialization = ({ target }) => {
    setSpecialization(target.value);
  };
  const updateDate = ({ target }) => {
    setAppointmentDate(target.value);
  };

  return (
    <section className="search-appointment">
      <div className="container search-appointment-container">
        <h1 className="search-appointment__main-title">
          Schedule an appointment
        </h1>
        <form className="search-appointment__form" onSubmit={doingSomething}>
          {/* TO MOVE THIS TO ANOTHER FILE AND STUDY AGAIN ALL THIS CHILDREN THING */}
          <Select
            defaultValue={city}
            value={city}
            onChange={updateCity}
            options={cityValues}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: "#1f2f98",
                borderRadius: "30px",
                height: "100%",
                padding: "7px",
              }),
            }}
          />

          <Select
            defaultValue={specialization}
            value={specialization}
            onChange={updateSpecialization}
            options={specValues}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isActive ? "grey" : "red",
                borderRadius: "30px",
                height: "100%",
                padding: "7px",
              }),
            }}
          />

          <input
            type="date"
            value={appointmentDate}
            min={calendarMinValue}
            onChange={(e) => {
              updateDate(e);
            }}
          />

          <MainButton
            callbackAction={(e) => {
              searchForAppointment(e);
            }}
          >
            Search
          </MainButton>
        </form>
      </div>
    </section>
  );
};

export default SearchAppointment;
