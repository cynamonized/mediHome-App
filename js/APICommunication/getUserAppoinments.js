import { db } from "../config/firestore";
import { collection, getDocs } from "firebase/firestore";

export const getUserAppointmentsMultiArray = async (
  userUID,
  saveApposCallback
) => {
  try {
    const bookedAppointments = await getDocs(
      collection(db, "Users", `${userUID}`, "Appointments", "Booked", "Booked")
    );
    const completedApointments = await getDocs(
      collection(
        db,
        "Users",
        `${userUID}`,
        "Appointments",
        "Completed",
        "Completed"
      )
    );
    let multiArray = [];
    let firstArray = fillApposArray(bookedAppointments);
    let secondArray = fillApposArray(completedApointments);

    multiArray.push(firstArray);
    multiArray.push(secondArray);

    saveApposCallback(multiArray);
  } catch (error) {
    console.log(error);
  }
};

const fillApposArray = (entryApposArray) => {
  let outputArray = [];

  entryApposArray.forEach((appo) => {
    const appoWithID = appo.data();
    appoWithID["id"] = appo.id;

    if (appoWithID.id != "FAKE DOC") {
      outputArray.push(appoWithID);
    }
  });

  // Sort data by date if there are any appos
  if (outputArray.length > 0) {
    outputArray.sort((a, b) => {
      return a.date.seconds - b.date.seconds;
    });
  }

  return outputArray;
};
