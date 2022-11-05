import { createRouter, createWebHistory } from "vue-router";

// import dynamically
const Home = () => import("./../views/Home.vue");
const Search = () => import("./../views/Search.vue");
const Recipe = () => import("./../views/Recipe.vue");
const Login = () => import("./../views/Login.vue");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/search",
            name: "search",
            component: Search,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/recipe/:id",
            name: "recipe",
            component: Recipe,
        },
    ],
});

export default router;
