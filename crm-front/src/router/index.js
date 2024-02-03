import {createRouter, createWebHistory} from 'vue-router';

import HomePage from "@/components/HomePage.vue";
import UserRegistration from "@/components/auth/UserRegistration.vue";
import UserLogin from "@/components/auth/UserLogin.vue";
import CreateUser from "@/components/users/CreateUser.vue";
import SideBar from "@/components/ui-components/SideBar.vue";
import ShowUsers from "@/components/users/ShowUsers.vue";
import CreateClient from "@/components/clients/CreateClient.vue";
import ShowClients from "@/components/clients/ShowClients.vue";
import CreateApplication from "@/components/applications/CreateApplication.vue";
import ShowApplications from "@/components/applications/ShowApplications.vue";

const routes = [
    {
        name: "/",
        path: '/',
        component: SideBar,
        children: [
            {
                name: "main",
                path: '/main',
                component: HomePage,
            },
            {
                name: "applications",
                path: '/applications',
                component: ShowApplications,
            },
            {
                name: "create_applications",
                path: '/create_applications',
                component: CreateApplication,
            },
            {
                name: "users",
                path: '/users',
                component: ShowUsers,
            },
            {
                name: "create_user",
                path: '/create_user',
                component: CreateUser,
            },
            {
                name: "edit_user",
                path: '/edit_user',
                component: CreateUser,
            },
            {
                name: "create_client",
                path: '/create_client',
                component: CreateClient,
            },
            {
                name: "edit_clients",
                path: '/edit_clients',
                component: CreateClient,
            },
            {
                name: "clients",
                path: '/clients',
                component: ShowClients,
            },
        ],
    },
    {
        name: 'login',
        path: '/login',
        component: UserLogin,
    },
    {
        name: 'register',
        path: '/register',
        component: UserRegistration,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
