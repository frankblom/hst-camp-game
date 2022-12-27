<template>
  <div id="app">
    <TeamBar
      v-if="loaded"
      :team="teamByKey('orange')"
      key="orange"
      :count="playerCount.orange"
      :penalties="penaltiesForTeam('orange')"
      :question="currentQuestion"
    />
    <Clock v-if="loaded" :game="game" :remaining="remaining" />
    <TeamBar
      v-if="loaded"
      :team="teamByKey('yellow')"
      key="yellow"
      :count="playerCount.yellow"
      :penalties="penaltiesForTeam('yellow')"
      :question="currentQuestion"
    />
    <TeamBar
      v-if="loaded"
      :team="teamByKey('purple')"
      key="purple"
      :count="playerCount.purple"
      :penalties="penaltiesForTeam('purple')"
      :question="currentQuestion"
    />
    <Clock v-if="loaded" :game="game" :remaining="remaining" />
    <TeamBar
      v-if="loaded"
      :team="teamByKey('blue')"
      key="blue"
      :count="playerCount.blue"
      :penalties="penaltiesForTeam('blue')"
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
import {
  STOP_CLOCK_STEP,
  START_CLOCK_STEP,
  SHOW_QUESTION_STEP,
} from "@/const/steps.js";

export default {
  name: "Screen",
  components: { Clock, TeamBar },
  data() {
    return {
      teams: [],
      game: null,
      penalties: [],
      interval: null,
      remaining: this.game?.question?.time,
      playerCount: {
        blue: 0,
        purple: 0,
        yellow: 0,
        orange: 0,
      },
    };
  },
  computed: {
    loaded() {
      return this.teams.length > 0 && this.game != null;
    },
    ticking() {
      return this.game?.question?.step == START_CLOCK_STEP;
    },
    currentQuestion() {
      if (typeof this?.game?.question == "object") {
        return this.game.question;
      }
      return null;
    },
  },
  methods: {
    penaltiesForTeam(team) {
      return this.penalties.filter((p) => p.team_id === team);
    },
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
    fullscreen() {
      const elem = document.getElementById("app");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    },
    tick() {
      if (!this.ticking) return false;
      if (this.remaining <= 0) {
        this.stopClock();
        return false;
      }
      this.$set(this, "remaining", this.remaining - 1);
    },
    setBG(bg) {
      if (!bg) return;
      const color = bg == "transparent" ? "rgba(0,0,0,0)" : `#${bg}`;
      console.log(`Appling background color ${color}`);

      document.getElementById("app").style.backgroundColor = color;
      document.documentElement.style.backgroundColor = color;
    },
  },
  mounted() {
    this.setBG(new URLSearchParams(window.location.search).get("bg"));

    setInterval(() => {
      this.getCountForTeam("blue");
      this.getCountForTeam("purple");
      this.getCountForTeam("yellow");
      this.getCountForTeam("orange");
    }, 2000);

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "f") this.fullscreen();
      },
      false
    );
    this.interval = setInterval(this.tick, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  watch: {
    game: {
      deep: true,
      handler(game) {
        if (!game || !game.question) return;

        if (game.question?.step === SHOW_QUESTION_STEP) {
          this.$set(this, "remaining", game.question.time);
        }
      },
    },
  },
  firestore: {
    teams: db.collection("teams").orderBy("index"),
    game: db.collection("games").doc("game"),
    penalties: db.collection("penalties"),
  },
};
</script>

<style></style>
