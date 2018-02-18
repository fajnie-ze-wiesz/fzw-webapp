<template>
  <div id="results">
    <h1>{{this.userInfo.name}}...</h1>
    <h2>jesteś chroniony na poziomie:</h2>
    <pie-chart2 :score="numOfCorrectAnswers" :total="numOfAnswers"></pie-chart2>
    <p>
      Udzielono {{ numOfCorrectAnswers }} poprawnych odpowiedzi na {{ numOfAnswers }} pytań.
      Na {{ numOfOmmitedQuestions }} nie udzielono odpowiedzi.
    </p>
    <div class="results">
      <h1>Twoja odporność na:</h1>
      <div class="">
        <pie-chart2
          :score="numOfCorrectEmotionalLanguageAnswers"
          :total="numOfEmotionalLanguageAnswers"
        />
        <h5>Emocjonalny język</h5>

      </div>

      <div class="">
        <pie-chart2
          :score="numOfCorrectClickbaitAnswers"
          :total="numOfClickbaitAnswers"
        />
        <h5>Clickbait</h5>
      </div>

      <div class="">
        <pie-chart2
          :score="numOfCorrectFakeNewsAnswers"
          :total="numOfFakeNewsAnswers"
        />
        <h5>Fałszywe treści</h5>
      </div>

      <div class="">
        <pie-chart2
          :score="numOfCorrectImageManipulationAnswers"
          :total="numOfImageManipulationAnswers"
        />
        <h5>Manipulację obrazem</h5>
      </div>
    </div>
    <button type="button" name="button">sprawdź swoje odpowiedzi</button>
  </div>
</template>

<script>
  import PieChart2 from '@/components/PieChart2'

  export default {
    name: 'results',
    components: {
      PieChart2
    },
    computed: {
      numOfAnswers () {
        return this.$store.getters.numOfQuizAnswers;
      },
      numOfCorrectAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswers;
      },
      numOfOmmitedQuestions () {
        return this.$store.getters.numOfOmmitedQuizQuestions;
      },

      numOfEmotionalLanguageAnswers () {
        return this.$store.getters.numOfQuizAnswersByType('emotional-language');
      },
      numOfCorrectEmotionalLanguageAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswersByType('emotional-language');
      },

      numOfClickbaitAnswers () {
        return this.$store.getters.numOfQuizAnswersByType('clickbait');
      },
      numOfCorrectClickbaitAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswersByType('clickbait');
      },

      numOfFakeNewsAnswers () {
        return this.$store.getters.numOfQuizAnswersByType('fake-news');
      },
      numOfCorrectFakeNewsAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswersByType('fake-news');
      },

      numOfImageManipulationAnswers () {
        return this.$store.getters.numOfQuizAnswersByType('image-manipulation');
      },
      numOfCorrectImageManipulationAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswersByType('image-manipulation');
      },

      userInfo () {
        return this.$store.state.userInfo
      }
    },
    methods: {
    }
  }
</script>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  #results {
    /* text-align: center; */
  }

  #results h1 {
    color: #2c3e50;
    font-weight: 300;
  }

  .results {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .results > div {
    width: 50%;

  }
  .results svg{

  }
</style>
