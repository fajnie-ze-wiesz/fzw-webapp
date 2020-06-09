import { countByPredicate } from '../utils/collections';
import ManipulationCategory from './manipulation_category';
import Question from './question';
import QuizSetupInfo from './quiz_setup_info';
import User from './user';

export function create({ quiz, user, quizSetupInfo, manipulationCategories }) {
  const results = {
    version: 'v1',
    username: User.getName(user),
    est: QuizSetupInfo.getCorrectnessEstimate(quizSetupInfo),
    total: quiz.questions.length,
    correct: countQuestionsByPredicate(quiz, Question.isAnsweredCorrectly),
    omitted: countQuestionsByPredicate(quiz, Question.isOmitted),
    byManipCat: {},
  };
  manipulationCategories.forEach((category) => {
    const name = ManipulationCategory.getName(category);
    const isOfManipulationCategory = (q) => Question.isOfManipulationCategory(q, category);
    const total = countQuestionsByPredicate(quiz, isOfManipulationCategory);
    const correct = countQuestionsByPredicate(
      quiz,
      (q) => isOfManipulationCategory(q) && Question.isAnsweredCorrectly(q),
    );
    const omitted = countQuestionsByPredicate(
      quiz,
      (q) => isOfManipulationCategory(q) && Question.isOmitted(q),
    );
    results.byManipCat[name] = {
      total,
      correct,
      omitted,
    };
  });
  return results;
}

export function encode(resultStats) {
  const resultsStatsJSON = JSON.stringify(resultStats);
  const resultsStatsPayload = btoa(resultsStatsJSON);
  return resultsStatsPayload;
}

export function decode(resultStatsPayload) {
  const resultStatsJSON = atob(resultStatsPayload);
  const resultStats = JSON.parse(resultStatsJSON);
  return resultStats;
}

export function getUserName(resultStats) {
  return resultStats.username;
}

export function getCorrectnessEstimate(resultStats) {
  return resultStats.est;
}

export function getByManipulationCategory(resultStats, manipulationCategory) {
  return resultStats.byManipCat[manipulationCategory.name];
}

export function getNumOfAnswers(stats) {
  return stats.total;
}

export function getNumOfCorrectAnswers(stats) {
  return stats.correct;
}

export function getNumOfOmittedAnswers(stats) {
  return stats.omitted;
}

function countQuestionsByPredicate(quiz, predicate) {
  return countByPredicate(quiz.questions, predicate);
}

const ResultStats = {
  create,
  encode,
  decode,
  getUserName,
  getCorrectnessEstimate,
  getByManipulationCategory,
  getNumOfAnswers,
  getNumOfCorrectAnswers,
  getNumOfOmittedAnswers,
};

export default ResultStats;
