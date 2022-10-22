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
import { START_CLOCK_STEP, SHOW_QUESTION_STEP } from "@/const/steps.js";

import Second from "../components/second.vue";
export default {
  components: { Second },
  props: {
    game: Object,
  },
  data() {
    return {
      remaining: this.game?.question?.time,
      interval: null,
    };
  },
  computed: {
    position() {
      const count = this.remaining * 128;
      return {
        transform: `translateY(-${count}px)`,
      };
    },
    ticking() {
      return this.game.question.step == START_CLOCK_STEP;
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
  methods: {
    tick() {
      if (!this.ticking) return false;
      if (this.remaining <= 0) {
        this.$emit("stop");
        return false;
      }
      this.$set(this, "remaining", this.remaining - 1);
    },
    stopClock() {},
  },
  mounted() {
    this.interval = setInterval(this.tick, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  watch: {
    game: {
      deep: true,
      handler(game) {
        if (!game || !game.question) return;

        if (game.question?.step === SHOW_QUESTION_STEP) {
          this.$set(this, "remaining", game.question.time);
        }
      },
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
