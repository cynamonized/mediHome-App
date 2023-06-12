import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../scss/main.scss";
import Header from "./Components-App/Header";
import SearchAppointment from "./Components-App/SearchAppointment";

function App() {
  return (
    <>
      <Header />
      <SearchAppointment />
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
