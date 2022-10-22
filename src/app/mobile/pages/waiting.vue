<template>
  <div class="px-4 flex flex flex-col h-screen text-white items-center">
    <img class="mx-auto mt-32 w-32" src="@/assets/hmm.png" />
    <h1 class="text-3xl mt-8">{{ $t("waiting-title") }}</h1>
    <p class="text-lg mt-3">{{ $t("waiting-subtitle") }}</p>
    <Loading />
  </div>
</template>

<script>
import Loading from "../components/loading.vue";
export default {
  components: { Loading },
};
</script>
