<template>
    <div>
        <div class="custom-input-switch custom-input-switch__wrapper">
            <SwitchItem
                v-model:data="currentData"
                v-for="item of items"
                :title="item.title ?? item[keyName]"
                :value="item[keyName] ?? item.title"
                :type="type"
                :key="item.value"
                :icon="item.icon"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, computed } from "vue";

const SwitchItem = defineAsyncComponent(() => import("./overview/SwitchItem.vue"));

const InputSwitch = defineComponent({
    name: "InputSwitch",
    props: {
        title: {
            type: String,
            default: "",
        },
        data: {
            type: String,
            default: "",
        },
        items: {
            type: Array,
            default() {
                return [];
            },
        },
        headless: {
            type: Boolean,
            default: false,
        },
        keyName: {
            type: String,
            default: "value",
        },
        type: {
            type: String,
        },
    },
    emits: ["update:data"],
    components: {
        SwitchItem,
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
export default InputSwitch;
</script>

<style lang="scss">
@import "./input-switch";
</style>
