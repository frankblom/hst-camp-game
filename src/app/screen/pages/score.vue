<template>
  <div class="page">
    <h2 class="title">Resultat:</h2>
    <TransitionGroup class="scorebox" tag="div" name="slide-down">
      <ScoreLine
        v-for="(score, index) in result"
        :score="score.answers"
        :team="score.team"
        :key="index"
        :style="{ '--i': index }"
        :highlighted="highlighted"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import ScoreLine from "../components/ScoreLine.vue";
import { db } from "../db";
export default {
  components: { ScoreLine },
  props: {
    question: Object,
  },
  data() {
    return {
      highlighted: "B",
      showScore: true,
    };
  },
  computed: {
    result() {
      if (!this.showScore) return [];
      return [
        {
          pos: 0,
          team: "red",
          answers: [
            { label: "A", count: 100 },
            { label: "B", count: 400 },
            { label: "C", count: 185 },
            { label: "D", count: 2 },
          ],
        },
        {
          pos: 1,
          team: "green",
          answers: [
            { label: "A", count: 2 },
            { label: "B", count: 600 },
            { label: "C", count: 185 },
            { label: "D", count: 600 },
          ],
        },
        {
          pos: 2,
          team: "blue",
          answers: [
            { label: "A", count: 200 },
            { label: "B", count: 900 },
            { label: "C", count: 185 },
            { label: "D", count: 2 },
          ],
        },
        {
          pos: 3,
          team: "orange",
          answers: [
            { label: "A", count: 96 },
            { label: "B", count: 500 },
            { label: "C", count: 185 },
            { label: "D", count: 2 },
          ],
        },
      ];
    },
  },
  methods: {
    h(key) {
      if (this.highlighted) {
        this.$set(this, "highlighted", null);
      } else {
        this.$set(this, "highlighted", key);
      }
    },
    show() {
      this.showScore = !this.showScore;
    },
  },
  mounted() {
    console.log("TESTY");
  },
};
</script>

<style>
.title {
  color: #e6e7e7;
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
  max-width: 400px;
  margin: 118px auto 0 auto;
}

.scorebox {
  position: absolute;
  width: 850px;
  top: 286px;
  left: 440px;
  height: 200px;
}

.slide-down-move {
  transition: opacity 0.5s linear, transform 0.5s ease-in-out;
}
.slide-down-leave-active {
  transition: opacity 0.4s linear, transform 0.4s cubic-bezier(0.5, 0, 0.7, 0.4);
  transition-delay: calc(0.05s * (0 - var(--i)));
}
.slide-down-enter-active {
  transition: opacity 0.5s linear, transform 0.5s cubic-bezier(0.2, 0.5, 0.1, 1);
  transition-delay: calc(0.1s * var(--i));
}
.slide-down-enter,
.slide-down-leave-to {
  opacity: 0;
}
.slide-down-enter {
  transform: translateY(-4em);
}
.slide-down-leave-to {
  transform: translateY(-4em);
}
</style>
