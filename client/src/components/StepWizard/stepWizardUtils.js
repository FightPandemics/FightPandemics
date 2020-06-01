export const getAnswersMap = (answers) =>
  answers.reduce(
    (answersMap, answer) => ({
      ...answersMap,
      [answer]: false,
    }),
    {},
  );

export const getCheckedAnswers = (answersMap) =>
  Object.entries(answersMap)
    .filter(([, checked]) => checked)
    .map(([answer]) => answer);


export const checkSingleAnswer = (answersMap, checkedAnswer) =>
    Object.entries(answersMap)
        .map(([answer,]) => {
            if (answer === checkedAnswer) {
                return [answer, true]
            }
            else {
                return [answer, false]
            }
        })
