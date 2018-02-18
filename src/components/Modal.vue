<template>
  <div class="modal">
    <!-- <div class="" @click="$emit('close')">
      X
    </div> -->
    <div class="content">
      <slot></slot>
      <div class="">
        dotknij by schować
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
h1{
  margin-top: 1em;
}
  .modal{
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: white;
  }
  .content{
    padding: 5vmin;
    overflow-y: scroll;
    text-align: left;
  }
</style>
