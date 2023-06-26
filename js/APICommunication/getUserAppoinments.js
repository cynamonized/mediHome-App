import { db } from "../config/firestore";
import { collection, getDocs } from "firebase/firestore";
// 3eyqbBF2h8M27OVISJfsae0xDM42
// /Users/3eyqbBF2h8M27OVISJfsae0xDM42/Appointments/Booked/Booked/GeQwdfLBSt9AArHx5HJf

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
    completedApointments.forEach((appo) => {
      const appoWithID = appo.data();
      appoWithID["id"] = appo.id;

      secondArray.push(appoWithID);
    });

    multiArray.push(firstArray);
    multiArray.push(secondArray);

    // console.log(multiArray);

    saveApposCallback(multiArray);
  } catch (error) {
    console.log(error);
  }
};
