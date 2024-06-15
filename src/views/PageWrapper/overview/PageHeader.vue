<template>
    <article class="page-header">
        <nav class="page-header__nav">
            <ol class="page-header__links">
                <li class="page-header__links-item" v-for="route of routes" :key="route.name">
                    <RouterLink :to="route.path">
                        {{ route.name }}
                    </RouterLink>
                </li>

                <li class="page-header__links-item">
                    <BaseButton :text="changeLoaderButtonText" @click="changeLoader" />
                </li>
            </ol>
        </nav>
    </article>
</template>
<script lang="ts">
import { computed, defineComponent, inject, toValue } from "vue";
import { useRouter } from "vue-router";
import type { IUseLoader } from "@/shared/lib";
const PageHeader = defineComponent({
    name: "PageHeader",
    setup() {
        const router = useRouter();
        const routes = router.getRoutes();
        const loader: IUseLoader = inject("loader");
        console.log(loader);

        const changeLoaderButtonText = computed(() =>
            toValue(loader.loading) ? "Выключить Глобальный лоадер" : "Включить Глобальный лоадер",
        );

        const changeLoader = () => {
            if (toValue(loader.loading)) {
                loader.stopLoading();
            } else {
                loader.startLoading();
            }
        };

        return { routes, loader, changeLoaderButtonText, changeLoader };
    },
});

export default PageHeader;
</script>
<style lang="scss">
@import "./scss/page-header";
</style>
