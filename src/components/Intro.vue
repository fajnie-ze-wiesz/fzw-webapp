<template>
  <div id="intro">
    <div v-show="page === 1">
      <h1><span class="numbering">{{ page }}</span>Witaj!</h1>
      <p>
        Fajnie, że tu jesteś! Nauczymy Cię jak radzić sobie z fake newsami w naszej grze prawda
        czy fałsz. :)
        Ale najpierw… powiedz nam jak masz na imię?
      </p>
      <input
        ref="name"
        v-model="userInfo.name"
        type="text"
        placeholder="Imię"
      >
    </div>

    <div v-show="page === 2">
      <h1><span class="numbering">{{ page }}</span>Oceń odporność</h1>
      <p>
        Na ile procent oceniasz swoją odporność na manipulacje w internecie? W polu niżej
        wpisz wartość od 1 do maksymalnie 100. Unikaj liter i innych znaków.
      </p>
      <input
        ref="prediction"
        v-model="userInfo.prediction"
        type="number"
        min="1"
        max="100"
        step="1"
      >
    </div>

    <div v-show="page === 3">
      <div id="category-selection">
        <h1><span class="numbering">{{ page }}</span>Wybierz temat</h1>
        <p>Wybierz obszar tematyczny w którym chcesz się sprawdzić.</p>
        <div class="input">
          <div class="radio">
            <input
              id="rozrywka"
              v-model="userInfo.category"
              type="radio"
              value="entertainment"
            >
            <label for="rozrywka">
              <img
                src="static/img/fireworks.svg"
                alt=""
              >Rozrywka
            </label>
          </div>
          <div class="radio">
            <input
              id="sport"
              v-model="userInfo.category"
              type="radio"
              value="sport"
            >
            <label for="sport">
              <img
                src="static/img/doctor.svg"
                alt=""
              >Zdrowie
            </label>
          </div>
          <div class="radio">
            <input
              id="nauka"
              v-model="userInfo.category"
              type="radio"
              value="science"
            >
            <label for="nauka">
              <img
                src="static/img/atom.svg"
                alt=""
              >Nauka
            </label>
          </div>
          <div class="radio">
            <input
              id="polityka"
              v-model="userInfo.category"
              type="radio"
              value="politics"
            >
            <label for="polityka">
              <img
                src="static/img/white-house.svg"
                alt=""
              >Polityka
            </label>
          </div>
        </div>
      </div>
    </div>

    <div v-show="page === 4">
      <h1><span class="numbering">{{ page }}</span>Gotów?</h1>
      <p>
        Za chwilę zobaczysz {{ numOfQuizQuestions }} przykładów treści, które pojawiły się w sieci.
        Oceń czy są prawdziwe czy fałszywe.
      </p>
      <p>
        Na każdy przykład masz {{ questionTimeoutInSeconds }} sekund aby dokonać wyboru. Cała zabawa
        potrwa do 3 minut. To jak, gotów?
      </p>
    </div>

    <button
      class="blue"
      @click="finishIntro"
    >
      dalej
    </button>
  </div>
</template>

<script>
import {
  mapActions,
} from 'vuex';
import {
  parseQuery,
} from '../utils/location';
import {
  QUESTION_TIMEOUT,
  NUM_OF_QUIZ_QUESTIONS,
} from '../consts';
export default {
  name: 'Intro',
  data() {
    return {
      page: 1,
      userInfo: {
        name: '',
        prediction: 50,
        category: '',
      },
      validationError: false,
    };
  },
  computed: {
    questionTimeoutInSeconds() {
      return QUESTION_TIMEOUT / 1000;
    },
    numOfQuizQuestions() {
      return process.env.NUM_OF_QUIZ_QUESTIONS || NUM_OF_QUIZ_QUESTIONS;
    },
  },
  mounted() {
    this.pingBackend();
    this.fetchManipulationCategories().then(() => {
      const queryParams = parseQuery(window.location.search);
      if (queryParams.results) {
        this.$router.replace({
          name: 'Results',
          params: queryParams,
        });
      }
    });
  },
  methods: {
    ...mapActions([
      'pingBackend',
      'fetchManipulationCategories',
      'setUserInput',
    ]),
    incrementPage() {
      ++this.page;
      if (this.page === 1) {
        this.$nextTick(() => this.$refs.name.focus());
      } else if (this.page === 5 && this.category !== '') {
        this.$router.push('/quest');
      }
    },
    finishIntro() {
      this.setUserInput(this.userInfo)
        .then(() => this.incrementPage());
    },
  },
};
</script>

<style scoped>
#intro {
  color: var(--color-blue);
  background: #EBF1F4;
}

select {
  font-family: 'Montserrat';
  background: white;
  border: none;
  font-weight: 900;
  font-size: 175%;
  color: var(--color-blue);
}

label img {
  height: 1.5em;
  width: auto;
  margin: 0 1em;
}

label {
  text-align: center;
  display: flex;
  align-items: center;
}

.radio {
  width: 100%;
  margin: 1em 0;
}

.numbering {
  display: inline-flex;
  background: var(--color-orange);
  justify-content: center;
  align-items: center;
  font-size: 100%;
  transform: scale(50%);
  transform-origin: left;
  width: 2em;
  height: 2em;
  text-align: center;
  border-radius: 100%;
  color: white;
}
</style>
