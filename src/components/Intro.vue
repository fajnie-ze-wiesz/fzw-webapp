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
        <input v-model="userInfo.city" type="text" name="">
      </div>
    </form>
    <button :class="{error: validationError}" @click="goToCategories">dalej</button>
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
          city: '',
          category: '',
        },
        validationError: false
      }
    },
    computed: {

    },
    methods: {
      goToCategories () {
        if (this.userInfo.name !== '') {
          this.$store.commit('setUserInfo', this.userInfo)
          this.$router.push('/category-selection');
        } else {
          this.validationError = true;
        }
      },
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .user-info-form div{
    margin: 2vmin;
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
</style>
