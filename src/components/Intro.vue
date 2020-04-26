<template>
<div id="intro">
  <div v-show="page === 1">
    <h2><span class="numbering">{{page}}</span>Witaj!</h2>
    <p>Fajnie, że tu jesteś! Nauczymy Cię jak radzić sobie z fake newsami w naszej grze prawda czy fałsz. :) Ale najpierw… powiedz nam jak masz na imię?</p>
    <input ref="name" v-model="userInfo.name" type="text" placeholder="Imię">
  </div>

  <div v-show="page === 2">
    <h2><span class="numbering">{{page}}</span>Oceń odporność</h2>
    <p>Na ile procent oceniasz swoją odporność na manipulacje w internecie? W polu niżej wpisz wartość od 1 do maksymalnie 100. Unikaj liter i innych znaków.</p>
    <input ref="prediction" v-model="userInfo.prediction" type="number" min="1" max="100" step="1">
  </div>

  <div v-show="page === 3">
    <div id="category-selection">
      <h2><span class="numbering">{{page}}</span>Wybierz temat</h2>
      <p>Wybierz obszar tematyczny w którym chcesz się sprawdzić.</p>
      <div class="input">
        <div class="radio">
          <input v-model="userInfo.category" id="rozrywka" type="radio" value="entertainment"></input>
          <label for="rozrywka">
            <img src="static/img/004-confetti.svg" alt="">Rozrywka
          </label>
        </div>
        <div class="radio">
          <input v-model="userInfo.category" id="sport" type="radio" value="sport">
          <label for="sport">
            <img src="static/img/001-basketball.svg" alt="">Sport
          </label>
        </div>
        <div class="radio">
          <input v-model="userInfo.category" id="nauka" type="radio" value="science"></input>
          <label for="nauka">
            <img src="static/img/003-startup.svg" alt="">Nauka
          </label>
        </div>
        <div class="radio">
          <input v-model="userInfo.category" id="polityka" type="radio" value="politics"></input>
          <label for="polityka">
            <img src="static/img/002-white-house.svg" alt="">Polityka
          </label>
        </div>
      </div>
    </div>
  </div>
  
  <div v-show="page === 4">
      <h2><span class="numbering">{{page}}</span>Gotów?</h2>
      <p>Za chwilę zobaczysz 16 przykładów treści, które pojawiły się w sieci. Oceń czy są prawdziwe czy fałszywe.</p>
      <p>Na każdy przykład masz 10 sekund aby dokonać wyboru. Cała zabawa potrwa do 3 minut. To jak, gotów?</p>
  </div>

  <button class="blue" @click="incrementPage">
    dalej
  </button>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex';
import {
  parseQuery
} from '../utils/location';
export default {
  name: 'intro',
  mounted() {
    this.pingBackend();
    const queryParams = parseQuery(window.location.search);
    if (queryParams.results) {
      this.$router.replace({
        name: 'Results',
        params: queryParams,
      })
    }
  },
  data() {
    return {
      page: 1,
      userInfo: {
        name: '',
        prediction: 50,
        category: ''
      },
      validationError: false
    }
  },
  methods: {
    ...mapActions([
      'pingBackend',
    ]),
    incrementPage() {
      ++this.page
      if (this.page === 1) {
        this.$nextTick(() => this.$refs.name.focus())
      } else if (this.page === 5 && this.category !== '') {
        this.$store.commit('setUserInfo', this.userInfo)
        this.$router.push('/quest');
      }
    }
  }

}
</script>

<style scoped>
select {
  font-family: 'Montserrat';
  background: white;
  border: none;
  font-weight: 900;
  font-size: 175%;
  color: var(--color-blue);
}

label img {
  height: 2em;
  width: auto;
  margin: 0 .5em;
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

img {
  height: 70%;
}
</style>
