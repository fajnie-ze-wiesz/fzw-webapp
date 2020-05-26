<template>
  <div id="answers-review">
    <div class="container">
      <quest-card :question="question "/>
      <h1 v-if="questionIsAnsweredCorrectly">
        <span class="good-answer-circle">&check;</span> zaznaczyłeś prawidłowo, to {{ questionAnswerLabel }}
      </h1>
      <h1 v-else>
        <span class="bad-answer-circle">&times;</span> to nie jest {{ questionAnswerInvertedLabel }}
      </h1>
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
      document.querySelector('#app > div').scrollTo(0, 0);
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

.good-answer-circle, .bad-answer-circle {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 100%;
  transform: scale(50%);
  transform-origin: left;
  width: 2em;
  height: 2em;
  text-align: center;
  border-radius: 100%;
  color: white;
}

.good-answer-circle {
  background: var(--color-green);
}

.bad-answer-circle {
  background: var(--color-orange);
}

.buttons button {
  margin-top: 1em;
}

</style>
