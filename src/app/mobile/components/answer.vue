<template>
  <div
    class="w-full border-2 rounded-xl flex items-center pl-3 py-4 relative"
    :class="[borderClass, bgClass]"
    @click="$emit('select', option)"
  >
    <div
      class="label h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center"
      :class="labelClass"
    >
      <span class="text-3xl font-bold disable-select">{{ option.label }}</span>
    </div>
    <div class="px-2 disable-select">{{ $t(option.id) }}</div>
    <div
      v-if="revealed"
      class="marker absolute flex items-center justify-center rounded-full"
      :class="markerClass"
    >
      <svg
        v-if="isCorrect"
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.40002 5.7L5.60002 9.9L12.6 1.5"
          stroke="black"
          stroke-width="2.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-if="isWrong"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.6 1.3999L1.40002 12.5999M1.40002 1.3999L12.6 12.5999"
          stroke="black"
          stroke-width="2.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: Object,
    selected: String,
    revealed: Boolean,
    canPress: Boolean,
  },
  computed: {
    isCorrect() {
      if (!this.revealed) return false;
      return this.option.correct === true;
    },
    isWrong() {
      if (!this.revealed) return false;
      return !this.isCorrect;
    },
    hasSelected() {
      return Boolean(this.selected);
    },
    isSelected() {
      return this.selected == this.option.id;
    },
    borderClass() {
      return {
        "border-white": !this.revealed,
        "border-red-400": this.isWrong,
        "border-green-300": this.isCorrect,
      };
    },
    bgClass() {
      if (!this.canPress) return "opacity-50";

      if (this.hasSelected) {
        return this.isSelected ? "selected" : "opacity-50";
      }
      return "";
    },
    markerClass() {
      return {
        "bg-green-300": this.isCorrect,
        "bg-red-400": this.isWrong,
      };
    },
    labelClass() {
      return {
        "bg-yellow-300": !this.revealed,
        "bg-red-400": this.isWrong,
        "bg-green-300": this.isCorrect,
      };
    },
  },
};
</script>

<style>
.label {
  color: #1e1e1e;
}

.selected {
  background: #2e2948;
}

.marker {
  right: -0.9rem;
  width: 1.8rem;
  height: 1.8rem;
  border: 2px solid #1e1e1e;
}
</style>
