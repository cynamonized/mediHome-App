import React from "react";
import "../scss/main.scss";
import Header from "./Components-App/Header";
import { Footer } from "./Components-App/Footer";
import { Outlet } from "react-router-dom";

export const Main = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
