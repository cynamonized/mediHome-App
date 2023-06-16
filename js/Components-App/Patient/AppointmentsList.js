import React, { useEffect, useState } from "react";
import { DashboardHeaderBig } from "../DashboardLittleComps";
import { Link } from "react-router-dom";

export const AppointmentsList = () => {
  return (
    <>
      <div className="app-list dashboard__block-small container">
        <DashboardHeaderBig title={"My appointments"} link={"/"} />
      </div>
    </>
  );
};
