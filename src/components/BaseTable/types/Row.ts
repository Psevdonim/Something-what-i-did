export interface IRow {
    id: number;
    data: { [key: string]: any };
    hasActions?: boolean;
    actions?: { text: string; link: string }[];
}
