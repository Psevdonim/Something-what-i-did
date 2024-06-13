<template>
    <div
        class="custom-input-switch__item"
        :class="{
            [`_${type}`]: type,
            _active: data === value,
        }"
        @click="changeData"
    >
        {{ title }}
    </div>
</template>

<script>
import { defineComponent } from "vue";

const SwitchItem = defineComponent({
    props: {
        title: {
            type: String,
            default: "",
        },
        value: {
            type: [Number, Boolean, String],
            default: null,
        },
        icon: {
            type: String,
            default: "",
        },
        data: {
            type: String,
            default: "",
        },
        type: {
            type: String,
        },
    },
    emits: ["update:data"],
    setup(props, { emit }) {
        const changeData = () => {
            emit("update:data", props.value);
        };

        return { changeData };
    },
});
export default SwitchItem;
</script>

<style></style>
