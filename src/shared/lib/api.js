import { useNotificationsStore } from "@/stores";
import { standartizeLink } from "./index";

let notificationStore = null;

const notificate = (body, type) => {
    if (notificationStore === null) {
        notificationStore = useNotificationsStore();
    }
    notificationStore.addNotification({
        head: type === "error" ? "Something went wrong!" : "Success",
        body,
        type,
    });
};

const standardHeaders = {
    "Content-Type": "application/json; charset=utf-8",
};

const checkRedirectAndErrors = async (response, redirect) => {
    try {
        if (response.redirected) {
            if (!response.url.includes(window.location.pathname) && redirect) {
                window.location = standartizeLink(response.url);
            }
        }

        const result = await response.json();

        if ((typeof result?.success == "boolean" && !result?.success) || result?.errors?.length) {
            for (const key in result.errors) {
                notificate(result.errors[key], "error");
            }
        } else if (result?.error) {
            notificate(result.error, "error");
        }

        if (result.redirect && !result.redirect.includes(window.location.pathname) && redirect) {
            window.location = standartizeLink(result.redirect);
        }

        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const useApi = {
    get: async ({
        link = "",
        headers = {},
        controller = new AbortController(),
        redirect = true,
        isNotificate = true,
    }) => {
        setTimeout(() => controller.abort(), 3000);
        try {
            if (link.includes?.("?")) {
                link = link + "&ajax=true";
            } else {
                link = link + "?ajax=true";
            }

            const response = await fetch(link, {
                method: "GET",
                signal: controller.signal,
                headers: {
                    ...standardHeaders,
                    ...headers,
                },
            });

            const result = await checkRedirectAndErrors(response, redirect);

            return result || true;
        } catch (err) {
            if (isNotificate) {
                notificate(err.response, "error");
            }
            return new Error(err);
        }
    },
};
