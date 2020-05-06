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
