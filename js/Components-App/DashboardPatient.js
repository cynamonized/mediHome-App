import React, { useEffect, useState } from "react";
import "../../scss/main.scss";
import { DashboardPatientLHS } from "./DashboardPatient-LHS";
import {
  DashboardBlockSmall,
  DashboardBlockSettings,
  DashboardBlockConsultant,
  DashboardBlockBlog,
} from "./DashboardLittleComps";
import {
  temporaryAppointments,
  blogArticleContent,
  temporaryAppointmentsUser,
} from "../APICommunication/tempArrays";
import { getUserAppointments } from "../APICommunication/GetAppointments";
import { userIDserver } from "../APICommunication/user";

export const DashboardPatient = () => {
  const [appoMultiArray, setAppoMultiArray] = useState(null);

  useEffect(() => {
    getUserAppointments(
      userIDserver,
      temporaryAppointmentsUser,
      setAppoMultiArray
    );
  }, []);

  return (
    <section className="dashboard-patient">
      <div className="container container-dashboard-patient">
        <DashboardPatientLHS patientAppointments={appoMultiArray} />
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
