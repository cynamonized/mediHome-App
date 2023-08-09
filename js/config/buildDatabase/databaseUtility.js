export const twoDigitNumber = (number) => {
  const increasedNumber = number + 8;

  if (increasedNumber < 10) {
    return `0${increasedNumber}`;
  } else {
    return increasedNumber;
  }
};

export const isWeekend = (date) => {
  return date.getDay() === 6 || date.getDay() === 0;
};

export const getNextMonday = (date) => {
  const dateCopy = new Date(date.getTime());

  const nextMonday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7)
    )
  );

  return nextMonday;
};
