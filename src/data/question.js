export const create = ({newsId, imageUrl, type, answerExplanation, expectedAnswer}) => {
  return {
    newsId,
    imageUrl,
    type,
    answer: null,
    answerExplanation,
    expectedAnswer,
  };
};

export const getAnswerExplanation = (q) => q.answerExplanation;

export const isTrueNews = (q) => q.expectedAnswer === 'yes';

export const isFalseNews = (q) => !isTrueNews(q);

export const isAnswered = (q) => !!q.answer;

export const isAnsweredCorrectly = (q) => q.answer === q.expectedAnswer;

export const isOmitted = (q) => !isAnswered(q);

export function isOfManipulationCategory(question, manipulationCategory) {
  return question.type === manipulationCategory.name;
}

export const getManipulationCategoryName = (q) => q.type;

const Question = {
  create,
  getAnswerExplanation,
  isTrueNews,
  isFalseNews,
  isAnswered,
  isAnsweredCorrectly,
  isOmitted,
  isOfManipulationCategory,
  getManipulationCategoryName,
};

export default Question;
