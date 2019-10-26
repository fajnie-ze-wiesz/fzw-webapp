<template>
    <transition
        name="question-transition"
        v-on:after-enter="afterEnter"
    >
        <div :class="['card', 'img', ...cardClasses]" :style="'background-image: url(' + question.imageUrl + ')'"></div>
    </transition>
</template>

<script>
export default {
  name: 'quest-card',
  props: ['question'],
  computed: {
    cardClasses () {
      let classes = [];
      if (this.question.answer) {
        classes.push(this.question.expectedAnswer === 'no' ? 'fake' : 'news')
        classes.push(this.question.expectedAnswer === this.question.answer ? 'correct' : 'wrong')
        classes.push(this.question.expectedAnswer === this.question.answer ? 'ready' : '')
      }
      return classes
    }
  },
  methods: {
    afterEnter: function (el) {
    }
  }
}
</script>

<style scoped>
  img{
    width: 100%;
  }
  .card.img {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  button.answer{
    padding: 2vh 1vh;
    width: 45%;
  }

  .buttons {
    position: absolute;
    bottom: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
  }

  .question-transition-enter {
    transform: translateY(100vmax);
  }
  .question-transition-enter-active {
    transition: all 1.5s ease-in-out;
  }
  .question-transition-leave-active {
    transition: all 1.5s ease-in-out;
  }
  .question-transition-leave-active.wrong{
    transform: translateX(100vmin);
  }
  .question-transition-leave-active.correct{
    transform: translateX(-100vmin);
  }
  .question-transition-leave-to.correct {
    background-blend-mode: multiply;
    background-color: rgba(0, 255, 0, 1);
  }
  .question-transition-leave-to.wrong  {
    background-blend-mode: multiply;
    background-color: rgba(255, 0, 0, 1);
  }
  .question-transition-leave-to {
    opacity: 0;
  }
</style>
