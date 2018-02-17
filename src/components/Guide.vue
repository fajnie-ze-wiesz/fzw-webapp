<template>
  <div id="guide">
    <img src="http://via.placeholder.com/120x120" alt="">

    <div class="tips">
      <h1>Wskazówka</h1>
      <p>Za chwilę zobaczysz 10 przykładów treści, które pojawiły się w internecie.</p>
      <p>Sprawdź, czy kliknąłbyś, aby przeczytać więcej.</p>
      <p>Masz 5 sekund na decyzję.</p>
      <button v-on:click="startQuiz">ok, zaczynamy!</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'guide',
  methods: {
    startQuiz () {
      this.$router.push('/quest')
    }
  }
}
</script>

<!-- Global CSS -->

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  .tips{
    background: white;
    padding: 5vmin;
  }
</style>
