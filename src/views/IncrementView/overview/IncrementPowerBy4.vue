<template>
    <div class="increment" ref="wrapper">
        <p>position -- {{ position }}</p>
        <p>count -- {{ count }}</p>
        <p>multiple by 4 -- {{ multipleCount }}</p>
        <div class="increment__buttons">
            <BaseButton text="Increase" @click="increase" />
            <BaseButton type="secondary" text="Decrease" @click="decrease" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useIncrement } from "./useIncrement";

const IncrementPowerBy4 = defineComponent({
    name: "IncrementPowerBy4",
    setup() {
        //import from composable
        const { count, increase, decrease, position, wrapper } = useIncrement();
        const multipleCount = computed(() => count.value * 4);

        return { count, increase, multipleCount, decrease, position, wrapper };
    },
});
export default IncrementPowerBy4;
</script>
<style></style>
