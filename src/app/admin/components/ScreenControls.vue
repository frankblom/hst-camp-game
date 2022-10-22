<template>
  <div class="w-full p-4">
    <label class="text-white text-xl">LED SCREEN</label>
    <div class="w-full flex flex-wrap mt-4">
      <Button
        class="mr-2 mb-2 capitalize"
        v-for="p in pages"
        :key="p"
        :variant="btnVariantFor(p)"
        @click="$emit('setPage', p)"
        >{{ p }}</Button
      >
    </div>
  </div>
</template>

<script>
import pages from "@/const/pages.js";
export default {
  props: {
    page: String,
  },
  computed: {
    pages() {
      return pages;
    },
  },
  methods: {
    btnVariantFor(label) {
      return label === this.page ? "active" : "primary";
    },
  },
};
</script>

<style></style>
