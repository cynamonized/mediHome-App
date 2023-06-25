import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "../scss/main.scss";
import { Main } from "./Main";
import { PatientMain } from "./Components-App/Patient/PatientMain";
import { AppointmentsList } from "./Components-App/Patient/AppointmentsList";
import { Login } from "./Components-App/Login/Login";
import { SingleAppointment } from "./Components-App/Patient/SingleAppointment";
import { SettingsDashboard } from "./Components-App/Patient/SettingsDashboard";
import { SearchDashboard } from "./Components-App/Patient/SearchDashboard";
import { FireBaseTesting } from "./APICommunication/FireBaseTesting";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStateManager } from "react-select";
import { addLel } from "./APICommunication/createFirestoreAppos";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("is_authenticated"))
  );

  return (
    <>
      <HashRouter>
        <Routes>
          {isAuthenticated ? (
            <Route
              path="/"
              element={<Main setIsAuthenticated={setIsAuthenticated} />}
            >
              <Route path="/portal" element={<PatientMain />} />
              <Route path="/app-list" element={<AppointmentsList />} />
              <Route
                path="/single-apointment"
                element={<SingleAppointment />}
              />
              <Route path="/user-settings" element={<SettingsDashboard />} />
              <Route path="/search" element={<SearchDashboard />} />
              <Route path="/test" element={<FireBaseTesting />} />
            </Route>
          ) : (
            <Route
              path="/portal"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            ></Route>
          )}
        </Routes>
      </HashRouter>
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

const TempBackupApp = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/portal" element={<Main />}>
            <Route path="/portal/start" element={<PatientMain />} />
            <Route path="/portal/app-list" element={<AppointmentsList />} />
            <Route
              path="/portal/single-apointment"
              element={<SingleAppointment />}
            />
            <Route
              path="/portal/user-settings"
              element={<SettingsDashboard />}
            />
            <Route path="/portal/search" element={<SearchDashboard />} />
            <Route path="/portal/test" element={<FireBaseTesting />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
};

function AppSimple() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  return (
    <>
      {isAuthenticated ? (
        <FireBaseTesting setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
}
