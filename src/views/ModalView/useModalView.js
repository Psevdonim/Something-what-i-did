import { reactive, ref } from "vue";

export function useModalView() {
    const modalPromise = ref();
    const modal = reactive({ visible: false });

    const openPromiseModal = async () => {
        try {
            await modalPromise.value?.openModal();
            resolveModal();
        } catch (err) {
            rejectModal();
        }
    };

    const openStandardModal = () => {
        modal.visible = true;
    };

    const resolveModal = () => {
        alert("modal resolved");
    };
    const rejectModal = () => {
        alert("modal rejected");
    };

    return { modal, modalPromise, resolveModal, rejectModal, openPromiseModal, openStandardModal };
}
