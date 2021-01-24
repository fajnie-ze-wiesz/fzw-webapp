<template>
  <div
    id="share-results"
    class="app-container content-container"
  >
    <div>
      <h1>Dzięki za wspólny czas</h1>

      <p>
        <!-- eslint-disable-next-line -->
        <strong>Będziemy wdzięczni jeżeli udostępnisz informacje o naszej grze na Facebooku oraz ocenisz ją gwiazdkami tak jak uważasz za słuszne. :)</strong>
      </p>

      <button
        class="share-button"
        type="button"
        name="share-results"
        @click="shareResults()"
      >
        <img
          src="static/img/fb.svg"
          alt=""
        >
        <span>Udostępnij</span>
      </button>

      <div
        class="rating"
        :class="{ rated: rated }"
      >
        <div class="rating-group">
          <template
            v-for="index in 5"
          >
            <label
              :key="'label-'+index"
              :for="'rating-'+index"
              class="rating__label"
            >
              <div class="rating__icon rating__icon--star">
                <!-- eslint-disable-next-line -->
                <svg xmlns="http://www.w3.org/2000/svg" width="48.863" height="46.513" viewBox="0 0 48.863 46.513"><path data-name="Path 224" d="M48.824 17.687a.788.788 0 00-.637-.537l-15.926-2.314L25.141.404a.82.82 0 00-1.413 0l-7.127 14.432L.675 17.151a.788.788 0 00-.438 1.344L11.764 29.73l-2.72 15.863a.788.788 0 001.143.831l14.244-7.49 14.245 7.487a.788.788 0 001.143-.831l-2.718-15.86 11.525-11.235a.788.788 0 00.198-.808z" fill="#dee6ea"/></svg>              </div>
            </label>
            <input
              :id="'rating-'+index"
              :key="'input-'+index"
              name="rating"
              :value="index"
              :checked="index == 5"
              type="radio"
              class="rating__input"
            >
          </template>
        </div>
      </div>

      <button
        v-if="!rated"
        type="button"
        name="button"
        class="opaque-blue"
        @click="sendRate()"
      >
        Prześlij ocenę
      </button>
      <p
        v-if="rated"
      >
        Dziękujemy za ocenę!
      </p>
    </div>
    <div class="buttons">
      <h3>
        Chcesz więcej?
      </h3>
      <p>
        Dowiedz się więcej o tym, jak powstają fake news lub zagraj jeszcze raz!
      </p>
      <div class="buttons-row">
        <a href="/">
          <button
            type="button"
            name="button"
            class="opaque-blue"
          >zagraj</button>
        </a>

        <a
          href="https://demagog.org.pl"
          target="_blank"
        >
          <button
            type="button"
            name="button"
            class="opaque-blue"
          >Chcę więcej</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ResultStats from '../data/result_stats';

export default {
  name: 'ShareResults',
  data: function () {
    return {
      rated: false,
    };
  },
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
    sendRate() {
      let rate = document.querySelector('input[name="rating"]:checked').value;
      // eslint-disable-next-line no-undef
      gtag('event', 'rate_app', {
        'event_category': 'feedback',
        'event_label': 'fzw-webapp',
        'value': rate,
      });
      this.rated = true;
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
    padding: 0.875em;
    letter-spacing: normal;
    margin: .5em 0 1.5em;
    width: 100%;
    font-size: 0.875em;
    text-transform: uppercase;
    border-radius: .4em;
    display: flex;
    align-items: center;
    justify-content: center;
}
.share-button img {
  height: 1em;
  width:1em;
  margin-right:0.625em;
}
button {
    margin: 1.6em 0 0 0;
}
.buttons {
    width: 100%;
    z-index: 10;
}
.buttons-row {
    display: flex;
    justify-content: space-between
}
.buttons a {
    width:calc(50% - 0.5em);
    font-size:0.875em;
}
p strong {
  font-weight: 500;
}
.rating.rated {
  pointer-events: none;
  opacity: 0.5;
}
.rating-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.rating .rating__icon {
  pointer-events: none;
}
.rating .rating__input {
  position: absolute !important;
  left: -9999px !important;
}
.rating .rating__input--none {
  display: none;
}
.rating .rating__label {
  cursor: pointer;
  width: 100%;
  text-align: center;
}
.rating .rating__icon--star svg {
  height: 3em!important;
  width: auto!important;
}
.rating .rating__icon--star svg path {
  fill: var(--color-orange);
}
.rating .rating__input:checked ~ .rating__label .rating__icon--star path {
  fill:#DEE6EA;
}
.rating .rating-group:hover .rating__label .rating__icon--star {
  fill: var(--color-orange);
}
.rating .rating__input:hover ~ .rating__label .rating__icon--star path {
  fill:#DEE6EA;
}
</style>
