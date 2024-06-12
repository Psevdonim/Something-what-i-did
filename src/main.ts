import "./assets/_main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import BaseButton from "./components/BaseButton";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("BaseButton", BaseButton);
app.mount("#app");
