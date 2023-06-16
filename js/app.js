import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../scss/main.scss";
import Header from "./Components-App/Header";
import SearchAppointment from "./Components-App/SearchAppointment";
import { Footer } from "./Components-App/Footer";
import { Main } from "./Components-App/Main";
import { PatientMain } from "./Components-App/PatientMain";
import { DashboardPatient } from "./Components-App/DashboardPatient.js";
import { AppointmentsList } from "./Components-App/Patient/AppointmentsList";

import {
  HashRouter,
  Route,
  Routes,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<PatientMain />} />
            <Route path="/app-list" element={<AppointmentsList />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
