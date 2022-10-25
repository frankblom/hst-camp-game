<template>
  <div class="max-w-xl mx-auto mt-4">
    <h2 class="text-3xl text-center py-4 text-gray-700">Svarene</h2>
    <table>
      <tr>
        <th class="border-b py-2 text-2xl">Team</th>
        <th class="border-b py-2 text-2xl" v-for="label in labels" :key="label">
          {{ label }}
        </th>
      </tr>
      <tr v-for="team in order" :key="team">
        <td class="text-xl uppercase pr-3" :class="`text-team-${team}`">
          {{ $t(team) }}
        </td>
        <td
          v-for="label in labels"
          :key="label"
          class="text-center text-lg px-6 py-2"
          :class="correct === label ? 'text-white' : 'text-gray-500'"
        >
          {{
            getPercentage(
              responses[team].answers[label].count,
              responses[team].total
            )
          }}
          %
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    responses: Object,
    order: Array,
  },
  computed: {
    correct() {
      if (!this.question || !this.question.correct) return false;
      return this.question.correct;
    },
    labels() {
      return ["A", "B", "C", "D"];
    },
  },
  methods: {
    getPercentage(count, total) {
      if (!count) return 0;
      return Math.round((count / total) * 10000) / 100;
    },
  },
};
</script>

<style></style>
