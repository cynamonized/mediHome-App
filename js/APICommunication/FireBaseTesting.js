import React, { useState, useEffect } from "react";

import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firestore";
import { addLel } from "./createFirestoreAppos";

export const FireBaseTesting = ({ setIsAuthenticated }) => {
  const [testData, setTestData] = useState("");

  useEffect(() => {
    addLel();
  }, []);

  const getData = async () => {
    try {
      const response = await setDoc(
        doc(db, "AvailableAppos", "Krakow", "Internist", "newTestAppo"),
        {
          name: "Los Angeles",
          state: "CA",
          country: "USA",
        },
        { merge: true }
      );
      const responseData = await response.json();
      setTestData(responseData);
    } catch (e) {
      alert("coś poszło nie tak");
    } finally {
      console.log("Wohooooooo!");
    }
  };

  const getData2 = async () => {
    const response = await setDoc(
      doc(db, "AvailableAppos", "Krakowowowow"),
      {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        additional: "lel",
      },
      { merge: true }
    );
  };

  const clickLogOut = (e) => {
    e.preventDefault();
    setIsAuthenticated(false);
  };

  return (
    <>
      <div
        className="testing"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          height: "800px",
          width: "1300px",
          border: "1px solid grey",
          borderRadius: "30px",
          marginBottom: "120px",
        }}
        onClick={clickLogOut}
      >
        <p>This is just a firebase testing</p>
      </div>
    </>
  );
};
