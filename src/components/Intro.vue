<template>
  <div id="intro">
    <div v-show="page === 1">
      <img
        class="jumbotron"
        src="static/img/hello.png"
        alt="hello"
      >
      <h1>
        Fajnie, że tu jesteś!
      </h1>
      <p>
        Dowiedź się czym są fake newsy i jak je rozpoznawać.
      </p>
      <p>
        Poznaj kilka prostych wskazówek, dzięki którym odnajdziesz się w świecie
        powszechnej dezinformacji i bez problemu poradzisz sobie z naszą grą.
      </p>
    </div>

    <div v-show="page === 2">
      <img
        class="jumbotron"
        src="static/img/source.png"
        alt="source"
      >
      <h1>
        Źródło
      </h1>
      <p>
        Przeglądając wpisy i artykuły w mediach społecznościowych zawsze zwracaj uwagę na źródło.
        Przyjrzyj się nazwie oraz logotypowi strony. Fałszywe strony często podszywają się
        pod wiarygodne źródła lub mają charakter satyryczny.
      </p>
    </div>

    <div v-show="page === 3">
      <img
        class="jumbotron"
        src="static/img/graphics.png"
        alt="graphics"
      >
      <h1>
        Grafika
      </h1>
      <p>
        Zdjęcie umieszczone w artykule lub mem również mogą być fake newsem. Zanim uznasz grafikę
        za prawdziwą i podasz dalej, zastanów się, czy jest wykorzystana w odpowiednim kontekście,
        czy cytat na grafice rzeczywiście jest prawdziwy.
      </p>
    </div>

    <div v-show="page === 4">
      <img
        class="jumbotron"
        src="static/img/emotions.png"
        alt="emotions"
      >
      <h1>
        Emocje
      </h1>
      <p>
        Celem rozpowszechniania fałszywych informacji jest wywołanie w Tobie skrajnych emocji,
        a następnie zachęcenie Cię do kliknięcia w link czy wpis. Po co? Aby na Tobie zarobić.
        Zwracaj uwagę na wpisy skrajnie emocjonalne, liczne wykrzykniki, duże litery, dzięki temu
        nie padniesz ofiarą manipulacji.
      </p>
    </div>

    <div v-show="page === 5">
      <div id="category-selection">
        <h1>Wybierz temat przykładowych treści</h1>
        <p>Wybierz obszar tematyczny w którym chcesz się sprawdzić.</p>
        <div class="input">
          <div class="radio">
            <input
              id="all"
              v-model="userInfo.category"
              type="radio"
              value="all"
            >
            <label for="all">
              <img
                src="static/img/world.svg"
                alt=""
              >Wiedza ogólna
            </label>
          </div>
          <div class="radio">
            <input
              id="entertainment"
              v-model="userInfo.category"
              type="radio"
              value="entertainment"
            >
            <label for="entertainment">
              <img
                src="static/img/fireworks.svg"
                alt=""
              >Rozrywka
            </label>
          </div>
          <div class="radio">
            <input
              id="health"
              v-model="userInfo.category"
              type="radio"
              value="health"
            >
            <label for="health">
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

    <div v-show="page === 6">
      <img
        class="jumbotron"
        src="static/img/lets_begin.png"
        alt="let's begin"
      >
      <h1>Zaczynamy?</h1>
      <p>
        Czeka na Ciebie {{ numOfQuizQuestions }} przykładów treści, które pokazały się w internecie.
        Oceń czy są fake newsem czy nie. Nie każdy przykład
        masz {{ questionTimeoutInSeconds }} sekund.
      </p>
      <p>
        To jak, zaczynamy?
      </p>
    </div>

    <button
      :disabled="incrementPageDisabled"
      class="blue"
      @click="incrementPage"
    >
      {{ incrementPageText }}
    </button>
  </div>
</template>

<script>
import {
  mapActions, mapGetters, mapMutations,
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
    ...mapGetters(['isQuizLoaded']),
    pageTransitions() {
      return {
        5: {
          canGoNext() {
            return this.userInfo.category !== '';
          },
          next() {
            this.setUserInfo(this.userInfo);
            this.generateQuiz();
          },
        },
        6: {
          canGoNext() {
            return this.isQuizLoaded;
          },
          next() {
            this.startQuiz();
          },
        },
      };
    },
    incrementPageEnabled() {
      const pageTransition = this.pageTransitions[this.page];
      if (pageTransition && pageTransition.canGoNext) {
        return pageTransition.canGoNext.call(this);
      }
      return true;
    },
    incrementPageDisabled() {
      return !this.incrementPageEnabled;
    },
    incrementPageText() {
      if (this.page === 6 && !this.isQuizLoaded) {
        return 'czekaj...';
      }
      return 'dalej';
    },
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
      'generateQuiz',
      'pingBackend',
      'fetchManipulationCategories',
    ]),
    ...mapMutations([
      'setUserInfo',
    ]),
    incrementPage() {
      const pageTransition = this.pageTransitions[this.page];
      ++this.page;
      if (pageTransition && pageTransition.next) {
        pageTransition.next.call(this);
      }
    },
    startQuiz() {
      this.$router.push('/quest');
    },
  },
};
</script>

<style scoped>
#intro {
  color: var(--color-blue);
  background: #EBF1F4;
}

img.jumbotron {
  width: 100%;
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
}

.numbering {
  background: var(--color-orange);
  color: white;
}
</style>
