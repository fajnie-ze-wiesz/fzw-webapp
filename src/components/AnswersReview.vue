<template>
  <div id="answers-review">
    <div class="container">
      <h1 v-if="newsIsTrue">to jest prawda</h1>
      <h1 v-else>to jest fałsz</h1>
      <h3 v-if="questionIsAnsweredCorrectly" class="correct-answer">
        <span class="correct-answer-circle">&check;</span>odpowiedziałeś dobrze
      </h3>
      <h3 v-else class="wrong-answer">
        <span class="wrong-answer-circle">&times;</span>pomyliłeś się
      </h3>
      <quest-card :question="question "/>
      <div>
        {{ question.answerExplanation }}
      </div>
      <div class="buttons">
        <button type="button" name="button" class="red" v-on:click="goToNextAnswer()">następny</button>
      </div>
    </div>
  </div>
</template>

<script>
import QuestCard from '@/components/QuestCard';
import Question from '../data/question';
import ManipulationCategory from '../data/manipulation_category';

export default {
  name: 'answers-review',
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
    answerExplanation() {
      return Question.getAnswerExplanation(this.question);
    },
    questionIsAnsweredCorrectly() {
      return Question.isAnsweredCorrectly(this.question);
    },
    questionAnswerInvertedLabel() {
      return Question.isTrueNews(this.question) ? 'fałsz' : 'prawda';
    },
    questionAnswerLabel() {
      if (Question.isTrueNews(this.question)) {
        return 'Prawda';
      }
      const catMap = this.$store.getters.manipulationCategoriesMap;
      const catName = Question.getManipulationCategoryName(this.question);
      const catDisplayName = ManipulationCategory.getDisplayName(catMap[catName]);
      return catDisplayName;
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
}

.correct-answer-circle, .wrong-answer-circle {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 100%;
  transform: scale(50%);
  transform-origin: left;
  width: 1.25em;
  height: 1.25em;
  text-align: center;
  border-radius: 100%;
  color: white;
  margin-right: 2em;
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

.buttons button {
  margin-top: 1em;
}

</style>
