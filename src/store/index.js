import Vue from 'vue'
import Vuex from 'vuex'
import { generateQuiz } from '../services/quizes';
import { ping } from '../services/ping';

Vue.use(Vuex)

const countByPredicate = (arr, predicate) => {
  return arr.reduce((acc, v) => predicate(v) ? acc + 1 : acc, 0);
}

const isQuestionAnswered = (q) => !!q.answer

const isQuestionAnsweredCorrectly = (q) => q.answer === q.expectedAnswer

// aliases:
const answered = isQuestionAnswered;
const answeredCorrectly = isQuestionAnsweredCorrectly

export default new Vuex.Store({
  state: {
    quiz: {
      questionIndex: 0,
      questions: [],
    },
    userInfo: {
      name: 'test',
    },
  },
  actions: {
    generateQuiz (context) {
      generateQuiz().then((quiz) => {
        context.commit('loadQuiz', {quiz})
      })
    },
    pingBackend () {
      ping();
    }
  },
  mutations: {
    loadQuiz (state, { quiz }) {
      state.quiz = quiz;
    },
    answerQuizQuestion (state, { answer }) {
      let quiz = state.quiz;
      if (quiz.questionIndex >= quiz.questions.length) {
        return
      }
      quiz.questions[quiz.questionIndex].answer = answer;
      quiz.questionIndex++;
    },
    omitQuizQuestion (state) {
      let quiz = state.quiz;
      if (quiz.questionIndex >= quiz.questions.length) {
        return
      }
      quiz.questionIndex++;
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  getters: {
    currentQuizQuestion (state) {
      let quiz = state.quiz;
      return quiz.questions[quiz.questionIndex];
    },
    quizQuestions (state) {
      return state.quiz.questions;
    },
    quizQuestionIndex (state) {
      return state.quiz.questionIndex;
    },
    isQuizFinished (state) {
      let quiz = state.quiz;
      return quiz.questionIndex >= quiz.questions.length;
    },
    numOfQuizQuestions (state) {
      return state.quiz.questions.length;
    },
    numOfQuizQuestionsByPredicate (state) {
      return (predicate) => countByPredicate(state.quiz.questions, predicate)
    },
    numOfQuizAnswers (state, getters) {
      return getters.numOfQuizQuestionsByPredicate(answered);
    },
    numOfCorrectQuizAnswers (state, getters) {
      return getters.numOfQuizQuestionsByPredicate(answeredCorrectly);
    },
    numOfOmmitedQuizQuestions (state, getters) {
      return getters.numOfQuizQuestionsByPredicate((q) => !answered(q));
    },
    numOfQuizQuestionsByType (state, getters) {
      return (type) => getters.numOfQuizQuestionsByPredicate(
        (q) => q.type === type);
    },
    numOfQuizAnswersByType (state, getters) {
      return (type) => getters.numOfQuizQuestionsByPredicate(
        (q) => q.type === type && answered(q));
    },
    numOfCorrectQuizAnswersByType (state, getters) {
      return (type) => getters.numOfQuizQuestionsByPredicate(
        (q) => q.type === type && answeredCorrectly(q));
    }
  }
})
