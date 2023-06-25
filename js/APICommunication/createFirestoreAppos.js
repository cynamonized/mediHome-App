import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firestore";

const twoDigitNumber = (number) => {
  const increasedNumber = number + 8;

  if (increasedNumber < 10) {
    return `0${increasedNumber}`;
  } else {
    return increasedNumber;
  }
};

////////////////////////////////////////////////////////////
//
//  RUNNING FUNCTION
//
////////////////////////////////////////////////////////////

export const addLel = async () => {
  await addDoc(
    collection(
      db,
      "Users",
      "3eyqbBF2h8M27OVISJfsae0xDM42",
      "Appointments",
      "Completed",
      "Completed"
    ),
    {
      date: Timestamp.fromDate(new Date(`June 1, 2023 9:15:00`)),
      specialization: "Intenist",
      place: "Mlociny Center",
      doctor: "Marcin Kowalski",
      booked: true,
      completed: true,
      patientID: "3eyqbBF2h8M27OVISJfsae0xDM42",
      city: "Warsaw",
    }
  );

  await addDoc(
    collection(
      db,
      "Users",
      "3eyqbBF2h8M27OVISJfsae0xDM42",
      "Appointments",
      "Completed",
      "Completed"
    ),
    {
      date: Timestamp.fromDate(new Date(`May 25, 2023 8:30:00`)),
      specialization: "Orthopaedist",
      place: "Zawady Center",
      doctor: "Adam Sandler",
      booked: true,
      completed: true,
      patientID: "3eyqbBF2h8M27OVISJfsae0xDM42",
      city: "Warsaw",
    }
  );
};

////////////////////////////////////////////////////////////
//
//  INSERTED APPOINTMENTS
//
////////////////////////////////////////////////////////////

// AVAILABLE -> POZNAN -> INTERNIST

const addAvailablePoznanInternist = async () => {
  // if used, to insert loop here
  await addDoc(collection(db, "AvailableAppos", "Poznan", "Internist"), {
    date: Timestamp.fromDate(new Date("July 4, 2023 08:30:00")),
    specialization: "Internist",
    place: "Puławska Center",
    doctor: "Gordon Freeman",
    booked: false,
    completed: false,
    patientID: "",
    city: "Poznan",
  });
};

// AVAILABLE -> POZNAN -> ORTHODONTIST

const avaPoznanOrthodontist = async () => {
  for (let i = 0; i < 9; i++) {
    await addDoc(collection(db, "AvailableAppos", "Poznan", "Orthodontist"), {
      date: Timestamp.fromDate(
        new Date(`July 8, 2023 ${twoDigitNumber(i)}:30:00`)
      ),
      specialization: "Orthodontist",
      place: "Biedronki 12",
      doctor: "Adam Crazy",
      booked: false,
      completed: false,
      patientID: "",
      city: "Poznan",
    });
  }
};

// AVAILABLE -> POZNAN -> ORTHOPAEDIST

const avaPoznanOrthopaedist = async () => {
  for (let i = 0; i < 10; i++) {
    await addDoc(collection(db, "AvailableAppos", "Poznan", "Orthopaedist"), {
      date: Timestamp.fromDate(
        new Date(`July 10, 2023 ${twoDigitNumber(i)}:30:00`)
      ),
      specialization: "Orthopaedist",
      place: "Racławicka 42",
      doctor: "Cristiano Ronaldo",
      booked: false,
      completed: false,
      patientID: "",
      city: "Poznan",
    });

    await addDoc(collection(db, "AvailableAppos", "Poznan", "Orthopaedist"), {
      date: Timestamp.fromDate(
        new Date(`July 12, 2023 ${twoDigitNumber(i)}:30:00`)
      ),
      specialization: "Orthopaedist",
      place: "Racławicka 42",
      doctor: "Cristiano Ronaldo",
      booked: false,
      completed: false,
      patientID: "",
      city: "Poznan",
    });
  }
};

// Available -> Krakow -> Internist

const avaKrakowInternist = async () => {
  for (let i = 0; i < 8; i++) {
    await addDoc(collection(db, "AvailableAppos", "Krakow", "Internist"), {
      date: Timestamp.fromDate(
        new Date(`July 4, 2023 ${twoDigitNumber(i)}:30:00`)
      ),
      specialization: "Internist",
      place: "Rondo Grzegorzeckie 16",
      doctor: "Gregor McKinsey",
      booked: false,
      completed: false,
      patientID: "",
      city: "Krakow",
    });
  }
};

// Available -> Krakow -> Orthopaedist

const avaKrakowOrthopaedist = async () => {
  for (let i = 0; i < 10; i++) {
    await addDoc(collection(db, "AvailableAppos", "Krakow", "Orthopaedist"), {
      date: Timestamp.fromDate(
        new Date(`July 15, 2023 ${twoDigitNumber(i)}:30:00`)
      ),
      specialization: "Orthopaedist",
      place: "Krowodrza Gorka Center",
      doctor: "Oliver Wyman",
      booked: false,
      completed: false,
      patientID: "",
      city: "Krakow",
    });
  }
};

// Available -> Krakow -> Orthodontist

const avaKrakowOrthodontist = async () => {
  for (let i = 0; i < 9; i++) {
    await addDoc(collection(db, "AvailableAppos", "Krakow", "Orthodontist"), {
      date: Timestamp.fromDate(
        new Date(`July 5, 2023 ${twoDigitNumber(i)}:30:00`)
      ),
      specialization: "Orthodontist",
      place: "Aleja Trzech Wieszczow 1",
      doctor: "George Kinder-Country",
      booked: false,
      completed: false,
      patientID: "",
      city: "Krakow",
    });
  }
};

// Available -> Warsaw -> Orthodontist

const avaWarsawOrthodontist = async () => {
  for (let i = 0; i < 5; i++) {
    await addDoc(collection(db, "AvailableAppos", "Warsaw", "Orthodontist"), {
      date: Timestamp.fromDate(
        new Date(`July 20, 2023 ${twoDigitNumber(i)}:30:00`)
      ),
      specialization: "Orthodontist",
      place: "Main Square Center",
      doctor: "Jerry Wisdom",
      booked: false,
      completed: false,
      patientID: "",
      city: "Warsaw",
    });
  }
};

// Available -> Warsaw -> Orthodontist

const avaWarsawInternistOrthopaedist = async () => {
  for (let i = 0; i < 8; i++) {
    await addDoc(collection(db, "AvailableAppos", "Warsaw", "Orthopaedist"), {
      date: Timestamp.fromDate(
        new Date(`July 7, 2023 ${twoDigitNumber(i)}:30:00`)
      ),
      specialization: "Orthopaedist",
      place: "Kabaty Center",
      doctor: "Jean Pierre",
      booked: false,
      completed: false,
      patientID: "",
      city: "Warsaw",
    });
  }

  for (let i = 0; i < 11; i++) {
    await addDoc(collection(db, "AvailableAppos", "Warsaw", "Internist"), {
      date: Timestamp.fromDate(
        new Date(`July 11, 2023 ${twoDigitNumber(i)}:30:00`)
      ),
      specialization: "Internist",
      place: "Mlociny Center",
      doctor: "Josh Browser",
      booked: false,
      completed: false,
      patientID: "",
      city: "Warsaw",
    });
  }
};
