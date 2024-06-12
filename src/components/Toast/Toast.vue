<template>
    <div
        class="toasts__item default toast"
        :class="{
            [`_${notification.type}`]: notification.type,
        }"
    >
        <div class="toast__wrapper">
            <div class="toast__content">
                <p class="toast__title" :class="{ 'mb-5': notification.body }" v-if="notification.head">
                    {{ notification.head }}
                </p>

                <p class="toast__description">
                    {{ notification.body }}
                </p>

                <BaseButton
                    :text="notification.button.text"
                    :type="notification.type || 'second'"
                    class="toast__link mt-15"
                    v-if="notification.button"
                    @click="goTo(notification.button.link)"
                />
            </div>
        </div>
        <div class="toast__close" @click="deleteNotification(notification.id)" v-if="!notification.unClosable"></div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useNotificationsStore } from "@/stores";
import { useRouter } from "vue-router";

const Toast = defineComponent({
    name: "Toast",
    props: {
        notification: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const router = useRouter();
        const notificationStore = useNotificationsStore();

        const deleteNotification = (id) => {
            notificationStore.deleteNotification(id);
        };

        const goTo = (link) => {
            if (link) {
                router.push({ path: link });
            }
        };

        return { deleteNotification, goTo };
    },
});
export default Toast;
</script>

<style lang="scss">
@import "./toast";
</style>
