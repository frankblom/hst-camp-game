<template>
  <div id="app">
    <Clock />
    <Score :team="teams[0]" />
    <Score :team="teams[1]" />
    <Score :team="teams[2]" />
    <Score :team="teams[3]" />
  </div>
</template>

<script>
import { db } from "./db";
import Clock from "./pages/clock.vue";
import Score from "./pages/score.vue";

export default {
  name: "Screen",
  components: { Clock, Score },
  data() {
    return {
      teams: [],
    };
  },
  computed: {},
  firestore: {
    teams: db.collection("teams").orderBy("index"),
  },
};
</script>

<style></style>
