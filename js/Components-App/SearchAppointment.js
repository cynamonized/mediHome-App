import React, { useEffect, useState } from "react";
import "../../scss/main.scss";
import {
  doingSomething,
  searchForAppointment,
} from "../APICommunication/GetAppointments";
import { MainButton } from "./Buttons";
import { getTodaysDate } from "../dates";
import {
  colorMainBlue,
  colorMainBlueLight,
  colorMainPink,
  colorGreysLight1,
  colorGreysLight2,
  colorGreysMid1,
  colorMainText,
} from "../Settings/cssVariables";
// import { colorMainPink } from "../../scss/settings/_variables.scss";
import { selectStyles } from "../Settings/formsStyles";
// -----------------------------------------

import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";
import makeAnimated from "react-select/animated";

import DatePicker from "react-datepicker";
import "../../css/react-datepicker.css";

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
  // City states
  const [city, setCity] = useState({
    value: "default",
    label: "Select a city",
  });
  const [cityValues, setCityValues] = useState([]);

  // Specialization states
  const [specialization, setSpecialization] = useState({
    value: "default",
    label: "Select a specialization",
  });
  const [specValues, setSpecValues] = useState([]);

  // Date states
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [calendarMinValue, setCalendarMinValue] = useState("");

  useEffect(() => {
    // setAppointmentDate(getTodaysDate());
    setCalendarMinValue(getTodaysDate());
    loadCitiesSpecs(cities, specs);
  }, []);

  const loadCitiesSpecs = (citiesObjectArray, specsObjectArray) => {
    // Communication with API to appear here - reading available cities
    setCityValues(citiesObjectArray);
    setSpecValues(specsObjectArray);
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
          <Select
            isSearchable={true}
            defaultValue={city}
            onChange={setCity}
            options={cityValues}
            styles={selectStyles}
          />
          <Select
            isSearchable={true}
            defaultValue={specialization}
            onChange={setSpecialization}
            options={specValues}
            styles={selectStyles}
          />

          <DatePicker
            portalId="root-portal"
            showIcon
            closeOnScroll={true}
            selected={appointmentDate}
            onChange={(date) => setAppointmentDate(date)}
            minDate={new Date()}
            customInput={<CustomDateInput />}
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

const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className="datepicker-input"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    ref={ref}
  >
    {value}
  </button>
));

export default SearchAppointment;
