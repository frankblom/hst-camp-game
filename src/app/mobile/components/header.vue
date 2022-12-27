<template>
  <div id="header" class="absolute top-0 w-full flex justify-between px-4 pt-2">
    <div class="h-8 w-10 flex items-center" @click="$emit('click')">
      <Team :name="profile?.team_id" class="team-icon" />
    </div>
    <div class="locale-changer flex">
      <select v-model="$i18n.locale" class="changer">
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
    </div>

    <div
      class="text-white h-8 flex items-center pointer"
      @click="$emit('click')"
    >
      <img class="w-8 h-8" src="@/assets/profile.png" v-if="!show" />
      <span v-else>Close</span>
    </div>
  </div>
</template>

<script>
import Team from "@/app/side/components/team";
export default {
  components: { Team },
  props: {
    profile: Object,
    show: Boolean,
  },
};
</script>

<style>
.team-icon {
  transform: scale(1);
}

.changer {
  background: #0b071d;
  color: white;
  font-size: 18px;
  text-transform: uppercase;
}
</style>
