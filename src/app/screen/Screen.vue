<template>
  <div id="app">
    <Home v-if="false" />
    <Puzzle :question="puzzle" v-if="false" />
    <Score />
  </div>
</template>

<script>
// import { db } from "./db";
import Home from "./pages/home.vue";
import Puzzle from "./pages/puzzle.vue";
import Score from "./pages/score.vue";

export default {
  name: "Screen",
  components: { Home, Puzzle, Score },

  computed: {
    puzzle() {
      return {
        text: {
          nb: "Hvilken troshelt ser du på skjermen?",
        },
      };
    },
  },
  // firestore: {
  //   documents: db.collection("players"),
  // },
};
</script>

<style></style>
