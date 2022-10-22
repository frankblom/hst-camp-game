<template>
  <div class="h-screen flex items-center">
    <div class="w-full text-white text-center px-4">
      <img class="mx-auto mt-32 w-32" src="@/assets/gameover.png" />
      <h1 class="text-3xl mt-8">{{ $t("kicked-title") }}</h1>
      <p class="text-lg mt-3 px-6">
        {{ $t("kicked-subtitle") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
