import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../scss/main.scss";
import { MainButton, TertiaryButton } from "../../Utilities/Buttons";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../config/firestore";

export const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailUpdate = ({ target }) => {
    setEmail(target.value);
  };

  const passwordUpdate = ({ target }) => {
    setPassword(target.value);
  };

  /////////////////////////////////////////
  // LATEST WORKING ONLY WITHOUT REFRESHING
  const submitLogin = async (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // userLogsIn(user);
        console.log(userCredential);
        console.log("Ile razy sie odpalam?");
        setIsAuthenticated(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  ////////////////////////////////////////////

  // TRAVIS WAY + LOCAL STORAGE
  // const submitLogin = async (e) => {
  //   const auth = getAuth();

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     setIsAuthenticated(true);
  //     localStorage.setItem("is_authenticated", true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // ??????????????????????????
  // const submitLogin = async (e) => {
  //   const auth = getAuth();
  //   setPersistence(auth, browserSessionPersistence);
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     setIsAuthenticated(true);
  //     localStorage.setItem("is_authenticated", true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <section className="login-screen">
      <div className="login-screen__left-column">
        <img
          src="images/logo - mediHome - big.svg"
          className="left-column__logo"
        />

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
          <MainButton
            wide={false}
            // callbackAction={(e) => {
            //   submitLogin(e);
            // }}
          >
            Log in
          </MainButton>
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
              <img
                src="images/logo - mediCare.svg"
                alt=""
                className="logos__single-logo"
              />
              <img
                src="images/logo - mediDent.svg"
                alt=""
                className="logos__single-logo"
              />
              <img
                src="images/logo - mediHospital.svg"
                alt=""
                className="logos__single-logo"
              />
              <img
                src="images/logo - mediPharmacy.svg"
                alt=""
                className="logos__single-logo"
              />
            </div>
          </div>
          <img
            src="images/Login Photo - small.png"
            className="bottom-section__main-image"
          />
        </div>
      </div>
    </section>
  );
};

const TestComp = () => {
  return <p>THIS IS A FREAKING TEST</p>;
};
