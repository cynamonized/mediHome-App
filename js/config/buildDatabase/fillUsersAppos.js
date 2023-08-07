import { db } from "../firestore";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const currentYear = "2023";

export const fillExampleAppoUser = async (
  userUID,
  date,
  specialization,
  place,
  doctor,
  city,
  completed
) => {
  let appoCompleted;
  completed == true
    ? (appoCompleted = "Completed")
    : (appoCompleted = "Booked");

  const createdAppo = await addDoc(
    collection(
      db,
      "Users",
      `${userUID}`,
      "Appointments",
      `${appoCompleted}`,
      `${appoCompleted}`
    ),
    {
      date: Timestamp.fromDate(date),
      specialization: `${specialization}`,
      place: `${place}`,
      doctor: `${doctor}`,
      booked: true,
      completed: completed,
      patientID: `${userUID}`,
      city: `${city}`,
    }
  );

  if (completed) {
    const addingAppoToServerPast = await setDoc(
      doc(db, "PastAppos", `${currentYear}`, "Completed", `${createdAppo.id}`),
      {
        date: Timestamp.fromDate(date),
        specialization: `${specialization}`,
        place: `${place}`,
        doctor: `${doctor}`,
        booked: true,
        completed: true,
        patientID: `${userUID}`,
        city: `${city}`,
      }
    );
  } else {
    const addingAppoToServerBooked = await setDoc(
      doc(
        db,
        "BookedAppos",
        `${city}`,
        `${specialization}`,
        `${createdAppo.id}`
      ),
      {
        date: Timestamp.fromDate(date),
        specialization: `${specialization}`,
        place: `${place}`,
        doctor: `${doctor}`,
        booked: true,
        completed: false,
        patientID: `${userUID}`,
        city: `${city}`,
      }
    );
  }
};
