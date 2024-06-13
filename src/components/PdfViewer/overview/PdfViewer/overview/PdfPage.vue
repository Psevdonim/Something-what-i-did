<template>
    <div class="pdf-page__wrapper" ref="cardRef">
        <div class="pdf-page__inner">
            <canvas v-bind="canvasAttrs" ref="canvas"></canvas>
            <div class="text-layer" ref="textRef" :style="{ '--scale-factor': viewport?.scale || 1 }"></div>
            <div
                class="annotation-layer"
                ref="annotationsRef"
                :style="{
                    '--scale-factor': viewport?.scale || 1,
                }"
            ></div>
        </div>
    </div>
</template>

<script>
import { debounce } from "@/shared/lib";
import { computed, defineComponent, inject, onMounted, ref, watch } from "vue";

export default defineComponent({
    name: "PDFPage",
    props: {
        page: {
            type: Object,
        },
        size: {
            type: Number,
        },
        isMenu: {
            type: Boolean,
        },
    },
    setup(props) {
        const { pdfSettings } = inject("pdfSettings");
        const outputScale = ref(1);
        const canvas = ref();
        const textRef = ref();
        const annotationsRef = ref();
        const cardRef = ref();

        const viewport = ref();

        const renderTask = ref();
        const canvasAttrs = computed(() => {
            return {
                width: pdfSettings.width,
                height: pdfSettings.height,
                class: "pdf-page pdf-canvas",
                id: "pdf-canvas",
                style: {},
            };
        });

        /**
         * Renders a PDF page with text content and annotations.
         *
         * @param {Object} renderContext - The rendering context for the page.
         * @return {Promise<void>} A promise that resolves when the page is rendered successfully.
         */
        const drawPage = async (renderContext) => {
            try {
                renderTask.value = Object.freeze(await props.page?.render(renderContext));
                await renderTask.value?.promise;

                const textContent = await props.page.getTextContent();
                const annotations = await props.page.getAnnotations();

                await pdfSettings.pdfLib?.renderTextLayer({
                    textContentSource: textContent,
                    container: textRef.value,
                    viewport: viewport.value.clone({ dontFlip: true }),
                });

                if (annotations?.length) {
                    await pdfSettings.pdfLib.AnnotationLayer.render({
                        annotations: annotations,
                        div: annotationsRef.value,
                        viewport: viewport.value.clone({ dontFlip: true }),
                        page: props.page,
                    });
                }
            } catch (response) {
                console.log(response, props.page, `Failed to render page ${props.pageNumber}`);
            } finally {
                pdfSettings.loading = false;
            }
        };

        /**
         * A function that sets the rendering context for the page based on the provided page object.
         *
         * @param {Object} page - The page object containing necessary information for rendering.
         * @return {void} This function does not return anything.
         */
        const setRenderContext = (page) => {
            const canvasContext = canvas.value?.getContext("2d");

            if (canvasContext) {
                pdfSettings.loading = true;
                const [, , width, height] = page.view;
                let scale = pdfSettings.scale;

                if (!pdfSettings.isInited || pdfSettings.autoScale) {
                    let clientWidth =
                        document.querySelector(".pdf-pages")?.clientWidth ||
                        cardRef.value.parentElement.clientWidth ||
                        document.querySelector(".pdf")?.clientWidth;
                    clientWidth -= 50;
                    scale = clientWidth / width;
                    pdfSettings.scale = scale;
                    pdfSettings.autoScale = false;
                }

                viewport.value = page.getViewport({
                    scale: scale,
                    rotation: pdfSettings.rotation,
                    width: width,
                    height: height,
                });
                const transform = [outputScale.value, 0, 0, outputScale.value, 0, 0];
                pdfSettings.width = viewport.value.width * outputScale.value;
                pdfSettings.height = viewport.value.height * outputScale.value;

                pdfSettings.isInited = true;
                drawPage({ canvasContext, transform, viewport: viewport.value });
            }
        };

        const debouncedSetRenderContext = debounce(setRenderContext, 300);

        watch(
            [() => props.page, () => pdfSettings.src, () => pdfSettings.scale, () => pdfSettings.rotation],
            ([pageData]) => {
                if (!pdfSettings.loading && pdfSettings.isInited) {
                    debouncedSetRenderContext(pageData);
                }
            },
        );

        watch(
            () => pdfSettings.menu_visible,
            () => {
                pdfSettings.autoScale = true;
                debouncedSetRenderContext(props.page);
            },
        );

        onMounted(() => {
            setRenderContext(props.page, pdfSettings);
        });

        return { canvasAttrs, canvas, pdfSettings, cardRef, textRef, viewport, drawPage };
    },
});
</script>
