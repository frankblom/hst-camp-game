<template>
  <div class="page text-white overflow-hidden">
    <transition appear name="clock">
      <div class="overflow-hidden" v-if="showClock">
        <div :style="position" class="absolute w-full overflow-hidden clock">
          <Second :second="0" :current="remaining" />
          <Second
            v-for="second in totalSeconds"
            :key="second"
            :second="second"
            :current="remaining"
          />
        </div>
        <div class="circle" />
      </div>
    </transition>
  </div>
</template>

<script>
import { PAGE_QUESTION } from "@/const/pages.js";

import Second from "../components/second.vue";
export default {
  components: { Second },
  props: {
    game: Object,
    remaining: Number,
  },
  computed: {
    position() {
      const count = this.remaining * 128;
      return {
        transform: `translateY(-${count}px)`,
      };
    },
    totalSeconds() {
      return this.game.question.time;
    },
    showClock() {
      return (
        [PAGE_QUESTION].includes(this.game.page) &&
        Boolean(this.question) &&
        !isNaN(this.remaining)
      );
    },
    question() {
      if (!this.game.question) return null;
      if (typeof this.game.question != "object") return null;

      return this.game.question;
    },
  },
};
</script>

<style>
.clock {
  position: absolute;
  top: 303px;
  transition: transform 400ms ease-in-out;
}

.circle {
  position: absolute;
  width: 158px;
  height: 158px;
  border: 3px solid #efefef;
  top: 353px;
  left: 18px;
  border-radius: 100%;
}

.clock-enter-active,
.clock-leave-active {
  transition: opacity 0.5s;
}

.clock-enter-active {
  transition-delay: 500ms;
}

.clock-enter, .clock-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
