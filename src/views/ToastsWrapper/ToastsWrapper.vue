<template>
    <div class="toasts">
        <div class="toasts__wrapper">
            <transition-group name="appearance">
                <Toast :notification="notification" v-for="notification of notifications" :key="notification.id" />
            </transition-group>
        </div>
    </div>
</template>

<script>
import { useNotificationsStore } from "@/stores";
import { defineComponent, computed } from "vue";
import Toast from "@/components/Toast";

const NotificationsToaster = defineComponent({
    name: "NotificationsToaster",
    components: {
        Toast,
    },
    setup() {
        const notificationStore = useNotificationsStore();
        const notifications = computed(() => notificationStore.notifications);

        return {
            notifications,
        };
    },
});
export default NotificationsToaster;
</script>

<style lang="scss">
@import "./assets/toasts";
</style>
