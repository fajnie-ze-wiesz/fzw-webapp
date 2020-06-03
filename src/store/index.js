import Vue from 'vue';
import Vuex from 'vuex';
import { generateQuiz, loadQuizImages } from '../services/quizes';
import { ping } from '../services/ping';
import ManipulationCategoryService from '../services/manipulation_category';

import ManipulationCategory from '../data/manipulation_category';
import Quiz from '../data/quiz';
import QuizSetupInfo from '../data/quiz_setup_info';
import User from '../data/user';
import ResultStats from '../data/result_stats';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    quiz: Quiz.create({id: null}),
    user: User.create({name: 'test'}),
    quizSetupInfo: QuizSetupInfo.create({}),
    manipulationCategories: [],
  },
  actions: {
    fetchManipulationCategories(context) {
      ManipulationCategoryService.fetchList().then((manipulationCategories) => {
        context.commit('loadManipulationCategories', {manipulationCategories});
      });
    },
    async generateQuiz(context) {
      const quiz = await generateQuiz();
      const images = await loadQuizImages(quiz);
      context.commit('loadQuiz', {
        quiz, images,
      });
    },
    pingBackend() {
      ping();
    },
  },
  mutations: {
    loadQuiz(state, { quiz }) {
      state.quiz = quiz;
    },
    loadManipulationCategories(state, { manipulationCategories }) {
      state.manipulationCategories = manipulationCategories;
    },
    answerQuizQuestion(state, { answer }) {
      Quiz.answerQuestion(state.quiz, answer);
    },
    omitQuizQuestion(state) {
      Quiz.omitQuestion(state.quiz);
    },
    setUserInfo(state, userInfo) {
      User.setName(state.user, userInfo.name);
    },
  },
  getters: {
    isQuizLoaded(state) {
      return !!Quiz.getId(state.quiz);
    },
    manipulationCategories(state) {
      return state.manipulationCategories;
    },
    manipulationCategoriesMap(state) {
      return ManipulationCategory.mapFromList(state.manipulationCategories);
    },
    currentQuizQuestion(state) {
      return Quiz.getCurrentQuestion(state.quiz);
    },
    quizQuestions(state) {
      return Quiz.getQuestions(state.quiz);
    },
    quizQuestionIndex(state) {
      return Quiz.getQuestionIndex(state.quiz);
    },
    numOfQuizQuestions(state) {
      return Quiz.getQuestions(state.quiz).length;
    },
    isQuizFinished(state) {
      return Quiz.isFinished(state.quiz);
    },
    resultStats(state) {
      const { quiz, user, quizSetupInfo, manipulationCategories } = state;
      return ResultStats.create({
        quiz,
        user,
        quizSetupInfo,
        manipulationCategories,
      });
    },
  },
});
