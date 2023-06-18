import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "../scss/main.scss";
import { Main } from "./Components-App/Main";
import { PatientMain } from "./Components-App/PatientMain";
import { AppointmentsList } from "./Components-App/Patient/AppointmentsList";
import { Login } from "./Components-App/Login";
import { SingleAppointment } from "./Components-App/Patient/SingleAppointment";
import { PopUp } from "./Components-App/PopUp";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="test" element={<PopUp />}></Route> */}
          <Route path="/portal" element={<Main />}>
            <Route path="/portal/start" element={<PatientMain />} />
            <Route path="/portal/app-list" element={<AppointmentsList />} />
            <Route
              path="/portal/single-apointment"
              element={<SingleAppointment />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
