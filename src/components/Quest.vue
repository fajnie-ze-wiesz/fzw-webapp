<template>
  <div id="quest">
    <pie-chart id="counter" :time="countdownSeconds"></pie-chart>
    <div class="card">
      <img :src="question.imageUrl"/>
    </div>
    <div class="buttons">
      <button class="answer" v-on:click="answer('yes')">klikam</button>
      <button class="answer" v-on:click="answer('no')">nie klikam</button>
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
  beforeRouteLeave (to, from, next) {
    this.stopQuestionTimeout();
    this.stopTicker();
    next();
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
  img{
    width: 70vmin;
  }

  .buttons {
    display: flex;
    flex-direction: row;
  }

  button.answer {
    width: 35vmin;
    border: #666 .75vmin solid;
    color: #666;
    background: #eee;
    padding: 2vmin 3vmin;
    box-shadow: none;
    border-radius: 0;
  }
</style>
