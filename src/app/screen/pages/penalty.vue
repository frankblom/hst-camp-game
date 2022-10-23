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
        :kicked="kickedForTeam(team)"
        :reveal="reveal"
        :style="{ '--i': index }"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import PenaltyBox from "../components/penaltyBox.vue";
import { APPLY_PENALTY_STEP } from "@/const/steps.js";

export default {
  components: { PenaltyBox },
  props: {
    teams: Array,
    game: Object,
    kicks: Array,
  },
  computed: {
    currentQuestion() {
      if (
        typeof this?.game?.question == "object" &&
        typeof this.game.question?.id == "string"
      ) {
        return this.game.question.id;
      }
      return null;
    },
    reveal() {
      return this?.game?.question?.step >= APPLY_PENALTY_STEP;
    },
  },
  methods: {
    kickedForTeam(team) {
      return this.kicks.find(
        (kick) =>
          kick.team_id === team.id && kick.question_id == this.currentQuestion
      );
    },
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
