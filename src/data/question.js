export const create = ({newsId, imageUrl, type, expectedAnswer}) => {
  return {
    newsId,
    imageUrl,
    type,
    answer: null,
    expectedAnswer,
  };
};

export const isAnswered = (q) => !!q.answer;

export const isAnsweredCorrectly = (q) => q.answer === q.expectedAnswer;

export const isOmitted = (q) => !isAnswered(q);

export function isOfManipulationCategory(question, manipulationCategory) {
  return question.type === manipulationCategory.name;
}

const Question = {
  create,
  isAnswered,
  isAnsweredCorrectly,
  isOmitted,
  isOfManipulationCategory,
};

export default Question;
