<template>
  <div id="answers-review">
    <div id="fog-effect" />
    <h1 v-if="newsIsTrue">
      to jest prawda
    </h1>
    <h1 v-else>
      to jest fałsz
    </h1>
    <h3
      v-if="questionIsAnsweredCorrectly"
      class="correct-answer"
    >
      <span class="circle-icon correct-answer-circle">&check;</span>odpowiedziałeś dobrze
    </h3>
    <h3
      v-else
      class="wrong-answer"
    >
      <span class="circle-icon wrong-answer-circle">&times;</span>pomyliłeś się
    </h3>
    <quest-card :question="question" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="question.answerExplanationHTML" />
    <div class="spacer" />
    <button
      type="button"
      name="button"
      class="button red"
      @click="goToNextAnswer()"
    >
      następny
    </button>
  </div>
</template>

<script>
import QuestCard from '@/components/QuestCard';
import Question from '../data/question';

export default {
  name: 'AnswersReview',
  components: {
    QuestCard,
  },
  data() {
    return {
      questionIndex: 0,
    };
  },
  computed: {
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
    questionIsAnsweredCorrectly() {
      return Question.isAnsweredCorrectly(this.question);
    },
    question() {
      return this.questions[this.questionIndex];
    },
    questions() {
      return this.$store.getters.quizQuestions;
    },
  },
  methods: {
    goToNextAnswer() {
      this.questionIndex += 1;
      if (this.questionIndex >= this.$store.getters.numOfQuizQuestions) {
        this.goToShareResults();
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

.spacer {
    padding: 3em;
}

</style>
