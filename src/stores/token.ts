import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTokenStore = defineStore("token", () => {
    const token = useStorage("token", "");

    function setToken(newToken: string) {
        token.value = newToken
    }

    function getToken() {
        return token.value;
    }

    return { setToken, getToken };
});
