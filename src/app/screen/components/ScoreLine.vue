<template>
  <div class="score-wrapper w-full flex">
    <ScoreBlock
      v-for="label in labels"
      :key="label"
      :label="label"
      :team="team"
      :total="total"
      :highlighted="highlighted == label"
      :score="answers[label].count"
    />
  </div>
</template>

<script>
import ScoreBlock from "./ScoreBlock.vue";
export default {
  components: { ScoreBlock },
  props: {
    answers: Object,
    team: String,
    total: Number,
    highlighted: String,
  },
  computed: {
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
