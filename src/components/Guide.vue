<template>
  <div id="guide">
    <h1>Wskazówka</h1>
    <p>
      Za chwilę zobaczysz
      10 przykładów treści,
      które pojawiły się w internecie.

      Sprawdź, czy kliknąłbyś,
      aby przeczytać więcej.

      Masz 5 sekund na decyzję.
    </p>
    <button v-on:click="startQuiz">OK, zaczynamy!</button>
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
<style>
  code {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    font-size: 0.9em;
    white-space: pre-wrap;
    color: #2c3e50;
  }

  code::before, code::after {
    content: '`';
  }
</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  #guide {
    text-align: center;
  }

  #guide h1 {
    color: #2c3e50;
    font-weight: 300;
    margin: 0;
  }
</style>
