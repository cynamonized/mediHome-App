import { db } from "../config/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth, updatePassword } from "firebase/auth";
import { auth } from "../config/firestore";

export const updateUserSettingsAndRefresh = async (
  currentUserUID,
  userDataToUpdate,
  successCallback,
  updateFailureCallback,
  ifPassword,
  newPassword
) => {
  const userRef = doc(db, "Users", `${currentUserUID}`);

  try {
    const updatingData = await updateDoc(userRef, {
      "personalData.address.streetName": `${userDataToUpdate.streetName}`,
      "personalData.address.apartmentNumber": `${userDataToUpdate.apartmentNumber}`,
      "personalData.address.postCode": `${userDataToUpdate.postCode}`,
      "personalData.address.city": `${userDataToUpdate.city}`,
      "personalData.address.country": `${userDataToUpdate.country}`,
    });

    if (ifPassword) {
      const updatingPassword = await updateThisUserPassword(
        newPassword,
        updateFailureCallback
      );
    }

    successCallback();
  } catch (error) {
    console.log(error);
    updateFailureCallback(true);
  }
};

const updateThisUserPassword = async (newPassword, passwordFailureCallack) => {
  // const auth = getAuth();
  const user = auth.currentUser;

  try {
    const updatingPassword = await updatePassword(user, newPassword);
  } catch (error) {
    console.log(error);
    passwordFailureCallack(true);
  }
};
