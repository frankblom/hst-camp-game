<template>
  <div id="app" v-if="loaded">
    <TeamBar
      :team="teamByKey('orange')"
      key="orange"
      :count="playerCount.orange"
      :kicked="kicked.orange"
      :question="currentQuestion"
    />
    <Clock :game="game" @stop="stopClock" />
    <TeamBar
      :team="teamByKey('green')"
      key="green"
      :count="playerCount.green"
      :kicked="kicked.green"
      :question="currentQuestion"
    />
    <TeamBar
      :team="teamByKey('pink')"
      key="pink"
      :count="playerCount.pink"
      :kicked="kicked.pink"
      :question="currentQuestion"
    />
    <Clock :game="game" />
    <TeamBar
      :team="teamByKey('blue')"
      key="blue"
      :count="playerCount.blue"
      :kicked="kicked.blue"
      :question="currentQuestion"
    />
  </div>
</template>

<script>
import { db } from "./db";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

import Clock from "./pages/clock.vue";
import TeamBar from "./pages/teamBar.vue";
import { STOP_CLOCK_STEP } from "@/const/steps.js";

export default {
  name: "Screen",
  components: { Clock, TeamBar },
  data() {
    return {
      teams: [],
      game: null,
      kicks: [],
      playerCount: {
        blue: 0,
        pink: 0,
        green: 0,
        orange: 0,
      },
    };
  },
  computed: {
    loaded() {
      return this.teams.length > 0 && this.game != null;
    },
    kicked() {
      return {
        blue: this.kicks.filter((kick) => kick.team_id === "blue"),
        pink: this.kicks.filter((kick) => kick.team_id === "pink"),
        green: this.kicks.filter((kick) => kick.team_id === "green"),
        orange: this.kicks.filter((kick) => kick.team_id === "orange"),
      };
    },
    currentQuestion() {
      if (typeof this?.game?.question == "object") {
        return this.game.question;
      }
      return null;
    },
  },
  methods: {
    stopClock() {
      const QID = this?.game?.question?.id;
      if (!QID) return;
      db.collection("questions").doc(QID).update({
        step: STOP_CLOCK_STEP,
      });
    },
    getCountForTeam(team_id) {
      const query_ = query(
        collection(db, "players"),
        where("team_id", "==", team_id),
        where("logged_in", "==", true)
      );

      getCountFromServer(query_).then((snapshot) => {
        const count = snapshot.data().count;
        this.$set(this.playerCount, team_id, count);
      });
    },
    teamByKey(key) {
      return this.teams.find((x) => x.name == key);
    },
  },
  mounted() {
    setInterval(() => {
      this.getCountForTeam("blue");
      this.getCountForTeam("pink");
      this.getCountForTeam("green");
      this.getCountForTeam("orange");
    }, 2000);
  },
  firestore: {
    teams: db.collection("teams").orderBy("index"),
    game: db.collection("games").doc("game"),
    kicks: db.collection("kicks"),
  },
};
</script>

<style></style>
