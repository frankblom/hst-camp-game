<template>
  <div id="app">
    <transition name="fade">
      <Home v-if="showHome" />
    </transition>
    <transition name="fade">
      <Puzzle v-if="showPuzzle" />
    </transition>
    <transition name="fade">
      <Score v-if="showScore" />
    </transition>
    <transition name="fade">
      <Question :question="question" v-if="showQuestion" />
    </transition>
  </div>
</template>

<script>
import { doc, onSnapshot, getDoc } from "firebase/firestore";

import { db } from "./db";
import Home from "./pages/home.vue";
import Puzzle from "./pages/puzzle.vue";
import Score from "./pages/score.vue";
import Question from "./pages/question.vue";

export default {
  name: "Screen",
  components: { Home, Puzzle, Score, Question },
  data() {
    return {
      page: null,
      question: null,
    };
  },
  computed: {
    showHome() {
      return this.page === "home";
    },
    showPuzzle() {
      return this.page === "puzzle";
    },
    showScore() {
      return this.page === "score";
    },
    showQuestion() {
      return this.page === "question" && this.question != null;
    },
  },
  created() {
    onSnapshot(doc(db, "games", "game"), (snap) => {
      const data = snap.data();
      this.page = data.page;
      this.setquestion(data.question);
    });
  },
  methods: {
    async setquestion(reference) {
      if (!reference) {
        this.question = null;
        return;
      }

      const question = await getDoc(doc(db, "questions", reference));
      if (question.exists()) {
        this.question = question.data();
      } else {
        this.question = null;
      }
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-active {
  transition-delay: 500ms;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
