<template>
    <div class="skeleton" v-if="type">
        <component :is="`Skeleton${type}`" v-bind="data" />
    </div>
</template>

<script>
import { defineComponent } from "vue";
import * as components from "./components";

const SkeletonLoader = defineComponent({
    name: "SkeletonLoader",
    props: {
        type: {
            type: String,
        },
        data: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    components,
});

export default SkeletonLoader;
</script>

<style lang="scss">
@import "./skeleton-loader";
</style>
