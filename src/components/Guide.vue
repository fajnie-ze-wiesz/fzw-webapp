<template>
  <div id="guide">
    <h1>TODO: Guide</h1>
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
