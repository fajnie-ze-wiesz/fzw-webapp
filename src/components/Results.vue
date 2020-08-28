<template>
  <div id="results">
    <div class="">
      <img
        class="jumbotron"
        src="static/img/result.png"
        alt="source"
      >
      <h1>Dobrze ci poszło</h1>
      <p>
        {{ numOfCorrectAnswers }} z {{ numOfQuestions }} dobrych odpowiedzi
      </p>
      <p>
        Jeszcze trochę i mistrzowsko będziesz rozbrajał fake newsy!
      </p>
    </div>
    <router-link
      tag="button"
      type="button"
      name="button"
      class="red"
      to="/answers-review"
    >
      Sprawdź odpowiedzi
    </router-link>
  </div>
</template>

<script>

import ResultStats from '../data/result_stats';
import ManipulationCategory from '../data/manipulation_category';

export default {
  name: 'Results',
  beforeRouteLeave(to, from, next) {
    document.body.style.background = getComputedStyle(document.body)
      .getPropertyValue('--color-gray');
    next();
  },
  data() {
    return {
      emo: false,
      bait: false,
      lie: false,
      manipulation: false,
    };
  },
  computed: {
    resultStats() {
      const routeResultStatsPayload = this.$route.params.results;
      if (routeResultStatsPayload) {
        // load results from url
        return ResultStats.decode(routeResultStatsPayload);
      } else {
        return this.$store.getters.resultStats;
      }
    },
    resultStatsEmoLang() {
      return this.getManipulationCategoryResultStats('emotional-language');
    },
    resultStatsClickbait() {
      return this.getManipulationCategoryResultStats('clickbait');
    },
    resultStatsFakeNews() {
      return this.getManipulationCategoryResultStats('fake-news');
    },
    resultStatsImgManip() {
      return this.getManipulationCategoryResultStats('image-manipulation');
    },
    correctnessBetterThanEstimated() {
      return this.correctness > this.correctnessEstimate;
    },
    correctnessWorseThanEstimated() {
      return this.correctness < this.correctnessEstimate;
    },
    correctnessPercent() {
      return Math.floor(this.numOfCorrectAnswers / this.numOfQuestions * 100);
    },
    correctnessEstimatePercent() {
      return Math.floor(this.correctnessEstimate * 100);
    },
    correctness() {
      return this.numOfCorrectAnswers / this.numOfQuestions;
    },
    correctnessEstimate() {
      return ResultStats.getCorrectnessEstimate(this.resultStats);
    },
    numOfQuestions() {
      return ResultStats.getNumOfAnswers(this.resultStats);
    },
    numOfCorrectAnswers() {
      return ResultStats.getNumOfCorrectAnswers(this.resultStats);
    },

    numOfEmotionalLanguageQuestions() {
      return ResultStats.getNumOfAnswers(this.resultStatsEmoLang);
    },
    numOfCorrectEmotionalLanguageAnswers() {
      return ResultStats.getNumOfCorrectAnswers(this.resultStatsEmoLang);
    },

    numOfClickbaitQuestions() {
      return ResultStats.getNumOfAnswers(this.resultStatsClickbait);
    },
    numOfCorrectClickbaitAnswers() {
      return ResultStats.getNumOfCorrectAnswers(this.resultStatsClickbait);
    },

    numOfFakeNewsQuestions() {
      return ResultStats.getNumOfAnswers(this.resultStatsFakeNews);
    },
    numOfCorrectFakeNewsAnswers() {
      return ResultStats.getNumOfCorrectAnswers(this.resultStatsFakeNews);
    },

    numOfImageManipulationQuestions() {
      return this.resultStatsImgManip.total;
    },
    numOfCorrectImageManipulationAnswers() {
      return this.resultStatsImgManip.correct;
    },

    username() {
      return this.resultStats.username;
    },
  },
  methods: {
    getManipulationCategoryResultStats(categoryName) {
      return ResultStats.getByManipulationCategory(
        this.resultStats,
        ManipulationCategory.fromName(categoryName),
      );
    },
  },
};
</script>

<style scoped>
  #results {
    overflow: auto;
    background: var(--color-blue);
    color: white;
  }
  img.jumbotron {
    width: 100%;
  }
  ul {
      padding-left: 1em;
      margin: 0;
  }
  li {
      margin: 0;
  }
</style>
