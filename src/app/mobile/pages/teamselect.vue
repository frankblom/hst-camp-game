<template>
  <div class="px-4 flex flex h-screen flex-col text-white">
    <div class="mt-32 w-full text-center">
      <h1 class="text-2xl mb-6">Pick your team</h1>
      <button
        class="w-full text-2xl font-bold rounded-xl py-5 uppercase border-4 mb-5"
        :class="`border-team-${o} text-team-${o}`"
        v-for="o in options"
        :key="o"
        @click="$emit('select', o)"
      >
        {{ $t(o) }}
      </button>
    </div>
  </div>
</template>

<script>
// import Team from "@/app/side/components/team";
export default {
  // components: { Team },
  props: {
    profile: Object,
  },
  computed: {
    options() {
      return ["orange", "purple", "yellow", "blue"];
    },
  },
};
</script>

<style></style>
