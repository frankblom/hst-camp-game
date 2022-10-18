<template>
  <div class="h-screen">
    <div
      v-if="showQuestion"
      class="px-4 flex flex flex-col h-screen text-white items-center pt-16 justify-between"
    >
      <div class="w-full text-2xl text-center mb-4">
        {{ question.text.en }}
      </div>
      <div class="w-full space-y-3 px-2">
        <Answer
          v-for="option in question.options"
          :key="option.id"
          :option="option"
          :selected="selected"
          :revealed="revealed"
          @select="selectAnswer"
        />
      </div>
      <div class="w-full flex-none text-center py-4">
        <span class="text-gray-400">1 av 4</span>
      </div>
    </div>
    <div v-if="showScore" class="h-screen flex items-center">
      <div v-if="isCorrect" class="text-white text-center w-full">
        <img class="w-32 h-32 mx-auto" src="@/assets/correct.png" />
        <h2 class="text-4xl py-4">Riktig svar!</h2>
        <span class="text-6xl font-bold">+74</span>
      </div>
      <div v-else class="text-white text-center w-full">
        <img class="w-32 h-32 mx-auto" src="@/assets/wrong.png" />
        <h2 class="text-4xl py-4">Feil svar!</h2>
        <span class="text-6xl font-bold">+0</span>
      </div>
    </div>
  </div>
</template>

<script>
import Answer from "../components/answer.vue";
export default {
  components: { Answer },
  props: {
    question: Object,
  },
  data() {
    return {
      selected: null,
      revealed: false,
      view: "question",
    };
  },
  computed: {
    showQuestion() {
      return this.view === "question";
    },
    showScore() {
      return !this.showQuestion;
    },
    isCorrect() {
      if (!this.selected) return false;
      return this.question?.options[this.selected]?.correct;
    },
  },
  methods: {
    selectAnswer(option) {
      if (this.selected !== null) return;
      this.selected = option.id;

      setTimeout(() => (this.revealed = true), 1000);
      setTimeout(() => (this.view = "score"), 2000);
    },
  },
};
</script>

<style></style>
