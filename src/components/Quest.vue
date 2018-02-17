<template>
  <div id="quest">
    <h1>Pytanie {{ questionNumber }}</h1>
    <div>
      <img :src="question.imageUrl" width="320"/>
    </div>
    <div>
      <button v-on:click="answerYes">Tak</button>
      <button v-on:click="answerNo">Nie</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'quest',
  computed: {
    question () {
      return this.$store.getters.currentQuizQuestion;
    },
    questionNumber () {
      return this.$store.getters.quizQuestionIndex + 1;
    },
  },
  methods: {
    ...mapMutations([
      'answerQuizQuestion',
    ]),
    answerYes () {
      this.answerQuestionOrEndQuiz('yes');
    },
    answerNo () {
      this.answerQuestionOrEndQuiz('no');
    },
    answerQuestionOrEndQuiz (answer) {
      this.answerQuizQuestion({ answer });
      if (this.$store.getters.isQuizFinished) {
        this.$router.push('/results');
      }
    },
  }
}
</script>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  #quest {
    text-align: center;
  }

  #quest h1 {
    color: #2c3e50;
    font-weight: 300;
    margin: 0;
  }
</style>
