import { ref } from "vue";

export const usePromiseModal = () => {
    const visible = ref(false);
    const resolve = ref();
    const reject = ref();

    const openModal = (): Promise<any> => {
        visible.value = true;
        return new Promise((res, rej) => {
            resolve.value = res;
            reject.value = rej;
        }).finally(() => {
            visible.value = false;
        });
    };

    return { visible, resolve, reject, openModal };
};
