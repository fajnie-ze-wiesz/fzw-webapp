export function create({ topicCategory = null, correctnessEstimate = 1.0 }) {
  return {
    topicCategory,
    correctnessEstimate,
  };
}

export function getCorrectnessEstimate(quizSetupInfo) {
  return quizSetupInfo.correctnessEstimate;
}

export function getTopicCategory(quizSetupInfo) {
  return quizSetupInfo.topicCategory;
}

export function setValues(quizSetupInfo, { topicCategory, correctnessEstimate }) {
  if (typeof topicCategory !== 'undefined') {
    quizSetupInfo.topicCategory = topicCategory;
  }
  if (typeof correctnessEstimate !== 'undefined') {
    quizSetupInfo.correctnessEstimate = correctnessEstimate;
  }
}

const QuizSetupInfo = {
  create,
  getCorrectnessEstimate,
  getTopicCategory,
  setValues,
};

export default QuizSetupInfo;
