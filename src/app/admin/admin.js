import Vue from "vue";
import Admin from "./Admin.vue";
import { firestorePlugin } from "vuefire";
import "@/assets/tailwind.css";

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Admin),
}).$mount("#app");
