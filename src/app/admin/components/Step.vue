<template>
  <div
    class="px-4 uppercase font-bold text-center items-center flex"
    :class="activeClass"
  >
    {{ index + 1 }}. {{ step.name }}
  </div>
</template>

<script>
export default {
  props: {
    step: Object,
    index: Number,
  },
  computed: {
    activeClass() {
      if (this.step.completed) return "text-green-700";
      if (this.step.active) return "text-yellow-500 underline";
      return "text-gray-500";
    },
  },
};
</script>

<style></style>
