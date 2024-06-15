<template>
    <PageHeader />
    <main>
        <slot />
        <ToastsWrapper />
        <Transition>
            <BaseLoader fullsize absolute background v-if="loading" />
        </Transition>
    </main>
    <PageFooter />
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { useLoader } from "@/shared/lib";

import PageHeader from "./overview/PageHeader.vue";
import PageFooter from "./overview/PageFooter.vue";
import ToastsWrapper from "../ToastsWrapper";
import BaseLoader from "@/components/BaseLoader";

const PageWrapper = defineComponent({
    name: "PageWrapper",
    components: { PageHeader, PageFooter, ToastsWrapper, BaseLoader },
    setup() {
        const { loading, startLoading, stopLoading } = useLoader();

        provide("loader", { startLoading, stopLoading, loading });

        return { loading };
    },
});

export default PageWrapper;
</script>
<style lang="scss">
@import "./overview/scss/page-wrapper";
</style>
