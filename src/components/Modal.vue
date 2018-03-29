<template>
  <div class="container">
    <transition name="fade">
      <div v-show="show" class="modal card">
        <div class="content">
          <div style="text-align: right; cursor: pointer" @click="close()" >x</div>
          <slot :name="page"></slot>
          <!-- <slot></slot> -->
          <button class="main-cta" @click="incrementPage" type="button" name="button">
            <div v-show="page === 0">Zwiększ odporność</div>
            <div v-show="page !== slotsNumber - 1 && page !== 0">Dalej</div>
            <div v-show="page === slotsNumber - 1">Teraz już wiem!</div>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['show'],
  created () {
    console.log()
  },
  data () {
    return {
      page: 0
    }
  },
  computed: {
    slotsNumber () {
      return Object.keys(this.$slots).length
    }
  },
  methods: {
    incrementPage () {
      if (this.page === this.slotsNumber - 1) {
        this.close()
      } else {
        this.page++
      }
    },
    close () {
      setTimeout(() => {
        this.page = 0
      }, 200)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .container {
    /* width: 0; */
    /* height: 0; */
  }
  .modal{
    position: fixed;
    /* width: calc(100vh/16*10); */
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    font-size: 70%;
    /* background: white; */
  }
  .content{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-sizing: border-box;
    padding: 5vmin;
    overflow-y: auto;
    text-align: left;
    height: 100%;
    width: 100%;
  }
</style>
