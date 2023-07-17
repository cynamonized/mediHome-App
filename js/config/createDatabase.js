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

export const addDatabase = async () => {
  // Creating Firestore database structure for available, booked and past appointments
  const citiesList = ["Krakow", "Poznan", "Warsaw"];
  const specializationsList = ["Internist", "Orthopaedist", "Orthodontist"];
  const pastAppos = ["Completed", "Deserted", "No_picked_up"];

  citiesList.forEach(async (city) => {
    const avaCity = await setDoc(doc(db, "AvailableAppos", `${city}`), {});
    const bookedCity = await setDoc(doc(db, "BookedAppos", `${city}`), {});

    specializationsList.forEach(async (specialization) => {
      const avaSpecialization = await setDoc(
        doc(db, "AvailableAppos", `${city}`, `${specialization}`, "FAKEDOC"),
        {}
      );
      const bookedSpecialization = await setDoc(
        doc(db, "BookedAppos", `${city}`, `${specialization}`, "FAKEDOC"),
        {}
      );
    });
  });

  const currentYear = await setDoc(doc(db, "PastAppos", "2023"), {});

  pastAppos.forEach(async (type) => {
    const appoType = await setDoc(
      doc(db, "PastAppos", "2023", `${type}`, "FAKEDOC"),
      {}
    );
  });

  // Creating hardcoded example user and databasa structure to store his data
  // Following code should be user to create any future patient account
  const exampleEmail = "mat.marco@example.com";
  const examplePassword = "321medi";
  let exampleUserUID;
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    exampleEmail,
    examplePassword
  );
  exampleUserUID = userCredential.user.uid;
  const userApposTypes = ["Completed", "Booked", "Deserted"];

  await userApposTypes.forEach(async (type) => {
    const userStructure = await setDoc(
      doc(db, "Users", `${exampleUserUID}`),
      {}
    );

    const userStructurePrimary = await setDoc(
      doc(db, "Users", `${exampleUserUID}`, "Appointments", `${type}`),
      {}
    );

    const userStructureNext = await setDoc(
      doc(
        db,
        "Users",
        `${exampleUserUID}`,
        "Appointments",
        `${type}`,
        `${type}`,
        "FAKEDOC"
      ),
      {}
    );
  });

  const userRef = doc(db, "Users", `${exampleUserUID}`);

  const settingExampleUserData = await updateDoc(userRef, {
    lastName: "Marco",
    name: "Mat",
    personalData: {
      address: {
        apartmentNumber: "4/4",
        city: "Warsaw",
        country: "Poland",
        postCode: "00-710",
        streetName: "Orange",
      },
      birthdayDate: Timestamp.fromDate(new Date("December 10, 1985")),
      email: "mat.marco@example.com",
      phone: "123456789",
    },
    profilePicture:
      "https://github.com/cynamonized/mediHome-App/blob/dedef7b1d0eb883cc5091e6bcdcdfcd659741abd/images/Profile%20picture%20-%20temp.png?raw=true",
  });
};
