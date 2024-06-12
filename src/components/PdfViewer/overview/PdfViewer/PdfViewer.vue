<template>
    <div class="pdf-body">
        <PdfDoc :link="currentSettings.src">
            <template #pages="slotProps">
                <template v-if="slotProps.pages.length">
                    <PdfMenu :pages="slotProps.pages" :showMenu="currentSettings.menu_visible">
                        <div class="pdf-pages">
                            <template v-if="!currentSettings.menu_visible">
                                <PdfPage v-for="(page, index) of slotProps.pages" :page="page" :key="index" />
                            </template>
                            <template v-else>
                                <PdfPage :page="slotProps.pages[currentSettings.pages.current - 1]" />
                            </template>
                        </div>
                    </PdfMenu>
                </template>
            </template>
        </PdfDoc>
    </div>
</template>

<script>
import { computed, defineComponent, provide } from "vue";

import PdfDoc from "./overview/PdfDoc.vue";
import PdfPage from "./overview/PdfPage.vue";
import PdfMenu from "./overview/PdfMenu.vue";

const CertificatePDF = defineComponent({
    props: {
        settings: {
            type: Object,
        },
    },
    components: {
        PdfDoc,
        PdfPage,
        PdfMenu,
    },
    setup(props, { emit }) {
        const currentSettings = computed({
            get() {
                return props.settings;
            },
            set(value) {
                emit("update:settings", value);
            },
        });

        provide("pdfSettings", { pdfSettings: currentSettings.value });

        return {
            currentSettings,
        };
    },
});

export default CertificatePDF;
</script>

<style lang="scss">
@import "./pdf-viewer";
</style>
