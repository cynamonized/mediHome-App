import { db } from "../config/firestore";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";

export const getUserSettings = async (
  currentUserUID,
  successCallback,
  failureCallack
) => {
  const docRef = doc(db, "Users", `${currentUserUID}`);

  try {
    const userSettings = await getDoc(docRef);

    if (userSettings.exists()) {
      successCallback(userSettings.data().personalData);
    } else {
      throw error;
      failureCallack(true);
    }
  } catch (error) {
    console.log(error);
    failureCallack(true);
  }
};
