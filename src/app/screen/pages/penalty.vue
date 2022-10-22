<template>
  <div class="page">
    <h2 class="page-title">Straff:</h2>
    <TransitionGroup
      appear
      tag="div"
      class="penalty-teams flex justify-between"
      name="results"
    >
      <PenaltyBox
        :team="team"
        v-for="(team, index) in teams"
        :key="index"
        :style="{ '--i': index }"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import PenaltyBox from "../components/penaltyBox.vue";
export default {
  components: { PenaltyBox },
  props: {
    teams: Array,
  },
};
</script>

<style>
.page-title {
  color: #e5e5e5;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  text-align: center;
  max-width: 700px;
  margin: 118px auto 0;
}

.penalty-teams {
  position: absolute;
  top: 347px;
  left: 228px;
  width: 1272px;
}
</style>
