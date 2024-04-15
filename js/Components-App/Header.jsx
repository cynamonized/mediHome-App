import React, { useEffect, useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../scss/main.scss";
import { auth } from "../config/firestore";
import { getProfileInfo } from "../APICommunication/getProfileInfo";
import { TertiaryButton } from "../Utilities/Buttons";
import LogoTop from "../../images/logo-mediHome-small.svg";

export const Header = ({ setCurrentUser, currentUserUID }) => {
  const navigate = useNavigate();
  const headShotRef = useRef();

  const [profileInfo, setProfileInfo] = useState(null);
  const [popUpVisible, setPopUpVisible] = useState(false);

  useEffect(() => {
    getProfileInfo(currentUserUID, setProfileInfo);
  }, []);

  // track down console logs, it immediately shows 'false in 'popUpVisible'...

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      console.log(
        "DO I CLICK POINT OT INTEREST? ",
        e.composedPath().includes(headShotRef.current)
      );
      console.log("INNER POP UP VISIBLE:", popUpVisible);
      if (!e.composedPath().includes(headShotRef.current) && popUpVisible) {
        console.log("AM I HERE?");
        setPopUpVisible(false);
      }
    });
  }, []);

  const goToMainView = () => {
    navigate("/portal/");
  };

  const togglePopUp = (e) => {
    e.preventDefault();
    setPopUpVisible(true);
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
      {console.log(popUpVisible)}
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
              />
            </>
          )}

          {popUpVisible && (
            <div className="profile-popup" ref={headShotRef}>
              <TertiaryButton wide={false} callbackAction={userSignOut}>
                Log out
              </TertiaryButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// export const HeaderPopUp = ({ userSignOut, ref }) => {
//   return (
//     <div className="profile-popup">
//       <TertiaryButton wide={false} callbackAction={userSignOut}>
//         Log out
//       </TertiaryButton>
//     </div>
//   );
// };
