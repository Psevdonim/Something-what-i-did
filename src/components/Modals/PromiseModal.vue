<template>
    <BaseModal :visible="visible" :title="title">
        <slot> this is Modal with Promise </slot>

        <template #footer>
            <slot name="footer" :resolve="resolve" :reject="reject">
                <BaseButton text="Confirm" @click="resolve" type="success" />
                <BaseButton text="Discard" @click="reject" type="error" />
            </slot>
        </template>
    </BaseModal>
</template>
<script setup>
import { usePromiseModal } from "./composables/usePromiseModal";
import { defineExpose } from "vue";
import BaseModal from "./BaseModal.vue";

defineProps({
    title: {
        type: String,
    },
});

const { visible, resolve, reject, openModal } = usePromiseModal();
defineExpose({ openModal });
</script>
<style></style>
