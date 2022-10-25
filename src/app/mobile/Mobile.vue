<template>
  <div id="app" class="max-w-3xl mx-auto relative overflow-hidden">
    <div
      v-if="isLoading"
      class="flex items-center flex-col h-screen text-gray-200 text-3xl justify-center"
    >
      <Loading />
      <span class="mt-12">Loading</span>
    </div>
    <div v-else class="relative h-screen">
      <Login v-if="!isLoggedIn" @login="login" />
      <Header
        v-if="isLoggedIn"
        :profile="player"
        @click="triggerProfile"
        :show="showProfile"
      />
      <Profile v-if="showProfile" :profile="player" @logout="logout" />
      <transition name="fade">
        <Waiting v-if="isWaiting" />
      </transition>
      <transition name="fade">
        <Question
          v-if="showQuestion"
          :question="question"
          @answer="answer"
          :response="savedAnswer"
        />
      </transition>
      <transition name="fade">
        <Gameover v-if="isKicked" />
      </transition>
    </div>
  </div>
</template>

<script>
import Login from "./pages/login.vue";
import Profile from "./pages/profile.vue";
import Waiting from "./pages/waiting.vue";
import Header from "./components/header.vue";
import Loading from "./components/loading.vue";
import Question from "./pages/question.vue";
import Gameover from "./pages/gameover.vue";
import { db } from "./db";
// import jwt_decode from 'jwt-decode';
import { PAGE_QUESTION, PAGE_SCORE } from "@/const/pages.js";

export default {
  components: { Login, Waiting, Profile, Header, Question, Gameover, Loading },
  data() {
    return {
      player: null,
      game: null,
      showProfile: false,
      answers: [],
    };
  },
  computed: {
    isLoading() {
      return Boolean(this.game) === false;
    },
    isLoggedIn() {
      return Boolean(this.player);
    },
    isKicked() {
      return false;
    },
    isPlaying() {
      return this.isLoggedIn && !this.isKicked;
    },
    isWaiting() {
      if (!this.isPlaying) return false;
      return !this.showQuestion && !this.showProfile;
    },
    showQuestion() {
      if (!this.isPlaying) return false;
      return (
        [PAGE_QUESTION, PAGE_SCORE].includes(this.game.page) &&
        Boolean(this.question)
      );
    },
    savedAnswer() {
      if (!this.showQuestion) return null;
      return this.answers.find((x) => x.question_id === this.question.id);
    },
    question() {
      if (!this.game.question) return null;
      if (typeof this.game.question != "object") return null;

      return this.game.question;
    },
  },
  methods: {
    triggerProfile() {
      if (this.showProfile) {
        this.showProfile = false;
      } else {
        this.showProfile = true;
      }
    },
    answer({ question, answer }) {
      db.collection("answers").add({
        question_id: question.id,
        answer_id: answer.id,
        label: answer.label,
        correct: answer.correct,
        user_id: this.player.id,
        team_id: this.player.team_id,
      });
    },
    login() {
      const id = 10547;
      const key = `player-${id}`;
      const player = db.collection("players").doc(key);
      this.$bind("player", player);
      player.update({ logged_in: true });

      this.$bind(
        "answers",
        db.collection("answers").where("user_id", "==", key)
      );
    },
    logout() {
      this.$unbind("player");
      this.showProfile = false;
    },
  },
  firestore: {
    game: db.collection("games").doc("game"),
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
