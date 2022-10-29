<template>
  <div id="app" class="max-w-3xl mx-auto relative overflow-hidden">
    <Login v-if="showLogin" @login="() => login(1004362)" />
    <div
      v-if="isLoading && !showLogin"
      class="flex items-center flex-col h-screen text-gray-200 text-3xl justify-center"
    >
      <Loading />
      <span class="mt-12">Loading</span>
    </div>
    <div v-if="!isLoading && !showLogin" class="relative h-screen">
      <Header :profile="player" @click="triggerProfile" :show="showProfile" />
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
import jwt_decode from "jwt-decode";
import { PAGE_QUESTION, PAGE_SCORE } from "@/const/pages.js";

export default {
  components: { Login, Waiting, Profile, Header, Question, Gameover, Loading },
  data() {
    return {
      player: null,
      game: null,
      showProfile: false,
      loggin_in_attemt: false,
      answers: [],
    };
  },
  computed: {
    isLoading() {
      return Boolean(this.game) === false;
    },
    showLogin() {
      return Boolean(this.player) === false && this.loggin_in_attemt == false;
    },
    isKicked() {
      return !this.isLoading && this.player.kicked;
    },
    isPlaying() {
      return !this.showLogin && !this.isLoading && !this.isKicked;
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
  watch: {
    player() {
      if (!this.player) return;
      if (this.player.logged_in === false) {
        this.logout();
      }
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
    login(pmoid) {
      const key = `player-${pmoid}`;

      // check if exists
      const ref = db.collection("players").doc(key);

      ref
        .get()
        .then((player) => {
          if (!player.exists) {
            alert("Beklager, kan ikke logge deg inn.");
            return this.logout();
          }

          localStorage.setItem("player", pmoid);

          if (!player.data().logged_in) {
            ref.update({ logged_in: true });
          }

          this.$bind("player", ref);
          this.$bind(
            "answers",
            db.collection("answers").where("user_id", "==", key)
          );

          this.$bind("game", db.collection("games").doc("game"));
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    logout() {
      if (this.player) {
        this.$unbind("player");
      }
      this.showProfile = false;
      this.loggin_in_attemt = false;
      localStorage.removeItem("player");
    },
  },
  mounted() {
    const url = new URLSearchParams(window.location.search);
    const test = url.get("test");

    if (test) {
      this.loggin_in_attemt = true;
      this.login(`test-${test}`);
      console.log(test);
      return;
    }

    const session_pmo_id = localStorage.getItem("player");

    if (session_pmo_id) {
      this.loggin_in_attemt = true;
      console.log("Login attemtpt with session id");
      return this.login(session_pmo_id);
    }

    const token = url.get("token");
    if (!token) return;

    this.loggin_in_attemt = true;

    try {
      const data = jwt_decode(token);
      return this.login(data.person_id);
    } catch (error) {
      console.log(error);
      return this.logout();
    }
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
