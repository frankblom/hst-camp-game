<template>
  <div class="score-wrapper w-full flex">
    <ScoreBlock
      v-for="label in labels"
      :key="label"
      :label="label"
      :team="team"
      :total="totalAnswers"
      :highlighted="highlighted == label"
      :score="score[label].count"
    />
  </div>
</template>

<script>
import ScoreBlock from "./ScoreBlock.vue";
export default {
  components: { ScoreBlock },
  props: {
    score: Object,
    team: String,
    highlighted: String,
  },
  computed: {
    totalAnswers() {
      return Object.values(this.score).reduce((acc, s) => acc + s.count, 0);
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
