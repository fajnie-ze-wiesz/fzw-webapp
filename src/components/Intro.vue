<template>
  <div id="intro">
    <img id="logo" src="static/img/icons/fzw_logo.svg" alt="">
      <div v-if="page === 0" class="">
        <h1>Cześć!</h1>
        <p>Jesteśmy tu po to, aby sprawdzić Twoją odporność na manipulacje w internecie.</p>
        <button @click="page++">zaczynamy</button>
      </div>

      <div v-show="page === 1" class="">
        <h3>Jak mamy się do Ciebie zwracać?</h3>
        <div class="input">
          <input v-model="userInfo.name" type="text" name="">
        </div>
        <button @click="page++">dalej</button>
      </div>

    <div v-show="page === 2" class="">
      <h3>Na ile oceniasz swoją odporność na manipulacje?</h3>
      <div class="input">
        <select class="input" name="">
          <option v-for="(item, value) in [0,10,20,30,40,50,60,70,80,90,100]" value="">{{item}}%</option>
        </select>
      </div>
      <button @click="page++">dalej</button>
    </div>

      <div v-show="page === 3" class="">
        <div id="category-selection">
          <h3>Wybierz obszar, który Cię najbardziej interesuje</h3>
          <div class="input">
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

<style scoped>
  #intro {
    text-align: center;
  }

  #intro h1 {
    color: #2c3e50;
    font-weight: 300;
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
    background: white;
    border: none;
  }
  option{
    font-size: 20%;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 200%;
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
    height: 40vh;
    flex-wrap: wrap;
    justify-content: center;
    font-weight: normal;
    width: 100%;
  }
  #category-selection input[type="radio"]:checked + label {
    background: #666;
    color: white;
  }
  .radio {
    width: 40%;
    height: 40%;
    margin: 2%;
  }
  #category-selection label {
    width: 100%;
    /* height: 90%; */
    border-radius: 2vh;
    transition: .2s;
    font-size: 65%;
    cursor: pointer;
  }
  #category-selection input {
    margin: 0;
    display: none;
  }
</style>
