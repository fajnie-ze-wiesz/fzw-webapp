<template>
  <div
    id="intro"
    class="app-container content-container"
  >
    <div v-show="page === 1">
      <div class="jumbotron">
        <img
          src="static/img/hello.png"
          alt="hello"
        >
      </div>
      <h1>
        Cześć!<br>
        Fajnie, że jesteś :)
      </h1>
      <p>
        Dowiedź się czym są fake newsy i jak je rozpoznawać.
        Poznaj kilka prostych wskazówek, dzięki którym odnajdziesz się w świecie
        powszechnej dezinformacji i bez problemu poradzisz sobie z naszą grą.
      </p>
    </div>

    <div v-show="page === 2">
      <div class="jumbotron">
        <img
          src="static/img/fake_news.png"
          alt="fake news"
        >
      </div>
      <h1>
        Fake news, czyli co?
      </h1>
      <p>
        <b>
          Fake news to fałszywa informacja udostępniona w sieci lub za pośrednictwem mediów
          tradycyjnych, imitująca informację prawdziwą.
        </b>
        Została stworzona dla realizacji konkretnego
        celu finansowego, politycznego lub dla prestiżu.
      </p>
    </div>

    <div v-show="page === 3">
      <div class="jumbotron">
        <img
          src="static/img/source.png"
          alt="source"
        >
      </div>
      <h1>
        Po pierwsze - <br>
        Sprawdzaj źródła
      </h1>
      <p>
        Przeglądając wpisy i artykuły w mediach społecznościowych zawsze zwracaj uwagę na źródło.
        Fałszywe strony często podszywają się
        pod wiarygodne źródła lub mają charakter satyryczny.
        <b>Przyglądaj się nazwie oraz logotypowi strony.</b>
      </p>
    </div>

    <div v-show="page === 4">
      <div class="jumbotron">
        <img
          src="static/img/graphics.png"
          alt="graphics"
        >
      </div>
      <h1>
        Po drugie - <br>
        Przyjrzyj się grafice
      </h1>
      <p>
        Zdjęcie umieszczone w artykule lub mem również mogą być fake newsem. Zanim uznasz grafikę
        za prawdziwą i podasz dalej,
        <b>
          zastanów się, czy jest wykorzystana w odpowiednim kontekście,
          czy cytat na grafice rzeczywiście jest prawdziwy.
        </b>
      </p>
    </div>

    <div v-show="page === 5">
      <div class="jumbotron">
        <img
          src="static/img/emotions.png"
          alt="emotions"
        >
      </div>
      <h1>
        Po trzecie - <br>
        Czytaj, nie klikaj!
      </h1>
      <p>
        Celem rozpowszechniania fałszywych informacji jest wywołanie w Tobie skrajnych emocji,
        a następnie zachęcenie Cię do kliknięcia w link czy wpis. Po co? Aby na Tobie zarobić!
        <b>
          Zwracaj uwagę na wpisy skrajnie emocjonalne, liczne wykrzykniki czy duże litery.
        </b>
      </p>
    </div>

    <div v-show="page === 6">
      <div id="category-selection">
        <h1>Wybierz ulubiony temat treści które pokażą się w quizie</h1>
        <div class="input">
          <div class="radio">
            <input
              id="all"
              v-model="userInfo.category"
              type="radio"
              value="all"
            >
            <label for="all">
              <div class="icon">
                <img
                  src="static/img/world.svg"
                  alt=""
                >
              </div><div>Wiedza ogólna</div>
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
              <div class="icon">
                <img
                  src="static/img/fireworks.svg"
                  alt=""
                >
              </div><div>Rozrywka</div>
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
              <div class="icon">
                <img
                  src="static/img/doctor.svg"
                  alt=""
                >
              </div><div>Zdrowie</div>
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
              <div class="icon">
                <img
                  src="static/img/atom.svg"
                  alt=""
                >
              </div><div>Nauka</div>
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
              <div class="icon">
                <img
                  src="static/img/white-house.svg"
                  alt=""
                >
              </div><div>Polityka</div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div v-show="page === 7">
      <div class="jumbotron">
        <img
          src="static/img/lets_begin.png"
          alt="let's begin"
        >
      </div>
      <h1>Jesteśmy prawie gotowi!</h1>
      <p>
        Czeka na Ciebie quiz z {{ numOfQuizQuestions }} przykładami treści, które zostały
        opublikowane w sieci.
        <b>
          Zdecyduj, które z nich są fake newsami, a które nie poprzez klikanie
          na przyciski "Fake" i "Prawda".
        </b>
        Na każdy przykład masz {{ questionTimeoutInSeconds }} sekund.
        Po upływie czasu przykład zmieni się. To jak, zaczynamy?
      </p>
    </div>

    <button
      :disabled="incrementPageDisabled"
      :class="incrementPageButtonClass"
      @click="incrementPage"
    >
      {{ incrementPageButtonText }}
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
        6: {
          canGoNext() {
            return this.userInfo.category !== '';
          },
          next() {
            this.setUserInfo(this.userInfo);
            this.generateQuiz();
          },
        },
        7: {
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
    incrementPageButtonText() {
      if (this.page === 1) {
        return 'OK, pokażcie wskazówki';
      }
      if (this.page === 7) {
        if (this.isQuizLoaded) {
          return 'tak, zaczynamy!';
        } else {
          return 'czekaj...';
        }
      }
      return 'dalej';
    },
    incrementPageButtonClass() {
      if (this.page === 7) {
        return 'blue';
      }
      return 'opaque-blue';
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
      this.$router.push('/quiz');
    },
  },
};
</script>

<style scoped>
#intro {
  color: var(--color-blue);
  background: #EBF1F4;
}

#category-selection h1 {
  margin-bottom:2.5em;
}

div.jumbotron {
  text-align: center;
}
div.jumbotron img {
  width: 85%;
  padding: 0 auto 0 auto;
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
  height: 1.375em;
  width: auto;
}

label .icon {
  width:3em;
  display: flex;
  align-items: center;
  justify-content: center
}

label {
  text-align: center;
  display: flex;
  align-items: center;
  background: var(--color-lblue);
  border-radius:0.5em;
  padding:0.75em 0.95em;
  width: 100%;
  margin-bottom: 0.75em;
  position: relative;
  transition-duration: 0.3s;
}

label:before {
  height: 1.25em;
  width:1.25em;
  position: absolute;
  top:50%;
  transform:translateY(-50%);
  right:1.0625em;
  box-sizing: border-box;
  border-radius: 50%;
  content:'';
  border: 0.125em solid var(--color-border-blue);
  transition-duration: 0.2s;
}

label:after {
  height:0.75em;
  width:0.75em;
  position: absolute;
  top:50%;
  transform:translateY(-50%);
  right:1.3125em;
  border-radius: 50%;
  content:'';
  background: var(--color-orange);
  transition-duration: 0.2s;
  opacity: 0;
}

.radio {
  width: 100%;
}

.radio input {
  position: absolute;
  z-index: -9999;
}

.radio input:checked + label {
  background: #fff;
  box-shadow: 0px 0.25em 1.125em #DEE6EA98;
}

.radio input:checked + label:before {
  border-color: var(--color-orange);
}

.radio input:checked + label:after {
  opacity:1;
}

.numbering {
  background: var(--color-orange);
  color: white;
}
</style>
