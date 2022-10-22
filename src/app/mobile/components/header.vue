<template>
  <div id="header" class="absolute top-0 w-full flex justify-between px-4 pt-2">
    <div class="h-8 flex items-center" @click="$emit('click')" v-if="!show">
      <img class="w-8" src="@/assets/team_blue.svg" />
      <span class="text-white ml-2">Blått lag</span>
    </div>
    <img
      class="w-8 h-8"
      src="@/assets/profile.png"
      @click="$emit('click')"
      v-if="!show"
    />
    <div
      class="text-white h-8 ml-auto flex items-center"
      v-if="show"
      @click="$emit('click')"
    >
      <span>Close</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object,
    show: Boolean,
  },
};
</script>

<style></style>
