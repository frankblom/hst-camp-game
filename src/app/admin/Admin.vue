<template>
  <div id="app" class="w-full flex">
    <div class="border-r w-10/12 sm:w-11/12">
      <ScreenControls @setPage="setPage" :page="page" />
      <QuestionList
        class="w-full"
        :questions="questions"
        :game="game"
        :points="points"
        :penalties="penalties"
      />
    </div>
    <div class="w-2/12 sm:w-1/12 h-screen right-0 fixed">
      <PointsBox :points="points" :teams="teams" />
      <div class="w-full flex items-center justify-center">
        <Button @click="reset" variant="danger" size="small">RESET</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { db, functions } from "@/app/admin/db.js";
import { httpsCallable } from "firebase/functions";

import QuestionList from "./components/QuestionList.vue";
import ScreenControls from "./components/ScreenControls.vue";
import PointsBox from "./components/side/PointsBox.vue";

export default {
  components: { QuestionList, ScreenControls, PointsBox },
  data() {
    return {
      game: {},
      questions: [],
      points: [],
      teams: [],
      penalties: [],
    };
  },
  computed: {
    page() {
      return this.game.page;
    },
  },
  methods: {
    setPage(page) {
      db.collection("games").doc("game").update({ page });
    },
    reset() {
      if (!confirm("ER DU SIKKERT!")) {
        return false;
      }

      if (!confirm("SISTE Mulighet for å cancelere!")) {
        return false;
      }

      const resetGame = httpsCallable(functions, "resetGame");
      resetGame().then((result) => {
        console.log(result);
      });
    },
  },
  firestore: {
    game: db.collection("games").doc("game"),
    questions: db.collection("questions").orderBy("order"),
    points: db.collection("points"),
    penalties: db.collection("penalties"),
    teams: db.collection("teams").orderBy("index"),
  },
};
</script>

<style></style>
