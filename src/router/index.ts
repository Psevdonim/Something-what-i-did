import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/StartPage"),
        },
        {
            path: "/increment",
            name: "Increment",
            component: () => import("../views/IncrementView"),
        },
        {
            path: "/pdf-viewer",
            name: "Pdf Viewer",
            component: () => import("../views/PdfViewerPage"),
        },
        {
            path: "/tables",
            name: "Tables",
            component: () => import("../views/TableTabs"),
        },
        {
            path: "/modals",
            name: "Modals",
            component: () => import("../views/ModalView"),
        },
    ],
});

export default router;
