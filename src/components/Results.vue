<template>
  <div id="results">
    <h1>Wyniki</h1>
    <p>
      Odpowiedziałeś poprawne na {{ numOfCorrectAnswers }} pytań z {{ numOfAnswers }}.
      Na {{ numOfOmmitedQuestions }} nie udzieliłeś odpowiedzi.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'results',
    computed: {
      numOfAnswers () {
        return this.$store.getters.numOfQuizAnswers;
      },
      numOfCorrectAnswers () {
        return this.$store.getters.numOfCorrectQuizAnswers;
      },
      numOfOmmitedQuestions () {
        return this.$store.getters.numOfOmmitedQuizQuestions;
      }
    },
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
