import { db } from "../config/firestore";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";

export const searchForAppo = async (
  city,
  specialization,
  appointmentDate,
  saveApposCallback
) => {
  const appoQueryRef = query(
    collection(db, "AvailableAppos", `${city}`, `${specialization}`),
    where("date", ">=", appointmentDate),
    orderBy("date"),
    limit(11)
  );

  try {
    const foundAppos = await getDocs(appoQueryRef);
    const formattedAppos = [];

    foundAppos.forEach((appo) => {
      let appoWithID = appo.data();
      appoWithID["id"] = appo.id;

      if (appoWithID.id != "FAKE DOC") {
        formattedAppos.push(appoWithID);
      }
    });

    saveApposCallback(formattedAppos);
  } catch (error) {
    console.log(error);
  }

  return null;
};
