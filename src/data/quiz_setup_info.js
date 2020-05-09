export function create({ topicCategories = [], correctnessEstimate = 1.0 }) {
  return {
    topicCategories,
    correctnessEstimate,
  };
}

export function getCorrectnessEstimate(quizSetupInfo) {
  return quizSetupInfo.correctnessEstimate;
}

export function setValues(quizSetupInfo, { topicCategories, correctnessEstimate }) {
  if (typeof topicCategories !== 'undefined') {
    quizSetupInfo.topicCategories = topicCategories;
  }
  if (typeof correctnessEstimate !== 'undefined') {
    quizSetupInfo.correctnessEstimate = correctnessEstimate;
  }
}

const QuizSetupInfo = {
  create,
  getCorrectnessEstimate,
  setValues,
};

export default QuizSetupInfo;
