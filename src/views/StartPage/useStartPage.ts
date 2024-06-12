interface IUseStartPage {
    addToast(data: string): void;
    buttons: { text: string; action: string; type: string }[];
}

export function useStartPage(notificationStore): IUseStartPage {
    const buttons = [
        { id: "0", text: "Toast Success", action: "success", type: "" },
        { id: "1", text: "Toast Warning", action: "warning", type: "secondary" },
        { id: "2", text: "Toast Primary", action: "primary", type: "" },
        { id: "3", text: "Toast Error", action: "error", type: "secondary" },
        { id: "4", text: "Toast Head Only", action: "head", type: "" },
    ];

    const addToast = (data) => {
        if (data == "head") {
            notificationStore.addNotification({
                head: "Title only",
            });
        } else if (data == "description") {
            notificationStore.addNotification({
                body: "Description only",
            });
        } else {
            notificationStore.addNotification({
                head: `Title ${data} Lorem Ipsum is simply dummy `,
                body: `Description ${data} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy`,
                type: data,
                timeless: true,
                button: {
                    text: "Lorem Ipsum",
                    link: "#",
                },
            });
        }
    };

    return { addToast, buttons };
}
