import { db } from "../config/firestore";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// it takes in userUID and callback that is supposed to save profile info data
// profile info data consists of user name and profile picture link
// (used in Header)
export const getProfileInfo = async (currentUserUID, successCallback) => {
  const userDocRef = doc(db, "Users", `${currentUserUID}`);

  try {
    const profileInfo = await getDoc(userDocRef);

    const profileInfoAll = profileInfo.data();

    const profileInfoSelected = {
      name: profileInfoAll.name,
      picture: profileInfoAll.profilePicture,
    };

    successCallback(profileInfoSelected);
  } catch (error) {
    console.log(error);
  }
};
