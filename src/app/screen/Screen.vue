<template>
  <div id="app">
    <transition name="fade">
      <Home v-if="showHome" />
    </transition>
    <transition name="fade">
      <Puzzle v-if="showPuzzle" :question="question" />
    </transition>
    <transition name="fade">
      <Score v-if="showScore" :question="question" />
    </transition>
    <transition name="fade">
      <Question :question="question" :game="game" v-if="showQuestion" />
    </transition>
    <transition name="fade">
      <Penalty
        :teams="teamsList"
        :game="game"
        :kicks="kicks"
        v-if="showPenalty"
      />
    </transition>
    <transition name="fade">
      <Results
        :teams="teamsList"
        :leaderboard="leaderboard"
        v-if="showResults"
      />
    </transition>
  </div>
</template>

<script>
import { db } from "./db";
import Home from "./pages/home.vue";
import Puzzle from "./pages/puzzle.vue";
import Score from "./pages/score.vue";
import Question from "./pages/question.vue";
import Penalty from "./pages/penalty.vue";
import Results from "./pages/results.vue";

import {
  PAGE_HOME,
  PAGE_QUESTION,
  PAGE_PENALTY,
  PAGE_SCORE,
  PAGE_RESULTS,
  PAGE_WINNER,
} from "@/const/pages.js";

export default {
  name: "Screen",
  components: { Home, Puzzle, Score, Question, Penalty, Results },
  data() {
    return {
      game: null,
      teams: null,
      kicks: [],
      points: [],
    };
  },
  computed: {
    showHome() {
      return this.game && this.game.page == PAGE_HOME;
    },
    isQuestion() {
      return this.game && this.game.page === PAGE_QUESTION;
    },
    showPuzzle() {
      return (
        this.isQuestion &&
        Boolean(this.question) &&
        this.game.question.type === "pre"
      );
    },
    showScore() {
      return (
        this.game && this.game.page === PAGE_SCORE && Boolean(this.question)
      );
    },
    showQuestion() {
      return (
        this.isQuestion &&
        Boolean(this.question) &&
        this.game.question.type === "game"
      );
    },
    showPenalty() {
      return this.game && this.game.page === PAGE_PENALTY;
    },
    showResults() {
      return this.game && this.game.page === PAGE_RESULTS;
    },
    showWinner() {
      return this.game && this.game.page === PAGE_WINNER;
    },
    teamsList() {
      return this.teams;
    },
    question() {
      if (!this.game.question) return null;
      if (typeof this.game.question != "object") return null;

      return this.game.question;
    },
    leaderboard() {
      return this.teams
        .map((t) => ({
          ...t,
          points: this.points
            .filter((p) => p.team_id == t.id)
            .reduce((acc, item) => acc + item.count, 0),
        }))
        .sort((a, b) => {
          if (a.points > b.points) return -1;
          if (a.points < b.points) return +1;
          return 0;
        });
    },
  },
  firestore: {
    game: db.collection("games").doc("game"),
    questions: db.collection("questions").orderBy("order"),
    teams: db.collection("teams").orderBy("index"),
    kicks: db.collection("kicks"),
    points: db.collection("points"),
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

.results-move {
  transition: opacity 1s linear, transform 1s ease-in-out;
}

.results-leave-active {
  transition: opacity 1s linear, transform 1s cubic-bezier(0.5, 0, 0.7, 0.4);
  transition-delay: calc(0.1s * (0 - var(--i)));
}
.results-enter-active {
  transition: opacity 1s linear, transform 1s cubic-bezier(0.2, 0.5, 0.1, 1);
  transition-delay: calc(0.2s * var(--i));
}
.results-enter,
.results-leave-to {
  opacity: 0;
}
.results-enter {
  transform: translateY(-100px);
}
.results-leave-to {
  transform: translateY(-100px);
}
</style>
