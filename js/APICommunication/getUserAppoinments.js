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
    let firstArray = [];
    let secondArray = [];

    bookedAppointments.forEach((appo) => {
      const appoWithID = appo.data();
      appoWithID["id"] = appo.id;

      firstArray.push(appoWithID);
    });
    firstArray.sort((a, b) => {
      return a.date.seconds - b.date.seconds;
    });

    completedApointments.forEach((appo) => {
      const appoWithID = appo.data();
      appoWithID["id"] = appo.id;

      secondArray.push(appoWithID);
    });
    secondArray.sort((a, b) => {
      return a.date.seconds - b.date.seconds;
    });

    multiArray.push(firstArray);
    multiArray.push(secondArray);

    saveApposCallback(multiArray);
  } catch (error) {
    console.log(error);
  }
};
