import { defineAsyncComponent } from "vue";

const PdfViewer = defineAsyncComponent(() => import("./PdfViewer.vue"));

export default PdfViewer;
