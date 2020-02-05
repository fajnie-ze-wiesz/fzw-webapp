import Vue from 'vue'
import Vuex from 'vuex'
import { generateQuiz } from '../services/quizes';
import { ping } from '../services/ping';

import { default as Quiz } from '../data/quiz';
import { default as QuizSetupInfo } from '../data/quiz_setup_info';
import { default as User } from '../data/user';
import { default as ResultStats } from '../data/result_stats';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    quiz: Quiz.create({id: 'empty-quiz-id'}),
    user: User.create({name: 'test'}),
    quizSetupInfo: QuizSetupInfo.create({}),
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
      Quiz.answerQuestion(state.quiz, answer);
    },
    omitQuizQuestion (state) {
      Quiz.omitQuestion(state.quiz);
    },
    setUserInfo (state, userInfo) {
      User.setName(state.user, userInfo.name);
    },
  },
  getters: {
    currentQuizQuestion (state) {
      return Quiz.getCurrentQuestion(state.quiz);
    },
    quizQuestions (state) {
      return Quiz.getQuestions(state.quiz);
    },
    quizQuestionIndex (state) {
      return Quiz.getQuestionIndex(state.quiz);
    },
    isQuizFinished (state) {
      return Quiz.isFinished(state.quiz);
    },
    resultStats (state) {
      const { quiz, user, quizSetupInfo } = state;
      return ResultStats.create({
        quiz,
        user,
        quizSetupInfo,
      });
    },
  }
})
