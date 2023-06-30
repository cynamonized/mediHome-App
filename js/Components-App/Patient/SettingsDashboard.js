import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeaderBig } from "./DashboardLittleComps";
import { MainButton } from "../../Utilities/Buttons";
import { ToolTip, SimpleErrorPopUp } from "../../Utilities/PopUp";
import {
  gettingUserSettings,
  updateUserSettings,
} from "../../APICommunication/GetAppointments";
import { getUserSettings } from "../../APICommunication/getUserSettings";
import { updateUserSettingsAndRefresh } from "../../APICommunication/updateUserSettings";
import { temporaryAppointmentsUser } from "../../APICommunication/tempArrays";
import { userIDserver } from "../../APICommunication/user";
import {
  LoaderCircleSmall,
  ActionCompleted,
  ActionCompletedSmall,
} from "../../Utilities/LoaderCircle";
import { DateTime } from "luxon";
import { fullDateFromSeconds } from "../../Functions/convertTime";

export const SettingsDashboard = ({ currentUserUID }) => {
  return (
    <>
      <div className="user-settings dashboard__block container">
        <DashboardHeaderBig title={"Your account settings"} link={"/portal"} />
        <SettingsBody currentUserUID={currentUserUID} />
      </div>
    </>
  );
};

const SettingsBody = ({ currentUserUID }) => {
  const [userObject, setUserObject] = useState(null);

  // Formas states
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
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoadingFailure, setDataLoadingFailure] = useState(false);
  const [updatingCompleted, setUpdatingCompleted] = useState(false);

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
    if (!userObject) {
      loadUserDataFromServer();
    } else {
      setIsLoading(false);
      updateAllForms();
    }
  }, [userObject]);

  const loadUserDataFromServer = async () => {
    const gettingData = await getUserSettings(
      currentUserUID,
      setUserObject,
      setDataLoadingFailure
    );
  };

  const updateAllForms = () => {
    setStreet(userObject.address.streetName);
    setApartment(userObject.address.apartmentNumber);
    setPostCode(userObject.address.postCode);
    setCity(userObject.address.city);
    setCountry(userObject.address.country);
    setEmail(userObject.email);
    setPhone(userObject.phone);
    setBirthDate(fullDateFromSeconds(userObject.birthdayDate.seconds));
  };

  const updateInput = (e, updateCallback) => {
    updateCallback(e.target.value);
  };

  const updateUserDataOnServer = async (e) => {
    e.preventDefault();

    if (
      (newPassword === "" && newPasswordConfrim === "") ||
      newPassword === newPasswordConfrim
    ) {
      setIsLoading(true);

      const userDataToUpdate = {
        streetName: `${street}`,
        apartmentNumber: `${apartment}`,
        postCode: `${postCode}`,
        city: `${city}`,
        country: `${country}`,
      };

      const canChangePassword = newPassword != "" ? true : false;

      const updatingUserData = await updateUserSettingsAndRefresh(
        currentUserUID,
        userDataToUpdate,
        updateCompleted,
        updateFailed,
        canChangePassword,
        newPassword
      );
    } else {
      setWrongPassword(true);
    }
  };

  const updateFailed = (logic) => {
    setDataLoadingFailure(logic);
    updateCompleted(!logic);
  };

  const updateCompleted = () => {
    setUpdatingCompleted(true);
    setIsLoading(false);

    const tempDelay = setTimeout(() => {
      setUpdatingCompleted(false);
    }, 2000);
  };

  const closeErrorPopUp = () => {
    setDataLoadingFailure(false);
    setIsLoading(false);
  };

  if (dataLoadingFailure) {
    return (
      <SimpleErrorPopUp
        closePopUp={closeErrorPopUp}
        title={"We couldn't update your data"}
      >
        Apologies, something went wrong. Please try again later. If the problem
        remains, please contact us.
      </SimpleErrorPopUp>
    );
  }

  if (updatingCompleted) {
    return (
      <ActionCompletedSmall>
        Your settings have been updated!
      </ActionCompletedSmall>
    );
  }

  return (
    <form className="user-settings__body" onSubmit={updateUserDataOnServer}>
      {isLoading == true ? (
        <LoaderCircleSmall />
      ) : (
        <>
          {" "}
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

              {newPassword != "" &&
                newPassword == newPasswordConfrim &&
                newPassword.length < 6 && (
                  <p className="validaiton-warning--bottom">
                    Password needs to have atleast 6 characters.
                  </p>
                )}
            </div>
          </div>
          <div className="body__button-place">
            <MainButton callbackAction={updateUserDataOnServer}>
              Update information
            </MainButton>
          </div>
        </>
      )}
    </form>
  );
};
