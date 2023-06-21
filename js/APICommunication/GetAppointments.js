// LEGACY
import { temporaryAppointmentsUser, temporaryAppointments } from "./tempArrays";

export const doingSomething = () => {
  return null;
};

export const searchForAppointment = (e) => {
  e.preventDefault();
  return null;
};

// GETTING USER APPOINTMENTS
export const getUserAppointments = (userID, usersArray, successCallback) => {
  // Fetching data from server here
  const myUserArray = usersArray.filter((user) => {
    return user.userID == userID;
  });

  const myUser = { ...myUserArray };

  successCallback();
};

getUserAppointments(1, temporaryAppointmentsUser, doingSomething);
