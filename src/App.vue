<template>
    <PageWrapper>
        <transition>
            <RouterView />
        </transition>
    </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import PageWrapper from "./views/PageWrapper";

const App = defineComponent({
    components: { RouterView, PageWrapper },
});

export default App;
</script>
