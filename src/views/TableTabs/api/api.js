import { useApi } from "@/shared/lib";

import { useNotificationsStore } from "@/stores";

const generateLink = (data) => `https://jsonplaceholder.typicode.com/${data}`;

export const getItems = async (data, controller) => {
    try {
        const res = await useApi.get({ link: generateLink(data), controller });
        return res;
    } catch (error) {
        useNotificationsStore().addNotification({
            body: error.message,
            type: "error",
        });
    }
};
