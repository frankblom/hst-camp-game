<template>
  <div class="score-wrapper w-full flex">
    <ScoreBlock
      v-for="label in labels"
      :key="label"
      :label="label"
      :team="team"
      :total="totalAnswers"
      :highest="highestScore"
      :highlighted="highlighted == label"
      :score="scoreForKey(label)"
    />
  </div>
</template>

<script>
import ScoreBlock from "./ScoreBlock.vue";
export default {
  components: { ScoreBlock },
  props: {
    score: Array,
    team: String,
    highlighted: String,
  },
  computed: {
    totalAnswers() {
      return this.score.reduce((acc, s) => acc + s.count, 0);
    },
    highestScore() {
      return this.score.map((x) => x.count).sort((a, b) => b - a)[0];
    },
    labels() {
      return ["A", "B", "C", "D"];
    },
  },
  methods: {
    scoreForKey(key) {
      const s = this.score.find((x) => x.label == key);
      return s ? s.count : 0;
    },
  },
};
</script>

<style>
.score-wrapper {
  margin-bottom: 28px;
}
</style>
