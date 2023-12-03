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
import { useWindowSize } from "@uidotdev/usehooks";

export const DashboardPatient = ({ currentUserUID }) => {
  const size = useWindowSize();

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

          {size.width > 1005 ? (
            <DashboardBlockConsultant title={"Contact with our consultant"} />
          ) : null}

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

          {size.width <= 1005 ? (
            <DashboardBlockConsultant title={"Contact with our consultant"} />
          ) : null}

          <DashboardBlockSettings title={"Account settings"} link={"#"} />
        </div>
      </div>
    </section>
  );
};
