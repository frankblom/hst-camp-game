<template>
  <div class="w-full flex justify-center mt-10">
    <Step v-for="(step, index) in steps" :key="index" :step="step" />
  </div>
</template>

<script>
import Step from "./Step.vue";
import { getSteps } from "@/app/admin/functions.js";
export default {
  components: { Step },
  props: {
    question: Object,
  },
  computed: {
    steps() {
      return getSteps(this.question);
    },
  },
};
</script>

<style></style>
