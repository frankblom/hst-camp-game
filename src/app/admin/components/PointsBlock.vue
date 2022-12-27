<template>
  <div class="max-w-xl mx-auto mt-4">
    <h2 class="text-3xl text-center py-4 text-gray-700">Poeng</h2>
    <div class="w-full flex flex-col">
      <div class="w-full py-2 flex items-center" v-for="t in order" :key="t">
        <label
          class="text-xl text-center w-full capitalize block mb-2 text-right pr-4"
          :class="`text-team-${t}`"
          >{{ $t(t) }}</label
        >
        <input
          class="input font-mono mr-2"
          type="number"
          v-model="form[t]"
          min="0"
        />
        P
        <div class="ml-2 w-32">
          <Button size="small" @click="saveForTeam(t)">
            {{ hasScoreForTeam(t) ? "Update" : "Save" }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const points_order = [1, 0, 0, 0];
export default {
  props: {
    question: Object,
    points: Array,
    order: Array,
    isQuestion: Boolean,
  },
  data() {
    return {
      form: {
        orange: 0,
        blue: 0,
        purple: 0,
        yellow: 0,
      },
    };
  },
  methods: {
    hasScoreForTeam(team) {
      return Boolean(this.getScoreForTeam(team));
    },
    getScoreForTeam(team) {
      return this.points
        ? this.points.find((p) => p.team_id == team)
        : undefined;
    },
    setScoreForTeam(team) {
      const score = this.getScoreForTeam(team);
      if (score) {
        this.$set(this.form, team, score.count);
        return;
      }

      if (!this.question.with_points) return 0;

      const position = this.order.indexOf(team);

      const amount =
        this.question.point_order.length < position
          ? 0
          : this.question.point_order[position];

      this.$set(this.form, team, amount);
    },
    saveForTeam(team) {
      this.$emit("fire", {
        collection: "points",
        doc: `${team}-${this.question.id}`,
        data: {
          question_id: this.question.id,
          team_id: team,
          count: this.form[team],
        },
      });
    },
  },
  watch: {
    points: {
      immediate: true,
      handler() {
        this.order.forEach((t) => this.setScoreForTeam(t));
      },
    },
    order: {
      immediate: true,
      deep: true,
      handler() {
        this.order.forEach((t) => this.setScoreForTeam(t));
      },
    },
  },
};
</script>
