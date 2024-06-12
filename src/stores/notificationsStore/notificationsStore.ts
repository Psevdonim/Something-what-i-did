import { defineStore } from "pinia";

import { computed, ref } from "vue";
import type { INotification } from "./types";

export const useNotificationsStore = defineStore("notificationsStore", () => {
    const allNotifications = ref<INotification[]>([]);

    /**
     * Set Custom event listener for get the notifications from php monolith.
     *
     * @param {detail:INotification} notification - The notification to be added.
     * @return {void} This function does not return anything.
     */
    document.addEventListener("setNotification", (el: any) => {
        addNotification(el.detail);
    });

    const notifications = computed<INotification[]>(() =>
        allNotifications.value.filter((notification: INotification) => notification.visible),
    );

    /**
     * Adds a notification to the notifications list and sets its visibility.
     *
     * @param {INotification} notification - The notification to be added.
     */
    const addNotification = (notification: INotification) => {
        if (notification) {
            const id = allNotifications.value.length + 1;
            notification.id = id;
            notification.visible = true;

            allNotifications.value.unshift(notification);

            if (!notification.timeless)
                setTimeout(() => {
                    const idx = allNotifications.value.findIndex((item) => notification.id === item.id);
                    allNotifications.value[idx].visible = false;
                }, notification.time ?? 3000);
        }
    };

    /**
     * Deletes a notification from the notifications list by setting its visibility to false.
     *
     * @param {number} id - The ID of the notification to be deleted.
     * @return {void} This function does not return anything.
     */
    const deleteNotification = (id: number) => {
        const idx = allNotifications.value.findIndex((item) => item.id === id);
        allNotifications.value[idx].visible = false;
    };

    return { allNotifications, notifications, addNotification, deleteNotification };
});
