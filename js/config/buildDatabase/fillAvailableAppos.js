import { db } from "./firestore";
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

const twoDigitNumber = (number) => {
  const increasedNumber = number + 8;

  if (increasedNumber < 10) {
    return `0${increasedNumber}`;
  } else {
    return increasedNumber;
  }
};

export const fillAAvailableAppos = async () => {
  return null;
};
