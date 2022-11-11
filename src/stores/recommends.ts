import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useRecommendsStore = defineStore("recommends", () => {
    const recommends = useStorage("recommends", [] as any[]);

    function getRecommends() {
        return recommends.value;
    }

    function setRecommends(recommends: any) {
        recommends.value = recommends;
    }

    return { getRecommends, setRecommends };
});
