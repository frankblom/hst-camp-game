<template>
  <button
    class="rounded-xl w-full"
    :class="[bgClass, padding]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    variant: {
      type: String,
      default: "primary",
    },
    status: String,
  },
  computed: {
    bgClass() {
      return {
        "bg-blue-500 text-white": this.variant === "primary",
      };
    },
    padding() {
      return {
        "py-3 px-2": this.variant === "primary",
      };
    },
  },
};
</script>

<style></style>
