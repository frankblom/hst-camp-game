<template>
  <div
    class="px-4 uppercase font-bold text-center items-center flex"
    :class="activeClass"
  >
    {{ step.name }}
  </div>
</template>

<script>
export default {
  props: {
    step: Object,
  },
  computed: {
    activeClass() {
      if (this.step.completed) return "text-green-500";
      if (this.step.active) return "text-yellow-500";
      return "text-gray-500";
    },
  },
};
</script>

<style></style>
