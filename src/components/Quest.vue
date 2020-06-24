<template>
  <div id="quest">
    <PieChart
      id="counter"
      :numerator="countdownSeconds"
      :denominator="questionTimeoutSeconds"
      :text-percent="false"
    />

    <transition
      v-for="(q, index) in questions"
      :key="q.newsId"
      name="question-transition"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <QuestCard
        v-show="index === questionIndex"
        :question="q"
      />
    </transition>
    <div class="buttons">
      <button
        :disabled="buttonsDisabled"
        class="opaque-white answer"
        @click="answer('yes', $event)"
      >
        Prawda
      </button>
      <button
        :disabled="buttonsDisabled"
        class="opaque-white answer"
        @click="answer('no', $event)"
      >
        Fałsz
      </button>
    </div>
  </div>
</template>

<script>
import {
  mapMutations,
} from 'vuex';
import {
  QUESTION_TIMEOUT,
} from '../consts';
import PieChart from '@/components/PieChart';
import QuestCard from '@/components/QuestCard';

export default {
  name: 'Quest',
  components: {
    PieChart,
    QuestCard,
  },
  beforeRouteEnter(to, from, next) {
    document.body.style.background = getComputedStyle(document.body)
      .getPropertyValue('--color-blue');
    next((vm) => {
      vm.startQuestionTimeout();
      vm.startTicker();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.stopQuestionTimeout();
    this.stopTicker();
    document.body.style.background = getComputedStyle(document.body)
      .getPropertyValue('--color-gray');
    next();
  },
  data: () => ({
    tick: Date.now(),
    buttonsDisabled: false,
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
    questionTimeoutSeconds() {
      return QUESTION_TIMEOUT / 1000;
    },
  },
  methods: {
    ...mapMutations([
      'answerQuizQuestion',
      'omitQuizQuestion',
    ]),
    disableButtons() {
      this.buttonsDisabled = true;
    },
    enableButtons() {
      this.buttonsDisabled = false;
    },
    answer(answer, event) {
      this.answerQuestionOrEndQuiz(answer);
      event.target.blur();
    },
    afterEnter() {
      this.enableButtons();
    },
    leave() {
      this.disableButtons();
    },
    answerQuestionOrEndQuiz(answer) {
      this.stopQuestionTimeout();
      this.answerQuizQuestion({
        answer,
      });
      this.disableButtons();
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
      clearTimeout(this.questionTimeout);
    },
    startQuestionTimeout() {
      clearTimeout(this.questionTimeout);
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
  },
};
</script>

<style scoped>
#quest {
  background: var(--color-blue);
  position: relative;
}

#counter {
  display: flex;
  justify-content: flex-start;
  width: 30%;
  z-index: 10;
}

button.answer {
  padding: 2vh 1vh;
  width: 48%;
}

.card {
  position: absolute;
  max-width: calc(100% - 3em);
  top: 20%;
  background: white;
  height: 65%;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
</style>
