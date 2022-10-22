<template>
  <div class="px-4 flex flex h-screen flex-col text-white">
    <div
      class="w-full text-center flex-1 flex flex-col justify-center border-b"
    >
      <img class="w-20 h-20 mx-auto mb-4" src="@/assets/profile.png" />
      <p class="text-lg">{{ $t("logged-in-as") }}</p>
      <h2 class="text-4xl">{{ profile.name }}</h2>
    </div>
    <div class="w-full text-center flex-1 flex flex-col justify-center">
      <p class="text-lg">{{ $t(teamName) }}</p>
      <img class="w-20 h-20 mx-auto" src="@/assets/team_blue.svg" />
    </div>
    <div class="w-full flex-none">
      <Button class="mt-auto mb-20 text-xl" @click="$emit('logout')">{{
        $t("log-out-button")
      }}</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object,
  },
  computed: {
    teamName() {
      return `team-${this.profile.team_id}-participant`;
    },
  },
};
</script>

<style></style>
