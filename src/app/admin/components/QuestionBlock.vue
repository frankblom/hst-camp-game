<template>
  <div class="border-b border-gray-800 w-full" :class="bgClass">
    <div
      class="text-white w-full py-2 px-3 cursor-pointer hover:bg-gray-900"
      @click="$emit('open', question.id)"
    >
      <div class="header text-2xl leading-loose">
        <span class="text-gray-400">{{ title }}</span>
        <b class="ml-2">{{ question.number }}</b>
      </div>
    </div>
    <div v-if="opened" class="w-full">
      <div class="w-full text-center q-text px-12">{{ $t(questionKey) }}</div>
      <Stepper :question="question" :step="question.step" />
      <div class="w-full py-10">Score</div>
      <div class="w-full flex p-3 justify-between">
        <div class="flex space-x-2">
          <Button class="mr-auto" size="small" @click="clear">Clear</Button>
          <Button class="mr-auto" v-if="showPrevious" size="small" @click="prev"
            >Prev</Button
          >
        </div>
        <Button class="ml-auto" size="small" @click="next">{{
          nextText
        }}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/app/admin/db.js";
import Stepper from "./Stepper.vue";
import {
  getPrevStepForQuestion,
  getNextStepForQuestion,
} from "@/app/admin/functions.js";
import { PAGE_FOR_STEPS, PAGE_HOME } from "@/const/pages.js";
import { NO_STEP } from "@/const/steps.js";

export default {
  components: { Stepper },
  props: {
    question: Object,
    opened: Boolean,
    active: Boolean,
  },
  computed: {
    isPregame() {
      return this.question.type === "pre";
    },
    questionKey() {
      return this.isPregame ? "PG-text" : `${this.question.id}-text`;
    },
    title() {
      return this.isPregame ? "Pre Game Spørsmål" : "Spørsmål";
    },
    bgClass() {
      if (this.active) return "border border-red-400";
      if (this.opened) return "bg-gray-900";
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
  },
  methods: {
    setStep(step) {
      const question = db.collection("questions").doc(this.question.id);
      question.update({ step });

      db.collection("games").doc("game").update({
        page: PAGE_FOR_STEPS[step],
        question: question,
      });
    },
    next() {
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
    },
    clear() {
      db.collection("questions")
        .doc(this.question.id)
        .update({ step: NO_STEP });
    },
    startClock() {},
    setScore() {},
    setPenalty() {},
  },
};
</script>

<style>
.q-text {
  font-size: 24px;
  font-weight: bold;
}
</style>
