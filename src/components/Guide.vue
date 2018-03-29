<template>
  <div id="guide">
    <div class="card guide">
      <h4>Już prawie gotowe!</h4>
      <p>Za chwilę zobaczysz {{ numOfQuestions }} przykładów treści, które pojawiły się w sieci.</p>
      <p>Decyzja należy do Ciebie – klikasz czy nie?</p>
      <p>Pamiętaj: na otwarcie lub odrzucenie treści masz tylko <strong>{{ questionTimeSeconds }} sekund</strong>!</p>
      <button class="main-cta" v-on:click="startQuiz">zaczynamy</button>
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
body {
}
#guide {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  background: #3A5172;
}
strong{
  font-weight: bold;
}
.guide {
  height: auto;
  padding: 5vh;
  box-sizing: border-box;
  font-size: 80%;
}
</style>
