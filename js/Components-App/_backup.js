{
  /* BACKUP  */
}

<form className="search-appointment__form" onSubmit={doingSomething}>
  <select
    name="select-city"
    id="select-city"
    className="form-select search-appointment__form__select-city"
    value={city}
    onChange={(e) => {
      updateCity(e);
    }}
  >
    {/* https://react-select.com/components */}

    <option disabled={true} value="">
      Select a city
    </option>
    {/* TO ADD CITIES FROM DATABASE HERE AS OPTIONS */}
    <option value="krakow" className="form-select__option">
      Krakow
    </option>
    <option value="poznan" className="form-select__option">
      Poznan
    </option>
    <option value="warsaw" className="form-select__option">
      Warsaw
    </option>
  </select>

  <select
    name="select-spec"
    id="select-spec"
    className="form-select search-appointment__form__select-spec"
    value={specialization}
    onChange={(e) => {
      updateSpecialization(e);
    }}
  >
    <option disabled={true} value="">
      Select a specialization
    </option>
    {/* TO ADD SPECS FROM DATABASE HERE AS OPTIONS */}
    <option value="internist" className="form-select__option">
      Internist
    </option>
    <option value="orthopaedist" className="form-select__option">
      Orthopaedist
    </option>
    <option value="orthodontist" className="form-select__option">
      Orthodontist
    </option>
  </select>

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
</form>;
