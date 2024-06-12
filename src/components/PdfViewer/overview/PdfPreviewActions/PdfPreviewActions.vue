<template>
    <Card type="blue" small disableShadow class="pdf-head" v-if="!settings.loading">
        <div class="pdf-head__wrapper">
            <div class="pdf-head__inner">
                <BaseButton transparent text="≡" @click.prevent="changeMenu" />
                <p class="pdf-head__title">
                    {{ settings.title }}
                </p>
            </div>
            <div class="pdf-head__inner">
                <div class="pdf-head__flex pdf-head__pages">
                    <BaseInput :data="data.pages.current" :max="data.pages.count" small @keyup.enter="updatePage" />
                    <p>/</p>
                    <p>{{ data.pages.count }}</p>
                </div>
                <span class="pdf-head__separate" />
                <div class="pdf-head__flex">
                    <BaseButton text="-" :disabled="data.scale <= 0.05" @click="changePercent(false)" />
                    <BaseInput :data="currentScale" :max="300" :min="10" type="number" @keyup.enter="updateScale" />
                    <BaseButton text="+" :disabled="data.scale >= 2.05" @click="changePercent(true)" />
                </div>
                <span class="pdf-head__separate" />
                <div class="pdf-head__flex">
                    <BaseButton text="↺" @click="changeRotation" />
                </div>
            </div>
            <div class="pdf-head__inner">
                <BaseButton text="print" @click.prevent="printPdf" />
                <BaseButton text="download" @click.prevent="downloadPdf" />
            </div>
        </div>
    </Card>
</template>

<script>
import { defineComponent, computed } from "vue";
import { downloadFile } from "@/shared/lib";

import BaseInput from "@/components/BaseInput";
import Card from "@/components/Card";

const PdfPreviewActions = defineComponent({
    name: "PdfPreviewActions",
    props: {
        settings: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    emits: ["certificateAction", "update:settings"],
    components: { BaseInput, Card },
    setup(props, { emit }) {
        const data = computed({
            get() {
                return props.settings;
            },
            set(value) {
                emit("update:settings", value);
            },
        });

        const currentScale = computed({
            get() {
                return Math.round(data.value.scale * 100);
            },
            set(value) {
                data.value.scale = value / 100;
            },
        });

        const menuIcon = computed(() => {
            return data.value.menu_visible ? "close" : "burger";
        });

        const changeRotation = () => {
            if (props.rotation >= 270) {
                data.value.rotation = 0;
            } else {
                data.value.rotation += 90;
            }
        };

        const changePercent = (isIncrease) => {
            if (!isIncrease && data.value.scale > 0.35) {
                data.value.scale = Number(+data.value.scale - 0.25).toFixed(2);
                certificateAction("zoomIn");
            } else if (isIncrease && data.value.scale < 3) {
                data.value.scale = Number(+data.value.scale + 0.25).toFixed(2);
                certificateAction("zoomOut");
            }
        };

        const changePagesVisible = () => {
            data.value.pages_visible = !data.value.pages_visible;
        };

        const certificateAction = (action) => {
            emit("certificateAction", action);
        };

        const changeMenu = () => {
            data.value.menu_visible = !data.value.menu_visible;
        };

        const downloadPdf = () => {
            const { src, title } = props.settings;
            downloadFile(src, title);
        };

        const printPdf = () => {
            window.open(props.settings.src);
        };

        const checkCorrect = (min = 0, max, value) => {
            return (!max || +value <= +max) && +value > +min;
        };

        const updatePage = (event) => {
            const { min, max, value } = event.target;

            if (checkCorrect(min, max, value)) {
                data.value.pages.current = value;
            } else {
                data.value.pages.current = props.settings.pages.current;
            }
        };

        const updateScale = (event) => {
            const { min, max, value } = event.target;

            if (checkCorrect(min, max, value)) {
                currentScale.value = value;
            } else {
                currentScale.value = props.settings.scale * 100;
            }
        };

        return {
            data,
            menuIcon,
            currentScale,
            changePercent,
            changeRotation,
            changePagesVisible,
            certificateAction,
            changeMenu,
            downloadPdf,
            printPdf,
            updatePage,
            updateScale,
        };
    },
});
export default PdfPreviewActions;
</script>

<style></style>
