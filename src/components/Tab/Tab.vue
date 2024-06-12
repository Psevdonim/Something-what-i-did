<template>
    <div class="tab" v-if="isActive">
        <slot />
    </div>
</template>

<script>
import { defineComponent } from "vue";

const Tab = defineComponent({
    name: "Tab",
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
    },
});
export default Tab;
</script>
