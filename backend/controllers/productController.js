//THIS WAS DONE AS Exercises only!

import { Router } from 'express';
const router = Router(); //Router for each domain

import productModel from '../models/product_model.js'; // Import the product model
import e from 'express';
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

export default router;