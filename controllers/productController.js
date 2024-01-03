import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import getTokenFrom from "../utils/getTokenFrom.js";
import config from "../utils/config.js";
import User from "../models/User.js";



async function getProductsInfo(_, res, next) {
    try {
        const products = await Product.find({});
        const productsCount = await products.length;
    return res.send(`<p>Total number of products: ${productsCount}</p>`);
    } catch (error) {
        next(error);
    }
};

async function getProducts(req, res, next) {
   try {
     const products = await Product.find({}).populate("userId", {username: 1, name: 1});   
     return res.json(products);
   } catch(error) {
    next(error)
   }
};

async function getProduct(req, res, next) {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "No items found!" });
        return res.json(note);
    } catch(error) {
        next(error);
    }
};

async function deleteProduct(req, res, next) {
    const id = req.params.id;
    
    try {
        await Product.findByIdAndDelete(id);
    
        return res.status(204).end();
    } catch (error) {
        next(error);
    }
};

async function createProduct(req, res, next) {
    const body = req.body;
    try {
        const decodedToken = jwt.verify(getTokenFrom(req), config.JWT_SECRET);

        if (!decodedToken.id) {
            return res.status(401).json({ error: "token invalid" });
        }

        const user = await User.findById(decodedToken.id);

        if (!body.title) {
            return res.status(400).json({error: "product missing"});
        }

        const product = new Product({
            title: body.content,
            description: body.description,
            price: body.price || 0,
            userId: user.id,
        });

        const savedProduct = await product.save().then((result) => result);
        user.products = user.products.concat(savedProduct._id);
        await user.save();  
        
        return res.status(201).json(savedProduct);
    } catch (error) {
        next(error)}
};

async function updateProduct(req, res, next) {
    const id = req.params.id;
    const { title, description, price } = req.body;
    const product = {
        title,
        description,
        price,
    };

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true, 
            runValidators: true,
            context: "querry",  
        });

        if (!updateProduct) return res.status(404).send({error: "Item not found"})
    
        return res.status(200).json(updatedNote);
    } catch (error) {
    next(error);
    }

}


export default {
    getProductsInfo,
    getProducts,
    getProduct,
    deleteProduct,
    createProduct,
    updateProduct,
};