import { DateTime } from "luxon";

export const AppointmentDate = (date) => {
  return `${date.monthLong} ${date.day}, ${date.toLocaleString(
    DateTime.TIME_SIMPLE
  )}`;
};

export const AppointmentPureDate = (date) => {
  return `${date.monthLong} ${date.day}`;
};

export const AppointmentTime = (date) => {
  return `${date.toLocaleString(DateTime.TIME_SIMPLE)}`;
};
