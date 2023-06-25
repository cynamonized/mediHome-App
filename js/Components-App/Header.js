import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import "../../scss/main.scss";

const Header = ({ setIsAuthenticated }) => {
  const signOut = async (e) => {
    const auth = getAuth();

    try {
      await signOut(auth);
      await setIsAuthenticated(false);
      localStorage.setItem("is_authenticated", false);
      console.log("ile razy?");
      // setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <div className="container container-header">
        <img src="/images/logo - mediHome - small.svg"></img>
        <div className="header__right-column">
          <p className="right-column__name">
            Hi <span className="name__patient">Mark!</span>
          </p>
          <div className="right-column__notifications"></div>
          <img
            className="right-column__profile-picture"
            src="/images/Profile picture - temp.png"
            onClick={signOut}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
