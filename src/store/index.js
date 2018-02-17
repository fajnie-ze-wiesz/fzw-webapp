import Vue from 'vue'
import Vuex from 'vuex'

import newsdb from '../newsdb.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quiz: {
      questionIndex: 0,
      questions: [],
    },
    userInfo: {},
  },
  mutations: {
    generateQuiz (state) {
      let questions = [];
      for (let i = 0; i < 3; ++i) {
        const index = Math.floor(Math.random() * newsdb.length);
        const news = newsdb[index];
        questions.push({
          newsId: news.id,
          imageUrl: news.imageUrl,
          answer: null,
          expectedAnswer: !news.negativeType ? 'yes' : 'no',
        })
      }
      const quiz = {
        questionIndex: 0,
        questions,
      }
      console.log(quiz);
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
    setUserCategory (state, category) {
      state.userInfo.category = category;
    }
  },
  getters: {
    currentQuizQuestion (state) {
      let quiz = state.quiz;
      return quiz.questions[quiz.questionIndex];
    },
    quizQuestionIndex (state) {
      return state.quiz.questionIndex;
    },
    isQuizFinished (state) {
      let quiz = state.quiz;
      return quiz.questionIndex >= quiz.questions.length;
    }
  }
})
