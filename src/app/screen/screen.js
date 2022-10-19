import Vue from "vue";
import Screen from "./Screen.vue";
import { firestorePlugin } from "vuefire";
import "@/assets/tailwind.css";
import "@/assets/screen.css";

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Screen),
}).$mount("#app");
