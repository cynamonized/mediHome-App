import { db } from "../config/firestore";
import { collection, getDocs } from "firebase/firestore";
// 3eyqbBF2h8M27OVISJfsae0xDM42
// /Users/3eyqbBF2h8M27OVISJfsae0xDM42/Appointments/Booked/Booked/GeQwdfLBSt9AArHx5HJf

export const getUserAppointmentsF = async (userUID) => {
  try {
    const bookedAppointments = await getDocs(
      collection(db, "Users", `${userUID}`, "Appointments", "Booked", "Booked")
    );
    bookedAppointments.forEach((appo) => {
      // console.log(appo.id);
    });
  } catch (error) {
    console.log(error);
  } finally {
    // console.log("przeszedłem :( późno już ");
  }
};
