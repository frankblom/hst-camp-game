import Vue from "vue";
import Side from "./Side.vue";
import { firestorePlugin } from "vuefire";
import "@/assets/tailwind.css";
import "@/assets/side.css";

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Side),
}).$mount("#app");
