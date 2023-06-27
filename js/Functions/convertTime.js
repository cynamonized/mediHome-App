import { DateTime } from "luxon";

// it intakes new DateTime object (from LuxonTime library)
export const AppointmentDate = (date) => {
  return `${date.monthLong} ${date.day}, ${date.toLocaleString(
    DateTime.TIME_SIMPLE
  )}`;
};

// it intakes new DateTime object (from LuxonTime library)
export const AppointmentPureDate = (date) => {
  return `${date.monthLong} ${date.day}`;
};

// it intakes new DateTime object (from LuxonTime library)
export const AppointmentTime = (date) => {
  return `${date.toLocaleString(DateTime.TIME_SIMPLE)}`;
};

// it intakes new DateTime object (from LuxonTime library)
export const dateToLuxonType = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return DateTime.local(year, month, day, 0, 0);
};

// it intakes time in seconds and return full Date ready to display
export const AppoDateFromSeconds = (seconds) => {
  const luxonDate = DateTime.fromSeconds(seconds);
  return AppointmentDate(luxonDate);
};

// it intakes time in seconds and returns date (without time)
export const AppoPureDateFromSeconds = (seconds) => {
  const luxonDate = DateTime.fromSeconds(seconds);
  return AppointmentPureDate(luxonDate);
};

// it intakes time in seconds and returns time (without date)
export const AppoTimeFromSeconds = (seconds) => {
  const luxonDate = DateTime.fromSeconds(seconds);
  return AppointmentTime(luxonDate);
};
