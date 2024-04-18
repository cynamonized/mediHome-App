import React, { useEffect, useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "../../scss/main.scss";
import { auth } from "../config/firestore";
import { getProfileInfo } from "../APICommunication/getProfileInfo";
import { TertiaryButton, TertiaryFullButton } from "../Utilities/Buttons";
import LogoTop from "../../images/logo-mediHome-small.svg";

const menuElementsHeader = [
  {
    name: "Main dashboard",
    link: "/portal/",
  },
  {
    name: "My appointments",
    link: "/portal/app-list",
  },
  {
    name: "Account settings",
    link: "/portal/user-settings",
  },
];

export const Header = ({ setCurrentUser, currentUserUID }) => {
  const navigate = useNavigate();
  const headShotRef = useRef();
  const logOutCompRef = useRef();

  const [profileInfo, setProfileInfo] = useState(null);
  const [popUpVisible, setPopUpVisible] = useState(false);

  useEffect(() => {
    getProfileInfo(currentUserUID, setProfileInfo);
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", bodyClick);
  }, []);

  const bodyClick = (e) => {
    if (
      logOutCompRef.current &&
      // !e.composedPath().includes(logOutCompRef.current) &&
      !e.composedPath().includes(headShotRef.current)
    ) {
      setPopUpVisible(false);
    }

    return () => {
      document.body.removeEventListener("click", bodyClick);
    };
  };

  const goToMainView = () => {
    navigate("/portal/");
  };

  const togglePopUp = (e) => {
    e.preventDefault();
    setPopUpVisible((prev) => !prev);
  };

  const goToLink = (link) => {
    setPopUpVisible(false);
    navigate(`${link}`);
  };

  const goToLanding = () => {
    navigate(`/`, { replace: true });
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
          src={LogoTop}
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
                ref={headShotRef}
              />
            </>
          )}
          {popUpVisible && (
            <div className="profile-popup">
              <ul className="profile-popup__menu" ref={logOutCompRef}>
                <li className="menu__menu-element" onClick={goToLanding}>
                  Homepage
                </li>
                {menuElementsHeader.map((e, i) => {
                  return (
                    <Link to={e.link} relative="path" key={i}>
                      <li className="menu__menu-element">{e.name}</li>
                    </Link>
                  );
                })}
              </ul>
              <TertiaryFullButton wide={true} callbackAction={userSignOut}>
                Log out
              </TertiaryFullButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
