import React, { useState, useEffect } from "react";
import * as ReactDOMClient from "react-dom/client";
import { createRoot } from "react-dom/client";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import "../scss/main.scss";
import { Main } from "./Main";
import { PatientMain } from "./Components-App/Patient/PatientMain";
import { AppointmentsList } from "./Components-App/Patient/AppointmentsList";
import { Login } from "./Components-App/Login/Login";
import { SingleAppointment } from "./Components-App/Patient/SingleAppointment";
import { SettingsDashboard } from "./Components-App/Patient/SettingsDashboard";
import { SearchDashboard } from "./Components-App/Patient/SearchDashboard";
import { LoaderCircleEmpty } from "./Utilities/LoaderCircle";
import { authUserCheck } from "./APICommunication/authUserCheck";
import { createDatabase } from "./config/buildDatabase/createDatabase";
import { fillAvailableAppos } from "./config/buildDatabase/fillAvailableAppos";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    authUserCheck(setCurrentUser);

    // Use below only to generate entire server (!!)
    // It will work only if firestore.js file is set up properly
    // using env variables in .env file (instruction in .env file)

    // createDatabase();
    // fillAvailableAppos();
  }, []);

  return (
    <>
      {currentUser === undefined ? (
        <LoaderCircleEmpty />
      ) : (
        <HashRouter>
          <Routes>
            {currentUser ? (
              <Route
                path="/"
                element={
                  <Main
                    setCurrentUser={setCurrentUser}
                    currentUserUID={currentUser.uid}
                  />
                }
              >
                <Route
                  path="/portal"
                  element={<PatientMain currentUserUID={currentUser.uid} />}
                />
                <Route
                  path="/app-list"
                  element={
                    <AppointmentsList currentUserUID={currentUser.uid} />
                  }
                />
                <Route
                  path="/single-apointment"
                  element={
                    <SingleAppointment currentUserUID={currentUser.uid} />
                  }
                />
                <Route
                  path="/user-settings"
                  element={
                    <SettingsDashboard currentUserUID={currentUser.uid} />
                  }
                />
                <Route
                  path="/search"
                  element={<SearchDashboard currentUserUID={currentUser.uid} />}
                />
              </Route>
            ) : (
              <Route path="/portal" element={<Login />}></Route>
            )}
          </Routes>
        </HashRouter>
      )}
    </>
  );
}

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
