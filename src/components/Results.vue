<template>
<div id="results">
    <div class="">
        <h1>Twoja odporność na fake news to {{percentTemp}}%</h1>
        <p>Odpowiedziałeś poprawnie na {{numOfCorrectClickbaitAnswers}} z {{numOfClickbaitQuestions}} newsów. Nie jest tak źle, ale zawsze może być lepiej zwłaszcza, że na początku oceniłeś się na XXX%. ;)</p>
        <p>W ocenie braliśmy pod uwagę:
            <ul>
                <li>rozpoznawanie fałszywej treści</li>
                <li>znajdowanie fałszywego kontekstu</li>
                <li>zauważanie manipulacji obrazami</li>
                <li>wyłapanie clickbaitu</li>
            </ul>
        </p>
    </div>
  <router-link tag="button" type="button" name="button" class="red" to="/share-results">
    Podziel się wynikiem
  </router-link>
</div>
</template>

<script>
  import PieChart from '@/components/PieChart';
  import Modal from '@/components/Modal';

  import ResultStats from '../data/result_stats';
  import ManipulationCategory from '../data/manipulation_category';

  export default {
    name: 'results',
    components: {
      PieChart,
      Modal,
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
      percentTemp() {
        return Math.floor(this.numOfCorrectAnswers / this.numOfQuestions * 100);
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

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  #results {
    overflow: auto;
    background: var(--color-blue);
    color: white;
  }
</style>
