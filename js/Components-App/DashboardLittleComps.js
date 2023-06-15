import React, { useEffect, useState } from "react";
import "../../scss/main.scss";

/////////////////////////////////////////////////////////////////////
//
//  Below containts some dirty code - re- displaying blog
//  Perhaphs it can be done cleaner???
//
/////////////////////////////////////////////////////////////////////

export const DashboardHeaderSmall = ({ title, whiteElements }) => {
  // If this is blog
  if (whiteElements) {
    return (
      <div
        className="dashboard__header--small"
        style={{ borderBottom: "1px solid white" }}
      >
        <h2 style={{ color: "white" }}>{title}</h2>
      </div>
    );
  }

  return (
    <div className="dashboard__header--small">
      <h2>{title}</h2>
    </div>
  );
};

export const DashboardFooterSmall = ({ link, whiteElements, forceBottom }) => {
  //If this is blog
  if (whiteElements) {
    return (
      <div
        className="dashboard__footer--small"
        style={{ borderTop: "1px solid white" }}
      >
        <a href={`${link}`}>
          <p className="footer--small__button">Show more...</p>
        </a>
      </div>
    );
  }

  return (
    <div className="dashboard__footer--small">
      <a href={`${link}`}>
        <p className="footer--small__button">Show more...</p>
      </a>
    </div>
  );
};

export const DashboardBlockSmall = ({ title, dataToDisplay, link }) => {
  useEffect;
  return (
    <>
      <div className="dashboard__block-small">
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
      <a href={link}>
        <div className="static__icon static__icon--settings"></div>
        <h2 className="static__title">{title}</h2>
        <div className="static__description">
          Update your address, contact <br />
          information and read our <br />
          privacy policy
        </div>
      </a>
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
      <div className="dashboard__block-small dashboard__block-small--blog">
        <DashboardHeaderSmall title={title} whiteElements={true} />
        <div className="block-small__body--blog">
          {/* NEED TO PUT BLOG CONTENT HERE -> FROM OBJECT IN DP.js */}

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
