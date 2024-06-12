<template lang="">
    <div class="increment" ref="wrapper">
        <p>position -- {{ position }}</p>
        <p>count -- {{ count }}</p>
        <div class="increment__buttons">
            <BaseButton text="Increase" @click="increase" />
            <BaseButton type="secondary" text="Decrease" @click="decrease" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useIncrement } from "./useIncrement";

const IncrementPowerBy1 = defineComponent({
    name: "IncrementPowerBy1",
    setup() {
        //import from composable
        const { count, increase, decrease, position, wrapper } = useIncrement();

        return { count, increase, decrease, position, wrapper };
    },
});
export default IncrementPowerBy1;
</script>
<style lang=""></style>
