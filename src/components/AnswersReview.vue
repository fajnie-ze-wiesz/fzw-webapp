<template>
  <div
    id="answers-review"
    ref="container"
    @scroll="updateScrollData"
  >
    <div id="fog-effect" />
    <h1 v-if="newsIsTrue">
      to jest prawda
    </h1>
    <h1 v-else>
      to jest fałsz
    </h1>
    <h3
      :class="answerType.className"
    >
      <span :class="[answerType.iconClassName]">
        {{ answerType.icon }}
      </span>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-text="answerType.text" />
    </h3>
    <quest-card :question="question" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="question.answerExplanationHTML" />
    <div class="spacer" />
    <button
      :disabled="!nextAnswerEnabled"
      type="button"
      name="button"
      class="button red"
      @click="goToNextAnswer()"
    >
      {{ nextAnswerText }}
    </button>
  </div>
</template>

<script>
import QuestCard from '@/components/QuestCard';
import Question from '../data/question';
import {
  ANSWERS_REVIEW_SCROLL_TOLERANCE,
} from '../consts';

export default {
  name: 'AnswersReview',
  components: {
    QuestCard,
  },
  data() {
    return {
      questionIndex: 0,
      scrollOffset: 0,
      maxScrollOffset: 0,
      answerTypesDict: {
        'nothing': {
          className: 'no-answer',
          text: 'nie odpowiedziałeś',
          icon: '☹', // https://www.utf8icons.com/character/9785/white-frowning-face
          iconClassName: 'no-answer',
        },
        'correct': {
          className: 'correct-answer',
          text: 'odpowiedziałeś dobrze',
          icon: '✓',
          iconClassName: 'circle-icon correct-answer-circle',
        },
        'wrong': {
          className: 'wrong-answer',
          text: 'pomyliłeś się',
          icon: '×',
          iconClassName: 'circle-icon wrong-answer-circle',
        },
      },
    };
  },
  computed: {
    nextAnswerEnabled() {
      return this.scrollOffset >= this.maxScrollOffset - ANSWERS_REVIEW_SCROLL_TOLERANCE;
    },
    nextAnswerText() {
      if (this.nextAnswerEnabled) {
        return 'następny';
      } else {
        return 'scrolluj dalej';
      }
    },
    newsIsTrue() {
      if (this.question.expectedAnswer === 'yes') {
        return true;
      } else if (this.question.expectedAnswer === 'no') {
        return false;
      }
      return null;
    },
    answerExplanationHTML() {
      return Question.getAnswerExplanationHTML(this.question);
    },
    answerType() {
      let answerTypeString;
      if (!Question.isAnswered(this.question)) {
        answerTypeString = 'nothing';
      } else if (Question.isAnsweredCorrectly(this.question)) {
        answerTypeString = 'correct';
      } else {
        answerTypeString = 'wrong';
      }
      return this.answerTypesDict[answerTypeString];
    },
    question() {
      return this.questions[this.questionIndex];
    },
    questions() {
      return this.$store.getters.quizQuestions;
    },
  },
  mounted() {
    this.updateScrollData();
  },
  methods: {
    calculateScrollData() {
      const container = this.$refs.container;
      if (!container) {
        return {scrollOffset: 0, maxScrollOffset: 0};
      }
      const containerHeight = container.getBoundingClientRect().height;
      const scrollOffset = container.scrollTop - container.offsetTop;
      const maxScrollOffset = container.scrollHeight - containerHeight;
      return {scrollOffset, maxScrollOffset};
    },
    updateScrollData() {
      const {scrollOffset, maxScrollOffset} = this.calculateScrollData();
      this.scrollOffset = scrollOffset;
      this.maxScrollOffset = maxScrollOffset;
    },
    scrollToTop() {
      let container = this.$refs.container;
      if (!container) {
        return;
      }
      container.scrollTo(0, 0);
    },
    goToNextAnswer() {
      this.questionIndex += 1;
      if (this.questionIndex >= this.$store.getters.numOfQuizQuestions) {
        this.goToShareResults();
      } else {
        this.scrollToTop();
        this.$nextTick(() => {
          // Update scrollData when changes are propagated to DOM just in case.
          this.updateScrollData();
        });
      }
    },
    goToShareResults() {
      this.$router.push('/share-results');
    },
  },
};
</script>

<style scoped>
#fog-effect {
  pointer-events: none;
  content: " ";
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, transparent 80%, var(--color-gray));
  border-radius: 1em;
}

#answers-review {
  background: #EBF1F4;
  color: var(--color-blue);
  overflow-y: scroll !important;
}

h1 {
  margin-bottom: .2em;
}

.card {
  display: block;
  background: white;
  width: 100%;
  box-shadow: 0 0 1em #10305F3D;
  margin: 1em 0;
}

.no-answer {
  color: #617388;
}

.correct-answer {
  color: var(--color-green);
}

.correct-answer-circle {
  background: var(--color-green);
}

.wrong-answer {
  color: var(--color-orange);
}

.wrong-answer-circle {
  background: var(--color-orange);
}

.button {
  position: absolute;
  width: 80%;
  bottom: 1.5em;
  z-index: 10;
}
.button:disabled,
.button[disabled]{
  background: var(--color-dark-gray);
}

.spacer {
    padding: 3em;
}

</style>
