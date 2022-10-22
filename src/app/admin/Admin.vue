<template>
  <div id="app" class="w-full h-screen flex">
    <QuestionList class="w-full" :questions="questions" :game="game" />
    <div class="control bg-black w-1/3 h-screen border-l border-gray-600">
      <ScreenControls :page="game.page" v-if="game" @setPage="setPage" />
    </div>
  </div>
</template>

<script>
import { db } from "./db";
import QuestionList from "./components/QuestionList.vue";
import ScreenControls from "./components/ScreenControls.vue";

export default {
  components: { QuestionList, ScreenControls },
  data() {
    return {
      game: {},
      questions: [],
    };
  },
  methods: {
    setPage(page) {
      db.collection("games").doc("game").update({ page });
    },
  },
  firestore: {
    game: db.collection("games").doc("game"),
    questions: db.collection("questions").orderBy("order"),
  },
};
</script>

<style>
html {
  background: red;
}
</style>
