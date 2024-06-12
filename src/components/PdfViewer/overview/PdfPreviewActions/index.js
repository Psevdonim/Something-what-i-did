import { defineAsyncComponent } from "vue";

const PdfPreviewActions = defineAsyncComponent(() => import("./PdfPreviewActions.vue"));

export default PdfPreviewActions;
