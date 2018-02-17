<template>
  <div id="category-selection">
    <img src="http://via.placeholder.com/120x120" alt="">
    <div class="input">
      Wybierz obszar, który Cię najbardziej interesuje
      <div class="category-selection">
        <div class="radio">
          <label for="rozrywka"><input v-model="category" id="rozrywka" type="radio" value="rozrywka"></input>
          rozrywka</label>
        </div>
        <div class="radio">
          <label for="sport"><input v-model="category" id="sport" type="radio" value="sport">
          sport</label>
        </div>
        <div class="radio">
          <label for="nauka"><input v-model="category" id="nauka" type="radio" value="nauka"></input>
          nauka</label>
        </div>
        <div class="radio">
          <label for="polityka"><input v-model="category" id="polityka" type="radio" value="polityka"></input>
          polityka</label>
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
  /* input[type="radio"] {
  	opacity: 0;
  	width: 0;
    height: 0;
  } */
</style>
