import type { Ref } from "vue";

export interface IUseLoader {
    loading: Ref<boolean>;
    startLoading: () => void;
    stopLoading: () => void;
}
