<template>
  <div id="intro">
    <img src="http://via.placeholder.com/120x120" alt="">
    <!-- <transition name="fade"> -->
      <div v-if="page === 0" class="">
        <h1>Cześć!</h1>
        <p>Jesteśmy tu po to, aby sprawdzić Twoją odporność na manipulacje w internecie.</p>
        <button @click="page++">zaczynamy</button>
      </div>
    <!-- </transition> -->

    <!-- <transition name="fade"> -->
      <div v-show="page === 1" class="">
        <h1>Jak mamy się do Ciebie zwracać?</h1>
        <div class="input">
          <input v-model="userInfo.name" type="text" name="">
        </div>
        <button @click="page++">zaczynamy</button>
      </div>
    <!-- </transition> -->

    <div v-show="page === 2" class="">
      <h1>Na ile oceniasz swoją odporność na manipulacje?</h1>
      <div class="input">
        <select class="input" name="">
          <option v-for="(item, value) in [0,10,20,30,40,50,60,70,80,90,100]" value="">{{item}}%</option>
        </select>
      </div>
      <button @click="page++">zaczynamy</button>
    </div>

    <!-- <transition name="fade"> -->
      <div v-show="page === 3" class="">
        <div id="category-selection">
          <div class="input">
            Wybierz obszar, który Cię najbardziej interesuje
            <div class="category-selection">
              <div class="radio">
                <input v-model="userInfo.category" id="rozrywka" type="radio" value="entertainment"></input>
                <label for="rozrywka">rozrywka</label>
              </div>
              <div class="radio">
                <input v-model="userInfo.category" id="sport" type="radio" value="sport">
                <label for="sport">sport</label>
              </div>
              <div class="radio">
                <input v-model="userInfo.category" id="nauka" type="radio" value="science"></input>
                <label for="nauka">nauka</label>
              </div>
              <div class="radio">
                <input v-model="userInfo.category" id="polityka" type="radio" value="politics"></input>
                <label for="polityka">polityka</label>
              </div>
            </div>
          </div>
          <button @click="goToGuide">dalej</button>
        </div>
      </div>
    <!-- </transition> -->


    <!-- <form class="user-info-form">
      <div class="input">
        nick
        <input v-model="userInfo.name" type="text" name="">
      </div>
      <div class="input">
        wiek
        <input v-model="userInfo.age" min="0" max="100" type="number" name="age">
      </div>
      <div class="input">
        płeć
        <div class="gender">
          <div class="radio">
            <label for="gf"><input v-model="userInfo.gender" id="gf" type="radio" value="female">
            kobieta</label>
          </div>
          <div class="radio">
            <label for="gm"><input v-model="userInfo.gender" id="gm" type="radio" value="male"></input>
            mężczyzna</label>
          </div>
        </div>
      </div>
      <div class="input">
        twoja miejscowość
        <select class="input" v-model="userInfo.city">
          <option value="1">Poniżej 10 000</option>
          <option value="2">10 000 - 20 000</option>
          <option value="3">20 000 - 100 000</option>
          <option value="4">100 000 - 250 000</option>
          <option value="5">Powyżej 250 000</option>
        </select>
      </div>

    </form> -->

  </div>
</template>

<script>
  export default {
    name: 'intro',
    data () {
      return {
        page: 0,
        userInfo: {
          name: '',
          opinion: 0,
          category: ''
        },
        validationError: false
      }
    },
    computed: {
    },
    methods: {
      incrementPage () {
        ++this.page
      },
      goToGuide () {
        if (this.category !== '') {
          this.$store.commit('setUserInfo', this.userInfo)
          this.$router.push('/guide');
        }
      }
    }

  }
</script>


<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  #intro {
    text-align: center;
  }

  #intro h1 {
    color: #2c3e50;
    font-weight: 300;
    /* margin: 0; */
  }

  .user-info-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .user-info-form div{
    margin: 2vmin;
  }
  select {

  }

  .gender {
    color: #777;
    display: flex;
    flex-direction: row;
    width: 75vmin;
    justify-content: space-between;
  }

  .error{
    background: red;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter-active {
    transition-delay: .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .category-selection{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-weight: normal;
  }
  #category-selection input[type="radio"] {
    opacity: 0;
    width: 0;
    height: 0;
  }
  #category-selection input[type="radio"]:checked + label {
    background: #666;
    color: white;
  }
  #category-selection label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30vmin;
    height: 30vmin;
    background: white;
    margin: 2vmin;
    transition: .2s;
    cursor: pointer;
  }
  #category-selection input {
    margin: 0;
    display: none;
  }
</style>
