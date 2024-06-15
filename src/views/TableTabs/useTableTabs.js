import { ref, watch, computed, shallowRef } from "vue";
import { tabs } from "./constants/tabs";
import * as allColumns from "./constants/columns";
import { getItems } from "./api/api";
import { useNotificationsStore } from "@/stores";
import { useLoader, addCaching } from "@/shared/lib";
const cachedGetItems = addCaching(getItems);

export function useTableTabs() {
    const { loading, startLoading, stopLoading } = useLoader();

    const activeIndex = ref("users");
    const items = shallowRef([]);
    const columns = computed(() => allColumns[activeIndex.value]);
    let controller = new AbortController();

    const updateItems = async (newActive) => {
        controller.abort();
        controller = new AbortController();

        try {
            startLoading();
            const res = await cachedGetItems(newActive, controller);
            items.value = res;
        } catch (error) {
            useNotificationsStore().addNotification({
                body: error.message,
                type: "error",
            });
        } finally {
            stopLoading();
        }
    };

    watch(
        activeIndex,
        (data) => {
            updateItems(data);
        },
        { immediate: true },
    );

    return { tabs, columns, items, activeIndex, loading };
}
