import { db } from "../firestore";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { twoDigitNumber, isWeekend, getNextMonday } from "./databaseUtility";

/**
 *
 * @param {Date} whichMonday - first day (should be Monday) in which function will start generating appointments
 * @param {number} numOfWeeks - how many weeks should appointments repeat
 * @param {number} numOfDays - how many days in each week should appointmnts repeat (e.g. 2 -> appos will appear on Mon and Tue)
 * @param {number} numOfAppos - how many appos will appear each day starting 8.00am (e.g. 3 -> three appos will be created on 8.00am, 9.00am and 10.00am)
 * @param {String} specialization - specialization of appointment that needs to be created (a the moment there are only: Internist, Orthopaedist and Orthodontist)
 * @param {String} doctor - doctor name that will run the appo (at the moment can be any name because there are no doctor accounts available)
 * @param {String} city - which city appointments takes place (at the moment it can be Warsaw, Poznan or Krakow only!)
 * @param {String} place - clinic address, it can be anything at the moment because there are not clinics specified in the database
 *
 */

const fillWithSingleAppoSet = async (
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

  for (let i = 0; i < numOfWeeks; i++) {
    for (let j = 0; j < numOfDays; j++) {
      if (j == 0) {
        currentDate.setDate(currentDate.getDate());
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (!isWeekend(currentDate)) {
        console.log(isWeekend(currentDate));

        for (let k = 0; k < numOfAppos; k++) {
          currentDate.setHours(k + 8);
          console.log("SETTING APPO: ", currentDate);
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
      } else {
        j--;
        console.log("It's weekend:", isWeekend(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    currentDate = getNextMonday(currentDate);
  }
};

export const fillAvailableAppos = async () => {
  await fillWithSingleAppoSet(
    new Date(`January 29, 2024 8:00:00`),
    49,
    3,
    6,
    "Internist",
    "Daniel Carter",
    "Warsaw",
    "Zawady Center"
  );

  await fillWithSingleAppoSet(
    new Date(`January 29, 2024 8:00:00`),
    49,
    2,
    6,
    "Internist",
    "Amelia Smith",
    "Krakow",
    "Skierniewice Center"
  );

  await fillWithSingleAppoSet(
    new Date(`January 29, 2024 8:00:00`),
    49,
    2,
    4,
    "Internist",
    "Joshua Lee",
    "Poznan",
    "Pyrowska Street"
  );

  await fillWithSingleAppoSet(
    new Date(`January 29, 2024 8:00:00`),
    49,
    5,
    4,
    "Orthopaedist",
    "Sameul Garcia",
    "Warsaw",
    "Mlociny Center"
  );

  await fillWithSingleAppoSet(
    new Date(`January 29, 2024 8:00:00`),
    49,
    4,
    6,
    "Orthopaedist",
    "Christopher Clark",
    "Krakow",
    "Main Square 12"
  );

  await fillWithSingleAppoSet(
    new Date(`January 29, 2024 8:00:00`),
    49,
    4,
    6,
    "Orthopaedist",
    "Christopher Clark",
    "Poznan",
    "Poznanska 12"
  );

  await fillWithSingleAppoSet(
    new Date(`January 29, 2024 8:00:00`),
    49,
    5,
    6,
    "Orthodontist",
    "Victoria Mitchell",
    "Warsaw",
    "Skierniewicka 45"
  );

  await fillWithSingleAppoSet(
    new Date(`January 29, 2024 8:00:00`),
    49,
    4,
    6,
    "Orthodontist",
    "Isabella Martin",
    "Krakow",
    "Aleja Trzech Wieszczow 12"
  );

  await fillWithSingleAppoSet(
    new Date(`January 29, 2024 8:00:00`),
    49,
    5,
    4,
    "Orthodontist",
    "Gabrielle Taylor",
    "Poznan",
    "Warszawska Street 34"
  );

  console.log("Yearly appos added!");
};
