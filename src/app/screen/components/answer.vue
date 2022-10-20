<template>
  <div class="answer border-4 rounded-xl relative" :class="borderClass">
    <div class="answer-label flex items-center justify-center">
      <span class="text-3xl font-bold disable-select">{{ option.label }}</span>
    </div>
    <div class="px-2 text-white disable-select answer-text flex items-center">
      {{ option.Text.NB }}
    </div>
    <div
      v-if="revealed"
      class="marker absolute flex items-center justify-center rounded-full"
      :class="markerClass"
    >
      <svg
        v-if="isCorrect"
        width="26"
        height="21"
        viewBox="0 0 26 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.60004 10.3L10.4 18.1L23.4 2.5"
          stroke="#0B071D"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-if="isWrong"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.4 2.59961L2.60004 23.3996M2.60004 2.59961L23.4 23.3996"
          stroke="black"
          stroke-width="5"
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
        "border-wrong": this.isWrong,
        "border-correct": this.isCorrect,
      };
    },
    markerClass() {
      return {
        "bg-correct": this.isCorrect,
        "bg-wrong": this.isWrong,
      };
    },
  },
};
</script>

<style>
.answer {
  width: 609px;
  height: 175px;
  margin-bottom: 60px;
}

.answer-label {
  background: #e8d472;
  position: absolute;
  color: #1e1e1e;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  top: 57px;
  left: 30px;
}

.answer-text {
  position: absolute;
  font-size: 24px;
  line-height: 38px;
  font-weight: bold;
  left: 120px;
  width: 457px;
  min-height: 170px;
}

.marker {
  right: -26px;
  width: 52px;
  height: 50px;
  top: 50%;
  margin-top: -25px;
  border: 4px solid #1e1e1e;
}
</style>
