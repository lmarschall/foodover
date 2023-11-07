import axios from "axios";
import { SpoonacularRequest } from "./../interfaces/requests";

class SpoonacularService {
    private apiKey = import.meta.env.VITE_API_KEY || "";

    constructor() {}

    async executeSpoonacularQuery(url: string, params: URLSearchParams) {
        // try {
        //     const result = await axios.get(url, {params: params})
        //     await this.checkSpoonacularUsage(result.headers)
        //     return result.data
        // } catch (err) {
        //     console.error(err);
        //     return []
        // }
        const result = await axios.get<SpoonacularRequest>(url, {
            params: params,
        });
        this.checkSpoonacularUsage(result.headers);
        return result.data as any;
    }

    checkSpoonacularUsage(headers: any) {
        console.log("check api usage");

        const request_cost = headers["x-api-quota-request"];
        const request_used = headers["x-api-quota-used"];
        const request_left = headers["x-api-quota-left"];

        if (request_left <= 5.0) {
            // TODO throw error if no points are left
            console.log("no points left");
        } else {
            console.log("enough points left");
        }
    }

    searchByIngredients(ingredients: string, sort: string) {
        const params = new URLSearchParams();
        params.append("apiKey", this.apiKey);
        params.append("includeIngredients", ingredients);
        params.append("sort", sort);

        const url = `https://api.spoonacular.com/recipes/complexSearch`;

        return this.executeSpoonacularQuery(url, params);
    }

    getRecipe(id: string) {
        const params = new URLSearchParams();
        params.append("apiKey", this.apiKey);

        const url = `https://api.spoonacular.com/recipes/${id}/information`;

        return this.executeSpoonacularQuery(url, params);
    }

    findProductWithCode(code: string) {

        const params = new URLSearchParams();
        params.append("apiKey", this.apiKey);

        const url = `https://api.spoonacular.com/food/products/upc/${code}`;

        return this.executeSpoonacularQuery(url, params);


        // https://api.spoonacular.com/food/products/upc/{upc}
        // // return axios.get(
        // //     `https://world.openfoodfacts.org/api/v0/product/${code}.json`
        // // );
    }

    getNutritions(id: string) {
        const params = new URLSearchParams();
        params.append("apiKey", this.apiKey);

        const url = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json`;

        return this.executeSpoonacularQuery(url, params);
    }

    getRecommends(id: string) {
        const params = new URLSearchParams();
        params.append("apiKey", this.apiKey);
        params.append("number", "10");

        const url = `https://api.spoonacular.com/recipes/${id}/similar`;

        return this.executeSpoonacularQuery(url, params);
    }

    async getRandoms(): Promise<any> {
        const params = new URLSearchParams();
        params.append("apiKey", this.apiKey);
        params.append("number", "10");

        const url = `https://api.spoonacular.com/recipes/random`;

        const result: any = await this.executeSpoonacularQuery(url, params);
        return result.recipes;
    }
}

export default new SpoonacularService();
