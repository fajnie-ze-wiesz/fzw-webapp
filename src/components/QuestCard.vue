<template>
    <transition
        name="question-transition"
    >
        <div :class="['card', 'img', this.answerClass]" :style="'background-image: url(' + question.imageUrl + ')'"></div>
    </transition>
</template>

<script>
export default {
  name: 'quest-card',
  props: ['question'],
  computed: {
    answerClass() {
      if (this.question.answer === 'yes') {
        return 'answer-true';
      } else if (this.question.answer === 'no') {
        return 'answer-false';
      }
      return null;
    },
  },
};
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
    transition: all 1.5s ease;
  }
  .question-transition-leave-active {
    transition: all 1.5s ease;
  }
  .question-transition-leave-active.answer-true{
    transform: translateX(-100vmin);
  }
  .question-transition-leave-active.answer-false{
    transform: translateX(100vmin);
  }
  .question-transition-leave-to {
    opacity: 0;
  }
</style>
