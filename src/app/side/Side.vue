<template>
  <div id="app">
    <Clock />
    <Score />
    <Score />
    <Score />
    <Score />
  </div>
</template>

<script>
// import { db } from "./db";
import Clock from "./pages/clock.vue";
import Score from "./pages/score.vue";

export default {
  name: "Screen",
  components: { Clock, Score },

  computed: {},
  // firestore: {
  //   documents: db.collection("players"),
  // },
};
</script>

<style></style>
