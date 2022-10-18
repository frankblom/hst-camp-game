import Vue from "vue";
import Mobile from "./Mobile.vue";
import { firestorePlugin } from "vuefire";
import "@/assets/tailwind.css";
import "@/components/global.js";

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Mobile),
}).$mount("#app");
