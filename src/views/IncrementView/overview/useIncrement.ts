import { ref, reactive, type Ref, computed } from "vue";
import { useEventListener } from "./UseEventListener";

interface IIncrementWithListeners {
    count: Ref<number>;
    position: { x: number; y: number };
    wrapper: Ref;
    multipleCount: Ref<number>;
    increase: () => void;
    decrease: () => void;
}

export function useIncrement(multiple: number = 1): IIncrementWithListeners {
    const count = ref<number>(0);
    const position = reactive({ x: 0, y: 0 });

    const increase = () => {
        count.value++;
    };
    const decrease = () => {
        count.value--;
    };

    const multipleCount = computed<number>(() => count.value * multiple);

    const wrapper = ref();
    const update = (event: MouseEvent) => {
        position.x = event.pageX;
        position.y = event.pageY;
    };

    useEventListener<MouseEvent>(wrapper, "mousemove", update);

    return { position, count, wrapper, multipleCount, increase, decrease };
}
