<template>
  <div id="quest">
    <div v-for="(q, index) in questions" :key="q.newsId">
      <transition name="slide-fade">
        <div class="question" v-if="index === questionIndex">
          <pie-chart2 id="counter" :numerator="countdownSeconds" :denominator="questionTimeoutSeconds"></pie-chart2>
          <div class="card">
            <img :src="q.imageUrl"/>
          </div>
          <div class="buttons">
            <button class="answer" v-on:click="answer('yes')">klikam</button>
            <button class="answer" v-on:click="answer('no')">nie klikam</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { QUESTION_TIMEOUT } from '../consts';
import PieChart2 from '@/components/PieChart2'

export default {
  name: 'quest',
  components: {
    PieChart2
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
  #quest {
    position: relative;
  }
  .question {
    position: absolute;
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

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background: #00f;
  }

  .overlay-error {
    background: #f00;
  }

  .slide-fade-enter {
    transform: translateY(-30vmin);
    opacity: 0;
  }
  .slide-fade-enter-active {
    transition: all 2s ease;
  }

  .slide-fade-leave-active {
    transition: all 1s ease;
  }
  .slide-fade-leave-to {
    transform: translateY(50vmin);
    opacity: 0;
  }


</style>
