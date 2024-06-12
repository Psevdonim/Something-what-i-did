interface IButton {
    text: string;
    link: string;
}

export type INotification = {
    id: number;
    body?: string;
    head?: string;
    visible: boolean;
    timeless?: boolean;
    time: number;
    button?: IButton;
};

export interface IEventListener {
    (evt: Event): void;
}
