<template>
  <div>
    <transition name="fade">
      <div v-show="show" class="modal">
        <div class="content card">
          <div class="close-icon" @click="close()">✕</div>
          <slot :name="page"></slot>
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
  created() {
    console.log();
  },
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    slotsNumber() {
      return Object.keys(this.$slots).length;
    },
  },
  methods: {
    incrementPage() {
      if (this.page === this.slotsNumber - 1) {
        this.close();
      } else {
        this.page++;
      }
    },
    close() {
      setTimeout(() => {
        this.page = 0;
      }, 200);
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
  .modal{
    font-size: 60%;
  }
  .close-icon {
      align-self: end;
      cursor: pointer;
      font-size: 150%;
  }
  .content{
    position: fixed;
    top: 5%;
    left: 5%;
    height: 90%;
    width: 90%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-sizing: border-box;
    padding: 5vh;
    text-align: left;
    align-items: center;
  }
  button {
    margin: 0;
  }
  @media screen and (min-device-aspect-ratio: 1/1)  {
    .content{
      width: calc(90vh/16*10);
      left: calc((100vw - 90vh/16*10)/2);
    }
  }
</style>
