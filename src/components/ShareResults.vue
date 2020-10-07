<template>
  <div
    id="share-results"
    class="app-container content-container"
  >
    <div>
      <h1>Dzięki za wspólny czas</h1>

      <p>
        Będziemy wdzięczni jeżeli udostępnisz info o naszej grze na swoim Facebooku.
      </p>

      <div class="share-box">
        Udostępnij na Facebooku
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
        Jeśli chcesz dowiedzieć się więcej o naszych działaniach w ramach walki
        z dezinformacją, zapraszamy na stronę Akademii Fact-Checkingu.
      </p>
      <p>
        <strong>Możesz również zagrać jeszcze raz i zwiększać swoją odporność. Śmiało! :)</strong>
      </p>
    </div>
    <div class="buttons">
      <a href="/">
        <button
          type="button"
          name="button"
          class="blue"
        >zagraj jeszcze raz</button>
      </a>

      <a
        href="https://akademia.demagog.org.pl/"
        target="_blank"
      >
        <button
          type="button"
          name="button"
          class="opaque-blue"
        >poznaj akademię</button>
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
      return url;
    },
    appUrl() {
      const { protocol, host } = window.location;

      const url = `${protocol}//${host}/`;
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
      const url = this.appUrl;
      const fbShareUrl = `http://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`;
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
    margin: 1.5em 0;
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
    margin: 1.6em 0 0 0;
}
.buttons {
    width: 100%;
    z-index: 10;
}
.buttons a {
    margin-top: 1em;
}
</style>
