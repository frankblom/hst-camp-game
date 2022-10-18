<template>
  <div class="px-4 flex flex flex-col h-screen text-white items-center">
    <img class="max-w-lg mx-auto w-full mt-12" src="@/assets/logo.png" />
    <p class="text-lg my-20">Logg inn for å bli med i konkuransen</p>
    <Button class="mt-auto mb-20 text-xl" @click="login">Logg inn</Button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {},
  },
};
</script>

<style></style>
