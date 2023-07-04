import React from "react";
import "../../../scss/main.scss";
import { DashboarPatientLeftPane } from "./DashboardPatientLeftPane";
import {
  DashboardBlockSmall,
  DashboardBlockSettings,
  DashboardBlockConsultant,
  DashboardBlockBlog,
} from "./DashboardLittleComps";
import { blogArticleContent } from "../../APICommunication/tempArrays";

export const DashboardPatient = ({ currentUserUID }) => {
  return (
    <section className="dashboard-patient">
      <div className="container container-dashboard-patient">
        <DashboarPatientLeftPane
          // patientAppointments={appoMultiArray}
          currentUserUID={currentUserUID}
        />
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
