//THIS WAS DONE AS Exercises only!

const express = require('express');
const router = express.Router(); //Router for each domain

const productModel = require('../models/product_model.js'); // Import the product model
const e = require('express');
const model = new productModel(); // Create an instance of the model

router.get("/products", async (req, res) => {//get endpoint
    try {// allways a good idea to to try-catch for models
        const products = await model.getAllProducts() //gets all products from the model
        res.send(products)
    } catch (error) {
        console.error(error);
        res.error();
        
    }
})

module.exports = router;