export const create = ({newsId, imageUrl, type, answerExplanationHTML, expectedAnswer}) => {
  return {
    newsId,
    imageUrl,
    type,
    answer: null,
    answerExplanationHTML,
    expectedAnswer,
  };
};

export const getAnswerExplanationHTML = (q) => q.answerExplanationHTML;

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
  getAnswerExplanationHTML,
  isTrueNews,
  isFalseNews,
  isAnswered,
  isAnsweredCorrectly,
  isOmitted,
  isOfManipulationCategory,
  getManipulationCategoryName,
};

export default Question;
