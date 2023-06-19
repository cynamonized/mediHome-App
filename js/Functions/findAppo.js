export const findAppo = (multiArray, ID) => {
  const resultsArray = [];

  for (let i = 0; i < multiArray.length; i++) {
    resultsArray.push(...multiArray[i].filter((appo) => appo.id == ID));
  }

  return resultsArray[0];
};
