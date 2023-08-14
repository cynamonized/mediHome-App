import { db } from "../config/firestore";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  getDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import {
  getSingleAppointment,
  deleteSingleAppoFrServer,
  cloneAppo,
  apposNumberValidation,
} from "./singleAppoSimpleOperations";

//It intakes userID
export const bookThisAppointment = async (
  currentUserUID,
  specialization,
  denyCallback,
  keepLoadingCallback,
  chosenAppo,
  failureCallback,
  refreshSearchCallback,
  successCallback
) => {
  try {
    const isAllowed = await apposNumberValidation(
      currentUserUID,
      specialization
    );

    if (isAllowed) {
      // 1. Backup appo - potentially I could just use "chosenAppo" ??
      const backupAppo = await getSingleAppointment(
        chosenAppo,
        failureCallback
      );
      backupAppo["id"] = chosenAppo.id;
      backupAppo["booked"] = true;

      // 2. Delete appo
      // RESTORE WHEN CANCELLING WORKS FULLY
      const deleteFromDatabase = await deleteSingleAppoFrServer(
        chosenAppo,
        "AvailableAppos",
        failureCallback,
        refreshSearchCallback
      );

      // 3. Insert/create appo to User's collection
      const cloningToUser = await cloneAppo(
        currentUserUID,
        backupAppo,
        "Users",
        `${currentUserUID}`,
        "Appointments",
        "Booked",
        "Booked"
      );

      // 4. Move to Booked appointments in db
      const cloningToBookedDB = await cloneAppo(
        currentUserUID,
        backupAppo,
        "BookedAppos",
        `${backupAppo.city}`,
        `${backupAppo.specialization}`
      );

      // 4. Success!!!
      successCallback();
    } else {
      denyCallback(true);
      keepLoadingCallback(false);
    }
  } catch (error) {
    console.log(error);
  }
};
