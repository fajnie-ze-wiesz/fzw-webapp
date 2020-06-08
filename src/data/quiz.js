import Question from './question';

export function create({id, questions = []}) {
  return {
    id,
    questionIndex: 0,
    questions: questions.map(Question.create),
  };
}

export function getId(quiz) {
  return quiz.id;
}

export function getCurrentQuestion(quiz) {
  return quiz.questions[quiz.questionIndex];
}

export function getQuestions(quiz) {
  return quiz.questions;
}

export function getQuestionIndex(quiz) {
  return quiz.questionIndex;
}

export function isFinished(quiz) {
  return quiz.questionIndex >= quiz.questions.length;
}

export function answerQuestion(quiz, answer) {
  if (isFinished(quiz)) {
    return;
  }
  quiz.questions[quiz.questionIndex].answer = answer;
  quiz.questionIndex++;
}

export function omitQuestion(quiz) {
  if (isFinished(quiz)) {
    return;
  }
  quiz.questionIndex++;
}

const Quiz = {
  create,
  getId,
  getCurrentQuestion,
  getQuestions,
  getQuestionIndex,
  isFinished,
  answerQuestion,
  omitQuestion,
};

export default Quiz;
