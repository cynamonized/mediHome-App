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

    ////////////////////////////////////////////////////////
    // bookedAppointments.forEach((appo) => {
    //   const appoWithID = appo.data();
    //   appoWithID["id"] = appo.id;
    //   firstArray.push(appoWithID);
    // });

    // console.log(firstArray);

    // // Need to sort data here by date
    // if (firstArray.length > 0) {
    //   firstArray.sort((a, b) => {
    //     return a.date.seconds - b.date.seconds;
    //   });
    // }
    //////////////////////////////////////////////////////////

    // completedApointments.forEach((appo) => {
    //   const appoWithID = appo.data();
    //   appoWithID["id"] = appo.id;
    //   secondArray.push(appoWithID);
    // });

    // // Need to sort data here by date
    // if (secondArray.length > 0) {
    //   secondArray.sort((a, b) => {
    //     return a.date.seconds - b.date.seconds;
    //   });
    // }

    //////////////////////////////////////////////////////////

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
