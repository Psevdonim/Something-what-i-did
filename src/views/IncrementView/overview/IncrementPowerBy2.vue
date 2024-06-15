<template>
    <div class="increment" ref="wrapper">
        <p>position -- {{ position }}</p>
        <p>count -- {{ count }}</p>
        <p>multiple by 2 -- {{ multipleCount }}</p>
        <div class="increment__buttons">
            <BaseButton text="Increase" @click="increase" />
            <BaseButton type="secondary" text="Decrease" @click="decrease" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useIncrement } from "./useIncrement";

const IncrementPowerBy2 = defineComponent({
    name: "IncrementPowerBy2",
    setup() {
        //import from composable
        const { count, increase, decrease, position, wrapper } = useIncrement();
        const multipleCount = computed(() => count.value * 2);

        return { count, increase, multipleCount, decrease, position, wrapper };
    },
});
export default IncrementPowerBy2;
</script>
<style></style>
