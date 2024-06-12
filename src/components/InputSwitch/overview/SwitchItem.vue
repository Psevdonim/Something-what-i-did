<template>
    <div
        class="custom-input-switch__item"
        @click="changeActive"
        :class="{
            [`_${type}`]: type,
            _active: active === value,
        }"
    >
        <Icon :icon="icon" v-if="icon" /> {{ title }}
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { Icon } from "../../Icon";

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
        active: {
            type: String,
            default: "",
        },
        type: {
            type: String,
        },
    },
    emits: ["update:active"],
    components: { Icon },
    setup(props, { emit }) {
        const changeActive = () => {
            emit("update:active", props.value);
        };

        return { changeActive };
    },
});
export default SwitchItem;
</script>

<style></style>
