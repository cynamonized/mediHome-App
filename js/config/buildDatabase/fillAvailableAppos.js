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

//////////////////////////////////////////////////////////
// Below function that generates appos are very simple
// need to add customization (occurencies etc.)
//////////////////////////////////////////////////////////

const twoDigitNumber = (number) => {
  const increasedNumber = number + 8;

  if (increasedNumber < 10) {
    return `0${increasedNumber}`;
  } else {
    return increasedNumber;
  }
};

function isWeekend(date) {
  return date.getDay() === 6 || date.getDay() === 0;
}

function getNextMonday(date) {
  const dateCopy = new Date(date.getTime());

  const nextMonday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7)
    )
  );

  return nextMonday;
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// JUMPING TO NEXT MONDAY DOESN't WORK IF IT NEEDS TO JUMP TO NEXT WEEK
// FIX IT LATER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// pick start date
// numOfDays needs to be less or equal 5
// max numOfAppos should be less than 9
export const fillWithSingleAppoSet = async (
  whichMonday,
  numOfWeeks,
  numOfDays,
  numOfAppos,
  specialization,
  doctor,
  city,
  place
) => {
  let currentDate = new Date(whichMonday);
  let whichWeek = new Date(whichMonday);

  for (let i = 0; i < numOfWeeks; i++) {
    for (let j = 0; j < numOfDays; j++) {
      currentDate.setDate(whichWeek.getDate() + j);
      for (let k = 0; k < numOfAppos; k++) {
        currentDate.setHours(k + 8);
        console.log(currentDate);
        try {
          await addDoc(
            collection(db, "AvailableAppos", `${city}`, `${specialization}`),
            {
              date: Timestamp.fromDate(currentDate),
              specialization: `${specialization}`,
              place: `${place}`,
              doctor: `${doctor}`,
              booked: false,
              completed: false,
              patientID: "",
              city: `${city}`,
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    }

    whichWeek = getNextMonday(currentDate);
  }
};

////////////////////////////////////////////////////////////

// P1 NOW !!!!!!!!!!!!!!!!!!!!!!!!!!
// BUILD BIG FUNCTION THAT USES ABOVE TO FILL EVERYTHING AHEAD OF 2/3 months!!
//

////////////////////////////////////////////////////////////

export const fillAvailableAppos = async () => {
  await fillWithSingleAppoSet(
    new Date(`July 31, 2023 8:00:00`),
    4,
    3,
    6,
    "Internist",
    "Daniel Carter",
    "Warsaw",
    "Zawady Center"
  );

  await fillWithSingleAppoSet(
    new Date(`August 2, 2023 8:00:00`),
    3,
    2,
    6,
    "Internist",
    "Amelia Smith",
    "Krakow",
    "Skierniewice Center"
  );

  await fillWithSingleAppoSet(
    new Date(`August 7, 2023 8:00:00`),
    3,
    2,
    4,
    "Internist",
    "Joshua Lee",
    "Poznan",
    "Pyrowska Street"
  );

  await fillWithSingleAppoSet(
    new Date(`August 8, 2023 8:00:00`),
    2,
    2,
    4,
    "Orthopaedist",
    "Sameul Garcia",
    "Warsaw",
    "Mlociny Center"
  );

  await fillWithSingleAppoSet(
    new Date(`August 14, 2023 8:00:00`),
    2,
    4,
    6,
    "Orthopaedist",
    "Christopher Clark",
    "Krakow",
    "Main Square 12"
  );

  await fillWithSingleAppoSet(
    new Date(`August 8, 2023 8:00:00`),
    2,
    4,
    6,
    "Orthopaedist",
    "Christopher Clark",
    "Poznan",
    "Poznanska 12"
  );

  await fillWithSingleAppoSet(
    new Date(`August 1, 2023 8:00:00`),
    3,
    4,
    6,
    "Orthodontist",
    "Victoria Mitchell",
    "Warsaw",
    "Skierniewicka 45"
  );

  await fillWithSingleAppoSet(
    new Date(`August 2, 2023 8:00:00`),
    3,
    4,
    6,
    "Orthodontist",
    "Isabella Martin",
    "Krakow",
    "Aleja Trzech Wieszczow 12"
  );

  await fillWithSingleAppoSet(
    new Date(`August 7, 2023 8:00:00`),
    3,
    3,
    4,
    "Orthodontist",
    "Gabrielle Taylor",
    "Poznan",
    "Warszawska Street 34"
  );
};
