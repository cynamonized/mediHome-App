import {
  temporaryAppointmentsUser,
  temporaryAppointments,
  AllAppos,
} from "./tempArrays";
import { DateTime } from "luxon";

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
  console.log(
    "PRZED SORTOWANIEM: ",
    AllAppos[availableRepo][tempCity][tempAppoSpec]
  );

  // 2A. Sort this specific array with appos by date time
  AllAppos[availableRepo][tempCity][tempAppoSpec].sort(function (a, b) {
    return a.date.toSeconds() - b.date.toSeconds();
  });
  console.log(AllAppos[availableRepo][tempCity][tempAppoSpec]);
};
