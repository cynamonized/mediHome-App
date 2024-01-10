import React, { useState, useEffect } from "react";
import Logo1 from "../../../images/Landing Page/logos/Logo 1.svg";
import Logo2 from "../../../images/Landing Page/logos/Logo 2.svg";
import Logo3 from "../../../images/Landing Page/logos/Logo 3.svg";
import Logo4 from "../../../images/Landing Page/logos/Logo 4.svg";
import Logo5 from "../../../images/Landing Page/logos/Logo 5.svg";

export const Companies = () => {
  return (
    <div className="companies container">
      <p className="companies__title">COMPANIES THAT TRUST US</p>
      <div className="companies__logos">
        <img src={Logo1} className="logos__single-logo" />
        <img src={Logo2} className="logos__single-logo" />
        <img src={Logo3} className="logos__single-logo" />
        <img src={Logo4} className="logos__single-logo" />
        <img src={Logo5} className="logos__single-logo" />
      </div>
    </div>
  );
};
