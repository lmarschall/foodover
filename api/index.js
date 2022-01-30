require('dotenv').config();

const express = require('express');
const axios = require('axios');

const api = express.Router();
const debug = process.env.DEBUG || false;

if (debug) console.log('server is starting in debug mode')

let recipes_result = []
let recipe_result = []
let recommends_result = []
let randoms_result = []

async function findRecipesbyIngredients (params) {

    try {
        const result = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {params: params})
        return result.data
    } catch (err) {
        console.error(err);
        return []
    }
}
  
api.get("/recipes", async (req, res) => {

    const params = new URLSearchParams();
    params.append('apiKey', process.env.API_KEY)
    params.append('ingredients', req.query.ingredients)

    let recipes = []

    if (debug) {
        if (recipes_result.length == 0) {
            recipes_result = await findRecipesbyIngredients(params)
        }
        recipes = recipes_result
    } else {
        recipes = await findRecipesbyIngredients(params)
    }
    
    res.send(recipes)
});
  
async function findRecipebyId (id) {
    const params = new URLSearchParams();
    params.append('apiKey', process.env.API_KEY)

    try {
        const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {params: params})
        return result.data
    } catch (err) {
        console.error(err);
        return []
    }
}
  
api.get("/recipe", async (req, res) => {

    let recipe = []

    if (debug) {
        if (recipe_result.length == 0) {
            recipe_result = await findRecipebyId(req.query.id)
        }
        recipe = recipe_result
    } else {
        recipe = await findRecipebyId(req.query.id)
    }

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
    params.append('apiKey', process.env.API_KEY)

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

async function getRecipeRecommends (id) {
    const params = new URLSearchParams();
    params.append('apiKey', process.env.API_KEY)
    params.append('number', 10)

    try {
        const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar`, {params: params})
        return result.data
    } catch (err) {
        console.error(err);
        return ''
    }
}
  
api.get("/recommends", async (req, res) => {

    let recommends = []

    if (debug) {
        if (recommends_result.length == 0) {
            recommends_result = await getRecipeRecommends(req.query.id)
        }
        recommends = recommends_result
    } else {
        recommends = await getRecipeRecommends(req.query.id)
    }

    res.send(recommends)
});

async function getRecipesRandom () {
    const params = new URLSearchParams();
    params.append('apiKey', process.env.API_KEY)
    params.append('number', 10)

    try {
        const result = await axios.get(`https://api.spoonacular.com/recipes/random`, {params: params})
        return result.data
    } catch (err) {
        console.error(err);
        return ''
    }
}
  
api.get("/randoms", async (req, res) => {

    let randoms = []

    if (debug) {
        if (randoms_result.length == 0) {
            randoms_result = await getRecipesRandom()
        }
        randoms = randoms_result
    } else {
        randoms = await getRecipesRandom()
    }
    
    res.send(randoms)
});

module.exports = api