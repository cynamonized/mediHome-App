import React from "react";
import "../../scss/main.scss";

export const LoaderCircle = () => {
  return (
    <div
      className="appo-list dashboard__block-small container single-appo"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>This is placeholder for a loader when cancelling V2</p>
    </div>
  );
};
