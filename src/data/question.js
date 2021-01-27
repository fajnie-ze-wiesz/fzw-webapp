export const create = ({
  newsId, imageUrl, sourceName = '', sourceUrl = '', analysisUrl = '',
  type, answerExplanationHTML, expectedAnswer,
}) => {
  return {
    newsId,
    imageUrl,
    sourceName,
    sourceUrl,
    analysisUrl,
    type,
    answer: null,
    answerExplanationHTML,
    expectedAnswer,
  };
};

export const getAnswerExplanationHTML = (q) => q.answerExplanationHTML;

export const getImageUrl = (q) => q.imageUrl;

export const getSourceName = (q) => q.sourceName;

export const getSourceUrl = (q) => q.sourceUrl;

export const getAnalysisUrl = (q) => q.analysisUrl;

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
  getImageUrl,
  getSourceName,
  getSourceUrl,
  getAnalysisUrl,
  isTrueNews,
  isFalseNews,
  isAnswered,
  isAnsweredCorrectly,
  isOmitted,
  isOfManipulationCategory,
  getManipulationCategoryName,
};

export default Question;
