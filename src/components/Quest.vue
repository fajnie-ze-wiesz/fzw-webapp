<template>
<div id="quest">
  <pie-chart id="counter" :numerator="countdownSeconds" :denominator="questionTimeoutSeconds" :textPercent="false" />
  <div class="container" v-for="(q, index) in questions" :key="q.newsId">
    <transition name="question-transition" v-on:after-enter="afterEnter">
      <quest-card :question="q" v-show="index === questionIndex" />
    </transition>
  </div>
  <div class="buttons">
    <button :disabled="buttonsDisabled" class="opaque-white answer" v-on:click="answer('yes')">Prawda</button>
    <button :disabled="buttonsDisabled" class="opaque-white answer" v-on:click="answer('no')">Fałsz</button>
  </div>
</div>
</template>

<script>
import {
  mapMutations,
  mapActions
} from 'vuex';
import {
  QUESTION_TIMEOUT
} from '../consts';
import PieChart from '@/components/PieChart'
import QuestCard from '@/components/QuestCard'

export default {
  name: 'quest',
  components: {
    PieChart,
    QuestCard
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.generateQuiz();
      vm.startQuestionTimeout();
      vm.startTicker();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.stopQuestionTimeout();
    this.stopTicker();
    next();
  },
  data: () => ({
    tick: Date.now(),
    buttonsDisabled: false
  }),
  computed: {
    question() {
      return this.$store.getters.currentQuizQuestion;
    },
    questions() {
      return this.$store.getters.quizQuestions;
    },
    questionIndex() {
      return this.$store.getters.quizQuestionIndex;
    },
    questionNumber() {
      return this.$store.getters.quizQuestionIndex + 1;
    },
    countdownSeconds() {
      const delta = this.tick - this.questionStartTime;
      return Math.ceil((QUESTION_TIMEOUT - delta) / 1000);
    },
    questionTimeoutSeconds () {
      return QUESTION_TIMEOUT / 1000
    }
  },
  methods: {
    toggleDisableButtons() {
      this.buttonsDisabled = !this.buttonsDisabled
    },
    ...mapMutations([
      'answerQuizQuestion',
      'omitQuizQuestion',
    ]),
    ...mapActions([
      'generateQuiz',
    ]),
    answer(a) {
      this.answerQuestionOrEndQuiz(a);
    },
    afterEnter() {
      this.toggleDisableButtons();
    },
    answerQuestionOrEndQuiz(answer) {
      this.stopQuestionTimeout()
      this.answerQuizQuestion({
        answer
      });
      this.toggleDisableButtons();
      if (this.$store.getters.isQuizFinished) {
        this.goToResults();
      } else {
        this.startQuestionTimeout();
      }
    },
    omitQuestionOrEndQuiz() {
      this.omitQuizQuestion();
      if (this.$store.getters.isQuizFinished) {
        this.goToResults();
      } else {
        this.startQuestionTimeout();
      }
    },
    goToResults() {
      this.$router.push('/results');
    },
    stopQuestionTimeout() {
      clearTimeout(this.questionTimeout)
    },
    startQuestionTimeout() {
      clearTimeout(this.questionTimeout)
      this.questionStartTime = Date.now();
      this.questionTimeout = setTimeout(() => {
        this.omitQuestionOrEndQuiz();
      }, QUESTION_TIMEOUT);
    },
    startTicker() {
      this.tickInterval = setInterval(() => {
        this.tick = Date.now();
      }, 100);
    },
    stopTicker() {
      clearInterval(this.tickInterval);
    },
  }
}
</script>

<style scoped>
#quest {
  background: var(--color-blue);
}

.container {
  position: absolute;
  width: 80%;
  top: calc(25vh);
}

#counter {
  display: flex;
  justify-content: flex-start;
  width: 18vh;
}

button.answer {
  padding: 2vh 1vh;
  width: 48%;
}

.card {
  background: white;
  height: 55vh;
  width: 100%;
  box-shadow: 0 .8vh 1.6vh rgba(184, 184, 184, .5);
  border-radius: .8em;
  overflow-y: auto;
}

.buttons {
  position: absolute;
  bottom: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
}
</style>
