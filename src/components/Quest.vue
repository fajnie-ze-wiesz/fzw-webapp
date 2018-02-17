<template>
  <div id="quest">
    <h1>Pytanie {{ questionNumber }}</h1>
    <pie-chart id="counter" :time="countdownSeconds"></pie-chart>
    <div>
      <img :src="question.imageUrl" width="320"/>
    </div>
    <div class="buttons">
      <button v-on:click="answer('yes')">tak</button>
      <button v-on:click="answer('no')">nie</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { QUESTION_TIMEOUT } from '../consts';
import PieChart from '@/components/PieChart'

export default {
  name: 'quest',
  components: {
    PieChart
  },
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
    answer (a) {
      let el = document.querySelector('.anim')
      let el2 = document.querySelector('.ouro3')
      let cl = document.querySelector('.anim').className
      let cl2 = document.querySelector('.ouro3').className

      el.className = '';
      el2.className = '';

      setTimeout(() => {
        el.className = cl;
        el2.className = cl2;
      }, 20)

      this.answerQuestionOrEndQuiz(a);
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #quest h1 {
    color: #2c3e50;
    font-weight: 300;
    margin: 0;
  }
  #counter{
    margin: 5vmin;
  }

  .buttons {
    display: flex;
    flex-direction: row;
  }
</style>
