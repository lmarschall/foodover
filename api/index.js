require('dotenv').config();

const express = require('express');
const axios = require('axios');
const webauthn = require('../webauthn');

const api = express.Router();
const debug = process.env.DEBUG || false;

if (debug) console.log('server is starting in debug mode')

let recipes_result = []
let recipe_result = []
let recommends_result = []
let randoms_result = []

async function executeSpoonacularQuery (url, params) {
    
    try {
        const result = await axios.get(url, {params: params})
        await checkSpoonacularUsage(result.headers)
        return result.data
    } catch (err) {
        console.error(err);
        return []
    }
}

async function checkSpoonacularUsage (headers) {

    console.log("check api usage");

    const request_cost = headers['x-api-quota-request'];
    const request_used = headers['x-api-quota-used'];
    const request_left = headers['x-api-quota-left'];

    if(request_left <= 5.0) {
        console.log("no points left");
    } else {
        console.log("enough points left");
    }
}
  
api.get("/recipes", webauthn.validateToken, async (req, res) => {

    const params = new URLSearchParams();
    params.append('apiKey', process.env.API_KEY)
    params.append('includeIngredients', req.query.ingredients)
    params.append('sort', req.query.sort)

    const url = `https://api.spoonacular.com/recipes/complexSearch`

    let recipes = []

    if (debug) {
        if (recipes_result.length == 0) {
            recipes_result = await executeSpoonacularQuery(url, params)
        }
        recipes = recipes_result
    } else {
        recipes = await executeSpoonacularQuery(url, params)
    }
    
    res.send(recipes)
});
  
api.get("/recipe", webauthn.validateToken, async (req, res) => {

    const params = new URLSearchParams();
    params.append('apiKey', process.env.API_KEY)

    const url = `https://api.spoonacular.com/recipes/${req.query.id}/information`

    let recipe = []

    if (debug) {
        if (recipe_result.length == 0) {
            recipe_result = await executeSpoonacularQuery(url, params)
        }
        recipe = recipe_result
    } else {
        recipe = await executeSpoonacularQuery(url, params)
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
  
api.get("/nutritions", async (req, res) => {

    const params = new URLSearchParams();
    params.append('apiKey', process.env.API_KEY);

    const url = `https://api.spoonacular.com/recipes/${req.query.id}/nutritionWidget.json`;

    const nutritions = await executeSpoonacularQuery(url, params);
    res.send(nutritions);
});
  
api.get("/recommends", webauthn.validateToken, async (req, res) => {

    const params = new URLSearchParams();
    params.append('apiKey', process.env.API_KEY)
    params.append('number', 10)

    const url = `https://api.spoonacular.com/recipes/${req.query.id}/similar`;

    let recommends = []

    if (debug) {
        if (recommends_result.length == 0) {
            recommends_result = await executeSpoonacularQuery(url, params)
        }
        recommends = recommends_result
    } else {
        recommends = await executeSpoonacularQuery(url, params)
    }

    res.send(recommends)
});
  
api.get("/randoms", webauthn.validateToken, async (req, res) => {

    const params = new URLSearchParams();
    params.append('apiKey', process.env.API_KEY)
    params.append('number', 10)
    
    const url = `https://api.spoonacular.com/recipes/random`

    let randoms = []

    if (debug) {
        if (randoms_result.length == 0) {
            randoms_result = await executeSpoonacularQuery(url, params)
        }
        randoms = randoms_result
    } else {
        randoms = await executeSpoonacularQuery(url, params)
    }
    
    res.send(randoms)
});

module.exports = api