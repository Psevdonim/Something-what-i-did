<template>
    <component
        :is="cardComponent"
        class="card"
        :name="name"
        :class="{
            [`_${type}`]: type,
            _small: small,
            _ultrasmall: ultrasmall,
            '_disable-shadow': disableShadow,
            '_disable-border': disableBorder,
            '_disable-padding': disablePadding,
            '_small-shadow': smallShadow,
            '_overflow-auto': overflowAuto,
        }"
        :style="{
            height: height ? height + 'px' : '',
        }"
    >
        <slot />
    </component>
</template>

<script>
import { defineComponent } from "vue";

const Card = defineComponent({
    name: "Card",
    props: {
        type: {
            type: String,
            default: "white",
        },
        small: {
            type: Boolean,
        },
        ultrasmall: {
            type: Boolean,
        },
        disableShadow: {
            type: Boolean,
        },
        smallShadow: {
            type: Boolean,
        },
        disableBorder: {
            type: Boolean,
        },
        disablePadding: {
            type: Boolean,
        },
        height: {
            type: Number,
        },
        overflowAuto: {
            type: Boolean,
        },
        cardComponent: {
            type: String,
            default: "div",
        },
        name: {
            type: String,
        },
    },
});
export default Card;
</script>

<style lang="scss" scoped>
@import "./card";
</style>
