import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardHeaderBig } from "../DashboardLittleComps";
import { MainButton } from "../Buttons";
import { ToolTip } from "../PopUp";
import { DateTime } from "luxon";
import {
  gettingUserSettings,
  updateUserSettings,
} from "../../APICommunication/GetAppointments";
import {
  temporaryAppointments,
  temporaryAppointmentsUser,
} from "../../APICommunication/tempArrays";
import { userIDserver } from "../../APICommunication/user";

export const SettingsDashboard = () => {
  return (
    <>
      <div className="user-settings dashboard__block-small container">
        <DashboardHeaderBig
          title={"Your account settings"}
          link={"/portal/start"}
        />

        <SettingsBody />
      </div>
    </>
  );
};

const SettingsBody = () => {
  const [userObject, setUserObject] = useState(null);
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfrim, setNewPasswordConfirm] = useState("");

  const [wrongPassword, setWrongPassword] = useState(false);

  // LEGACY
  const [userData, setUserData] = useState({
    street,
    apartment,
    postCode,
    city,
    country,
    email,
    phone,
    birthDate,
    newPassword,
  });

  useEffect(() => {
    // need to add fetch(GET) here - FIREBASE

    if (!userObject) {
      gettingUserSettings(
        userIDserver,
        temporaryAppointmentsUser,
        setUserObject
      );
    } else {
      setStreet(userObject.address.streetName);
      setApartment(userObject.address.apartmentNumber);
      setPostCode(userObject.address.postCode);
      setCity(userObject.address.city);
      setCountry(userObject.address.country);
      setEmail(userObject.email);
      setPhone(userObject.phone);
      setBirthDate(
        userObject.birthDate.toLocaleString({ month: "long", day: "numeric" })
      );
    }
  }, [userObject]);

  const updateInput = (e, updateCallback) => {
    updateCallback(e.target.value);

    // NOT SURE WHY IT WAS HERE (LEGACY)
    // PROB it was adding to userData when it was empty

    // // below ads new key that is exactly as input.name
    // const newValueObj = { tempKey: `${e.target.value}` };
    // newValueObj[`${e.target.name}`] = newValueObj["tempKey"];
    // delete newValueObj["tempKey"];

    // setUserData((prev) => {
    //   return { ...prev, ...newValueObj };
    // });
  };

  const updateUserData = (e) => {
    e.preventDefault();

    // need to add fetch (PATCH/POST) here;

    // WARUNEK NIE DZIAŁA
    if (
      (newPassword === "" && newPasswordConfrim === "") ||
      newPassword === newPasswordConfrim
    ) {
      updateUserSettings(
        userIDserver,
        temporaryAppointmentsUser,
        street,
        apartment,
        postCode,
        city,
        country,
        newPassword
      );
      console.log("tu se updatuje w Componencie jeszcze");
    } else {
      setWrongPassword(true);
    }
  };

  // LEGACY
  const updateUserDataObject = () => {
    setUserData({
      street,
      apartment,
      postCode,
      city,
      country,
      email,
      phone,
      birthDate,
      newPassword,
    });
  };

  return (
    <form className="user-settings__body" onSubmit={updateUserData}>
      <div className="body__forms">
        <div className="body__adrress-column">
          <h4>Your address:</h4>
          <label className="form-header" htmlFor="street-address">
            Street name
          </label>
          <input
            type="text"
            className="form-write form-write--long-form"
            id="street-address"
            name="street"
            required
            value={street}
            onChange={(e) => {
              updateInput(e, setStreet);
            }}
          />
          <label className="form-header" htmlFor="apartment">
            Apartment number:
          </label>
          <input
            type="text"
            className="form-write form-write--long-form"
            id="apartment-number"
            name="apartment"
            required
            value={apartment}
            onChange={(e) => {
              updateInput(e, setApartment);
            }}
          />
          <label className="form-header" htmlFor="postCode">
            Post-code
          </label>
          <input
            type="text"
            className="form-write form-write--long-form"
            id="postal-code"
            name="postCode"
            required
            value={postCode}
            onChange={(e) => {
              updateInput(e, setPostCode);
            }}
          />
          <label className="form-header" htmlFor="city">
            City
          </label>
          <input
            type="text"
            className="form-write form-write--long-form"
            id="city"
            name="city"
            required
            value={city}
            onChange={(e) => {
              updateInput(e, setCity);
            }}
          />
          <label className="form-header" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            className="form-write form-write--long-form"
            id="country"
            name="country"
            required
            value={country}
            onChange={(e) => {
              updateInput(e, setCountry);
            }}
          />
        </div>

        <div className="body__contact-birth-columnn">
          <div className="tooltip__head">
            <ToolTip />
            <h4 className="tooltip-near">Contact information:</h4>
          </div>
          <label className="form-header" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="form-write form-write--long-form"
            id="email"
            name="email"
            disabled
            value={email}
            onChange={(e) => {
              updateInput(e, setEmail);
            }}
          />
          <label className="form-header" htmlFor="phone">
            Phone number
          </label>
          <input
            type="number"
            className="form-write form-write--long-form"
            id="phone-number"
            name="phone"
            disabled
            value={phone}
            onChange={(e) => {
              updateInput(e, setPhone);
            }}
          />

          <div className="contact-birth-column__birth">
            <div className="tooltip__head">
              <ToolTip />
              <h4 className="tooltip-near">Date of birth:</h4>
            </div>
            <input
              type="text"
              className="form-write form-write--long-form"
              id="birthDate"
              name="birthDate"
              disabled
              value={birthDate}
              onChange={(e) => {
                updateInput(e, setBirthDate);
              }}
            />
          </div>
        </div>

        <div className="body__password-column">
          <h4>Update password:</h4>
          <label className="form-header" htmlFor="newPassword">
            New password
          </label>
          <input
            type="password"
            className="form-write form-write--long-form"
            id="newPassword"
            name="newPassword"
            required
            placeholder="Write new password here"
            value={newPassword}
            onChange={(e) => {
              updateInput(e, setNewPassword);
            }}
          />
          <label className="form-header" htmlFor="newPaswordConfirm">
            Confirm new password
          </label>
          <input
            type="password"
            className="form-write form-write--long-form"
            id="newPaswordConfirm"
            name="newPaswordConfirm"
            required
            placeholder="Write new password again"
            value={newPasswordConfrim}
            onChange={(e) => {
              updateInput(e, setNewPasswordConfirm);
            }}
          />

          {newPassword != "" &&
            newPasswordConfrim != "" &&
            newPassword != newPasswordConfrim && (
              <p className="validaiton-warning--bottom">
                Two passwords do not match.
              </p>
            )}
        </div>
      </div>

      <div className="body__button-place">
        <MainButton callbackAction={updateUserData}>
          Update information
        </MainButton>
      </div>
    </form>
  );
};
