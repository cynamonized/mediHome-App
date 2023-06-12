import React, { useEffect, useState } from "react";
import "../../scss/main.scss";

const Header = () => {
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
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
