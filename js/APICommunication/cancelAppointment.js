import { db } from "../config/firestore";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  Timestamp,
  getDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import {
  getSingleAppointment,
  getBookedAppoFrUser,
  getBookedAppoFrServer,
  deleteSingleAppoFrServer,
  deleteSingleAppoFrUser,
  cloneAppo,
  cloneAppoBackToAvailable,
} from "./singleAppoSimpleOperations";

export const cancelThisAppointment = async (
  currentUserUID,
  chosenAppoID,
  chosenAppo,
  failureCallback
) => {
  chosenAppo["id"] = `${chosenAppoID}`;

  try {
    console.log(chosenAppo);

    //1. Get and store backup of the appo
    const backupAppo = await getBookedAppoFrUser(
      chosenAppo,
      currentUserUID,
      failureCallback
    );
    backupAppo["id"] = chosenAppoID;
    backupAppo["booked"] = false;
    delete backupAppo.patientID;
    console.log(backupAppo);

    //2A. Delete Appo from user
    const deleteFromUser = await deleteSingleAppoFrUser(
      chosenAppo,
      currentUserUID,
      failureCallback
    );

    //2b. Delete appo from Server-> Booked appos
    const deleteFromDatabase = await deleteSingleAppoFrServer(
      chosenAppo,
      "BookedAppos",
      failureCallback
    );

    //3.  Clone to Server - Available appos
    const cloneAppo = await cloneAppoBackToAvailable(
      currentUserUID,
      backupAppo,
      "AvailableAppos",
      `${backupAppo.city}`,
      `${backupAppo.specialization}`
    );

    //4. Success !!
  } catch (error) {}
};
