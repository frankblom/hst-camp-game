<template>
  <div class="h-screen">
    <transition name="fade">
      <div
        class="px-4 flex flex flex-col h-screen text-white items-center pt-16 justify-evenly"
        v-if="!showScore"
      >
        <div class="w-full text-2xl text-center mb-4">
          {{ $t(questionKey) }}
        </div>
        <transition name="fade">
          <div class="w-full space-y-3 px-2" v-if="showOptions">
            <Answer
              v-for="option in answers"
              :key="option.id"
              :option="option"
              :selected="selected"
              :revealed="reveal"
              :canPress="canVote"
              @select="selectAnswer"
            />
          </div>
        </transition>
        <div class="w-full flex-none text-center py-4"></div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="showScore" class="h-screen flex items-center">
        <div v-if="isCorrect" class="text-white text-center w-full">
          <img class="w-32 h-32 mx-auto" src="@/assets/correct.png" />
          <h2 class="text-4xl py-4">{{ $t("answer-correct") }}</h2>
        </div>
        <div v-else class="text-white text-center w-full">
          <img class="w-32 h-32 mx-auto" src="@/assets/wrong.png" />
          <h2 class="text-4xl py-4">{{ $t("answer-wrong") }}</h2>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Answer from "../components/answer.vue";
import { answerSort } from "@/app/functions.js";
import {
  SHOW_ANSWERS_STEP,
  SCORE_STEP,
  START_CLOCK_STEP,
} from "@/const/steps.js";
export default {
  components: { Answer },
  props: {
    question: Object,
    response: Object,
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    questionKey() {
      return this.question.type == "game"
        ? `${this.question.id}-text`
        : "PG-text";
    },
    reveal() {
      return this.question.step >= SHOW_ANSWERS_STEP;
    },
    showScore() {
      return this.question.step >= SCORE_STEP;
    },
    canVote() {
      return this.question.step == START_CLOCK_STEP;
    },
    showOptions() {
      return this.question.step >= START_CLOCK_STEP;
    },
    answers() {
      return Object.keys(this.question.options)
        .map((id) => ({
          ...this.question.options[id],
          id,
        }))
        .sort(answerSort);
    },
    isCorrect() {
      if (!this.selected) return false;
      return this.question?.options[this.selected]?.correct;
    },
  },
  methods: {
    selectAnswer(option) {
      if (this.selected !== null || !this.canVote) return;

      this.selected = option.id;

      this.$emit("answer", {
        answer: option,
        question: this.question,
      });
    },
  },
  watch: {
    response: {
      deep: true,
      immediate: true,
      handler() {
        if (this.response) {
          this.selected = this.response.answer_id;
        } else {
          this.selected = null;
        }
      },
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-active {
  transition-delay: 500ms;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
