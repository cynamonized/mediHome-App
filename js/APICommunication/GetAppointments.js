import {
  temporaryAppointmentsUser,
  temporaryAppointments,
  AllAppos,
} from "./tempArrays";
import { DateTime } from "luxon";
import { dateToLuxonType } from "../Functions/convertTime";

// LEGACY
export const doingSomething = () => {
  return null;
};

/////////////////////////////////////////////////////////////////////////////
// GETTING USER <- Just on the beginning? Or just his name, lastname and ID
///////////////////////////////////////////////////////////////////////////////
export const getUser = (userID, usersArray, successCallback) => {
  // Fetching data from server here
  const myUserArray = usersArray.filter((user) => {
    return user.userID == userID;
  });

  const myUser = myUserArray[0];
  // Write him down to a state
  successCallback(myUser);
};

///////////////////////////////////////////////////////////////////////////////
// GETTING USER APPOINTMENTS
///////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////
// Removing appo fr user, moving it back to available appos (separately)
///////////////////////////////////////////////////////////////////////////////

export const RemoveAppoFrUser = (userID, usersArray, appoID) => {
  // 0A. userIndex to be removed when real fetch is in
  const userIndex = usersArray.findIndex((user) => user.userID == userID);
  const myUserArray = usersArray.filter((user) => {
    return user.userID == userID;
  });
  const myUser = myUserArray[0];
  const appointments = myUser.appointments;
  const indexToRemove = appointments[0].findIndex((appo) => appo.id == appoID);

  ////// 0. Removing appointment from User's appointment
  // Note for real fetch: it might not be necessary to look for it (1)
  // here, I might be just send DELETE Fetch with proper userID and appoID (prob yes)
  //
  // 0B. Picking up array with USER's BOKKED APPOINTMENTS (appointments[0])
  // will be used to delete and patch from TEMP ARRAY
  const copiedAppoArray = temporaryAppointmentsUser[
    userIndex
  ].appointments[0].slice(indexToRemove, indexToRemove + 1);
  const copiedAppo = copiedAppoArray.reduce((appo) => {
    return appo;
  });

  // 0C. Here it deletes it from users data:
  //     below is immitation of DELETE FETCH to the server
  temporaryAppointmentsUser[userIndex].appointments[0].splice(indexToRemove, 1);

  // 0D. Picking up necessary info for the server (what to delete/move)
  // DIRTY CODE (VERY VERY)
  const tempCity = copiedAppo.city;
  const bookedRepo = "Booked";
  const availableRepo = "Available";
  const tempAppoSpec = copiedAppo.specialization;

  ////// 1. Deleting appo from booked repo
  // 1A. Pick up which element of an array to delete
  const serverAppoIndex = AllAppos[bookedRepo][tempCity][
    tempAppoSpec
  ].findIndex((appo) => appo.id == appoID);

  // 1B. Copy appointment before deleteing it
  // so it can be injected into available appos again
  const freedAppoArray = AllAppos[bookedRepo][tempCity][tempAppoSpec].slice(
    serverAppoIndex,
    serverAppoIndex + 1
  );
  const freedAppo = freedAppoArray.reduce((appo) => {
    return appo;
  });

  // 1C. Delete appo from booked array (city -> spec -> appo)
  AllAppos[bookedRepo][tempCity][tempAppoSpec].splice(serverAppoIndex, 1);

  /////// 2. Adding appo back to available repo
  AllAppos[availableRepo][tempCity][tempAppoSpec].push(freedAppo);

  // 2A. Sort this specific array with appos by date time
  AllAppos[availableRepo][tempCity][tempAppoSpec].sort(function (a, b) {
    return a.date.toSeconds() - b.date.toSeconds();
  });
};

///////////////////////////////////////////////////////////////////////////////
// Getting user settings
///////////////////////////////////////////////////////////////////////////////

export const gettingUserSettings = (userID, usersArray, successCallback) => {
  // Fetching data from server here
  const myUserArray = usersArray.filter((user) => {
    return user.userID == userID;
  });
  const myUser = myUserArray[0];
  const personalData = myUser.personalData;

  console.log(personalData);
  successCallback(personalData);
  // Write appointments down to a state

  return null;
};

///////////////////////////////////////////////////////////////////////////////
// Updating user settings
///////////////////////////////////////////////////////////////////////////////

export const updateUserSettings = (
  userID,
  usersArray,
  street,
  apartment,
  postCode,
  city,
  country,
  password
) => {
  const myUserArray = usersArray.filter((user) => {
    return user.userID == userID;
  });

  const userIndex = usersArray.findIndex((user) => user.userID == userID);

  temporaryAppointmentsUser[userIndex].password = password;
  temporaryAppointmentsUser[userIndex].personalData.address.streetName = street;
  temporaryAppointmentsUser[userIndex].personalData.address.apartmentNumber =
    apartment;
  temporaryAppointmentsUser[userIndex].personalData.address.postCode = postCode;
  temporaryAppointmentsUser[userIndex].personalData.address.city = city;
  temporaryAppointmentsUser[userIndex].personalData.address.country = country;
  console.log(temporaryAppointmentsUser[0]);

  return null;
};

///////////////////////////////////////////////////////////////////////////////
// Search fetch
///////////////////////////////////////////////////////////////////////////////

export const searchForAppointment = (
  city,
  specialization,
  appointmentDate,
  apposArray,
  successCallback
) => {
  const myCity = city.label;
  const mySpec = specialization.label;
  const desiredLuxonDate = dateToLuxonType(appointmentDate);

  const availableAppos = apposArray.Available;
  console.log(availableAppos);
  const firstFilter = [...availableAppos[myCity][mySpec]];

  console.log(firstFilter);

  const filteredByDate = firstFilter.filter((appo) => {
    return appo.date.toUnixInteger() >= desiredLuxonDate.toUnixInteger();
  });
  console.log(filteredByDate);
  successCallback(filteredByDate);
};
