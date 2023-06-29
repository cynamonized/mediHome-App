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

// Getting single appointment from available appos on the server
export const getSingleAppointment = async (chosenAppo, failureCallback) => {
  const desiredCity = chosenAppo.city;
  const desiredSpec = chosenAppo.specialization;
  const desiredID = chosenAppo.id;

  const docRef = doc(
    db,
    "AvailableAppos",
    `${desiredCity}`,
    `${desiredSpec}`,
    `${desiredID}`
  );

  try {
    const desiredAppo = await getDoc(docRef);

    if (desiredAppo.exists()) {
      return desiredAppo.data();
    } else {
      failureCallback(true);
    }
  } catch (error) {
    console.log(error);
    failureCallback(true);
  }

  return null;
};

// Deleting single appo from given collection
export const deleteSingleAppoFrServer = async (
  chosenAppo,
  localization,
  failureCallback,
  refreshSearchCallback
) => {
  const desiredCity = chosenAppo.city;
  const desiredSpec = chosenAppo.specialization;
  const desiredID = chosenAppo.id;

  const docRef = doc(
    db,
    `${localization}`,
    `${desiredCity}`,
    `${desiredSpec}`,
    `${desiredID}`
  );

  try {
    const deleteAppo = await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
    refreshSearchCallback();
    failureCallback(true);
  }
};

// Cloning given appointmet into new location
export const cloneAppo = async (
  currentUserUID,
  appoToBeCloned,
  ...pathArgs
) => {
  console.log(pathArgs);
  const newDocRef = doc(db, ...pathArgs, `${appoToBeCloned.id}`);
  const fieldsRef = {
    booked: appoToBeCloned.booked,
    city: `${appoToBeCloned.city}`,
    completed: appoToBeCloned.completed,
    date: appoToBeCloned.date,
    doctor: `${appoToBeCloned.doctor}`,
    patientID: `${currentUserUID}`,
    palce: `${appoToBeCloned.palce}`,
    specialization: `${appoToBeCloned.specialization}`,
  };
  try {
    await setDoc(newDocRef, fieldsRef);
  } catch (error) {
    console.log(error);
  }
};

// Validating number of users appoints of specific type (specialization)
// it returns true if user doesn't have max allowed number of appointments
// it returns fals if user has reached maximum number of appointments
export const apposNumberValidation = async (currentUserUID, specialization) => {
  let appoCount = 0;

  const appoQueryRef = query(
    collection(
      db,
      "Users",
      `${currentUserUID}`,
      "Appointments",
      "Booked",
      "Booked"
    ),
    where("specialization", "==", `${specialization}`)
  );

  try {
    const alreadyBookedAppos = await getDocs(appoQueryRef);
    alreadyBookedAppos.forEach((appo) => {
      appoCount++;
    });

    if (appoCount > 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return error;
  }

  return null;
};
