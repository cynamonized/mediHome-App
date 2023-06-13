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

export const DashboardFooterSmall = ({ link, whiteElements }) => {
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

export const DashboardBlockSmall = ({
  title,
  dataToDisplay,
  link,
  custom,
  blogContent,
}) => {
  const [background, setBackground] = useState("null");
  useEffect;

  //What if custom blocks

  //Consultant
  if (custom == "consultant") {
    return (
      <div className="dashboard__block-small--static">
        <div className="static__icon"></div>
        <h2 className="static__title">Contact with our consultant</h2>
        <div className="static__description">
          Do you need our help? <br />
          Call us!
          <br /> 609 346 609
        </div>
      </div>
    );
  }

  //Settings
  if (custom == "settings") {
    return <div className="dashboard__block-small--static">małe</div>;
  }

  //Blog
  if (custom == "blog") {
    return (
      <>
        <div className="dashboard__block-small dashboard__block-small--blog">
          <DashboardHeaderSmall title={title} whiteElements={true} />
          <div className="block-small__body--blog">
            {/* NEED TO PUT BLOG CONTENT HERE */}
          </div>
          <DashboardFooterSmall link={link} whiteElements={true} />
        </div>
      </>
    );
  }

  // Standard small block
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
