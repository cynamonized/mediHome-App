import React from "react";

export const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className="datepicker-input"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    ref={ref}
  >
    {value}
  </button>
));
