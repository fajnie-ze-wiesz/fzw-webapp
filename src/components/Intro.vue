<template>
  <div id="intro">
    <h1>Hej {{userInfo.name}}!</h1>
    <form class="user-info-form">
      Imię: <input v-model="userInfo.name" type="text" name="">
      Wiek: <input v-model="userInfo.age" min="1900" max="2018" type="number" name="age">
      Miasto: <input v-model="userInfo.city" type="text" name="">
      <div class="gender">
        Płeć:<br>
        F: <input v-model="userInfo.gender" type="radio" value="female">
        M: <input v-model="userInfo.gender" type="radio" value="male">
      </div>
    </form>
    <router-link class="vbutton" :to="{ name: 'Guide', params: {} }">Dalej</router-link>
    {{userInfo}}
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
</style>
