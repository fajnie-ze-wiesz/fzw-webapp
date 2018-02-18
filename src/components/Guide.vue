<template>
  <div id="guide">
    <img id="logo" src="static/img/icons/fzw_logo.svg" alt="">
    <div class="card guide">
      <h1>Wskazówka</h1>
      <p>Za chwilę zobaczysz {{ numOfQuestions }} przykładów treści, które pojawiły się w sieci.</p>
      <p>Decyzja należy do Ciebie – klikasz czy nie?</p>
      <p>Pamiętaj: na otwarcie lub odrzucenie treści masz tylko {{ questionTimeSeconds }} sekund!</p>
      <button v-on:click="startQuiz">ok, zaczynamy!</button>
    </div>
  </div>
</template>

<script>
import { QUESTION_TIMEOUT, NUM_OF_QUIZ_QUESTIONS } from '../consts';

export default {
  name: 'guide',
  computed: {
    numOfQuestions () {
      return NUM_OF_QUIZ_QUESTIONS;
    },
    questionTimeSeconds () {
      return QUESTION_TIMEOUT / 1000;
    }
  },
  methods: {
    startQuiz () {
      this.$router.push('/quest')
    }
  }
}
</script>

<!-- Global CSS -->

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
#guide {
  text-align: center;
}
.guide {
  height: auto;
}
</style>
