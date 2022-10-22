<template>
  <div id="app" v-if="loaded">
    <Clock :game="game" @stop="stopClock" />
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
import { STOP_CLOCK_STEP } from "@/const/steps.js";

export default {
  name: "Screen",
  components: { Clock, Score },
  data() {
    return {
      teams: [],
      game: null,
    };
  },
  computed: {
    loaded() {
      return this.teams.length > 0 && this.game != null;
    },
  },
  methods: {
    stopClock() {
      const QID = this?.game?.question?.id;
      console.log(QID);
      if (!QID) return;
      db.collection("questions").doc(QID).update({
        step: STOP_CLOCK_STEP,
      });
    },
  },
  firestore: {
    teams: db.collection("teams").orderBy("index"),
    game: db.collection("games").doc("game"),
  },
};
</script>

<style></style>
