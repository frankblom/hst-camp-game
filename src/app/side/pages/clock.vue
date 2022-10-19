<template>
  <transition>
    <div class="page text-white overflow-hidden">
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
</template>

<script>
import Second from "../components/second.vue";
export default {
  components: { Second },
  props: {},
  data() {
    return {
      remaining: 60,
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
      return true;
    },
    totalSeconds() {
      return 60;
    },
  },
  methods: {
    tick() {
      if (this.remaining <= 0) return;

      this.$set(this, "remaining", this.remaining - 1);
    },
  },
  mounted() {
    this.interval = setInterval(this.tick, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
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
</style>
