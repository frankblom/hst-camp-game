<template>
  <div class="page text-white">
    <div class="text-xl text-center w-full" v-if="team">
      <h2 class="score text-white">{{ playerCount }}</h2>
      <Team :name="team.name" class="team" />
      <transition name="fade">
        <div
          class="text-center flex items-center justify-center penalty"
          v-if="penatlyCount"
        >
          <span class="penalty-count">- {{ penatlyCount }}</span>
          <svg
            class="ml-4"
            width="22"
            height="35"
            viewBox="0 0 22 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.0364 18.998H5.01003C3.43992 18.998 2.04114 19.726 1.12049 20.8536C0.920656 21.1034 0.735099 21.3675 0.585225 21.6529C0.449626 21.9099 0.335414 22.1739 0.249772 22.4523C0.0856245 22.9447 0 23.4657 0 24.0081V34.8846H21.0465V24.0081C21.0465 21.2461 18.7984 18.998 16.0364 18.998Z"
              fill="#EB4F54"
            />
            <path
              d="M3.9039 4.225C3.78971 4.47479 3.68267 4.73172 3.60416 4.99578C3.36151 5.7166 3.23303 6.48738 3.23303 7.2867C3.23303 10.4626 5.27419 13.1746 8.12179 14.1737C8.37871 14.2665 8.64991 14.3379 8.92111 14.4021C9.17803 14.4664 9.44923 14.5092 9.72043 14.5449C9.98449 14.5734 10.2628 14.5877 10.5411 14.5877C14.5663 14.5877 17.835 11.3119 17.835 7.29384C17.835 3.27581 14.5592 0 10.5411 0C7.90765 0 5.59533 1.39882 4.3107 3.48991C4.16083 3.73256 4.03237 3.98235 3.91104 4.23214L3.9039 4.225Z"
              fill="#EB4F54"
            />
          </svg>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Team from "../components/team.vue";
import { APPLY_PENALTY_STEP } from "@/const/steps.js";

export default {
  components: { Team },
  props: {
    team: Object,
    count: Number,
    kicked: Array,
    question: Object,
  },
  computed: {
    teamClass() {
      return `team-${this.team.name}`;
    },
    playerCount() {
      if (!this.count) return 0;
      if (this.kickedCount > this.count) return 0;
      return this.count - this.kickedCount;
    },
    currentQuestionId() {
      return this?.question?.id;
    },
    kickedCount() {
      return (
        this.kicked
          .filter((k) => k.question_id != this.currentQuestionId)
          .reduce((count, kick) => count + kick.count, 0) + this.penatlyCount
      );
    },
    penatlyCount() {
      if (!this.currentQuestionId) return 0;

      if (this.question.step < APPLY_PENALTY_STEP) {
        return 0;
      }

      const kicked = this.kicked.find(
        (k) => k.question_id === this.question.id
      );
      return kicked ? kicked.count : 0;
    },
  },
};
</script>

<style>
.score {
  margin-top: 334px;
  font-size: 40px;
  line-height: 48px;
  font-weight: bold;
}
.team {
  margin: 50px auto;
}
.penalty-count {
  font-size: 40px;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms, transform 500ms ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
