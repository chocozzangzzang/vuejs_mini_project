import { createRouter, createWebHistory } from "vue-router";
import RoomInfo from "../components/RoomInfo.vue";
import InstaView from "@/components/InstaView.vue";

const routes = [
    {
        path : '/',
        name : 'Main',
        component : RoomInfo
    },
    {
        path : '/home',
        name : 'Home',
        component : RoomInfo
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