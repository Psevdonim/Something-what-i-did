<template>
    <div class="base-modal" v-if="visible">
        <dialog :open="visible" class="base-modal__dialog">
            <div class="base-modal__header">
                <h2>{{ title }}</h2>
            </div>
            <div class="base-modal__content">
                <slot> dialog form base modal </slot>
            </div>
            <div class="base-modal__footer">
                <slot name="footer" :resolve="resolve" :reject="reject">
                    <BaseButton text="Confirm" @click="resolve" type="success" />
                    <BaseButton text="Discard" @click="reject" type="error" />
                </slot>
            </div>
        </dialog>
        <div class="base-modal__background"></div>
    </div>
</template>

<script setup>
import { defineModel, defineEmits } from "vue";
defineProps({
    title: {
        type: String,
    },
});

const visible = defineModel("visible", { default: false });

const emit = defineEmits(["resolve", "reject"]);
const resolve = () => {
    visible.value = false;
    emit("resolve");
};

const reject = () => {
    visible.value = false;
    emit("reject");
};
</script>

<style lang="scss">
@import "./scss/base-modal";
</style>
