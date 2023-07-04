import React, { useState, useEffect } from "react";
import "../scss/main.scss";
import { Header } from "./Components-App/Header";
import { Footer } from "./Components-App/Footer";
import { Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";

export const Main = ({ setCurrentUser, currentUserUID }) => {
  return (
    <>
      <Header setCurrentUser={setCurrentUser} currentUserUID={currentUserUID} />
      <Outlet />
      <Footer />
    </>
  );
};
