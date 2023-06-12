import React, { useEffect, useState } from "react";
import "../../scss/main.scss";

export const MainButton = ({ children, callbackAction }) => {
  return (
    <button className="main-button" onClick={callbackAction}>
      {children}
    </button>
  );
};
