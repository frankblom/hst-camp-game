<template>
  <div id="app" class="w-full h-screen flex">
    <QuestionList
      class="w-full"
      :questions="questions"
      :game="game"
      :points="points"
      :penalties="penalties"
    />
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
      points: [],
      penalties: [],
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
    points: db.collection("points"),
    penalties: db.collection("penalties"),
  },
};
</script>

<style>
html {
  background: red;
}
</style>
