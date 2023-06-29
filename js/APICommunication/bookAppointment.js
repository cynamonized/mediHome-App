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
      // const deleteFromDatabase = await deleteSingleAppo(
      //   chosenAppo,
      //   failureCallback,
      //   refreshSearchCallback
      // );

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

export const deleteSingleAppo = async (
  chosenAppo,
  failureCallback,
  refreshSearchCallback
) => {
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
    const deleteAppo = await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
    refreshSearchCallback();
    failureCallback(true);
  }
};

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
