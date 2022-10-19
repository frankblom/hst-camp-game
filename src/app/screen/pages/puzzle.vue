<template>
  <transition>
    <div class="page">
      <label class="label">Oppgave:</label>
      <h2 class="question">{{ question.text["nb"] }}</h2>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    question: Object,
  },
  computed: {
    showScore() {
      return false;
    },
  },
};
</script>

<style>
.label {
  display: block;
  width: 135px;
  margin: 112px auto 30px auto;

  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  color: #e8d472;
}
.question {
  color: #e5e5e5;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}
</style>
