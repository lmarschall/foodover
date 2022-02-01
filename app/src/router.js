import Vue from "vue";
import Router from "vue-router";

// import Home from '@/components/Home'
// import Profile from '@/components/Profile'
// import Recipe from '@/components/Recipe'
// import Login from '@/components/Login'

// import dynamicly
const Home = () => import("@/components/Home");
const Search = () => import("@/components/Search");
const Recipe = () => import("@/components/Recipe");
const Login = () => import("@/components/Login");

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/search",
            name: "search",
            component: Search
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/recipe/:id",
            name: "recipe",
            component: Recipe
        }
    ]
})
