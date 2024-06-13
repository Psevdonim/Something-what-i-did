<template lang="">
    <Tabs v-model:activeIndex="activeIndex" :tabs="tabs">
        <template #activeTab>
            <BaseTable :items="items" :columns="columns">
                <template #address="{ item: { address } }">
                    {{ address.city }} - {{ address.street }} - {{ address.suite }}
                    {{ address.zipcode }}
                </template>
            </BaseTable>
        </template>
    </Tabs>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import Tabs from "@/components/Tabs";
import BaseTable from "@/components/BaseTable";
import { useTableTabs } from "./useTableTabs";

const TableTabs = defineComponent({
    name: "TableTabs",
    components: {
        Tabs,
        BaseTable,
    },
    setup() {
        const { activeIndex, items, columns, tabs } = useTableTabs();

        return { activeIndex, items, columns, tabs };
    },
});

export default TableTabs;
</script>
<style lang=""></style>
