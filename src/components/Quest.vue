<template>
  <div id="quest">
    <div class="container" v-for="(q, index) in questions" :key="q.newsId">
      <transition
        name="question-transition"
      >
        <div :class="['question', q.expectedAnswer === 'no' ? 'fake' : 'news', q.expectedAnswer === q.answer ? 'correct' : 'wrong']" v-show="index === questionIndex">
          <pie-chart id="counter" :numerator="countdownSeconds" :denominator="questionTimeoutSeconds" :textPercent="false"/>
          <div class="card img" :style="'background-image: url(' + q.imageUrl + ')'"></div>
          <div class="buttons">
            <button class="secondary-cta answer" v-on:click="answer('yes')">klikam</button>
            <button class="secondary-cta answer" v-on:click="answer('no')">nie klikam</button>
          </div>
        </div>
      </transition>
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
    questions () {
      return this.$store.getters.quizQuestions;
    },
    questionIndex () {
      return this.$store.getters.quizQuestionIndex;
    },
    questionNumber () {
      return this.$store.getters.quizQuestionIndex + 1;
    },
    countdownSeconds () {
      const delta = this.tick - this.questionStartTime;
      return Math.ceil((QUESTION_TIMEOUT - delta) / 1000);
    },
    questionTimeoutSeconds () {
      return QUESTION_TIMEOUT / 1000
    }
  },
  methods: {
    ...mapMutations([
      'answerQuizQuestion',
      'omitQuizQuestion',
      'generateQuiz',
    ]),
    colorizeMatrixString (channel, t) {
      const A = [
        [1 - t, 0, 0, 0],
        [0, 1 - t, 0, 0],
        [0, 0, 1 - t, 0],
        [0, 0, 0, 1],
      ];
      for (let j = 0; j < 3; ++j) {
        A[channel][j] += t / 3;
      }
      const values = [];
      for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
          values.push(A[i][j]);
        }
        values.push(0);
      }
      return values.join(' ');
    },
    answer (a) {
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

<style scoped>
  .container{
    position: absolute;
    width: 80%;
    /* top: 0; */
  }
  .question {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #counter{
    width: 18vh;
  }
  img{
    width: 100%;
  }
  .card.img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: all .1s linear;
  }
  button.answer{
    padding: 2vh 1vh;
    width: 45%;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .defs-only {
    height: 0;
    width: 0;
  }

  .question-transition-enter {
    transform: translateY(100vmax);
  }

  .question-transition-enter-active {
    transition: all 1.5s ease;
  }
  .question-transition-leave-active {
    transition: all 1.5s ease;
  }
  .question-transition-leave-active.fake{
    transform: translateX(100vmin);
  }
  .question-transition-leave-active.news{
    transform: translateX(-100vmin);
  }
  .question-transition-leave-to.correct .card {
    background-blend-mode: multiply;
    background-color: rgba(0, 255, 0, .5);
  }
  .question-transition-leave-to.wrong .card {
    background-blend-mode: multiply;
    background-color: rgba(255, 0, 0, .5);
  }
  .question-transition-leave-to {
    opacity: 0;
  }
</style>
