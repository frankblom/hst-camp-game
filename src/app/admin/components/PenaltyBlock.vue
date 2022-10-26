<template>
  <div class="max-w-xl mx-auto mt-4">
    <h2 class="text-3xl text-center py-4 text-gray-700">Straff</h2>
    <div class="w-full flex flex-col">
      <div class="w-full py-2 flex items-center" v-for="t in order" :key="t">
        <label
          class="text-xl text-center block capitalize block mb-2 text-right pr-4 w-full"
          :class="`text-team-${t}`"
          >{{ $t(t) }}</label
        >
        <input
          class="input font-mono mr-2"
          type="number"
          v-model="form[t]"
          :disabled="!canSaveForTeam(t)"
          min="0"
        />
        %
        <div class="ml-2 w-32">
          <Button
            size="small"
            @click="saveForTeam(t)"
            v-if="canSaveForTeam(t)"
            >{{ hasPenaltyForTeam(t) ? "Update" : "Save" }}</Button
          >
          <small v-else class="text-red-400">Kicked {{ kickedCount(t) }}</small>
        </div>
      </div>
      <div class="flex justify-center mt-4" v-if="notApplied && canApplyKick">
        <Button size="small" variant="danger" @click="$emit('applyPenalty')"
          >Apply Kick</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
const kick_percentage = [0, 10, 15, 25];

export default {
  props: {
    question: Object,
    penalties: Array,
    order: Array,
  },
  data() {
    return {
      form: {
        orange: 0,
        blue: 0,
        pink: 0,
        green: 0,
      },
    };
  },
  computed: {
    notApplied() {
      return this.penalties.filter((p) => p.executed).length < 4;
    },
    canApplyKick() {
      return this.penalties.filter((p) => p.count !== undefined).length >= 4;
    },
  },
  methods: {
    hasPenaltyForTeam(team) {
      return Boolean(this.penaltyForTeam(team));
    },
    penaltyForTeam(team) {
      return this.penalties
        ? this.penalties.find((p) => p.team_id == team)
        : undefined;
    },
    kickedCount(team) {
      const p = this.penaltyForTeam(team);
      return p && p.count > 0 ? p.count : "0";
    },
    setForTeam(team) {
      const penalty = this.penaltyForTeam(team);
      if (penalty) {
        this.$set(this.form, team, penalty.percentage);
        return;
      }

      const position = this.order.indexOf(team);
      const amount = kick_percentage[position];

      this.$set(this.form, team, amount);
    },
    saveForTeam(team) {
      this.$emit("fire", {
        collection: "penalties",
        doc: `${team}-${this.question.id}`,
        data: {
          question_id: this.question.id,
          team_id: team,
          percentage: this.form[team],
        },
      });
    },
    canSaveForTeam(team) {
      const penalty = this.penaltyForTeam(team);
      if (!penalty) return true;
      return !penalty.executed;
    },
  },
  mounted() {
    this.order.forEach((t) => this.setForTeam(t));
  },
  watch: {
    penalties: {
      handler() {
        this.order.forEach((t) => this.setForTeam(t));
      },
    },
    order: {
      handler() {
        this.order.forEach((t) => this.setForTeam(t));
      },
    },
  },
};
</script>
