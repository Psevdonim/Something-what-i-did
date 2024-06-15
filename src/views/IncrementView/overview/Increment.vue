<template>
    <div class="increment" ref="wrapper">
        <p>position -- {{ position }}</p>
        <p>count -- {{ count }}</p>
        <p>Multiple by {{ multipleBy }} - {{ multipleCount }}</p>
        <div class="increment__buttons">
            <BaseButton text="Increase" @click="increase" />
            <BaseButton type="secondary" text="Decrease" @click="decrease" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useIncrement } from "./useIncrement";

const Increment = defineComponent({
    name: "Increment",
    props: {
        multipleBy: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        //import from composable
        const { count, multipleCount, increase, decrease, position, wrapper } = useIncrement(props.multipleBy);

        return { count, multipleCount, increase, decrease, position, wrapper };
    },
});
export default Increment;
</script>
<style></style>
