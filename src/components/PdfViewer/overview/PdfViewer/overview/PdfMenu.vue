<template>
    <div class="pdf-wrapper">
        <div class="pdf-menu" v-if="showMenu">
            <PdfPage
                :page="page"
                v-for="(page, idx) of pages"
                :key="idx"
                :size="150"
                :isMenu="true"
                :class="{
                    _active: idx + 1 === pdfSettings.pages.current,
                }"
                @click="changePage(idx + 1)"
            />
        </div>
        <slot />
    </div>
</template>

<script>
import { defineComponent, inject } from "vue";

import PdfPage from "./PdfPage.vue";

export default defineComponent({
    name: "PdfMenu",

    props: {
        pages: {
            type: Array,
            required: true,
        },
        showMenu: {
            type: Boolean,
        },
    },
    components: { PdfPage },
    setup() {
        const { pdfSettings } = inject("pdfSettings");

        const changePage = (page) => {
            pdfSettings.pages.current = page;
        };

        return { pdfSettings, changePage };
    },
});
</script>
