import Vue from "vue";
import Screen from "./Screen.vue";
import { firestorePlugin } from "vuefire";
import "@/assets/tailwind.css";
import "@/assets/screen.css";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import messages from "@/locale/index.js";
const i18n = new VueI18n({
  locale: "nb",
  messages,
});

Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  i18n,
  render: (h) => h(Screen),
}).$mount("#app");
