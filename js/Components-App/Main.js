import React from "react";
import "../../scss/main.scss";
import Header from "./Header";
import { Footer } from "./Footer";
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
