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
    <transition name="fade">
      <Penalty :teams="teamsList" v-if="showPenalty" />
    </transition>
    <transition name="fade">
      <Results :teams="teamsList" :state="state?.results" v-if="showResults" />
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
import Penalty from "./pages/penalty.vue";
import Results from "./pages/results.vue";

export default {
  name: "Screen",
  components: { Home, Puzzle, Score, Question, Penalty, Results },
  data() {
    return {
      page: null,
      state: {},
      question: null,
      teams: {
        red: null,
        blue: null,
        green: null,
        orange: null,
      },
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
    showPenalty() {
      return this.page === "penalty";
    },
    showResults() {
      return this.page === "results";
    },
    teamsList() {
      if (
        !this.teams.orange ||
        !this.teams.green ||
        !this.teams.red ||
        !this.teams.blue
      )
        return [];
      return [
        this.teams.orange,
        this.teams.green,
        this.teams.red,
        this.teams.blue,
      ];
    },
  },
  created() {
    onSnapshot(doc(db, "games", "game"), (snap) => {
      const data = snap.data();
      this.page = data.page;
      this.$set(this.state, "results", data.results);
      this.setquestion(data.question);
    });
    onSnapshot(doc(db, "teams", "orange"), (snap) => {
      this.$set(this.teams, "orange", snap.data());
    });
    onSnapshot(doc(db, "teams", "blue"), (snap) => {
      this.$set(this.teams, "blue", snap.data());
    });
    onSnapshot(doc(db, "teams", "red"), (snap) => {
      this.$set(this.teams, "red", snap.data());
    });
    onSnapshot(doc(db, "teams", "green"), (snap) => {
      this.$set(this.teams, "green", snap.data());
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
