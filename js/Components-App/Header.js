import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../scss/main.scss";
import { fireApp, auth } from "../config/firestore";
import { getProfileInfo } from "../APICommunication/getProfileInfo";
import { TertiaryButton } from "../Utilities/Buttons";

export const Header = ({ setCurrentUser, currentUserUID }) => {
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState(null);
  const [popUpVisible, setPopUpVisible] = useState(false);

  useEffect(() => {
    getProfileInfo(currentUserUID, setProfileInfo);

    // document.body.addEventListener("click", closePopUp);
  }, []);

  const closePopUp = (e) => {
    setPopUpVisible(false);
  };

  const goToMainView = () => {
    navigate("/portal/");
  };

  const togglePopUp = (e) => {
    e.preventDefault();
    setPopUpVisible((prev) => !prev);
  };

  const userSignOut = async (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        navigate("/portal/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header>
      <div className="container container-header">
        <img
          src="/images/logo - mediHome - small.svg"
          className="container-header__main-logo"
          onClick={goToMainView}
        ></img>
        <div className="header__right-column">
          {profileInfo && (
            <>
              <p className="right-column__name">
                Hi <span className="name__patient">{profileInfo.name}!</span>
              </p>
              <div className="right-column__notifications"></div>

              <img
                className="right-column__profile-picture"
                src={`${profileInfo.picture}`}
                onClick={(e) => {
                  togglePopUp(e);
                }}
              />
            </>
          )}

          {popUpVisible && <HeaderPopUp userSignOut={userSignOut} />}
        </div>
      </div>
    </header>
  );
};

export const HeaderPopUp = ({ userSignOut }) => {
  return (
    <div className="profile-popup">
      <TertiaryButton wide={false} callbackAction={userSignOut}>
        Log out
      </TertiaryButton>
    </div>
  );
};
