const express = require('express');
const axios = require('axios');

const api = express.Router();

async function findRecipesbyIngredients (params) {

    try {
        const result = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {params: params})
        return result.data
    } catch (err) {
        console.error(err);
        return []
    }
}
  
api.get("/recipes", async (req, res) => {

    const params = new URLSearchParams();
    params.append('apiKey', process.env.apikey)
    params.append('includeIngredients', req.query.ingredients)
    params.append('intolerances', req.query.intolerances),
    params.append('diet', req.query.diet),
    params.append('sort', req.query.sort),                      // popularity, max-used-ingredients, min-missing-ingredients, time
    params.append('sortDirection', req.query.direction),    // asc, desc
    params.append('offset', req.query.offset),
    params.append('number', '10')

    const recipes = await findRecipesbyIngredients(params)
    res.send(recipes)
});
  
async function findRecipebyId (id) {
    const params = new URLSearchParams();
    params.append('apiKey', process.env.apikey)

    try {
        const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {params: params})
        return result.data
    } catch (err) {
        console.error(err);
        return []
    }
}
  
api.get("/recipe", async (req, res) => {
    console.log(req.query.id)
    const recipe = await findRecipebyId(req.query.id)
    res.send(recipe)
});
  
async function findProductWithCode (code) {

    try {
        const result = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
        if (result.data.status_verbose == 'product found')
        {
        return result.data.product.product_name
        } else {
        return ''
        }
        return name
    } catch (err) {
        console.error(err);
        return ''
    }
}
  
api.get("/product", async (req, res) => {
    const product = await findProductWithCode(req.query.code)
    res.send(product)
});
  
async function getRecipeNutritions (id) {
    const params = new URLSearchParams();
    params.append('apiKey', process.env.apikey)

    try {
        const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json`, {params: params})
        return result.data
    } catch (err) {
        console.error(err);
        return ''
    }
}
  
api.get("/nutritions", async (req, res) => {
    const nutritions = await getRecipeNutritions(req.query.id)
    res.send(nutritions)
});

module.exports = api