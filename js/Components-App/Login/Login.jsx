import React, { useState } from "react";
import "../../../scss/main.scss";
import { MainButton, TertiaryButton } from "../../Utilities/Buttons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firestore";
import PhotoMain from "../../../images/LoginPhoto-small.png";
import LogoBig from "../../../images/logo-mediHome-big.svg";
import LogoSmall1 from "../../../images/logo-mediCare.svg";
import LogoSmall2 from "../../../images/logo-mediDent.svg";
import LogoSmall3 from "../../../images/logo-mediHospital.svg";
import LogoSmall4 from "../../../images/logo-mediPharmacy.svg";
import { ToolTip } from "../../Utilities/PopUp";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [wrongPassword, setWrongPassword] = useState(false);

  const emailUpdate = ({ target }) => {
    setEmail(target.value);
  };

  const passwordUpdate = ({ target }) => {
    setPassword(target.value);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setWrongPassword(false);
      })
      .catch((error) => {
        setWrongPassword(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <section className="login-screen">
      <div className="login-screen__left-column">
        <img src={LogoBig} className="left-column__logo" />

        <h3 className="login-screen">
          <span>Log in </span>to manage <br />
          all health packages
        </h3>

        <form
          onSubmit={(e) => {
            submitLogin(e);
          }}
          className="left-column__form"
        >
          <input
            type="email"
            name="email"
            className="form-write"
            value={email}
            onChange={emailUpdate}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className="form-write"
            value={password}
            onChange={passwordUpdate}
            placeholder="Password"
          />

          <div className="form__bottom-section">
            <MainButton wide={false}>Log in</MainButton>
            {/* To insert demo tooltip here */}

            <ToolTip icon={"login"} isBig={true}>
              This is a demo build of the application. <br />
              If you wish to test it, please use test user account below: <br />
              <b>Email: </b>marc.marco@example.com <br />
              <b>Password: </b>321medihome
            </ToolTip>
          </div>

          {wrongPassword && (
            <p className="validaiton-warning--bottom">
              Email or password is wrong.
            </p>
          )}
        </form>
      </div>
      <div className="login-screen__right-column">
        <div className="right-column__top-callout">
          <p className="top-callout__description">
            Don't have an account? Contact us to start our partnership.
          </p>
          <TertiaryButton>Contact us</TertiaryButton>
        </div>

        <div className="right-column__bottom-section">
          <div className="bottom-section__health-packages">
            <p className="health-packages__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              libero sapien, volutpat sed leo ac, dictum placerat ante.
            </p>
            <div className="health-packages__logos">
              <img src={LogoSmall1} alt="" className="logos__single-logo" />
              <img src={LogoSmall2} alt="" className="logos__single-logo" />
              <img src={LogoSmall3} alt="" className="logos__single-logo" />
              <img src={LogoSmall4} alt="" className="logos__single-logo" />
            </div>
          </div>
          <img src={PhotoMain} className="bottom-section__main-image" />
        </div>
      </div>
    </section>
  );
};
