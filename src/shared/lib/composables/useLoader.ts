import { ref } from "vue";
import type { IUseLoader } from "../interfaces/useLoader";

export function useLoader(): IUseLoader {
    const loading = ref(false);

    const startLoading = () => {
        loading.value = true;
    };

    const stopLoading = () => {
        loading.value = false;
    };

    return { loading, startLoading, stopLoading };
}
