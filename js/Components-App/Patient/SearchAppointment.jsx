import React, { useEffect, useState } from "react";
import "../../../scss/main.scss";
import { MainButton } from "../../Utilities/Buttons";
import { selectStyles } from "../../Settings/formsStyles";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomDateInput } from "./CustomCompsStyling/CustomDateInput";

// -----------------------------------------

import Select from "react-select";
import DatePicker from "react-datepicker";
import "../../../css/react-datepicker.css";

//------------------------------------------

// placeholder for cities & specs - Fetch once it's in API
// one day? :)
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

const setSelectValue = (desiredValue, defaultText) => {
  if (desiredValue) {
    return desiredValue;
  } else {
    return { value: "default", label: `${defaultText}` };
  }
};

const SearchAppointment = ({
  isPartOfSearch,
  desiredCity,
  desiredSpecialization,
  desiredAppointmentDate,
  searchCallback,
  saveApposCallback,
}) => {
  // Picked values [states]
  const [city, setCity] = useState(() =>
    setSelectValue(desiredCity, "Select a city")
  );
  const [specialization, setSpecialization] = useState(() =>
    setSelectValue(desiredSpecialization, "Select a specialization")
  );
  const [appointmentDate, setAppointmentDate] = useState(new Date());

  // Select form values
  const [cityValues, setCityValues] = useState([]);
  const [specValues, setSpecValues] = useState([]);
  const [isSelectValid, setIsSelectValid] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadCitiesSpecs(cities, specs);

    if (desiredAppointmentDate) {
      setAppointmentDate(desiredAppointmentDate);
    }
  }, []);

  const loadCitiesSpecs = (citiesObjectArray, specsObjectArray) => {
    // Communication with API to appear here - reading available cities
    setCityValues(citiesObjectArray);
    setSpecValues(specsObjectArray);
  };

  const performSearch = (e) => {
    e.preventDefault();

    if (location.pathname != "/portal/search") {
      if (validateSelects()) {
        setIsSelectValid(true);
        navigate("/portal/search", {
          state: {
            city,
            specialization,
            appointmentDate,
          },
        });
      } else {
        setIsSelectValid(false);
      }
    } else {
      if (validateSelects()) {
        setIsSelectValid(true);
        searchCallback(city, specialization, appointmentDate);
      } else {
        setIsSelectValid(false);
      }
    }
  };

  const validateSelects = () => {
    if (city.value == "default" || specialization.value == "default") {
      return false;
    }
    return true;
  };

  return (
    <section className="search-appointment">
      <div className="container search-appointment-container">
        {!isSelectValid && (
          <p className="validaiton-warning">
            Please pick all neccessary criteria.
          </p>
        )}
        <h1 className="search-appointment__main-title">
          Schedule an appointment
        </h1>

        <form className="search-appointment__form" onSubmit={performSearch}>
          {city.value && (
            <Select
              isSearchable={true}
              defaultValue={city}
              onChange={setCity}
              options={cityValues}
              styles={selectStyles}
            />
          )}

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
            onChange={(date) => {
              setAppointmentDate(date);
            }}
            minDate={new Date()}
            customInput={<CustomDateInput />}
          />

          <MainButton callbackAction={performSearch}>Search</MainButton>
        </form>
      </div>
    </section>
  );
};

export default SearchAppointment;
