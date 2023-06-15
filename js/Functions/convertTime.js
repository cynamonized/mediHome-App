import { DateTime } from "luxon";

export const AppointmentDate = (date) => {
  return `${date.monthLong} ${date.day}, ${date.toLocaleString(
    DateTime.TIME_SIMPLE
  )}`;
};
