import { onMounted, onUnmounted, type Ref } from "vue";

export function useEventListener<IEvent>(target: Ref, event: string, callback: (event: IEvent) => void) {
    onMounted(() => target.value?.addEventListener(event, callback));
    onUnmounted(() => target.value?.removeEventListener(event, callback));
}
