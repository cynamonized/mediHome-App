import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainButton, SecondaryButton } from "./Buttons";
import { DashboardHeaderBig } from "./DashboardLittleComps";

export const PopUp = ({ cancelAppo, closePopUp }) => {
  const actionConfirmed = () => {
    console.log("=====ACTION CONFIRMED======");
  };

  const actionDenied = () => {
    console.log("=====ACTION DENIED=========");
  };

  return (
    <div className="pop-up fade-in-object">
      <div className="pop-up__window">
        <DashboardHeaderBig title={"Confirm action"} />
        <div className="window__body">
          <p className="body__message">
            Are you sure you want to cancel appointment:
          </p>
          <p className="body__appointment-name">###</p>
          <div className="body__buttons">
            <MainButton callbackAction={actionConfirmed} wide={true}>
              Yes
            </MainButton>
            <SecondaryButton callbackAction={closePopUp} wide={true}>
              No
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const PopUp = () => {
//   return (
//     <div
//       style={{
//         backgroundColor: "green",
//         width: "1300px",
//         height: "880px",
//         marginLeft: "auto",
//         marginRight: "auto",
//         position: "relative",
//       }}
//     >
//       <RealPopUp />
//     </div>
//   );
// };

// const RealPopUp = () => {
//   const actionConfirmed = () => {
//     console.log("=====ACTION CONFIRMED======");
//   };

//   const actionDenied = () => {
//     console.log("=====ACTION DENIED=========");
//   };

//   return (
//     <div className="pop-up">
//       <div className="pop-up__window">
//         <DashboardHeaderBig title={"Confirm action"} />
//         <div className="window__body">
//           <p className="body__message">
//             Are you sure you want to cancel appointment:
//           </p>
//           <p className="body__appointment-name">###</p>
//           <div className="body__buttons">
//             <MainButton callbackAction={actionConfirmed} wide={true}>
//               Yes
//             </MainButton>
//             <SecondaryButton callbackAction={actionDenied} wide={true}>
//               No
//             </SecondaryButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
