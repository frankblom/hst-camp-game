<template>
  <div id="app" class="max-w-3xl mx-auto relative">
    <Header
      :profile="profile"
      v-if="isLoggedIn"
      @click="triggerProfile"
      :page="page"
    />
    <Login v-if="!isLoggedIn" />
    <Waiting v-if="iswaiting" />
    <Profile v-if="showProfile" :profile="profile" />
    <Question v-if="showQuestion" :question="question" />
    <Gameover v-if="kicked" />
  </div>
</template>

<script>
import Login from "./pages/login.vue";
import Profile from "./pages/profile.vue";
import Waiting from "./pages/waiting.vue";
import Header from "./components/header.vue";
import Question from "./pages/question.vue";
import Gameover from "./pages/gameover.vue";
// import { db } from "./db";
export default {
  name: "App",
  components: { Login, Waiting, Profile, Header, Question, Gameover },
  data() {
    return {
      profile: null,
      // page: null,
      page: "question",
      kicked: false,
    };
  },
  computed: {
    isLoggedIn() {
      return true;
      // return Boolean(this.profile);
    },
    iswaiting() {
      if (this.kicked || !this.isLoggedIn) return false;
      return !this.page;
    },
    showProfile() {
      if (!this.isLoggedIn) return false;
      return this.page === "profile";
    },
    showQuestion() {
      if (this.kicked || !this.isLoggedIn) return false;
      return this.page === "question";
    },
    question() {
      return {
        options: {
          A_11: {
            text: {
              en: "Et alternativ som består av et langt svar med mye ord og påvirker total lengde i boksen. Fire setninger bør være maks.",
            },
            label: "A",
            id: "A_11",
            correct: false,
          },
          A_12: {
            text: {
              en: "yes",
            },
            label: "B",
            id: "A_12",
            correct: true,
          },
          A_13: {
            text: {
              en: "Et alternativ som består av et langt svar med mye ord og påvirker total lengde i boksen. Fire setninger bør være maks.",
            },
            label: "C",
            id: "A_13",
            correct: false,
          },
          A_14: {
            text: {
              en: "Et alternativ som består av et langt svar med mye ord og påvirker total lengde i boksen. Fire setninger bør være maks.",
            },
            label: "D",
            id: "A_14",
            correct: false,
          },
        },
        text: {
          en: "This is the question that is being asked.",
        },
      };
    },
  },
  methods: {
    triggerProfile() {
      if (this.page === "profile") {
        this.page = null;
      } else if (!this.page) {
        this.page = "profile";
      } else if (this.kicked) {
        this.page = "profile";
      }
    },
  },
  // firestore: {
  //   documents: db.collection("players"),
  // },
};
</script>

<style></style>
