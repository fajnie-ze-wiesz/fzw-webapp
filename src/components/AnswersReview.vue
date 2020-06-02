<template>
  <div id="answers-review">
    <div class="container">
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
      <quest-card :question="question " />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="question.answerExplanationHTML" />
      <div class="buttons">
        <button
          type="button"
          name="button"
          class="red"
          @click="goToNextAnswer()"
        >
          następny
        </button>
      </div>
    </div>
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
#answers-review {
  background: #EBF1F4;
  color: var(--color-blue);
  overflow: scroll;
  padding: 0;
}

#answers-review:before {
  pointer-events: none;
  content: " ";
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, transparent 80vh, var(--color-gray));
}

h1 {
  margin-bottom: .2em;
}

.container {
  margin-top: calc(5vh);
  width: 80%;
}

.card {
  background: white;
  height: 55vh;
  width: 100%;
  border-radius: .8em;
  overflow-y: auto;
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

button {
  margin: 2em 0;
  position: relative;
  z-index: 10;
}

</style>
