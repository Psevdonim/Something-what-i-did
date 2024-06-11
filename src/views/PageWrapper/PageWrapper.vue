<template>
    <PageHeader />
    <main>
        <slot />
    </main>
    <PageFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageHeader from "./overview/PageHeader.vue";
import PageFooter from "./overview/PageFooter.vue";
const PageWrapper = defineComponent({
    name: "PageWrapper",
    components: { PageHeader, PageFooter },
});

export default PageWrapper;
</script>
