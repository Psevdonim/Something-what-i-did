<template>
    <div
        class="custom-loader"
        :class="{
            [`_${size}`]: size,
            _fullscreen: fullscreen,
            _fullsize: fullsize,
            _fixed: fixed,
            _absolute: absolute,
            _background: background,
        }"
    >
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

const Loader = defineComponent({
    name: "Loader",
    props: {
        size: {
            type: String,
            default: "default",
        },
        fullscreen: {
            type: Boolean,
        },
        fullsize: {
            type: Boolean,
        },
        fixed: {
            type: Boolean,
        },
        absolute: {
            type: Boolean,
        },
        background: {
            type: Boolean,
        },
    },
});

export default Loader;
</script>

<style lang="scss" scoped>
@import "./base-loader";
</style>
