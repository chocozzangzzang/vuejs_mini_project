import { createRouter, createWebHistory } from "vue-router";
import RoomInfo from "../components/RoomInfo.vue";
import InstaView from "@/components/InstaView.vue";
import HomePage from "@/components/HomePage.vue";
import PostView from "@/components/PostView.vue";
import { useAuthStore } from "@/store/auth";
import LoginView from "@/components/LoginView.vue";
import SignInView from "@/components/SignInView.vue";
import PostForm from "@/components/layouts/PostForm.vue";

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
    },
    {
        path : '/post',
        name : "Posts",
        component : PostView,
        meta : { requireAuth : true },
    },
    {
        path : '/postWrite',
        name : 'postWrite',
        component : PostForm,
        meta : { requiredAuth : true },
    },
    {
        path : '/login',
        name : 'Login',
        component : LoginView,
    },
    {
        path : '/signIn',
        name : 'SignIn',
        component : SignInView,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // /store/auth.js에 저장한 authStore //
    const authStore = useAuthStore();
    // 인증 허용 x //
    // 1. meta의 requireAuth가 true인가 //
    // 2. store를 통해 받아온 isAuthenticated가 false인가 //
    if(to.meta.requireAuth && !authStore.isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});


export default router;