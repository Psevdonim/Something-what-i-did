<template>
    <div class="pdf">
        <BaseInput v-model:data="link" wide title="Link" class="mb-16" /> -- по сути этот PDF-viewer не подразумевался,
        что-бы он менял пдфки реактивно через ссылку, однако это было допилино ради интереса
        <PdfViewer v-model:link="link" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import PdfViewer from "@/components/PdfViewer";
import BaseInput from "@/components/BaseInput";

const PdfViewerPage = defineComponent({
    name: "PdfViewerPage",
    components: {
        PdfViewer,
        BaseInput,
    },
    setup() {
        const link = ref(
            "https://assets.website-files.com/63206faf68ab2dc3ee3e623b/634ea60a9381021f775e7a28_Placeholder%20PDF.pdf",
        );
        return { link };
    },
});

export default PdfViewerPage;
</script>
