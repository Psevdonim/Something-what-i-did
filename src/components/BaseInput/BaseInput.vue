<template lang="">
    <input
        class="base-input"
        :class="{
            _wide: wide,
        }"
        v-model="currentData"
        :type="type"
        :placeholder="placeholder || title"
        :disabled="disabled"
    />
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";

const BaseInput = defineComponent({
    name: "BaseInput",
    props: {
        title: {
            type: String,
        },
        type: {
            type: String,
        },
        placeholder: {
            type: String,
        },
        data: {
            type: [String, Number],
        },
        disabled: {
            type: Boolean,
        },
        wide: {
            type: Boolean,
        },
    },
    setup(props, { emit }) {
        const currentData = computed({
            get() {
                return props.data;
            },
            set(data) {
                emit("update:data", data);
            },
        });
        return { currentData };
    },
});
export default BaseInput;
</script>
<style lang="scss">
@import "./scss/base-input";
</style>
