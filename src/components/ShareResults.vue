<template>
  <div id="share-results">
    <div>
      <h1>Podziel się swoim wynikiem ze znajomymi</h1>

      <div class="share-box">
        Twoja odporność na fake news to {{ correctnessPercent }}%
        <button
          class="share-button"
          type="button"
          name="share-results"
          @click="shareResults()"
        >
          Share
        </button>
      </div>

      <p>
        Jeśli chcesz dowiedzieć się o naszych działaniach w ramach edukacji medialnej
        poznaj Akademię Fact-Checkingu.
        Organizujemy m.in. kursy dla szkół czy warsztaty dla organizacji pozarządowych.
      </p>
      <p>
        <strong>Możesz również zagrać jeszcze raz i zwiększać swoją odporność. Śmiało! :)</strong>
      </p>
    </div>
    <div class="buttons">
      <a href="https://akademia.demagog.org.pl/">
        <button
          type="button"
          name="button"
          class="opaque-blue"
        >poznaj akademię</button>
      </a>

      <a href="/">
        <button
          type="button"
          name="button"
          class="red"
        >zagraj jeszcze raz</button>
      </a>
    </div>
  </div>
</template>

<script>
import ResultStats from '../data/result_stats';

export default {
  name: 'ShareResults',
  computed: {
    resultStats() {
      return this.$store.getters.resultStats;
    },
    resultsUrl() {
      const { protocol, host } = window.location;

      const statsPayload = ResultStats.encode(this.resultStats);
      const url = `${protocol}//${host}/?results=${statsPayload}`;
      console.log(url);
      return url;
    },
    correctnessPercent() {
      return Math.floor(this.numOfCorrectAnswers / this.numOfQuestions * 100);
    },
    numOfQuestions() {
      return ResultStats.getNumOfAnswers(this.resultStats);
    },
    numOfCorrectAnswers() {
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
    },
  },
};
</script>

<style scoped>
#share-results {
    color: var(--color-blue);
    background: #EBF1F4;
}
.share-box {
    display: flex;
    padding: 1.2em;
    background: white;
    border-radius: .8em;
    font-weight: 500;
    font-size: 90%;
    line-height: 125%;
    text-transform: uppercase;
    align-items: center;
    margin: 2em 0;
}
.share-button {
    background: #1778f2;
    text-transform: none;
    padding: .5em 1em;
    letter-spacing: normal;
    margin: .5em;
    width: auto;
    font-size: 100%;
    border-radius: .4em;
}
button {
    margin: .8em 0;
}
.buttons {
    width: 100%;
    z-index: 10;
}
.buttons a {
    margin-top: 1em;
}
</style>
