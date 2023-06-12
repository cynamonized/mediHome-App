// returns today's date in YYYY-MM-DD format
export const getTodaysDate = () => {
  const today = new Date();
  const todayFormatted =
    today.getFullYear() +
    "-" +
    ((today.getMonth() + 1).length != 2
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1) +
    "-" +
    (today.getDate().length == 2 ? "0" + today.getDate() : today.getDate());
  return todayFormatted;
};
