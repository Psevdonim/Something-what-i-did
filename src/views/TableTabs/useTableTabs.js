import { ref, watch, computed } from "vue";
import { tabs } from "./constants/tabs";
import * as allColumns from "./constants/columns";
import { getItems } from "./api/api";
import { useNotificationsStore } from "@/stores";

export function useTableTabs() {
    const activeIndex = ref("users");
    const items = ref([]);
    const columns = computed(() => allColumns[activeIndex.value]);
    let controller = new AbortController();

    const updateItems = async (newActive) => {
        controller.abort();
        controller = new AbortController();

        try {
            const res = await getItems(newActive, controller);
            items.value = res;
        } catch (error) {
            useNotificationsStore().addNotification({
                body: error.message,
                type: "error",
            });
        }
    };

    watch(
        activeIndex,
        (data) => {
            updateItems(data);
        },
        { immediate: true },
    );

    return { tabs, columns, items, activeIndex };
}
