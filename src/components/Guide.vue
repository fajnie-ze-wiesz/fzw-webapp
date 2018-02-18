<template>
  <div id="guide">
    <img src="http://via.placeholder.com/120x120" alt="">
    <div class="card">
      <h1>Wskazówka</h1>
      <p>Za chwilę zobaczysz {{ numOfQuestions }} przykładów treści, które pojawiły się w internecie.</p>
      <p>Sprawdź, czy kliknąłbyś, aby przeczytać więcej.</p>
      <p>Masz {{ questionTimeSeconds }} sekund na decyzję.</p>
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
</style>
