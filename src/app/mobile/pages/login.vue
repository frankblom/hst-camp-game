<template>
  <div class="px-4 flex flex flex-col h-screen text-white items-center">
    <img class="max-w-lg mx-auto w-full mt-12" src="@/assets/logo.png" />
    <p class="text-lg my-20">{{ $t("log-in-title") }}</p>
    <Button class="mt-auto mb-20 text-xl" @click="login">{{
      $t("log-in-button")
    }}</Button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      location.replace("https://Brunstad.tv/r/quiz");
    },
  },
};
</script>

<style></style>
