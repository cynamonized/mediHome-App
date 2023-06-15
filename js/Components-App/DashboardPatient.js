import React, { useEffect, useState } from "react";
import "../../scss/main.scss";
import { DashboardPatientLHS } from "./DashboardPatient-LHS";
import {
  DashboardBlockSmall,
  DashboardBlockSettings,
  DashboardBlockConsultant,
  DashboardBlockBlog,
} from "./DashboardLittleComps";
import { DateTime } from "luxon";

//Temporary object for blog
const blogArticleContent = {
  articleTitle: "Lorem ipsum dolor amet",
  articleBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent velit nulla...",
  articleImage:
    "https://github.com/cynamonized/mediHome-App/blob/dba4278ef9416d46009aaa863888c6d16f7e5d20/images/Blog%20article%20-%20temp.png?raw=true",
};

// To be replaced with real data representation from API
const temporaryAppointments = [
  [
    {
      date: DateTime.local(2023, 6, 23, 8, 30),
      specialization: "orthopaedist",
      place: "Puławska Center",
      doctor: "Alan Smith",
    },
    {
      date: DateTime.local(2023, 6, 23, 9, 0),
      specialization: "orthopaedist",
      place: "Puławska Center",
      doctor: "Alan Smith",
    },
  ],
  [
    {
      date: DateTime.local(2023, 6, 23, 9, 0),
      specialization: "orthopaedist",
      place: "Puławska Center",
      doctor: "Alan Smith",
    },
    {
      date: DateTime.local(2023, 6, 23, 9, 30),
      specialization: "orthopaedist",
      place: "Puławska Center",
      doctor: "Alan Smith",
    },
  ],
];

export const DashboardPatient = () => {
  return (
    <section className="dashboard-patient">
      <div className="container container-dashboard-patient">
        <DashboardPatientLHS patientAppointments={temporaryAppointments} />

        <div className="dashboard-patient__right-column">
          <DashboardBlockSmall
            title={"Prescriptions"}
            link={"#"}
            dataToDisplay={""}
          />

          <DashboardBlockSmall
            title={"Referrals"}
            link={"#"}
            dataToDisplay={""}
          />

          <DashboardBlockConsultant title={"Contact with our consultant"} />

          <DashboardBlockSmall
            title={"Laboratory tests"}
            link={"#"}
            dataToDisplay={""}
          />

          <DashboardBlockBlog
            title={"Healthy blog"}
            link={"#"}
            blogContent={blogArticleContent}
          />

          <DashboardBlockSettings title={"Account settings"} link={"#"} />
        </div>
      </div>
    </section>
  );
};
