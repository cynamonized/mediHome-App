import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardHeaderBig } from "../DashboardLittleComps";
import { temporaryAppointments } from "../../APICommunication/tempArrays";
import {
  AppointmentPureDate,
  AppointmentTime,
} from "../../Functions/convertTime";

//Login is (forms validation) (1)
// Create temp array first (2) --> big task: evolve current temp and add 3 layers
// Build DOM (0) <--
// Connect DOM with new temp (3) -> read and update

export const SettingsDashboard = () => {
  return (
    <>
      <div className="user-settings dashboard__block-small container">
        <DashboardHeaderBig
          title={"Your account settings"}
          link={"/portal/start"}
        />
      </div>
    </>
  );
};
