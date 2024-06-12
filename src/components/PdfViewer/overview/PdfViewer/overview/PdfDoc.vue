<template>
    <div>
        <slot name="pages" :pages="pdfSettings.pages.data" />
    </div>
</template>

<script>
import { defineComponent, inject, ref, watch } from "vue";
import pdfLib from "@bundled-es-modules/pdfjs-dist/build/pdf";
import "@bundled-es-modules/pdfjs-dist/build/pdf.worker.entry.js";

export default defineComponent({
    name: "PdfDoc",

    props: {
        link: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        const pdf = { value: null };
        const cursor = ref(0);
        const { pdfSettings } = inject("pdfSettings");

        /**
         * Fetches pages from the PDF document.
         *
         * @param {number} [currentPage=0] - The current page number. Defaults to 0.
         * @return {Promise<Array>} A promise that resolves to an array of fetched pages.
         */
        const fetchPages = async (currentPage = 0) => {
            if (!pdf.value) return;
            if (pdfSettings.numPages > 0 && pdfSettings.pages.data.length === pdfSettings.pages.count) return;
            const startIndex = pdfSettings.pages.data.length;
            if (cursor.value > startIndex) return;

            cursor.value = Math.min(Math.max(currentPage, startIndex + 10), pdf.value.numPages);

            const allPages = await getPages();
            return allPages;
        };

        /**
         * Retrieves all pages from the PDF document.
         *
         * @return {Promise<Array>} A promise that resolves to an array of all pages in the PDF document.
         */
        const getPages = async () => {
            const ranges = Array.from({ length: pdf.value.numPages }, (_, i) => i + 1);
            let allPages = [];

            for (let i of ranges) {
                const page = await pdf.value.getPage(i);
                allPages.push(page);
            }
            pdfSettings.pages.count = pdf.value.numPages;
            pdfSettings.numPages = pdf.value.numPages;
            return allPages;
        };

        watch(
            () => props.link,
            async (data, oldData) => {
                pdfSettings.loading = true;
                if (oldData) {
                    cursor.value = 0;
                    pdfSettings.pages.data = [];
                }

                if (data) {
                    try {
                        const pdfData = await pdfLib.getDocument(data);
                        pdf.value = Object.freeze(await pdfData.promise);
                        pdfSettings.title = await pdfLib.getFilenameFromUrl(data);
                        pdfSettings.pages.data = Object.freeze(await fetchPages());
                        pdfSettings.pdfData = pdf.value;
                        pdfSettings.pdfLib = pdfLib;
                    } catch (error) {
                        console.dir(error);
                        pdfSettings.error = true;
                    }
                }
            },
            {
                immediate: true,
            },
        );

        return { pdfSettings };
    },
});
</script>
