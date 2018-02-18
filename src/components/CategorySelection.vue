<template>
  <div id="category-selection">
    <img src="http://via.placeholder.com/120x120" alt="">
    <div class="input">
      Wybierz obszar, który Cię najbardziej interesuje
      <div class="category-selection">
        <div class="radio">
          <input v-model="category" id="rozrywka" type="radio" value="rozrywka"></input>
          <label for="rozrywka">rozrywka</label>
        </div>
        <div class="radio">
          <input v-model="category" id="sport" type="radio" value="sport">
          <label for="sport">sport</label>
        </div>
        <div class="radio">
          <input v-model="category" id="nauka" type="radio" value="nauka"></input>
          <label for="nauka">nauka</label>
        </div>
        <div class="radio">
          <input v-model="category" id="polityka" type="radio" value="polityka"></input>
          <label for="polityka">polityka</label>
        </div>
      </div>
    </div>
    <button @click="goToGuide">dalej</button>
  </div>
</template>

<script>
  export default {
    name: 'category-selection',
    data () {
      return {
        category: ''
      }
    },
    methods: {
      setUserCategory () {
        return null;
      },
      goToGuide () {
        if (this.category !== '') {
          this.$store.commit('setUserCategory', this.category)
          this.$router.push('/guide');
        }
      }
    }
  }
</script>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  .category-selection{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-weight: normal;
  }
  input[type="radio"] {
  	opacity: 0;
  	width: 0;
    height: 0;
  }
  input[type="radio"]:checked + label {
    background: #666;
    color: white;
  }
  label {
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
  input {
    margin: 0;
    display: none;
  }
</style>
