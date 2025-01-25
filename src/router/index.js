import { createRouter, createWebHistory } from "vue-router";
import RoomInfo from "../components/RoomInfo.vue";
import InstaView from "@/components/InstaView.vue";
import HomePage from "@/components/HomePage.vue";

const routes = [
    {
        path : '/',
        name : 'Main',
        component : HomePage,
    },
    {
        path : '/home',
        name : 'Home',
        component : HomePage,
    },
    {
        path : '/rooms',
        name : 'Rooms',
        component : RoomInfo
    },
    {
        path : '/instagram',
        name : 'Instagram',
        component : InstaView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;