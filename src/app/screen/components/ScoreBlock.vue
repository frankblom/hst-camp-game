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
/* .team-green .bar {
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
} */

.team-yellow .bar {
  border-color: #ffde59;
}
.team-yellow .percentage-label {
  color: #ffde59;
}
.team-yellow.highlighted .bar {
  background: #ffde59;
}

.team-purple .bar {
  border-color: #8c52ff;
}
.team-purple .percentage-label {
  color: #8c52ff;
}
.team-purple.highlighted .bar {
  background: #8c52ff;
}

.team-blue .bar {
  border-color: #1ec5e0;
}
.team-blue .percentage-label {
  color: #1ec5e0;
}
.team-blue.highlighted .bar {
  background: #1ec5e0;
}

.team-orange .bar {
  border-color: #fe7f30;
}
.team-orange .percentage-label {
  color: #fe7f30;
}
.team-orange.highlighted .bar {
  background: #fe7f30;
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
