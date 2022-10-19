<template>
  <div class="w-full text-center second" :class="focusClass">
    {{ second }}
  </div>
</template>

<script>
export default {
  props: {
    second: Number,
    current: Number,
  },
  computed: {
    infocus() {
      return this.current === this.second;
    },
    distance() {
      return Math.abs(this.current - this.second);
    },
    focusClass() {
      if (this.infocus) return "focus opacity-100";
      if (this.distance == 1) return "opacity-50";
      if (this.distance == 2) return "opacity-25";
      return "opacity-0";
    },
  },
};
</script>

<style>
.second {
  font-size: 64px;
  line-height: 78px;
  font-weight: bold;
  height: 78px;
  margin: 50px 0;

  transition: opacity 500ms ease-in-out, margin 400ms ease-in-out;
}

.second.focus {
  margin: 90px 0;
}
</style>
