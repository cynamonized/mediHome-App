export const createTestAppos = async () => {
  await addDoc(
    collection(
      db,
      "Users",
      `3eyqbBF2h8M27OVISJfsae0xDM42`,
      "Appointments",
      `Booked`,
      `Booked`
    ),
    {
      date: Timestamp.fromDate(new Date(`December 12, 2023 9:15:00`)),
      specialization: `Orthopaedist`,
      place: `Poznanska 12`,
      doctor: `Testowy`,
      booked: true,
      completed: false,
      patientID: `3eyqbBF2h8M27OVISJfsae0xDM42`,
      city: `Warsaw`,
    }
  );
};
