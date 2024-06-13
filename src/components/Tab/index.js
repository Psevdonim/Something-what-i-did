import { defineAsyncComponent } from "vue";

const Tab = defineAsyncComponent(() => import("./Tab.vue"));

export default Tab;
