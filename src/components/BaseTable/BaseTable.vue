<template>
    <table class="base-table">
        <tr class="base-table__header">
            <th v-for="column of columns" :key="column.id" class="base-table__header-item">{{ column.title }}</th>
        </tr>
        <tr v-for="item of items" :key="item.id" class="base-table__row">
            <td v-for="column of columns" :key="column.id" class="base-table__row-item">
                <slot :name="column.field" :item="item">
                    {{ item[column.field] }}
                </slot>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { IColumn } from "./types/Column";
import type { IRow } from "./types/Row";

const BaseTable = defineComponent({
    name: "BaseTable",
    props: {
        columns: { type: Array as PropType<IColumn[]>, required: true },
        items: { type: Array as PropType<IRow[]>, required: true },
    },
});
export default BaseTable;
</script>
<style lang=""></style>
