<template>
    <PageHeader />
    <main>
        <slot />
        <ToastsWrapper />
    </main>
    <PageFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageHeader from "./overview/PageHeader.vue";
import PageFooter from "./overview/PageFooter.vue";
import ToastsWrapper from "../ToastsWrapper";

const PageWrapper = defineComponent({
    name: "PageWrapper",
    components: { PageHeader, PageFooter, ToastsWrapper },
});

export default PageWrapper;
</script>
<style lang="scss">
@import "./overview/scss/page-wrapper";
</style>
