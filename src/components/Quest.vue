<template>
  <div id="quest">
    <h1>Pytanie {{ questionNumber }}</h1>
    <div>
      Następne pytanie za {{ countdownSeconds }}
    </div>
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

const QUESTION_TIMEOUT = 5 * 1000;

export default {
  name: 'quest',
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.generateQuiz();
      vm.startQuestionTimeout();
      vm.startTicker();
    });
  },
  data: () => ({
    tick: Date.now(),
  }),
  computed: {
    question () {
      return this.$store.getters.currentQuizQuestion;
    },
    questionNumber () {
      return this.$store.getters.quizQuestionIndex + 1;
    },
    countdownSeconds () {
      const delta = this.tick - this.questionStartTime;
      return Math.ceil((QUESTION_TIMEOUT - delta) / 1000);
    }
  },
  methods: {
    ...mapMutations([
      'answerQuizQuestion',
      'omitQuizQuestion',
      'generateQuiz',
    ]),
    answerYes () {
      this.answerQuestionOrEndQuiz('yes');
    },
    answerNo () {
      this.answerQuestionOrEndQuiz('no');
    },
    answerQuestionOrEndQuiz (answer) {
      this.stopQuestionTimeout()
      this.answerQuizQuestion({ answer });
      if (this.$store.getters.isQuizFinished) {
        this.goToResults();
      } else {
        this.startQuestionTimeout();
      }
    },
    omitQuestionOrEndQuiz () {
      this.omitQuizQuestion();
      if (this.$store.getters.isQuizFinished) {
        this.goToResults();
      } else {
        this.startQuestionTimeout();
      }
    },
    goToResults () {
      this.stopQuestionTimeout();
      this.stopTicker();
      this.$router.push('/results');
    },
    stopQuestionTimeout () {
      clearTimeout(this.questionTimeout)
    },
    startQuestionTimeout () {
      clearTimeout(this.questionTimeout)
      this.questionStartTime = Date.now();
      this.questionTimeout = setTimeout(() => {
        this.omitQuestionOrEndQuiz();
      }, QUESTION_TIMEOUT);
    },
    startTicker () {
      this.tickInterval = setInterval(() => {
        this.tick = Date.now();
      }, 100);
    },
    stopTicker () {
      clearInterval(this.tickInterval);
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
