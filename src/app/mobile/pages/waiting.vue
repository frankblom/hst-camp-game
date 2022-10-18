<template>
  <div class="px-4 flex flex flex-col h-screen text-white items-center">
    <img class="mx-auto mt-32 w-32" src="@/assets/hmm.png" />
    <h1 class="text-3xl mt-8">Venter på oppgave</h1>
    <p class="text-lg mt-3">Du kan lukke appen i mellomtiden</p>
    <div class="w-32 relative h-32 mx-auto mt-20">
      <div class="w-6 h-6 rounded-full outer" />
      <div class="w-16 h-16 rounded-full inner" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.inner {
  position: absolute;
  left: 2rem;
  top: 2rem;
  background: #74e4ec;
}
.outer {
  position: absolute;
  background: #eb4f54;
  top: 3.25rem;
  bottom: 0;
  left: 3.25rem;
  right: 0;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) translate(-4rem) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translate(-4rem) rotate(-360deg);
  }
}
</style>
