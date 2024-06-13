export interface IColumn {
    id: number;
    field: string;
    title: string;
    type?: string;
    width?: string;
    sortable?: boolean;
    filterable?: boolean;
}
