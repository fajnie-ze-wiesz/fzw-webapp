<template>
  <div id="results">
    <h1>{{this.userInfo.name}}</h1>
    <h2>Twoja ochrona jest na poziomie</h2>
    <svg viewBox="0 0 500 300">
      <path id="mpath" fill="none" stroke="#000000" stroke-miterlimit="10" d="M34,132.5c13.8,5.6,21.7,13.2,30,24.9c10.2,14.2,28.1,28,43.8,35.1
    	c23,10.5,47.2,2.3,65.8-13.6c13.4-11.4,30.7-24.5,49.2-24.6c18.9-0.1,37,16.4,52.5,26c15.3,9.5,30.1,19.8,46.6,26.7
    	c27.9,11.7,56.6-9.5,76-27.6c12-11.2,19-26,29.1-39.1c3.8-5,7-10.7,11.2-14.6c2-1.9,4-3.9,5.9-6c2.2-2.3,5.7-3.8,6.7-6
    	c9.6-3.9,20.1-10.1,30.9-9.7"/>
      <circle r="10" fill="orange">
    <animateMotion dur="5s" repeatCount="indefinite">
      <mpath xlink:href="#mpath" />
    </animateMotion>
  </circle>
</svg>

    <h2>Twoja odporność na:</h2>
    <pie-chart2></pie-chart2>


    <p>
      Odpowiedziałeś poprawne na {{ numOfCorrectAnswers }} pytań z {{ numOfAnswers }}.
      Na {{ numOfOmmitedQuestions }} nie udzieliłeś odpowiedzi.
    </p>
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
