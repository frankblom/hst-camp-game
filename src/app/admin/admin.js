import Vue from "vue";
import Admin from "./Admin.vue";
import { firestorePlugin } from "vuefire";
import "@/assets/tailwind.css";
import Button from "./components/Button";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import messages from "@/locale/index.js";
const i18n = new VueI18n({
  locale: "nb",
  messages,
});

Vue.use(firestorePlugin);
Vue.component("Button", Button);
Vue.config.productionTip = false;

new Vue({
  i18n,
  render: (h) => h(Admin),
}).$mount("#app");
