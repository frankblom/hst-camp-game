<template>
  <div class="w-full" :class="bgClass">
    <div
      class="text-white w-full py-2 px-3 cursor-pointer hover:bg-gray-900"
      @click="$emit('open', question.id)"
    >
      <div class="w-full flex items-center">
        <h2
          class="text-3xl leading-loose"
          :class="opened ? 'text-white' : 'text-gray-400'"
        >
          {{ question.title }}
        </h2>
        <span class="ml-auto font-bold text-lg" :class="stepClass"
          >{{ stepIndex }} / {{ stepList.length }}</span
        >
      </div>
    </div>
    <div v-if="opened" class="w-full">
      <div v-if="isQuestion" class="w-full text-center q-text px-12">
        {{ $t(questionKey) }}
      </div>
      <Stepper :question="question" :step="question.step" />
      <QuestionResults
        :question="question"
        :step="question.step"
        :penalties="penalties"
        :points="points"
        @applyPenalty="onApplyPenalty"
      />

      <div
        class="w-full flex p-3 justify-between border-t border-gray-800 mt-12"
      >
        <div class="flex space-x-2">
          <Button class="mr-auto" size="small" @click="clear">Clear</Button>
          <Button class="mr-auto" v-if="showPrevious" size="small" @click="prev"
            >Prev</Button
          >
        </div>
        <Button
          :disabled="!canGoToNext"
          class="ml-auto"
          size="small"
          @click="next"
          >{{ nextText }}</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { db, functions } from "@/app/admin/db.js";
import { httpsCallable } from "firebase/functions";
import Stepper from "./Stepper.vue";

import QuestionResults from "./QuestionResults.vue";
import {
  getPrevStepForQuestion,
  getNextStepForQuestion,
  stepsForQuestion,
} from "@/app/admin/functions.js";
import { PAGE_FOR_STEPS, PAGE_HOME } from "@/const/pages.js";
import { NO_STEP, APPLY_PENALTY_STEP, SCORE_STEP } from "@/const/steps.js";

export default {
  components: {
    Stepper,
    QuestionResults,
  },
  props: {
    question: Object,
    opened: Boolean,
    active: Boolean,
    points: Array,
    penalties: Array,
  },
  computed: {
    isQuestion() {
      return this.question.type === "pre" || this.question.type === "game";
    },
    hasPoints() {
      return this.question.with_points;
    },
    hasPenalty() {
      return this.question.with_penalty;
    },
    isPregame() {
      return this.question.type === "pre";
    },
    questionKey() {
      return this.isPregame ? "PG-text" : `${this.question.id}-text`;
    },
    bgClass() {
      if (this.active) return "border border-red-400";
      if (this.opened) return "border border-gray-500 bg-gray-900";
      return "";
    },
    nextText() {
      if (!this.showNext) return "CLOSE";
      if (!this.prevStep) return "START";
      return "Neste";
    },
    showNext() {
      return this.nextStep !== false;
    },
    showPrevious() {
      return this.prevStep !== false;
    },
    nextStep() {
      return getNextStepForQuestion(this.question);
    },
    prevStep() {
      return getPrevStepForQuestion(this.question);
    },
    canGoToNext() {
      if (!this.hasPoints || !this.hasPenalty || !this.question) return true;
      if (this.nextStep != SCORE_STEP) return true;
      if (this.penalties.length < 4) return false;
      if (this.points.length < 4) return false;
      return true;
    },
    stepList() {
      return stepsForQuestion(this.question);
    },
    stepIndex() {
      return this.question.step
        ? this.stepList.indexOf(this.question.step) + 1
        : 0;
    },
    stepClass() {
      if (this.stepList.length === this.stepIndex) return "text-green-400";
      if (this.stepIndex > 0) return "text-yellow-500";
      return "text-gray-500";
    },
  },
  methods: {
    setStep(step) {
      const question = db.collection("questions").doc(this.question.id);
      question.update({ step });

      db.collection("games").doc("game").update({
        page: PAGE_FOR_STEPS[step],
        question: question,
      });

      if (step == APPLY_PENALTY_STEP) {
        this.onApplyPenalty();
      }
    },
    next() {
      if (!this.canGoToNext) return;

      if (this.nextStep === false) {
        this.close();
      } else {
        this.setStep(this.nextStep);
      }
    },
    prev() {
      if (this.prevStep !== false) {
        this.setStep(this.prevStep);
      }
    },
    close() {
      db.collection("games").doc("game").update({
        page: PAGE_HOME,
        question: null,
      });
      this.$emit("open", "next");
    },
    clear() {
      this.setStep(NO_STEP);
    },
    onApplyPenalty() {
      const executePenalty = httpsCallable(functions, "executePenalty");
      executePenalty({ question_id: this.question.id }).then((result) => {
        console.log(result);
      });
    },
  },
};
</script>

<style>
.q-text {
  font-size: 24px;
  font-weight: bold;
}
</style>
