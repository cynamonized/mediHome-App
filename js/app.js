import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../scss/main.scss";

function App() {
  return (
    <>
      ccc <span className="material-icons md-18">face</span>
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
