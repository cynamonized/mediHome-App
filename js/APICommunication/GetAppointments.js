import { temporaryAppointmentsUser, temporaryAppointments } from "./tempArrays";

// LEGACY
export const doingSomething = () => {
  return null;
};

export const searchForAppointment = (e) => {
  e.preventDefault();
  return null;
};
/////////////////////////////////////////////////////////////////////////////

// GETTING USER <- Just on the beginning? Or just his name, lastname and ID
export const getUser = (userID, usersArray, successCallback) => {
  // Fetching data from server here
  const myUserArray = usersArray.filter((user) => {
    return user.userID == userID;
  });

  const myUser = myUserArray[0];
  // Write him down to a state
  successCallback(myUser);
};

// GETTING USER APPOINTMENTS
export const getUserAppointments = (userID, usersArray, successCallback) => {
  // Fetching data from server here
  const myUserArray = usersArray.filter((user) => {
    return user.userID == userID;
  });
  const myUser = myUserArray[0];
  const appointments = myUser.appointments;

  // Write appointments down to a state
  successCallback(appointments);
};
