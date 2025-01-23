import { createRouter, createWebHistory } from "vue-router";
import RoomInfo from "../components/RoomInfo.vue";

const routes = [
    {
        path : '/rooms',
        name : 'Rooms',
        component : RoomInfo
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;