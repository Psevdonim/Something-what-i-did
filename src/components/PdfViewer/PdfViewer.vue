<template>
    <div class="pdf">
        <template v-if="!pdfSettings.error">
            <PdfPreviewActions v-model:settings="pdfSettings" />
            <PdfViewer v-model:settings="pdfSettings" />
        </template>
        <Card type="red" small disableShadow v-else>
            <h2>Ошибка Рендера сертификата, попробуйте ввести корректную ссылку</h2>
        </Card>
    </div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
import { startCertificateData } from "./config/constants";

import PdfViewer from "./overview/PdfViewer";
import PdfPreviewActions from "./overview/PdfPreviewActions";
import Card from "../Card";

const CertificatePDF = defineComponent({
    props: {
        link: {
            type: String,
        },
    },
    components: { PdfViewer, PdfPreviewActions, Card },
    setup(props) {
        const pdfSettings = reactive({
            src: props.link,
            ...startCertificateData,
        });

        watch(
            () => props.link,
            (data) => {
                pdfSettings.src = data;
                pdfSettings.error = null;
            },
        );

        return { pdfSettings };
    },
});

export default CertificatePDF;
</script>

<style lang="scss">
@import "./pdf-viewer";
</style>
