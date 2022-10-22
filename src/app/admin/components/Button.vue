<template>
  <button
    class="border-2 rounded"
    :class="[bgClass, padding, textSize]"
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
    size: {
      type: String,
      default: "large",
    },
    status: String,
  },
  computed: {
    bgClass() {
      return {
        "border-blue-500 text-blue-500 hover:bg-blue-300 hover:border-blue-300 hover:text-black":
          this.variant === "primary",
        "border-red-500 bg-red-500 text-black": this.variant === "active",
      };
    },

    padding() {
      return {
        "py-2 px-4": this.size === "large",
        "py-1 px-3": this.size === "small",
      };
    },

    textSize() {
      return {
        "text-xl": this.size === "large",
        "text-lg": this.size === "small",
      };
    },
  },
};
</script>

<style></style>
