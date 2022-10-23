<template>
  <div class="page">
    <h2 class="page-title">Resultat:</h2>
    <div class="result-teams flex flex-wrap">
      <TransitionGroup appear tag="div" class="w-full" name="point">
        <div
          class="result-team flex w-full items-center"
          v-for="(team, index) in leaderboard"
          :style="{ '--i': index }"
          :key="index"
        >
          <h3 class="result-team-name mr-auto">{{ $t(team.name) }}</h3>
          <div class="result-points">{{ team.points }} P</div>
          <div class="result-team-icon">
            <Team :name="team.name" />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import Team from "../../side/components/team.vue";

export default {
  components: { Team },
  props: {
    leaderboard: Array,
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

.result-teams {
  position: absolute;
  top: 247px;
  left: 50%;
  margin-left: -500px;
  width: 1000px;
}

.result-team {
  margin-bottom: 100px;
}

.result-points,
.result-team-name {
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  color: #e6e7e7;
}

.result-team-icon {
  margin-left: 70px;
}

.point-move {
  transition: opacity 1s linear, transform 1s ease-in-out;
}

.point-leave-active {
  transition: opacity 1s linear, transform 1s cubic-bezier(0.5, 0, 0.7, 0.4);
  transition-delay: calc(0.1s * (0 - var(--i)));
}
.point-enter-active {
  transition: opacity 1s linear, transform 1s cubic-bezier(0.2, 0.5, 0.1, 1);
  transition-delay: calc(0.2s * var(--i));
}
.point-enter,
.point-leave-to {
  opacity: 0;
}
.point-enter {
  transform: translateY(-100px);
}
.point-leave-to {
  transform: translateY(-100px);
}
</style>
