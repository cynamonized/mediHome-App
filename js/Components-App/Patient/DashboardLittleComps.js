import React, { useEffect } from "react";
import "../../../scss/main.scss";
import { Link } from "react-router-dom";

export const DashboardHeaderSmall = ({ title, whiteElements }) => {
  return (
    <div
      className={`dashboard__header--small ${
        whiteElements == true ? "dashboard__header--small-white" : ""
      }`}
    >
      <h2 className={`${whiteElements == true ? "small-white__title" : ""}`}>
        {title}
      </h2>
    </div>
  );
};

export const DashboardHeaderBig = ({ title, link }) => {
  return (
    <div className="dashboard__header-big">
      {link && (
        <Link to={link}>
          <div className="header-big__back-arrow"></div>
        </Link>
      )}

      <h3>{title}</h3>
    </div>
  );
};

export const DashboardHeaderWarning = ({ title, children }) => {
  return (
    <div className="dashboard__header-big dashboard__header-big--warning">
      {children}
      <h3>{title}</h3>
    </div>
  );
};

export const DashboardFooterSmall = ({ link, whiteElements }) => {
  return (
    <div
      className={`dashboard__footer--small ${
        whiteElements == true ? "dashboard__footer--small-white" : ""
      }`}
    >
      <Link to={link}>
        <p className="footer--small__button">Show more...</p>
      </Link>
    </div>
  );
};

export const DashboardBlockSmall = ({ title, dataToDisplay, link }) => {
  useEffect;
  return (
    <>
      <div className="dashboard__block">
        <DashboardHeaderSmall title={title} />
        <div className="block-small__body">
          {dataToDisplay == "" && (
            <>
              {title == "Referrals" && (
                <>
                  <p className="body__super-text">No referrals available</p>
                </>
              )}
              {title != "Referrals" && (
                <>
                  <p className="body__super-text">You are as right as rain!</p>
                  <p className="body__secondary-text">
                    If you are not, <span>schedule an appointment.</span>
                  </p>
                </>
              )}
            </>
          )}
        </div>
        <DashboardFooterSmall link={link} />
      </div>
    </>
  );
};

export const DashboardBlockSettings = ({ title, link }) => {
  return (
    <div className="dashboard__block-small--static">
      <Link to={"/user-settings"}>
        <div className="static__icon static__icon--settings"></div>
        <h2 className="static__title">{title}</h2>
        <div className="static__description">
          Update your address, contact <br />
          information and read our <br />
          privacy policy
        </div>
      </Link>
    </div>
  );
};

export const DashboardBlockConsultant = ({ title }) => {
  return (
    <div className="dashboard__block-small--static">
      <div className="static__icon static__icon--consultant  "></div>
      <h2 className="static__title">{title}</h2>
      <div className="static__description">
        Do you need our help? <br />
        Call us!
        <br /> 609 346 609
      </div>
    </div>
  );
};

export const DashboardBlockBlog = ({ title, link, blogContent }) => {
  return (
    <>
      <div className="dashboard__block dashboard__block-small--blog">
        <DashboardHeaderSmall title={title} whiteElements={true} />
        <div className="block-small__body--blog">
          <img src={`${blogContent.articleImage}`} />
          <p className="body-blog__title">{blogContent.articleTitle}</p>
          <p className="body-blog__description">{blogContent.articleBody}</p>
        </div>
        <DashboardFooterSmall
          link={link}
          whiteElements={true}
          forceBottom={true}
        />
      </div>
    </>
  );
};
