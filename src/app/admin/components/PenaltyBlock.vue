<template>
  <div class="max-w-xl mx-auto mt-4">
    <h2 class="text-3xl text-center py-4 text-gray-700">Straff</h2>
    <div class="w-full flex flex-col">
      <div class="w-full py-2 flex items-center" v-for="t in teams" :key="t">
        <label
          class="text-2xl text-center w-full capitalize block mb-2 text-right pr-4"
          :class="`text-team-${t}`"
          >{{ $t(t) }}</label
        >
        <input
          class="input font-mono"
          type="number"
          v-model="form[t]"
          min="0"
        />
        %
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    penalties: Array,
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
    teams() {
      return ["orange", "green", "pink", "blue"];
    },
  },
  methods: {
    setForTeam(team) {
      const penalty = this.penalties.find((p) => p.team_id == team);
      if (!penalty) {
        this.$set(this.form, team, 0);
      } else {
        this.$set(this.form, team, penalty.count);
      }
    },
  },
  watch: {
    penalties: {
      immediate: true,
      handler() {
        this.teams.forEach((t) => this.setForTeam(t));
      },
    },
  },
};
</script>

<style>
.input {
  background: black;
  background: black;
  text-align: center;
  line-height: 54px;
  border-radius: 5px;
  font-size: 30px;
  width: 100px;
}
</style>
