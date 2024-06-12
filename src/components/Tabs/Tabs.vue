<template>
    <div class="tabs">
        <div class="tabs__header" v-if="!headless && tabs.length">
            <InputSwitch
                name="help_business_grow"
                headless
                :items="tabs"
                keyName="key"
                type="ultradark-secondary"
                v-model:data="currentActive"
            />
        </div>
        <div class="tabs__wrapper">
            <slot />
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { InputSwitch } from "../InputSwitch";

const Tabs = defineComponent({
    name: "Tabs",
    props: {
        headless: { type: Boolean, default: false },
        activeIndex: { type: String },
        tabs: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    components: {
        InputSwitch,
    },
    emits: ["update:activeIndex", "changeTab"],
    setup(props, { emit }) {
        const currentActive = computed({
            get() {
                return props.activeIndex;
            },
            set(data) {
                emit("update:activeIndex", data);
                emit("changeTab", data);
            },
        });

        return { currentActive };
    },
});

export default Tabs;
</script>

<style lang="scss">
@import "./tabs";
</style>
