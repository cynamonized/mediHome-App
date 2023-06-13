import React, { useEffect, useState } from "react";
import "../../scss/main.scss";
import { DashboardPatientLHS } from "./DashboardPatient-LHS";
import { DashboardBlockSmall } from "./DashboardLittleComps";

//Temporary object for blog
const blogArticleContent = {
  articleTitle: "Lorem ipsum dolor amet",
  articleBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent velit nulla...",
  articleImage: "images/Blog article - temp.png",
};

// To be replaced with real data representation from API
const temporaryAppointments = [
  {
    app1: {
      date: "2023/06/23",
      hour: "2pm",
      specialization: "orthopaedist",
      place: "Puławska Center",
      doctor: "Alan Smith",
    },
    app2: {
      date: "2023/06/23",
      hour: "2pm",
      specialization: "orthopaedist",
      place: "Puławska Center",
      doctor: "Alan Smith",
    },
  },
  {
    finished_app1: {
      date: "2023/06/23",
      hour: "2pm",
      specialization: "orthopaedist",
      place: "Puławska Center",
      doctor: "Alan Smith",
    },
    finished_app2: {
      date: "2023/06/23",
      hour: "2pm",
      specialization: "orthopaedist",
      place: "Puławska Center",
      doctor: "Alan Smith",
    },
  },
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

          <DashboardBlockSmall
            title={"Contact with our consultant"}
            link={"#"}
            dataToDisplay={""}
            custom={"consultant"}
          />

          <DashboardBlockSmall
            title={"Laboratory tests"}
            link={"#"}
            dataToDisplay={""}
          />

          <DashboardBlockSmall
            title={"Healthy blog"}
            link={"#"}
            dataToDisplay={""}
            custom={"blog"}
            blogContent={blogArticleContent}
          />

          <DashboardBlockSmall
            title={"Account settings"}
            link={"#"}
            dataToDisplay={""}
            custom={"settings"}
          />
        </div>
      </div>
    </section>
  );
};
