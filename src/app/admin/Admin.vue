<template>
  <div id="app" class="text-blue-500">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <span class="text-blue-500">Admin</span>
  </div>
</template>

<script>
import { db } from "./db";

export default {
  name: "App",
  data() {
    return {
      documents: [],
    };
  },
  components: {},
  firestore: {
    documents: db.collection("players"),
  },
};
</script>

<style>
html {
  background: red;
}
</style>
