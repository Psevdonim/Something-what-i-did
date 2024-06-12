<template>
    <div class="increments">
        <div class="increments__wrapper">
            <h2>bad practice</h2>
            <div class="increment__wrapper">
                <template v-for="i of 6" :key="i">
                    <component :is="`IncrementPowerBy${i}`" />
                </template>
            </div>
        </div>
        <div class="increments__wrapper">
            <h2>normal practice</h2>
            <div class="increment__wrapper">
                <template v-for="i of 6" :key="i">
                    <Increment :multipleBy="i" />
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as increments from "./overview";

const IncrementView = defineComponent({
    name: "IncrementView",
    components: { ...increments },
});

export default IncrementView;
</script>
<style lang="scss">
@import "./overview/scss/increment";
</style>
