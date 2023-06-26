import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firestore";

export const authUserCheck = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
      console.log("User is not logged it, displaying login screen");
    }
  });
};
