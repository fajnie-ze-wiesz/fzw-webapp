<template>
  <img
    :src="question.imageUrl"
    :class="['card', 'img', answerClass]"
    alt=""
  >
</template>

<script>
export default {
  name: 'QuestCard',
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
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
  .card.img {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .card {
    border-radius: .8em;
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
