<template>
  <div class="w-full py-4">
    <h3 class="text-gray-400 text-2xl text-center mb-2">Poeng</h3>
    <div class="flex flex-wrap">
      <div
        class="text-center w-full mb-12"
        v-for="(team, index) in leaderboard"
        :key="index"
      >
        <div class="font-mono text-2xl text-white py-2">{{ team.points }}</div>
        <h3
          class="text-center uppercase text-md font-bold"
          :class="`text-team-${team.name}`"
        >
          {{ $t(team.name) }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    points: Array,
    teams: Array,
  },
  computed: {
    leaderboard() {
      return this.teams
        .map((t) => ({
          ...t,
          points: this.points
            .filter((p) => p.team_id == t.id)
            .reduce((acc, item) => acc + Number(item.count), 0),
        }))
        .sort((a, b) => {
          if (a.points > b.points) return -1;
          if (a.points < b.points) return +1;
          return 0;
        });
    },
  },
};
</script>

<style></style>
