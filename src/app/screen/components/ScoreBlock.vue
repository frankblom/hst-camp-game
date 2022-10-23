<template>
  <div class="scoreblock" :class="[teamClass, highlightClass]" :style="styles">
    <div class="top text-right">
      <span class="percentage-label" v-show="highlighted"
        >{{ percentageLabel }}%</span
      >
    </div>
    <div class="bar text-center">
      <span class="answer-option">{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    team: String,
    total: Number,
    score: Number,
    highlighted: Boolean,
  },
  computed: {
    percentage() {
      if (!this.score) return 0;
      return (this.score / this.total) * 100;
    },
    percentageLabel() {
      return Math.floor(this.percentage);
    },
    styles() {
      return {
        width: `${this.total > 0 ? this.percentage : 100}%`,
      };
    },
    teamClass() {
      return `team-${this.team}`;
    },
    highlightClass() {
      return this.highlighted ? "highlighted" : "";
    },
  },
};
</script>

<style>
.team-green .bar {
  border-color: #95c93d;
}
.team-green .percentage-label {
  color: #95c93d;
}
.team-green.highlighted .bar {
  background: #95c93d;
}

.team-pink .bar {
  border-color: #d31c67;
}
.team-pink .percentage-label {
  color: #d31c67;
}
.team-pink.highlighted .bar {
  background: #d31c67;
}

.team-blue .bar {
  border-color: #6fccdd;
}
.team-blue .percentage-label {
  color: #6fccdd;
}
.team-blue.highlighted .bar {
  background: #6fccdd;
}

.team-orange .bar {
  border-color: #f68b2a;
}
.team-orange .percentage-label {
  color: #f68b2a;
}
.team-orange.highlighted .bar {
  background: #f68b2a;
}

.highlighted .answer-option {
  color: #131939;
}

.scoreblock {
  min-width: 50px;
}

.top {
  height: 50px;
  width: 100%;
}

.percentage-label {
  font-size: 35px;
  line-height: 49px;
  font-weight: 700;
  /* display: block; */
}

.bar {
  height: 48px;
  width: 100%;
  border-width: 2px;
  transition: background 0.2s linear;
}

.answer-option {
  color: #e5e5e5;
  font-size: 28px;
  font-weight: bold;
}
</style>
