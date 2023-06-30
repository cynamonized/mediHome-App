import {
  colorMainBlue,
  colorMainBlueLight,
  colorMainPink,
  colorGreysLight1,
  colorGreysLight2,
  colorGreysMid1,
  colorMainText,
} from "../Settings/cssVariables";

// Object that stores custom Date-picker/
export const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: `${colorMainBlue}`,
    borderRadius: "30px",
    height: "100%",
    padding: "7px",
    color: `${colorMainText}`,
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    color: `${colorMainText}`,
    padding: "2rem",
    borderRadius: "2rem",
    boxShadow: "none",
    marginTop: "1rem",
    border: `1px solid ${colorGreysLight1}`,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    padding: "2rem",
    borderRadius: "15px",
  }),
};
