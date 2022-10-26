<template>
  <div class="w-full py-4 mb-4 md:px-10 item-center border-b">
    <span class="text-white mr-4 text-3xl">Pages</span>
    <Button
      class="mr-2 capitalize"
      v-for="p in pages"
      :key="p"
      :variant="btnVariantFor(p)"
      @click="$emit('setPage', p)"
      >{{ p }}</Button
    >
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
