<template>
  <div
    id="results"
    class="app-container content-container"
  >
    <div class="">
      <div class="jumbotron">
        <img
          src="static/img/results.png"
          alt="source"
        >
      </div>
      <h1>{{ title }}</h1>
      <p>
        {{ numOfCorrectAnswers }} z {{ numOfQuestions }} prawidłowych odpowiedzi
      </p>
      <p>
        {{ description }}
      </p>
    </div>
    <router-link
      tag="button"
      type="button"
      name="button"
      class="opaque-white"
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

    title() {
      return this.titleAndDescription[0];
    },
    description() {
      return this.titleAndDescription[1];
    },

    titleAndDescription() {
      const ratio = this.numOfCorrectAnswers / this.numOfQuestions;

      if (ratio >= 16 / 16) {
        return [
          'Rewelacyjnie Ci poszło!',
          'Mistrzowsko odróżniasz prawdziwe informacje od fałszywych.',
        ];
      } else if (ratio >= 12 / 16) {
        return [
          'Dobrze Ci poszło!',
          'Jeszcze trochę i mistrzowsko będziesz rozpoznawał fake newsy!',
        ];
      } else if (ratio >= 9 / 16) {
        return [
          'Nieźle Ci poszło',
          'Nie zawsze potrafisz odróżnić fake newsy od prawdy. Potrenuj i zagraj jeszcze raz!',
        ];
      } else if (ratio >= 5 / 16) {
        return [
          'Mogło być lepiej',
          ('Wiesz czym są fake newsy, jednak musisz popracować nad ich rozpoznawaniem.' +
          ' Sprawdź swoje odpowiedzi i spróbuj jeszcze raz zagrać.'),
        ];
      }
      return [
        'Czas na lekcję krytycznego myślenia',
        ('Niestety nie poszło Ci dobrze, sprawdź swoje odpowiedzi i zwróć uwagę na wyjaśnienia.' +
        ' Zagraj jeszcze raz i popraw swój wynik.'),
      ];
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
div.jumbotron {
  text-align: center;
}
div.jumbotron img {
  width: 85%;
  padding: 0 auto 0 auto;
}
ul {
    padding-left: 1em;
    margin: 0;
}
li {
    margin: 0;
}
</style>
