import Vue from 'vue'
import Vuex from 'vuex'

import newsdb from '../newsdb.json'
import { NUM_OF_QUIZ_QUESTIONS } from '../consts';

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
  mutations: {
    generateQuiz (state) {
      let questions = [];
      let unusedNewsMap = {};
      newsdb.forEach((news) => {
        unusedNewsMap[`${news.id}`] = news;
      });
      for (let i = 0; i < NUM_OF_QUIZ_QUESTIONS; ++i) {
        let unusedNewsKeys = Object.keys(unusedNewsMap);
        const index = Math.floor(Math.random() * unusedNewsKeys.length);
        const key = unusedNewsKeys[index];
        const news = unusedNewsMap[key];
        delete unusedNewsMap[key];
        let expectedAnswer;
        if (news.expectedAnswer) {
          expectedAnswer = news.expectedAnswer;
        } else if (news.negativeType) {
          expectedAnswer = 'no';
        } else {
          expectedAnswer = 'yes';
        }
        questions.push({
          newsId: news.id,
          imageUrl: news.imageUrl,
          answer: null,
          expectedAnswer: expectedAnswer,
        })
      }
      const quiz = {
        questionIndex: 0,
        questions,
      }
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
    }
  }
})
