<template>
    <article class="page-header">
        <nav class="page-header__nav">
            <ol class="page-header__links">
                <li class="page-header__links-item" v-for="route of routes" :key="route.name">
                    <RouterLink :to="route.path">
                        {{ route.name }}
                    </RouterLink>
                </li>
            </ol>
        </nav>
    </article>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

const PageHeader = defineComponent({
    name: "PageHeader",
    setup() {
        const router = useRouter();

        const routes = router.getRoutes();
        return { routes };
    },
});

export default PageHeader;
</script>
<style lang="scss">
@import "./scss/page-header";
</style>
