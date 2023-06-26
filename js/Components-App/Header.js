import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../scss/main.scss";
import { fireApp, auth } from "../config/firestore";

const Header = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  const userSignOut = async (e) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Udało sie?");
        // setCurrentUser(null);
        navigate("/portal/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
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
            onClick={() => {
              userSignOut();
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
