<template lang="">
    <button
        class="base-button"
        :class="{
            [`_${type}`]: type,
            [`_${size}`]: size,
        }"
    >
        {{ text }}
    </button>
</template>
<script>
import { defineComponent } from "vue";

const BaseButton = defineComponent({
    name: "BaseButton",
    props: {
        text: {
            type: String,
        },
        type: {
            type: String,
        },
        size: {
            type: String,
        },
    },
});
export default BaseButton;
</script>
<style lang="scss">
@import "./base-button";
</style>
