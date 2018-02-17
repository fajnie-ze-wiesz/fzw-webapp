<template>
  <div id="intro">
    <img src="http://via.placeholder.com/120x120" alt="">
    <form class="user-info-form">
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
            <input v-model="userInfo.gender" type="radio" value="female">kobieta
          </div>
          <div class="radio">
            <input v-model="userInfo.gender" type="radio" value="male">mężczyzna
          </div>
        </div>

      </div>
      <div class="input">
        twoja miejscowość
        <input v-model="userInfo.city" type="text" name="">
      </div>
    </form>
    <button @click="goToGuide">dalej</button>
  </div>
</template>

<script>
  export default {
    name: 'intro',
    data () {
      return {
        userInfo: {
          name: '',
          age: null,
          gender: null,
          city: ''
        }
      }
    },
    methods: {
      goToGuide () {
        this.$router.push('/guide');
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
    margin: 0;
  }

  .user-info-form {
    width: 100vmin;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .user-info-form div{
    margin: 2vmin;
  }
  .input{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    color: #aaa;
    font-weight: bold;
    font-size: 80%;
  }
  .gender {
    color: #777;
    display: flex;
    flex-direction: row;
    width: 75vmin;
    justify-content: space-between;
  }
  .radio{
    display: flex;
    font-size: inherit;
  }
  input{
    border: none;
    padding: 3vmin;
    font-size: inherit;
    color: #777;
  }
  input[type='text'], input[type='number']{
    width: 75vmin;
  }
</style>
