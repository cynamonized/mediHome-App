import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../scss/main.scss";
import { fireApp, auth } from "../config/firestore";
import { getProfileInfo } from "../APICommunication/getProfileInfo";

const Header = ({ setCurrentUser, currentUserUID }) => {
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    getProfileInfo(currentUserUID, setProfileInfo);
  }, []);

  const goToMainView = () => {
    navigate("/portal/");
  };

  const userSignOut = async (e) => {
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
                Hi <span className="name__patient">{profileInfo.name}</span>
              </p>
              <div className="right-column__notifications"></div>

              <img
                className="right-column__profile-picture"
                src={`${profileInfo.picture}`}
                onClick={() => {
                  userSignOut();
                }}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
