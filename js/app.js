import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../scss/main.scss";
import Header from "./Components-App/Header";
import SearchAppointment from "./Components-App/SearchAppointment";
import { Footer } from "./Components-App/Footer";
import { DashboardPatient } from "./Components-App/DashboardPatient.js";

function App() {
  return (
    <>
      <Header />
      <SearchAppointment />
      <DashboardPatient />
      <Footer />
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
