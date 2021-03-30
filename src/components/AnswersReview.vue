<template>
  <div
    id="answers-review"
    ref="container"
    class="app-container"
    @scroll="updateScrollData"
  >
    <div class="content-container">
      <ul class="progress">
        <li
          v-for="(q, index) in questions"
          :key="q.newsId"
          :class="{ active: index === questionIndex }"
        />
      </ul>
      <h1 v-text="answerType.text" />
      <quest-card :question="question" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="question.answerExplanationHTML" />
      <div class="foot-link-notes">
        <foot-link-note
          name="Źrodło"
          :link-name="sourceName"
          :link-url="sourceUrl"
        />
        <foot-link-note
          name="Analiza"
          :link-name="analysisName"
          :link-url="analysisUrl"
        />
      </div>

      <div class="buttons">
        <button
          :disabled="!nextAnswerEnabled"
          type="button"
          name="button"
          class="opaque-blue"
          @click="goToNextAnswer()"
        >
          {{ nextAnswerText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QuestCard from '@/components/QuestCard';
import FootLinkNote from '@/components/FootLinkNote';
import Question from '../data/question';

export default {
  name: 'AnswersReview',
  components: {
    QuestCard,
    FootLinkNote,
  },
  beforeRouteEnter(to, from, next) {
    document.body.classList.remove('dark');
    next();
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
          text: 'Dobra odpowiedź!',
          icon: '✓',
          iconClassName: 'circle-icon correct-answer-circle',
        },
        'wrong': {
          className: 'wrong-answer',
          text: 'Zła odpowiedź!',
          icon: '×',
          iconClassName: 'circle-icon wrong-answer-circle',
        },
      },
    };
  },
  computed: {
    nextAnswerEnabled() {
      return true;
    },
    nextAnswerText() {
      if (this.nextAnswerEnabled) {
        return 'następny';
      } else {
        return 'scrolluj w dół';
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
    sourceUrl() {
      return Question.getSourceUrl(this.question);
    },
    sourceName() {
      return Question.getSourceName(this.question);
    },
    analysisUrl() {
      return Question.getAnalysisUrl(this.question);
    },
    analysisName() {
      return Question.getAnalysisName(this.question);
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
        this.goToSummary();
      } else {
        this.scrollToTop();
        this.$nextTick(() => {
          // Update scrollData when changes are propagated to DOM just in case.
          this.updateScrollData();
        });
      }
    },
    goToSummary() {
      let path = '/summary';
      if(window.localStorage.getItem('category') === 'vaccinations') {
        path = '/unicef';
      }

      this.$router.push(path);
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

.foot-link-notes {
  margin-bottom: 1em;
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
.progress {
  display: flex;
  justify-content: space-between;
  margin:0;
  padding: 0;
  list-style-type: none;
  width:100%;
  margin-bottom: 1.25em;
}

.progress li {
  height: 0.25em;
  width: 100%;
  border-radius: 0.125em;
  background: var(--color-border-blue);
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

ol li h2,
ol li h3 {
  margin:0.215em 0 1.2em;
  font-size: 1em;
  line-height: 1.25em;
  font-weight: 500;
  color: var(--color-blue);
  text-transform: none;
}

ol li p {
  margin:0 0 1.2em;
  font-size: 0.875em;
  line-height: 1.25em;
  color: var(--color-blue);
}
</style>
