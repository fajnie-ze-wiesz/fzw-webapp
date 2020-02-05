<template>
<div id="results">
  <div>
    <button class="main-cta" type="button" name="share-results" v-on:click="shareResults()">Podziel się wynikiem</button>
    <p>Chcesz wiedzieć więcej?</p>
    <p>Odwiedź Akademię Fact-Checkingu!</p>

    <button class="main-cta" type="button" name="visit">Odwiedź</button>
  </div>
</div>
</template>

<script>
import { default as ResultStats } from '../data/result_stats';

export default {
  name: 'share-results',
  computed: {
    resultStats() {
      return this.$store.getters.resultStats;
    },
    resultsUrl() {
      const { protocol, host } = window.location;

      const statsPayload = ResultStats.encode(this.resultStats)
      const url = `${protocol}//${host}/?results=${statsPayload}`;
      console.log(url);
      return url;
    },
    numOfQuestions () {
      return ResultStats.getNumOfAnswers(this.resultStats);
    },
    numOfCorrectAnswers () {
      return ResultStats.getNumOfCorrectAnswers(this.resultStats);
    },
  },
  methods: {
    shareResults() {
      const url = this.resultsUrl;
      let result;
      if (this.numOfQuestions > 0) {
        result = this.numOfCorrectAnswers / this.numOfQuestions;
      } else {
        result = 0;
      }
      const resultAsPercent = Math.round(result * 100);
      const title = `Mój wynik to ${resultAsPercent}%`;
      const fbShareUrl = `http://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
      console.log(fbShareUrl);
      window.open(fbShareUrl, 'sharer', 'toolbar=0,status=0,width=626,height=436');
    }
  }
};
</script>
