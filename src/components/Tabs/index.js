import { defineAsyncComponent } from "vue";

const Tabs = defineAsyncComponent(() => import("./Tabs.vue"));

export default Tabs;
