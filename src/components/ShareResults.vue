<template>
<div id="share-results">
  <div>
      <h2>Podziel się swoim wynikiem ze znajomymi</h2>

      <div class="">
          Twoja odporność na fake-news to 68%
          <button class="main-cta" type="button" name="share-results" v-on:click="shareResults()">Share</button>
      </div>

      <p>Jeśli chcesz dowiedzieć się o naszych działaniach w ramach edukacji medialnej poznaj Akademię Fact-Checkingu. Organizujemy m.in. kursy dla szkół czy warsztaty dla organizacji pozarządowych.</p>
      <p>
          <strong>Możesz również zagrać jeszcze raz i zwiększć swoją odporność. Śmiało! :)</strong>
      </p>
  </div>
  <div class="">
      <a href="#">
          <button type="button" name="button" class="opaque-blue">poznaj akademię</button>
      </a>

      <a href="#">
          <button type="button" name="button" class="red">zagraj jeszcze raz</button>
      </a>
  </div>
</div>
</template>

<script>
import ResultStats from '../data/result_stats';

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

<style scoped>
#share-results {
    color: var(--color-blue);
    background: #EBF1F4;
}
</style>
