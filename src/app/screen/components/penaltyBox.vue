<template>
  <div class="penalty-box flex flex-wrap items-center" v-if="show">
    <div class="penalty-count flex w-full items-center justify-center">
      <span>-</span>
      <span class="penalty-count-number">{{ team.kicked_count }}</span>
      <svg
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
    <div class="w-full flex justify-center">
      <Team :name="team.name" />
    </div>
    <div
      class="penalty-team-label w-full text-center uppercase"
      :class="colorClass"
    >
      {{ team.name }}
    </div>
  </div>
</template>

<script>
import Team from "../../side/components/team.vue";

export default {
  components: { Team },
  props: {
    team: Object,
  },
  computed: {
    colorClass() {
      return `text-team-${this.team.name}`;
    },
    show() {
      return Boolean(this.team);
    },
  },
};
</script>

<style>
.penalty-box {
  width: 160px;
}
.penalty-count {
  font-size: 40px;
  font-weight: bold;
  color: #e6e7e7;
  margin-bottom: 40px;
}

.penalty-count-number {
  margin: 0 15px;
}

.penalty-team-label {
  margin-top: 40px;
  font-size: 32px;
  line-height: 38px;
  font-weight: bold;
}
</style>
