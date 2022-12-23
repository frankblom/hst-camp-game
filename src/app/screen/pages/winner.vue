<template>
  <div class="page">
    <div class="w-full" id="party">
      <img class="mx-auto" src="@/assets/party.svg" />
    </div>
    <h2 class="message uppercase" v-if="team">
      <span :class="`text-team-${team.name}`"
        >{{ $t(`congrats-${team.name}`) }}
      </span>
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    team: Object,
  },
};
</script>

<style>
#party {
  margin-top: 316px;
}
.message {
  color: #e5e5e5;
  font-weight: 700;
  font-size: 64px;
  line-height: 77px;
  text-align: center;
  margin: 60px auto 0 auto;
}
</style>
