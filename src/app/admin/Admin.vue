<template>
  <div id="app" class="w-full h-screen flex">
    <QuestionList class="w-full" :questions="questions" :game="game" />
  </div>
</template>

<script>
import { db } from "./db";
import QuestionList from "./components/QuestionList.vue";

export default {
  components: { QuestionList },
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
