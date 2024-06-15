<template>
    <div>
        <BaseButton text="Open Promise Modal" class="mr-16" @click="openPromiseModal" />
        <BaseButton text="Open Standard Modal" @click="openStandardModal" />

        <BaseModal title="Base Modal" v-model:visible="modal.visible" @resolve="resolveModal" @reject="rejectModal" />
        <PromiseModal title="Promise Modal" ref="modalPromise" />
    </div>
</template>
<script>
import { defineComponent } from "vue";
import { BaseModal, PromiseModal } from "@/components/Modals";
import { useModalView } from "./useModalView";
const ModalView = defineComponent({
    name: "ModalView",
    components: {
        BaseModal,
        PromiseModal,
    },
    setup() {
        const { modal, modalPromise, openPromiseModal, openStandardModal, resolveModal, rejectModal } = useModalView();

        return { modal, modalPromise, openPromiseModal, openStandardModal, resolveModal, rejectModal };
    },
});

export default ModalView;
</script>
