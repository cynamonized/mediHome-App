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
  deleteSingleAppo,
  cloneAppo,
  apposNumberValidation,
} from "./singleAppoSimpleOperations";

export const cancelThisAppointment = (
  currentUserUID,
  chosenAppoID,
  chosenAppo
) => {
  try {
    console.log(chosenAppo);
    console.log(chosenAppoID);

    //1. Get and store back of the appo
    //2A. Delete Appo from user
    //2b. Delete appo from Server-> Booked appos
    //3.  Clone to Server - Available appos
    //4. Success !!
  } catch (error) {}
};
