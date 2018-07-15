import Vue from 'vue'
import Vuex from 'vuex'
import { generateQuiz } from '../services/quizes';
import { ping } from '../services/ping';

Vue.use(Vuex)

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
      if (quiz.questions[quiz.questionIndex].expectedAnswer === 'yes') {
        quiz.questions[quiz.questionIndex].answer = 'no';
      } else {
        quiz.questions[quiz.questionIndex].answer = 'yes';
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
    numOfQuizAnswers (state) {
      let quiz = state.quiz;
      return quiz.questions.filter((q) => q.answer).length;
    },
    numOfCorrectQuizAnswers (state) {
      let quiz = state.quiz;
      return quiz.questions.filter((q) => q.answer && q.answer === q.expectedAnswer).length;
    },
    numOfOmmitedQuizQuestions (state) {
      let quiz = state.quiz;
      return quiz.questions.filter((q) => !q.answer).length;
    },
    numOfQuizAnswersByType (state) {
      return (type) => {
        let quiz = state.quiz;
        return quiz.questions.filter((q) => q.type === type && q.answer).length;
      };
    },
    numOfCorrectQuizAnswersByType (state) {
      return (type) => {
        let quiz = state.quiz;
        return quiz.questions.filter((q) => q.type === type && q.answer === q.expectedAnswer).length;
      };
    }
  }
})
