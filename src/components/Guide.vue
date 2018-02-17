<template>
  <div id="guide">
    <h1>TODO: Guide</h1>
    <p>Wskazówki</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <router-link class="vbutton" :to="{ name: 'Quest', params: {} }">Kontynuuj</router-link>
  </div>
</template>

<script>
  export default {
    name: 'guide'
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
