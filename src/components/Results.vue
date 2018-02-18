<template>
  <div id="results">
    <h1>{{this.userInfo.name}}</h1>
    <h2>Twoja ochrona jest na poziomie</h2>

    <h2>Twoja odporność na:</h2>
    <pie-chart2 :score="numOfCorrectAnswers" :total="numOfAnswers"></pie-chart2>
    <p>
      Udzielono {{ numOfCorrectAnswers }} poprawnych odpowiedzi na {{ numOfAnswers }} pytań.
      Na {{ numOfOmmitedQuestions }} nie udzielono odpowiedzi.
    </p>
    <h3>Chcesz wiedzieć więcej?</h3>
    <h2>Odwiedź Akademię Fact-Checkingu!</h2>
    <a class="button" href="https://www.facebook.com/akademiafactcheckingu/">przejdź</a>
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
    text-align: center;
  }

  #results h1 {
    color: #2c3e50;
    font-weight: 300;
    margin: 0;
  }

</style>
