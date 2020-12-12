<template>
  <div
    id="quest"
    class="app-container content-container"
    style="overflow: hidden; background-image:url('static/img/question-bg.png')"
  >
    <PieChart
      id="counter"
      :numerator="countdownSeconds"
      :denominator="questionTimeoutSeconds"
      :text-percent="false"
    />

    <ul class="progress">
      <li
        v-for="(q, index) in questions"
        :key="q.newsId"
        :class="{ active: index === questionIndex }"
      />
    </ul>

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
        @click="answerFalseNews()"
      >
        Fake
      </button>
      <button
        :disabled="buttonsDisabled"
        class="opaque-white answer"
        @click="answerTrueNews()"
      >
        Prawda
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
    document.body.classList.add('dark');
    next((vm) => {
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
    answerTrueNews() {
      this.answer('yes');
    },
    answerFalseNews() {
      this.answer('no');
    },
    answer(a) {
      this.answerQuestionOrEndQuiz(a);
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
  background-color: var(--color-blue);
  background-position: top center;
  background-size:100% auto;
  background-repeat:no-repeat;
  background-size: 100% auto;
  position: relative;
  align-items: center;
}

#counter {
  display: flex;
  justify-content: flex-start;
  height: 16%;
  z-index: 10;
}

button.answer {
  padding: 2vh 1vh;
  width: 48%;
}

h1 {
  position: absolute;
  top: 80%;
  color: white;
}

.card {
  position: absolute;
  max-width: 84%;
  top: 28%;
  background: white;
  height: 55%;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.progress {
  display: flex;
  justify-content: space-between;
  margin:0;
  padding: 0;
  list-style-type: none;
  width: 84%;
  top: 23%;
  position: absolute;
  left:8%;
  right:8%;
}

.progress li {
  height: 0.25em;
  width: 100%;
  border-radius: 0.125em;
  background: #23467A;
  margin:0 0.2em;
  transition-duration: 0.2s;
}
.progress li:first-child {
  margin-left: 0;
}
.progress li:last-child {
  margin-right: 0;
}
.progress li.active {
  background: var(--color-orange);
  width: 150%;
}
</style>
