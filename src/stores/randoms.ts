import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useRandomsStore = defineStore("randoms", () => {
    const randoms = useStorage("randoms", [] as any[]);

    function getRandoms() {
        return randoms.value;
    }

    function setRandoms(randoms: any) {
        randoms.value = randoms;
    }

    return { getRandoms, setRandoms };
});
