import { collection, query, where, getDoc, doc } from "firebase/firestore";
import { db } from "../config/firestore";

// Function returns single appointment object for given user (userUID)
export const getSingleUserAppointment = async (
  userUID,
  appoID,
  ifCompleted,
  saveAppoCallback
) => {
  const apposCollection = ifCompleted == true ? "Completed" : "Booked";
  const docRef = doc(
    db,
    "Users",
    `${userUID}`,
    "Appointments",
    `${apposCollection}`,
    `${apposCollection}`,
    `${appoID}`
  );

  try {
    const singleAppoObj = await getDoc(docRef);
    if (saveAppoCallback) {
      saveAppoCallback(singleAppoObj.data());
    } else {
      return singleAppoObj;
    }
  } catch (error) {
    console.log(error);
  }
};
